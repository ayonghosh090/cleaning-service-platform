import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../../lib/auth";
import { db } from "../../../../lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const bookings = db.prepare("SELECT id, service, booking_date AS date, time_slot AS time, status FROM bookings WHERE user_id = ? ORDER BY booking_date DESC").all(user.id);
  return NextResponse.json({ bookings });
}
