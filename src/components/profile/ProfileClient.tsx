"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { AuthUser, useAuth } from "../auth/AuthProvider";

type Booking = { id: string; date: string; service: string; time: string; status: string };

export default function ProfileClient({ initialUser }: { initialUser: AuthUser }) {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const currentUser = user || initialUser;
  const [profileForm, setProfileForm] = useState({ fullName: currentUser.fullName, email: currentUser.email, phone: currentUser.phone, address: currentUser.address });
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile/bookings").then((response) => response.json()).then((data: { bookings?: Booking[] }) => setBookings(data.bookings || []));
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    const result = await updateProfile(profileForm);
    if (result) setError(result); else setNotice("Your profile details have been saved.");
  }

  async function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    if (passwordForm.next.length < 8) return setError("Your new password must be at least 8 characters.");
    if (passwordForm.next !== passwordForm.confirm) return setError("New passwords do not match.");
    const result = await changePassword(passwordForm.current, passwordForm.next);
    if (result) setError(result); else { setPasswordForm({ current: "", next: "", confirm: "" }); setNotice("Your password has been changed."); }
  }

  function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return setError("Please choose an image smaller than 1MB.");
    const reader = new FileReader();
    reader.onload = async () => { const result = await updateProfile({ photo: String(reader.result) }); if (result) setError(result); else setNotice("Your profile photo has been updated."); };
    reader.readAsDataURL(file);
  }

  return <><Navbar /><main className="profile-page section-shell"><div className="profile-heading"><div><p className="eyebrow">Your account</p><h1>Welcome home,<br /><em>{currentUser.fullName.split(" ")[0]}.</em></h1></div><button type="button" className="profile-logout" onClick={logout}>Log out <span>↗</span></button></div>{(notice || error) && <p className={`profile-notice ${error ? "form-error" : "form-success"}`} role={error ? "alert" : "status"}>{error || notice}</p>}<div className="profile-layout"><aside className="profile-sidebar"><div className="profile-avatar-wrap">{currentUser.photo ? <img src={currentUser.photo} alt="Your profile" className="profile-avatar-image" /> : <span className="profile-avatar">{currentUser.fullName[0]}</span>}<label className="photo-upload" title="Change profile photo">+</label><input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} /></div><strong>{currentUser.fullName}</strong><span>{currentUser.email}</span><nav><a className="active" href="#details">Personal details</a><a href="#security">Password & security</a><a href="#bookings">Booking history</a></nav><Link className="profile-book-button button button-primary" href="/#booking">Book a clean <span>↗</span></Link></aside><div className="profile-content"><section className="profile-panel" id="details"><div className="panel-heading"><div><p className="eyebrow">Personal details</p><h2>About you</h2></div><span className="panel-step">01</span></div><form className="profile-form" onSubmit={saveProfile}><label>Full name<input value={profileForm.fullName} onChange={(event) => setProfileForm({ ...profileForm, fullName: event.target.value })} required /></label><label>Email address<input type="email" value={profileForm.email} onChange={(event) => setProfileForm({ ...profileForm, email: event.target.value })} required /></label><label>Phone number<input type="tel" value={profileForm.phone} onChange={(event) => setProfileForm({ ...profileForm, phone: event.target.value })} required /></label><label className="field-wide">Home address<input value={profileForm.address} onChange={(event) => setProfileForm({ ...profileForm, address: event.target.value })} placeholder="Add your address" /></label><button className="button button-primary" type="submit">Save changes <span>↗</span></button></form></section><section className="profile-panel" id="security"><div className="panel-heading"><div><p className="eyebrow">Account security</p><h2>Change password</h2></div><span className="panel-step">02</span></div><form className="profile-form password-form" onSubmit={savePassword}><label>Current password<input type="password" value={passwordForm.current} onChange={(event) => setPasswordForm({ ...passwordForm, current: event.target.value })} required autoComplete="current-password" /></label><label>New password<input type="password" value={passwordForm.next} onChange={(event) => setPasswordForm({ ...passwordForm, next: event.target.value })} required minLength={8} autoComplete="new-password" /></label><label>Confirm new password<input type="password" value={passwordForm.confirm} onChange={(event) => setPasswordForm({ ...passwordForm, confirm: event.target.value })} required autoComplete="new-password" /></label><button className="button button-primary" type="submit">Update password <span>↗</span></button></form></section><section className="profile-panel" id="bookings"><div className="panel-heading"><div><p className="eyebrow">Your visits</p><h2>Booking history</h2></div><span className="panel-step">03</span></div>{bookings.length ? <div className="booking-list">{bookings.map((booking) => <div className="booking-row" key={booking.id}><span className="booking-date">{booking.date}</span><span><strong>{booking.service}</strong><small>{booking.time}</small></span><b className={`booking-status ${booking.status}`}>{booking.status}</b></div>)}</div> : <p className="empty-bookings">Your booking history will appear here after your first clean.</p>}</section></div></div></main></>;
}
