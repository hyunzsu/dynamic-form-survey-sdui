import { z } from 'zod';
import type {
  SurveyFieldDefinition,
  AnswerValue,
  SurveyElement,
} from '../types';
import { collectFormFields } from './collectFormFields';
import { getBaseSchema } from './schemaBase';
import { modifiers } from './schemaModifiers';

/**
 * 필드 정의에서 Zod 스키마 생성
 */
function buildFieldSchema(field: SurveyFieldDefinition): z.ZodTypeAny {
  const { validation } = field;

  // 1) 기본 스키마 선택
  let schema = getBaseSchema(field);

  // 2) 기본적으로 optional (nullable)
  schema = schema.optional().nullable();

  if (!validation) return schema;

  // 3) 필수 값 검증
  if (validation.required) {
    schema = modifiers.required(schema, validation.errorMessages?.required);
  }

  // 4) 타입별 추가 검증
  switch (validation.type) {
    case 'string':
      // 문자열 길이 검증
      if (validation.minLength !== undefined) {
        schema = modifiers.minLength(
          schema,
          validation.minLength,
          validation.errorMessages?.minLength
        );
      }
      if (validation.maxLength !== undefined) {
        schema = modifiers.maxLength(
          schema,
          validation.maxLength,
          validation.errorMessages?.maxLength
        );
      }
      // 정규식 패턴
      if (validation.pattern) {
        schema = modifiers.pattern(
          schema,
          validation.pattern,
          validation.errorMessages?.pattern
        );
      }
      break;

    case 'array':
      // 다중 선택 개수 검증
      if (validation.minSelect !== undefined) {
        schema = modifiers.minSelect(
          schema,
          validation.minSelect,
          validation.errorMessages?.minSelect
        );
      }
      if (validation.maxSelect !== undefined) {
        schema = modifiers.maxSelect(
          schema,
          validation.maxSelect,
          validation.errorMessages?.maxSelect
        );
      }
      break;

    case 'number':
      // 숫자 범위 검증 (평점)
      if (validation.min !== undefined) {
        schema = modifiers.min(
          schema,
          validation.min,
          validation.errorMessages?.min
        );
      }
      if (validation.max !== undefined) {
        schema = modifiers.max(
          schema,
          validation.max,
          validation.errorMessages?.max
        );
      }
      break;
  }

  return schema;
}

/**
 * children 배열에서 Zod 유효성 검사 스키마 생성
 *
 * @example
 * const zodSchema = createSurveyValidationSchema(children);
 * const result = zodSchema.safeParse(answers);
 */
export function createSurveyValidationSchema(children: SurveyElement[]) {
  const fields = collectFormFields(children);
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    shape[field.name] = buildFieldSchema(field);
  }

  return z.object(shape);
}

/**
 * children 배열에서 기본값 생성
 *
 * @example
 * const defaultValues = createDefaultValuesFromChildren(children);
 * // { q1: null, q2: [], q3: null, ... }
 */
export function createDefaultValuesFromChildren(
  children: SurveyElement[]
): Record<string, AnswerValue> {
  const fields = collectFormFields(children);

  return fields.reduce<Record<string, AnswerValue>>((acc, field) => {
    switch (field.type) {
      case 'array':
        acc[field.name] = [];
        break;
      case 'number':
        acc[field.name] = null;
        break;
      case 'string':
      default:
        acc[field.name] = null;
        break;
    }
    return acc;
  }, {});
}

/**
 * 생성된 스키마의 타입 추론
 */
export type SurveyFormValues = z.infer<
  ReturnType<typeof createSurveyValidationSchema>
>;
