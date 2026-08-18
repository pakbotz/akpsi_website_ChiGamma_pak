// frontend/src/app/admin/(dashboard)/careers/CareersEditor.tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import ImageUploadCard from '@/components/admin/ImageUploadCard';
import EditableField from '@/components/admin/EditableField';
import type { CareerBrother, JobSpotlight } from '@/lib/types';

// One row = one input per column, saved independently on blur — no giant
// "Save" button to remember to click, matching the rest of the dashboard.
function CareerRow({
  row,
  onChange,
  onCommit,
  onRemove,
  savingKey,
}: {
  row: CareerBrother;
  onChange: (field: keyof CareerBrother, value: string) => void;
  onCommit: (field: keyof CareerBrother, value: string) => void;
  onRemove: () => void;
  savingKey: string | null;
}) {
  const cellClasses =
    'w-full border-b border-white/20 bg-transparent py-2 text-sm text-white focus:border-[#c8b89a] focus:outline-none';

  return (
    <tr className="border-b border-white/5">
      {(['name', 'position', 'company', 'sector'] as const).map((field) => (
        <td key={field} className="py-2 pr-4">
          <input
            value={(row[field] as string) ?? ''}
            onChange={(e) => onChange(field, e.target.value)}
            onBlur={(e) => onCommit(field, e.target.value)}
            className={cellClasses}
          />
          {savingKey === `${row.id}:${field}` && (
            <span className="ml-2 text-[10px] text-white/30">saving…</span>
          )}
        </td>
      ))}
      <td className="py-2 pr-4 text-right">
        <button
          onClick={onRemove}
          className="text-xs uppercase tracking-[0.1em] text-white/30 hover:text-red-400"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default function CareersEditor({
  initialCareerBrothers,
  initialSpotlight,
}: {
  initialCareerBrothers: CareerBrother[];
  initialSpotlight: JobSpotlight | null;
}) {
  const supabase = createClient();

  const [rows, setRows] = useState<CareerBrother[]>(initialCareerBrothers);
  const [spotlight, setSpotlight] = useState<JobSpotlight>(
    initialSpotlight ?? {
      id: 1,
      name: '',
      company: '',
      position: '',
      class: '',
      message: '',
      cloudinary_public_id: null,
      company_logo_public_id: null,
    }
  );
  const [savingKey, setSavingKey] = useState<string | null>(null);

  function updateRow(id: string, field: keyof CareerBrother, value: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  async function commitRow(id: string, field: keyof CareerBrother, value: string) {
    setSavingKey(`${id}:${field}`);
    await supabase.from('career_brothers').update({ [field]: value }).eq('id', id);
    setSavingKey(null);
  }

  async function addRow() {
    const { data, error } = await supabase
      .from('career_brothers')
      .insert({ name: 'New Brother', sort_order: rows.length })
      .select('*')
      .single();
    if (!error && data) setRows((prev) => [...prev, data]);
  }

  async function removeRow(id: string) {
    if (!confirm('Remove this entry from the career sheet?')) return;
    await supabase.from('career_brothers').delete().eq('id', id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function saveSpotlight<K extends keyof JobSpotlight>(field: K, value: JobSpotlight[K]) {
    setSavingKey(`spotlight:${field}`);
    await supabase.from('job_spotlight').update({ [field]: value }).eq('id', 1);
    setSpotlight((prev) => ({ ...prev, [field]: value }));
    setSavingKey(null);
  }

  return (
    <div>
      <section className="mb-16 border-b border-white/10 pb-16">
        <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">Our Careers</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.1em] text-white/40">
                <th className="py-2 pr-4 font-normal">Name</th>
                <th className="py-2 pr-4 font-normal">Position</th>
                <th className="py-2 pr-4 font-normal">Company</th>
                <th className="py-2 pr-4 font-normal">Sector</th>
                <th className="py-2 pr-4 font-normal" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <CareerRow
                  key={row.id}
                  row={row}
                  onChange={(field, value) => updateRow(row.id, field, value)}
                  onCommit={(field, value) => commitRow(row.id, field, value)}
                  onRemove={() => removeRow(row.id)}
                  savingKey={savingKey}
                />
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-white/30">
                    No entries yet — add the first one below.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={addRow}
          className="mt-6 border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-[#c8b89a] hover:text-[#c8b89a]"
        >
          + Add Brother
        </button>
      </section>

      <section>
        <h2 className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">Job Spotlight</h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col gap-6">
            <EditableField
              label="Name"
              value={spotlight.name ?? ''}
              onChange={(v) => setSpotlight((prev) => ({ ...prev, name: v }))}
              onCommit={(v) => saveSpotlight('name', v)}
              saving={savingKey === 'spotlight:name'}
            />
            <EditableField
              label="Company"
              value={spotlight.company ?? ''}
              onChange={(v) => setSpotlight((prev) => ({ ...prev, company: v }))}
              onCommit={(v) => saveSpotlight('company', v)}
              saving={savingKey === 'spotlight:company'}
            />
            <EditableField
              label="Position"
              value={spotlight.position ?? ''}
              onChange={(v) => setSpotlight((prev) => ({ ...prev, position: v }))}
              onCommit={(v) => saveSpotlight('position', v)}
              saving={savingKey === 'spotlight:position'}
            />
            <EditableField
              label="Class"
              value={spotlight.class ?? ''}
              onChange={(v) => setSpotlight((prev) => ({ ...prev, class: v }))}
              onCommit={(v) => saveSpotlight('class', v)}
              placeholder="e.g. Class of 2024"
              saving={savingKey === 'spotlight:class'}
            />
            <EditableField
              label="Message"
              value={spotlight.message ?? ''}
              onChange={(v) => setSpotlight((prev) => ({ ...prev, message: v }))}
              onCommit={(v) => saveSpotlight('message', v)}
              multiline
              saving={savingKey === 'spotlight:message'}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ImageUploadCard
              label="Photo"
              publicId={spotlight.cloudinary_public_id}
              saving={savingKey === 'spotlight:cloudinary_public_id'}
              onUploaded={(id) => saveSpotlight('cloudinary_public_id', id)}
            />
            <ImageUploadCard
              label="Company logo"
              publicId={spotlight.company_logo_public_id}
              saving={savingKey === 'spotlight:company_logo_public_id'}
              onUploaded={(id) => saveSpotlight('company_logo_public_id', id)}
              variant="square"
            />
          </div>
        </div>
      </section>
    </div>
  );
}