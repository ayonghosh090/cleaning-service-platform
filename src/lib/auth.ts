import { cookies } from "next/headers";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { db } from "./db";

export const SESSION_COOKIE = "anik_session";
const SESSION_DAYS = 30;

type UserRecord = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  role: "user" | "admin";
};

export type PublicUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  role: "user" | "admin";
};

function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    photo: user.photo,
    role: user.role,
  };
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  const stored = Buffer.from(hash, "hex");
  return stored.length === derived.length && timingSafeEqual(stored, derived);
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string, remember = true) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + (remember ? SESSION_DAYS : 1) * 24 * 60 * 60 * 1000;
  db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(tokenHash(token), userId, expiresAt);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(remember ? { maxAge: SESSION_DAYS * 24 * 60 * 60 } : {}),
  });
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const record = db.prepare(`
    SELECT users.id, users.full_name, users.email, users.phone, users.address, users.photo, users.role
    FROM sessions JOIN users ON users.id = sessions.user_id
    WHERE sessions.id = ? AND sessions.expires_at > ?
  `).get(tokenHash(token), Date.now()) as UserRecord | undefined;
  if (!record) return null;
  return toPublicUser(record);
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) db.prepare("DELETE FROM sessions WHERE id = ?").run(tokenHash(token));
  cookieStore.delete(SESSION_COOKIE);
}

export function publicUserFromId(userId: string) {
  const record = db.prepare("SELECT id, full_name, email, phone, address, photo, role FROM users WHERE id = ?").get(userId) as UserRecord | undefined;
  return record ? toPublicUser(record) : null;
}
