'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  renderLabel = (option) => option,
}: {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  renderLabel?: (option: string) => string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.25em] text-white/45">
        {label}
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-28 items-center justify-center gap-2 border-b border-white/25 pb-0.5 text-sm text-[#f0eeea] underline-offset-4 transition-colors hover:border-[#c8b89a]/70"
      >
        <span>{renderLabel(selected)}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#c8b89a]"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full z-10 mt-3 max-h-72 w-28 overflow-y-auto border-t border-[#c8b89a]/30 bg-[#0a0a0a]/95 backdrop-blur-sm"
          >
            {options.map((option) => {
              const isSelected = option === selected;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-center text-sm transition-colors hover:bg-white/5 ${
                    isSelected
                      ? 'bg-white/5 text-[#c8b89a]'
                      : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {renderLabel(option)}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
