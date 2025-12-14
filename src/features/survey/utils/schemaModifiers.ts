import { z } from 'zod';

/**
 * Zod 스키마에 검증 규칙을 추가하는 modifier 함수 모음
 */
export const modifiers = {
  /**
   * 필수 값 검증
   * - 문자열: 빈 문자열 불허
   * - 배열: 빈 배열 불허
   * - 숫자: null/undefined 불허
   */
  required: (schema: z.ZodTypeAny, message?: string) =>
    schema.refine(
      (value) => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim() !== '';
        if (Array.isArray(value)) return value.length > 0;
        return true;
      },
      { message: message || '필수 항목입니다' }
    ),

  /**
   * 문자열 최소 길이
   */
  minLength: (schema: z.ZodTypeAny, minLength: number, message?: string) =>
    (schema as z.ZodString).min(minLength, {
      message: message || `최소 ${minLength}자 이상 입력해주세요`,
    }),

  /**
   * 문자열 최대 길이
   */
  maxLength: (schema: z.ZodTypeAny, maxLength: number, message?: string) =>
    (schema as z.ZodString).max(maxLength, {
      message: message || `최대 ${maxLength}자까지 입력 가능합니다`,
    }),

  /**
   * 배열 최소 선택 개수
   */
  minSelect: (schema: z.ZodTypeAny, minSelect: number, message?: string) =>
    (schema as z.ZodArray<z.ZodString>).min(minSelect, {
      message: message || `최소 ${minSelect}개 이상 선택해주세요`,
    }),

  /**
   * 배열 최대 선택 개수
   */
  maxSelect: (schema: z.ZodTypeAny, maxSelect: number, message?: string) =>
    (schema as z.ZodArray<z.ZodString>).max(maxSelect, {
      message: message || `최대 ${maxSelect}개까지 선택 가능합니다`,
    }),

  /**
   * 숫자 최소값 (평점 등)
   */
  min: (schema: z.ZodTypeAny, min: number, message?: string) =>
    (schema as z.ZodNumber).min(min, {
      message: message || `${min} 이상이어야 합니다`,
    }),

  /**
   * 숫자 최대값 (평점 등)
   */
  max: (schema: z.ZodTypeAny, max: number, message?: string) =>
    (schema as z.ZodNumber).max(max, {
      message: message || `${max} 이하여야 합니다`,
    }),

  /**
   * 정규식 패턴 검증
   */
  pattern: (schema: z.ZodTypeAny, pattern: string, message?: string) => {
    const regex = new RegExp(pattern);
    return schema.refine(
      (value) => {
        if (typeof value !== 'string') return true;
        if (value === '') return true; // 빈 값은 required에서 처리
        return regex.test(value);
      },
      { message: message || '올바른 형식이 아닙니다' }
    );
  },
};
