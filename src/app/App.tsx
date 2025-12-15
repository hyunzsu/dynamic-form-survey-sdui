import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner, Toast } from '@/shared/ui';
import Providers from './Providers';

// Lazy loaded pages
const LandingPage = lazy(
  () => import('@/features/survey/pages/LandingPage')
);
const SurveyRenderPage = lazy(
  () => import('@/features/survey/pages/SurveyRenderPage')
);

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        {/* 토스트 메시지 */}
        <Toast />

        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/survey/:type" element={<SurveyRenderPage />} />
          </Routes>
        </Suspense>
      </Providers>
    </BrowserRouter>
  );
}
