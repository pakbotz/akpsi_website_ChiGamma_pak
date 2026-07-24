'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard/homepage');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0a0a0a] px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="mb-8 text-2xl font-medium text-[#f0eeea]">Officer Login</h1>
        <div className="mb-4">
          <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-white/25 bg-transparent py-2 text-white focus:border-[#c8b89a] focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-white/25 bg-transparent py-2 text-white focus:border-[#c8b89a] focus:outline-none"
          />
        </div>
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-white/25 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a] disabled:opacity-40"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
