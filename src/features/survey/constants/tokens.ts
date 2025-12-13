// Primary
export const PRIMARY = '#00CB46';
export const PRIMARY_DARK = '#00B33E';
export const PRIMARY_LIGHT = '#00CB4610'; // 10% opacity

// Error
export const ERROR = '#DC2626';
export const ERROR_LIGHT = '#FEF2F2';

// Gray Scale
export const GRAY = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  900: '#111827',
} as const;

// Tailwind 커스텀 클래스
export const tw = {
  // Primary
  primary: 'text-primary',
  primaryBg: 'bg-primary',
  primaryBorder: 'border-primary',
  primaryLight: 'bg-primary/10',

  // Error
  error: 'text-red-600',
  errorBg: 'bg-red-50',
  errorBorder: 'border-red-600',
} as const;
