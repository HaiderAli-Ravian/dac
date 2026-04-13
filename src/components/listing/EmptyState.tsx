import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
      <SearchX className="h-16 w-16 text-slate-300" />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-slate-900">No vehicles found</h3>
        <p className="text-slate-500 mt-1">Try adjusting your search or clearing the filter</p>
      </div>
      <Button variant="outline" onClick={onClear}>
        Clear Search
      </Button>
    </div>
  );
}
