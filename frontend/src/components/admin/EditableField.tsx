'use client';

/**
 * Controlled text field that saves on blur — the same pattern the original
 * Homepage editor used for carousel captions (parent owns the value, this
 * just renders it and calls back on change/blur). No internal state here on
 * purpose: keeping the parent as the single source of truth means a field
 * can never go stale if the parent re-fetches or another field updates it.
 */
export default function EditableField({
  label,
  value,
  onChange,
  onCommit,
  multiline = false,
  placeholder,
  saving = false,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onCommit: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  saving?: boolean;
}) {
  const sharedClasses =
    'w-full border-b border-white/20 bg-transparent py-2 text-white placeholder:text-white/30 focus:border-[#c8b89a] focus:outline-none';

  return (
    <div>
      {label && (
        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/50">
          {label}
          {saving && <span className="normal-case text-white/30"> · saving…</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onCommit(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={`${sharedClasses} resize-y`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onCommit(e.target.value)}
          placeholder={placeholder}
          className={sharedClasses}
        />
      )}
    </div>
  );
}