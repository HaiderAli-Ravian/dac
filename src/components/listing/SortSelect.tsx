'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOption } from '@/types/vehicle';

interface SortSelectProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">Name: A → Z</SelectItem>
        <SelectItem value="name-desc">Name: Z → A</SelectItem>
        <SelectItem value="price-asc">Price: Low → High</SelectItem>
        <SelectItem value="price-desc">Price: High → Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
