import type { SurveyFormElement } from '../../types';
import { MultiStepSurveyForm } from './MultiStepSurveyForm';
import { SingleStepSurveyForm } from './SingleStepSurveyForm';

interface SurveyFormProps {
  /** 설문 스키마 */
  data: SurveyFormElement;
}

/**
 * 설문 폼 컴포넌트
 * - totalSteps 프로퍼티 유무/값에 따라
 * - MultiStep 또는 SingleStep 중 하나로 분기해서 렌더링
 */
export function SurveyForm({ data }: SurveyFormProps) {
  return data.totalSteps && data.totalSteps > 1 ? (
    <MultiStepSurveyForm data={data} />
  ) : (
    <SingleStepSurveyForm data={data} />
  );
}
