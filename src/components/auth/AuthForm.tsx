"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const { login, register } = useAuth();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
    if (isRegister) {
      if (form.password.length < 8) { setError("Password must be at least 8 characters."); setIsSubmitting(false); return; }
      if (form.password !== form.confirmPassword) { setError("Passwords do not match."); setIsSubmitting(false); return; }
      const result = await register(form);
      if (result) setError(result);
      setIsSubmitting(false);
      return;
    }
    const result = await login(form.email, form.password, remember);
    if (result) setError(result);
    setIsSubmitting(false);
  }

  return (
    <div className="auth-card">
      <div className="auth-card-heading">
        <p className="eyebrow">{isRegister ? "Join CleanCare" : "Welcome back"}</p>
        <h1>{isRegister ? <>Make space for <em>more.</em></> : <>Good to see <em>you.</em></>}</h1>
        <p>{isRegister ? "Create your account and let the clean start here." : "Log in to manage your cleans, details, and preferences."}</p>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        {isRegister && <label>Full name<input name="anik-ghosh-full-name" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Your full name" required autoComplete="off" /></label>}
        <label>Email address<input name="anik-ghosh-email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" required autoComplete="off" /></label>
        {isRegister && <label>Phone number<input name="anik-ghosh-phone" type="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Your phone number" required autoComplete="off" /></label>}
        <label>Password<input name="anik-ghosh-password" type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} placeholder={isRegister ? "At least 8 characters" : "Your password"} required autoComplete="new-password" /></label>
        {isRegister && <label>Confirm password<input name="anik-ghosh-confirm-password" type="password" value={form.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} placeholder="Repeat your password" required autoComplete="new-password" /></label>}
        {!isRegister && <div className="form-options"><label className="checkbox-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /> <span>Remember me</span></label><button type="button" className="text-button" onClick={() => setMessage("Password reset is ready to connect to your email service.")}>Forgot password?</button></div>}
        {error && <p className="form-message form-error" role="alert">{error}</p>}
        {message && <p className="form-message form-success" role="status">{message}</p>}
        <button className="button button-primary auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait…" : isRegister ? "Create account" : "Log in"}<span aria-hidden="true">↗</span></button>
      </form>
      <p className="auth-switch">{isRegister ? "Already have an account?" : "New to CleanCare?"} <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Log in" : "Create an account"}</Link></p>
    </div>
  );
}
