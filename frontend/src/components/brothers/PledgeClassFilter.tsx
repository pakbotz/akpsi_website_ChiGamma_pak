'use client';

import FilterDropdown from './FilterDropdown';
import { toGreekLetter } from '@/lib/greekAlphabet';

export const ALL_CLASSES = 'All Classes';

export default function PledgeClassFilter({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <FilterDropdown
      label="Class"
      options={[ALL_CLASSES, ...options]}
      selected={selected}
      onChange={onChange}
      renderLabel={(option) =>
        option === ALL_CLASSES ? (
          option
        ) : (
          <span style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif" }}>
            {toGreekLetter(option)}
          </span>
        )
      }
    />
  );
}