import { Suspense, lazy } from 'react';
import { LoadingSpinner, Toast } from '@/shared/ui';
import Providers from './Providers';

// JSON Render 페이지
const SurveyRenderPage = lazy(
  () => import('@/features/survey/pages/SurveyRenderPage')
);

export default function App() {
  return (
    <Providers>
      {/* 토스트 메시지 */}
      <Toast />

      <Suspense fallback={<LoadingSpinner />}>
        <SurveyRenderPage />
      </Suspense>
    </Providers>
  );
}
