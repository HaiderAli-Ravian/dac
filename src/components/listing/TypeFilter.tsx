'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const VEHICLE_TYPES = [
  'Sedan',
  'SUV',
  'Truck',
  'Coupe',
  'Convertible',
  'Hatchback',
];

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TypeFilter({ value, onChange }: TypeFilterProps) {
  return (
    <Select value={value || 'all'} onValueChange={(v) => onChange(v === 'all' ? '' : v)}>
      <SelectTrigger className="w-[160px] shrink-0">
        <SelectValue placeholder="All Types" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Types</SelectItem>
        {VEHICLE_TYPES.map((type) => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
