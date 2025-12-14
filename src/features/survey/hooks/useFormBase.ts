import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ElementBase } from '../types';
import {
  collectFormFields,
  createSurveyValidationSchema,
  createDefaultValuesFromChildren,
} from '../utils';

interface UseFormBaseResult {
  methods: UseFormReturn<Record<string, unknown>>;
  allFields: { name: string }[];
}

/**
 * JSON 기반 폼의 공통 로직
 * - children → field 리스트 추출
 * - react-hook-form 세팅 (+ zod)
 * - 언마운트 시 reset
 */
export function useFormBase(children: ElementBase[]): UseFormBaseResult {
  // 1) JSON → FormField[] 변환
  const allFields = useMemo(() => collectFormFields(children), [children]);

  // 2) Zod 스키마 생성
  const zodSchema = useMemo(
    () => createSurveyValidationSchema(children),
    [children]
  );

  // 3) 기본값 생성
  const defaultValues = useMemo(
    () => createDefaultValuesFromChildren(children),
    [children]
  );

  // 4) useForm 세팅
  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
    mode: 'onChange',
  });

  // 5) 언마운트 시 reset
  useEffect(() => {
    return () => {
      methods.reset();
    };
  }, [methods]);

  return { methods, allFields };
}
