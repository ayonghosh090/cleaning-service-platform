import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : user.fullName;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : user.email;
  const phone = typeof body.phone === "string" ? body.phone.trim() : user.phone;
  const address = typeof body.address === "string" ? body.address.trim() : user.address;
  const photo = typeof body.photo === "string" ? body.photo : user.photo;
  if (fullName.length < 2 || !email || !phone) return NextResponse.json({ error: "Name, email, and phone are required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (photo.length > 1_500_000) return NextResponse.json({ error: "Profile photos must be smaller than 1MB." }, { status: 400 });
  const duplicate = db.prepare("SELECT id FROM users WHERE email = ? AND id != ?").get(email, user.id);
  if (duplicate) return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
  db.prepare("UPDATE users SET full_name = ?, email = ?, phone = ?, address = ?, photo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(fullName, email, phone, address, photo, user.id);
  const updated = await getCurrentUser();
  return NextResponse.json({ user: updated });
}
