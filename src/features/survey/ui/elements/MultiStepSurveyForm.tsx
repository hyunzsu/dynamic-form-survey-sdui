import { FormProvider } from 'react-hook-form';
import type { SurveyFormElement } from '../../types';
import { useMultiStepForm } from '../../hooks';
import { ElementListRenderer } from '../renderers';

interface MultiStepSurveyFormProps {
  /** 설문 스키마 */
  data: SurveyFormElement;
}

/**
 * 멀티스텝 설문 폼 컴포넌트
 * - currentStepContent와 visibleButtonsContainer로 분리
 */
export function MultiStepSurveyForm({ data }: MultiStepSurveyFormProps) {
  const { methods, currentStepContent, visibleButtonsContainer } =
    useMultiStepForm(data);

  return (
    <FormProvider {...methods}>
      {/* 현재 스텝 콘텐츠 */}
      <div className='flex flex-col gap-6'>
        <ElementListRenderer elements={currentStepContent} />
      </div>

      {/* 버튼 컨테이너 - sticky */}
      <div className='sticky bottom-0 bg-white pt-4 -mx-6 px-6 pb-6 -mb-6 *:mt-0'>
        <ElementListRenderer elements={[visibleButtonsContainer]} />
      </div>
    </FormProvider>
  );
}
