import { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import type { UseFormReturn } from 'react-hook-form';
import type { SurveyFormElement, SurveyElement } from '../types';
import { formStepAtom, currentFieldsAtom, isLastStepAtom } from '../stores';
import { collectFormFields } from '../utils';
import { useFormBase } from './useFormBase';

/** formStep 속성 체크 */
function getFormStep(element: unknown): number | undefined {
  if (element && typeof element === 'object' && 'formStep' in element) {
    const step = (element as { formStep: unknown }).formStep;
    return typeof step === 'number' ? step : undefined;
  }
  return undefined;
}

interface UseMultiStepFormResult {
  /** react-hook-form methods */
  methods: UseFormReturn<Record<string, unknown>>;
  /** 현재 스텝의 콘텐츠 */
  currentStepContent: SurveyElement[];
  /** 현재 스텝에 맞는 버튼 컨테이너 */
  visibleButtonsContainer: SurveyElement;
}

/**
 * 다단계 폼을 관리하는 커스텀 훅
 * - useFormBase로 공통 로직 분리
 */
export function useMultiStepForm(
  data: SurveyFormElement
): UseMultiStepFormResult {
  // useFormBase로 공통 로직 처리
  const { methods } = useFormBase(data.children);

  // 전역 상태 관리
  const [currentStep, setCurrentStep] = useAtom(formStepAtom);
  const [, setCurrentFields] = useAtom(currentFieldsAtom);
  const [isLastStep, setIsLastStep] = useAtom(isLastStepAtom);

  // 폼 구조 분리: 콘텐츠와 버튼 컨테이너 분리
  // 마지막 요소는 버튼 컨테이너로 가정
  const { formContent, buttonsContainer } = useMemo(() => {
    const last = data.children.length - 1;
    return {
      formContent: data.children.slice(0, last),
      buttonsContainer: data.children[last] as SurveyElement,
    };
  }, [data.children]);

  // 현재 스텝에 맞는 콘텐츠와 버튼 동적 구성
  const { currentStepContent, visibleButtonsContainer } = useMemo(() => {
    const stepNodes = formContent.filter((n) => getFormStep(n) === currentStep);

    // 버튼 컨테이너에서 버튼들 추출
    const buttons = (buttonsContainer.children ?? []) as SurveyElement[];
    const visibleButtons: SurveyElement[] = [];

    // 첫 스텝이 아니면 prev 버튼 표시
    if (currentStep > 0 && buttons[0]) {
      visibleButtons.push(buttons[0]); // prev
    }

    // 마지막 스텝이면 submit, 아니면 next
    if (isLastStep) {
      if (buttons[2]) visibleButtons.push(buttons[2]); // submit
    } else {
      if (buttons[1]) visibleButtons.push(buttons[1]); // next
    }

    return {
      currentStepContent: stepNodes,
      visibleButtonsContainer: {
        ...buttonsContainer,
        children: visibleButtons,
      } as SurveyElement,
    };
  }, [formContent, buttonsContainer, currentStep, isLastStep]);

  // 현재 스텝의 필드 목록 업데이트
  useEffect(() => {
    const fieldNames = collectFormFields(currentStepContent).map((f) => f.name);
    setCurrentFields(fieldNames);
  }, [currentStepContent, setCurrentFields]);

  // 마지막 스텝 여부 업데이트
  useEffect(() => {
    const hasNextStep = formContent.some(
      (n) => getFormStep(n) === currentStep + 1
    );
    setIsLastStep(!hasNextStep);
  }, [formContent, currentStep, setIsLastStep]);

  // 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      setCurrentStep(0);
    };
  }, [setCurrentStep]);

  return {
    methods,
    currentStepContent,
    visibleButtonsContainer,
  };
}
