"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  role: "user" | "admin";
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<string | null>;
  register: (details: { fullName: string; email: string; phone: string; password: string; confirmPassword: string }) => Promise<string | null>;
  updateProfile: (details: Partial<Pick<AuthUser, "fullName" | "email" | "phone" | "address" | "photo">>) => Promise<string | null>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<string | null>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session").then((response) => response.json()).then((data: { user: AuthUser | null }) => setUser(data.user)).finally(() => setIsLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    async login(email, password, remember) {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password, remember }) });
      const data = await response.json();
      if (!response.ok) return data.error || "Unable to log in.";
      setUser(data.user);
      router.push("/profile");
      return null;
    },
    async register(details) {
      const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details) });
      const data = await response.json();
      if (!response.ok) return data.error || "Unable to create your account.";
      setUser(data.user);
      router.push("/profile");
      return null;
    },
    async updateProfile(details) {
      const response = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details) });
      const data = await response.json();
      if (!response.ok) return data.error || "Unable to save your profile.";
      setUser(data.user);
      return null;
    },
    async changePassword(currentPassword, newPassword) {
      const response = await fetch("/api/profile/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) });
      const data = await response.json();
      return response.ok ? null : data.error || "Unable to change your password.";
    },
    async logout() {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    },
  }), [isLoading, router, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
