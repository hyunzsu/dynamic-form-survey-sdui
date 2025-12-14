import { useFormContext } from 'react-hook-form';
import { useAtom } from 'jotai';
import { formStepAtom, currentFieldsAtom, isLastStepAtom } from '../stores';

/**
 * 스텝 이동 액션 훅
 * - 이전/다음 스텝 이동 함수 제공
 */
export function useStepActions() {
  const [currentStep, setCurrentStep] = useAtom(formStepAtom);
  const [currentFields] = useAtom(currentFieldsAtom);
  const [isLastStep] = useAtom(isLastStepAtom);
  const { trigger } = useFormContext() || {};

  return {
    /** 이전 스텝으로 이동 */
    goPrevStep: () => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
    },

    /** 다음 스텝으로 이동 (현재 스텝 유효성 검사 후) */
    goNextStep: async () => {
      if (!trigger || !currentFields.length) {
        setCurrentStep((prev) => prev + 1);
        return;
      }

      const isValid = await trigger(currentFields);
      if (isValid && !isLastStep) {
        setCurrentStep((prev) => prev + 1);
      }
    },

    /** 현재 스텝 반환 */
    getCurrentStep: () => currentStep,
  };
}
