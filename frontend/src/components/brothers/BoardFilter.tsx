'use client';

import FilterDropdown from './FilterDropdown';

export const BOARD_FILTERS = ['All Brothers', 'Executive', 'Lower'] as const;
export type BoardFilterValue = (typeof BOARD_FILTERS)[number];

export default function BoardFilter({
  selected,
  onChange,
}: {
  selected: BoardFilterValue;
  onChange: (value: BoardFilterValue) => void;
}) {
  return (
    <FilterDropdown
      label="Board"
      options={[...BOARD_FILTERS]}
      selected={selected}
      onChange={(value) => onChange(value as BoardFilterValue)}
    />
  );
}
