import { z } from 'zod';
import type { SurveyFieldDefinition, SurveyValidationType } from '../types';

/**
 * 기본 Zod 스키마 생성 함수 타입
 */
type BaseSchemaBuilder = (field: SurveyFieldDefinition) => z.ZodTypeAny;

/**
 * 유효성 검사 타입별 기본 스키마 매핑
 */
type BaseSchemaMap = Record<SurveyValidationType, BaseSchemaBuilder>;

/**
 * 각 validation.type에 대응하는 기본 Zod 스키마 생성
 */
export const baseSchemas: BaseSchemaMap = {
  /**
   * 문자열 타입 (단일 선택, 텍스트 입력)
   */
  string: () => z.string(),

  /**
   * 배열 타입 (다중 선택)
   */
  array: () => z.array(z.string()),

  /**
   * 숫자 타입 (평점)
   */
  number: () => z.number(),

  /**
   * 불리언 타입 (체크박스 등)
   */
  boolean: () => z.boolean(),
};

/**
 * 필드 정의에서 기본 스키마 가져오기
 */
export function getBaseSchema(field: SurveyFieldDefinition): z.ZodTypeAny {
  const builder = baseSchemas[field.type] ?? baseSchemas.string;
  return builder(field);
}
