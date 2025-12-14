import { cn } from '@/shared/utils';

export interface FormErrorProps {
  error?: string;
  className?: string;
}

export function FormError({ error, className }: FormErrorProps) {
  if (!error) return null;

  return <p className={cn('text-sm text-red-600', className)}>{error}</p>;
}
