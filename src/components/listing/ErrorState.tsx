import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center gap-4 py-10">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Failed to load vehicles</AlertTitle>
        <AlertDescription>
          There was a problem fetching vehicle data. Please try again.
        </AlertDescription>
      </Alert>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
}
