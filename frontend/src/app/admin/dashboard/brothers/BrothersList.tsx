// frontend/src/app/admin/(dashboard)/brothers/BrothersList.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { createClient } from '@/lib/supabase/client';
import type { PledgeClass } from '@/lib/types';

type BrotherRow = {
  id: string;
  name: string;
  active: boolean;
  is_executive: boolean;
  is_board: boolean;
  cloudinary_public_id: string | null;
  class_id: string | null;
  // Supabase's JS client infers embedded foreign-key selects as an array
  // when there's no generated Database type to tell it this is actually a
  // many-to-one (each brother has at most one class), so this is a 0-or-1
  // element array at runtime even though it's logically a single record.
  classes: { greek_letter: string; name: string }[] | null;
};

export default function BrothersList({
  initialBrothers,
  classes,
}: {
  initialBrothers: BrotherRow[];
  classes: PledgeClass[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const [brothers, setBrothers] = useState<BrotherRow[]>(initialBrothers);
  const [classList, setClassList] = useState<PledgeClass[]>(classes);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClassLetter, setNewClassLetter] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleActive(id: string, active: boolean) {
    setBusyId(id);
    await supabase.from('brothers').update({ active }).eq('id', id);
    setBrothers((prev) => prev.map((b) => (b.id === id ? { ...b, active } : b)));
    setBusyId(null);
  }

  async function addBrother() {
    const { data, error } = await supabase
      .from('brothers')
      .insert({ name: 'New Brother' })
      .select('id')
      .single();
    if (!error && data) {
      router.push(`/admin/dashboard/brothers/${data.id}`);
    }
  }

  async function deleteBrother(id: string, name: string) {
    if (!confirm(`Remove ${name}? This can't be undone.`)) return;
    setBusyId(id);
    await supabase.from('brothers').delete().eq('id', id);
    setBrothers((prev) => prev.filter((b) => b.id !== id));
    setBusyId(null);
  }

  async function addClass() {
    if (!newClassLetter.trim() || !newClassName.trim()) return;
    const nextOrder = classList.length + 1;
    const { data, error } = await supabase
      .from('classes')
      .insert({ greek_letter: newClassLetter.trim(), name: newClassName.trim(), sort_order: nextOrder })
      .select('id, greek_letter, name, sort_order')
      .single();
    if (!error && data) {
      setClassList((prev) => [...prev, data]);
      setNewClassLetter('');
      setNewClassName('');
      setShowAddClass(false);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Brothers</h1>
        <button
          onClick={() => setShowAddClass((v) => !v)}
          className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white"
        >
          {showAddClass ? 'Cancel' : '+ Add class'}
        </button>
      </div>

      {showAddClass && (
        <div className="mb-8 flex flex-wrap items-end gap-4 border border-white/10 p-4">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">
              Greek letter
            </label>
            <input
              value={newClassLetter}
              onChange={(e) => setNewClassLetter(e.target.value)}
              placeholder="Ρ"
              className="w-24 border-b border-white/20 bg-transparent py-2 text-white focus:border-[#c8b89a] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">
              Class name
            </label>
            <input
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder="Rho"
              className="w-40 border-b border-white/20 bg-transparent py-2 text-white focus:border-[#c8b89a] focus:outline-none"
            />
          </div>
          <button
            onClick={addClass}
            className="border border-white/25 px-5 py-2 text-xs uppercase tracking-[0.15em] text-white/80 hover:border-[#c8b89a] hover:text-[#c8b89a]"
          >
            Add class
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-[0.1em] text-white/40">
              <th className="py-3 pr-4 font-normal">Photo</th>
              <th className="py-3 pr-4 font-normal">Name</th>
              <th className="py-3 pr-4 font-normal">Class</th>
              <th className="py-3 pr-4 font-normal">Active</th>
              <th className="py-3 pr-4 font-normal" />
            </tr>
          </thead>
          <tbody>
            {brothers.map((b) => (
              <tr key={b.id} className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <div className="relative h-12 w-12 overflow-hidden bg-[#1c1c1c]">
                    {b.cloudinary_public_id && (
                      <CldImage
                        src={b.cloudinary_public_id}
                        alt={b.name}
                        fill
                        crop="fill"
                        gravity="face"
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <Link href={`/admin/brothers/${b.id}`} className="hover:text-[#c8b89a]">
                    {b.name}
                  </Link>
                  {(b.is_executive || b.is_board) && (
                    <span className="ml-2 text-[10px] uppercase tracking-[0.1em] text-white/30">
                      {b.is_executive ? 'Exec' : 'Board'}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4 text-white/60">
                  {b.classes?.[0] ? `${b.classes[0].greek_letter} — ${b.classes[0].name}` : '—'}
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="checkbox"
                    checked={b.active}
                    disabled={busyId === b.id}
                    onChange={(e) => toggleActive(b.id, e.target.checked)}
                    className="h-4 w-4 accent-[#c8b89a]"
                  />
                </td>
                <td className="py-3 pr-4 text-right">
                  <Link
                    href={`/admin/brothers/${b.id}`}
                    className="mr-4 text-xs uppercase tracking-[0.1em] text-white/50 hover:text-[#c8b89a]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteBrother(b.id, b.name)}
                    disabled={busyId === b.id}
                    className="text-xs uppercase tracking-[0.1em] text-white/30 hover:text-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {brothers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/30">
                  No brothers yet — add the first one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={addBrother}
        className="mt-8 border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
      >
        + Add Brother
      </button>
    </div>
  );
}