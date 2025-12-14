import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import type { UseFormReturn } from 'react-hook-form';
import type { SurveyFormElement } from '../types';
import { currentFieldsAtom } from '../stores';
import { useFormBase } from './useFormBase';

interface UseSurveyFormResult {
  methods: UseFormReturn<Record<string, unknown>>;
  questionIds: string[];
}

/**
 * 설문 폼 기본 훅
 * - useFormBase로 공통 로직 분리
 */
export function useSurveyForm(data: SurveyFormElement): UseSurveyFormResult {
  // useFormBase로 공통 로직 처리
  const { methods, allFields } = useFormBase(data.children);

  // 질문 ID 목록 추출
  const questionIds = allFields.map((field) => field.name);

  // currentFieldsAtom 설정 (ProgressBar용)
  const setCurrentFields = useSetAtom(currentFieldsAtom);

  useEffect(() => {
    setCurrentFields(questionIds);
    return () => setCurrentFields([]);
  }, [questionIds, setCurrentFields]);

  return { methods, questionIds };
}
