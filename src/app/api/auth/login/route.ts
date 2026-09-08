import { NextResponse } from "next/server";
import { createSession, normalizeEmail, publicUserFromId, verifyPassword } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export async function POST(request: Request) {
  const body = await request.json() as Record<string, unknown>;
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";
  const remember = body.remember === true;
  const user = db.prepare("SELECT id, password_hash FROM users WHERE email = ?").get(email) as { id: string; password_hash: string } | undefined;
  if (!user || !verifyPassword(password, user.password_hash)) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  await createSession(user.id, remember);
  return NextResponse.json({ user: publicUserFromId(user.id) });
}
