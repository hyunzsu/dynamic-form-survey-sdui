import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx + tailwind-merge 조합 유틸리티
 * Tailwind 클래스 충돌을 자동으로 해결
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
