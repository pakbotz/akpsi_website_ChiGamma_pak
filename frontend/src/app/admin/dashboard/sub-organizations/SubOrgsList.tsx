'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { SubOrganization } from '@/lib/types';

export default function SubOrgsList({
  initialSubOrganizations,
}: {
  initialSubOrganizations: SubOrganization[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const [subOrganizations, setSubOrganizations] = useState<SubOrganization[]>(
    initialSubOrganizations
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  async function addSubOrganization() {
    const { data, error } = await supabase
      .from('sub_organizations')
      .insert({ slug: `new-sub-org-${crypto.randomUUID().slice(0, 8)}`, name: 'New Sub-Organization' })
      .select('id')
      .single();
    if (!error && data) {
      router.push(`/admin/dashboard/sub-organizations/${data.id}`);
    }
  }

  async function deleteSubOrganization(id: string, name: string) {
    if (!confirm(`Remove ${name}? This can't be undone.`)) return;
    setBusyId(id);
    await supabase.from('sub_organizations').delete().eq('id', id);
    setSubOrganizations((prev) => prev.filter((o) => o.id !== id));
    setBusyId(null);
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-medium">Sub-Organizations</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-[0.1em] text-white/40">
              <th className="py-3 pr-4 font-normal">Logo</th>
              <th className="py-3 pr-4 font-normal">Name</th>
              <th className="py-3 pr-4 font-normal">Slug</th>
              <th className="py-3 pr-4 font-normal" />
            </tr>
          </thead>
          <tbody>
            {subOrganizations.map((org) => (
              <tr key={org.id} className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <div className="relative h-12 w-12 overflow-hidden bg-[#1c1c1c]">
                    {org.logo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={org.logo_url}
                        alt={org.name}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <Link
                    href={`/admin/dashboard/sub-organizations/${org.id}`}
                    className="hover:text-[#c8b89a]"
                  >
                    {org.name}
                  </Link>
                </td>
                <td className="py-3 pr-4 text-white/60">{org.slug}</td>
                <td className="py-3 pr-4 text-right">
                  <Link
                    href={`/admin/dashboard/sub-organizations/${org.id}`}
                    className="mr-4 text-xs uppercase tracking-[0.1em] text-white/50 hover:text-[#c8b89a]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteSubOrganization(org.id, org.name)}
                    disabled={busyId === org.id}
                    className="text-xs uppercase tracking-[0.1em] text-white/30 hover:text-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {subOrganizations.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-white/30">
                  No sub-organizations yet — add the first one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={addSubOrganization}
        className="mt-8 border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
      >
        + Add Sub-Organization
      </button>
    </div>
  );
}
