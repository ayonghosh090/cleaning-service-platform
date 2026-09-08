"use client";

import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";

const navItems = [
  ["Services", "#services"],
  ["Why us", "#why-us"],
  ["How it works", "#how-it-works"],
  ["Reviews", "#reviews"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="CleanCare home">
          <span className="brand-mark">A</span>
          <span>
            <strong>CleanCare</strong>
            <small>by Anik Ghosh</small>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-account-actions">
          {isLoading ? null : user ? (
            <>
              {user.role === "admin" && <Link className="nav-account-link" href="/admin">Admin dashboard</Link>}
              <Link className="nav-account-link" href="/profile">Profile</Link>
              <button className="nav-logout" type="button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-account-link" href="/login">Login</Link>
              <Link className="nav-account-link" href="/register">Register</Link>
            </>
          )}
          <a className="button button-small button-dark" href="#booking">
            Book now <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}