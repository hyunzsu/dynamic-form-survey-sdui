import type { ReactNode } from 'react';
import { createStore, Provider as JotaiProvider } from 'jotai';

// Jotai store
const surveyStore = createStore();

interface ProvidersProps {
  children: ReactNode;
}

/**
 * 앱 전역 Provider 모음
 * - Jotai Provider 등
 */
export default function Providers({ children }: ProvidersProps) {
  return <JotaiProvider store={surveyStore}>{children}</JotaiProvider>;
}
