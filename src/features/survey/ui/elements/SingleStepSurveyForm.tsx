import { FormProvider } from 'react-hook-form';
import type { SurveyFormElement } from '../../types';
import { useSurveyForm } from '../../hooks';
import { ElementListRenderer } from '../renderers';

interface SingleStepSurveyFormProps {
  /** 설문 스키마 */
  data: SurveyFormElement;
}

/**
 * 싱글스텝 설문 폼 컴포넌트
 * - ElementListRenderer로 모든 자식 요소 렌더링
 */
export function SingleStepSurveyForm({ data }: SingleStepSurveyFormProps) {
  const { methods } = useSurveyForm(data);

  return (
    <FormProvider {...methods}>
      <ElementListRenderer elements={data.children} />
    </FormProvider>
  );
}
