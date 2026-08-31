import { Check } from 'lucide-react';
import { SubOrgChecklistItem } from '@/lib/types';

export default function SubOrgChecklistItemCard({ item }: { item: SubOrgChecklistItem }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/25 text-[#c8b89a]">
        <Check size={14} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#f0eeea]">{item.title}</h3>
        {item.description && (
          <p className="mt-1 text-sm leading-relaxed text-white/60">{item.description}</p>
        )}
      </div>
    </div>
  );
}
