import { Link, useParams } from 'react-router-dom';
import { LoadingSpinner } from '@/shared';
import { useLocalJsonData } from '../hooks';
import { PageRenderer } from '../ui/renderers';

const SURVEY_TYPE_MAP: Record<string, string> = {
  singlestep: '/json/survey-singlestep.json',
  multistep: '/json/survey-multistep.json',
  registration: '/json/survey-registration.json',
  onboarding: '/json/survey-onboarding.json',
};

export default function SurveyRenderPage() {
  const { type = 'singlestep' } = useParams<{ type: string }>();
  const jsonPath = SURVEY_TYPE_MAP[type] || SURVEY_TYPE_MAP.singlestep;
  const { document, error } = useLocalJsonData(jsonPath);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">설문을 불러오는데 실패했습니다.</p>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (!document) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-slate-800 py-8 px-4">
      {/* Back to Home Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-medium text-gray-600">홈으로</span>
      </Link>

      {/* Mobile Container */}
      <div className="max-w-md mx-auto mt-8 rounded-2xl shadow-2xl overflow-hidden">
        <PageRenderer document={document} />
      </div>
    </div>
  );
}
