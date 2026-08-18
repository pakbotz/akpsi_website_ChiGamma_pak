// frontend/src/components/admin/PastPositionsField.tsx
'use client';

import { useState } from 'react';
import { sortPastPositions } from '@/lib/positionPriority';

export default function PastPositionsField({
  value,
  onCommit,
  saving = false,
}: {
  value: string[];
  onCommit: (value: string[]) => void;
  saving?: boolean;
}) {
  const [draft, setDraft] = useState('');

  function addPosition() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onCommit(sortPastPositions([...value, trimmed]));
    setDraft('');
  }

  function removePosition(position: string) {
    onCommit(value.filter((p) => p !== position));
  }

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">
        Past Positions
        {saving && <span className="normal-case text-white/30"> · saving…</span>}
      </label>

      <div className="mb-3 flex flex-wrap gap-2">
        {value.map((position) => (
          <span
            key={position}
            className="flex items-center gap-2 border border-white/20 px-3 py-1 text-xs text-white/70"
          >
            {position}
            <button
              type="button"
              onClick={() => removePosition(position)}
              className="text-white/40 hover:text-red-400"
            >
              ×
            </button>
          </span>
        ))}
        {value.length === 0 && <span className="text-xs text-white/30">None yet</span>}
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addPosition();
            }
          }}
          placeholder="e.g. VP of Recruitment"
          className="w-full border-b border-white/20 bg-transparent py-2 text-white placeholder:text-white/30 focus:border-[#c8b89a] focus:outline-none"
        />
        <button
          type="button"
          onClick={addPosition}
          className="shrink-0 border border-white/25 px-4 text-xs uppercase tracking-[0.1em] text-white/70 hover:border-[#c8b89a] hover:text-[#c8b89a]"
        >
          Add
        </button>
      </div>
    </div>
  );
}