"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.replace("/admin/insights");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6 py-12 admin-login-root">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold text-primary">
            Val<span className="text-secondary">Insight</span>
          </Link>

          <p className="mt-2 text-sm text-muted">
            Content Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-primary">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-muted">
            Sign in to manage ValInsight insights.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="mt-2 w-full rounded-md border border-border px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Back to website */}
          <Link
            href="/"
            className="mt-6 block text-center text-sm font-semibold text-muted transition hover:text-primary"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </main>
  );
}