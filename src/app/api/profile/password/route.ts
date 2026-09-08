import { NextResponse } from "next/server";
import { getCurrentUser, hashPassword, verifyPassword } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
  if (newPassword.length < 8) return NextResponse.json({ error: "Your new password must be at least 8 characters." }, { status: 400 });
  const record = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(user.id) as { password_hash: string } | undefined;
  if (!record || !verifyPassword(currentPassword, record.password_hash)) return NextResponse.json({ error: "Your current password is incorrect." }, { status: 400 });
  db.prepare("UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(hashPassword(newPassword), user.id);
  return NextResponse.json({ ok: true });
}
