import { LoadingSpinner } from '@/shared';
import { useLocalJsonData } from '../hooks';
import { PageRenderer } from '../ui/renderers';

export default function SurveyRenderPage() {
  const { document } = useLocalJsonData('/json/survey-singlestep.json');

  if (!document) {
    return <LoadingSpinner />;
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6'>
        <PageRenderer document={document} />
      </div>
    </div>
  );
}
