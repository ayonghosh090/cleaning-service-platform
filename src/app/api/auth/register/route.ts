import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { createSession, hashPassword, normalizeEmail, publicUserFromId } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";

  if (fullName.length < 2 || !email || !phone) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  if (db.prepare("SELECT id FROM users WHERE email = ?").get(email)) return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  const userId = randomUUID();
  db.prepare("INSERT INTO users (id, full_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)").run(userId, fullName, email, phone, hashPassword(password));
  await createSession(userId, true);
  return NextResponse.json({ user: publicUserFromId(userId) }, { status: 201 });
}
