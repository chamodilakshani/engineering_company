"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok && data.ok) {
      window.location.href = "/appointments";
      return;
    }

    setError(data.error || "Login failed.");
  };

  return (
    <main className="min-h-screen bg-base text-white flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate/70 p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-4">Admin Login</h1>
        <p className="text-steel mb-6">Enter the admin password to view appointment records.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl bg-base border border-white/10 px-4 py-3 text-white outline-none focus:border-gold"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-5 py-3 font-bold text-black hover:brightness-110 transition"
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
