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

  if (!validation) {
    // validation 없으면 optional/nullable로 반환
    return schema.optional().nullable();
  }

  // 2) 타입별 추가 검증 (optional/nullable 적용 전에 수행)
  switch (validation.type) {
    case 'string':
      // 문자열 길이 검증
      if (validation.minLength !== undefined) {
        schema = (schema as z.ZodString).min(validation.minLength, {
          message:
            validation.errorMessages?.minLength ||
            `최소 ${validation.minLength}자 이상 입력해주세요`,
        });
      }
      if (validation.maxLength !== undefined) {
        schema = (schema as z.ZodString).max(validation.maxLength, {
          message:
            validation.errorMessages?.maxLength ||
            `최대 ${validation.maxLength}자까지 입력 가능합니다`,
        });
      }
      break;

    case 'array':
      // 다중 선택 개수 검증
      if (validation.minSelect !== undefined) {
        schema = (schema as z.ZodArray<z.ZodString>).min(validation.minSelect, {
          message:
            validation.errorMessages?.minSelect ||
            `최소 ${validation.minSelect}개 이상 선택해주세요`,
        });
      }
      if (validation.maxSelect !== undefined) {
        schema = (schema as z.ZodArray<z.ZodString>).max(validation.maxSelect, {
          message:
            validation.errorMessages?.maxSelect ||
            `최대 ${validation.maxSelect}개까지 선택 가능합니다`,
        });
      }
      break;

    case 'number':
      // 숫자 범위 검증 (평점)
      if (validation.min !== undefined) {
        schema = (schema as z.ZodNumber).min(validation.min, {
          message:
            validation.errorMessages?.min ||
            `${validation.min} 이상이어야 합니다`,
        });
      }
      if (validation.max !== undefined) {
        schema = (schema as z.ZodNumber).max(validation.max, {
          message:
            validation.errorMessages?.max ||
            `${validation.max} 이하여야 합니다`,
        });
      }
      break;
  }

  // 3) optional/nullable 적용
  schema = schema.optional().nullable();

  // 4) 필수 값 검증 (optional/nullable 적용 후)
  if (validation.required) {
    schema = modifiers.required(schema, validation.errorMessages?.required);
  }

  // 5) 정규식 패턴 검증 (refine 기반이므로 마지막에)
  if (validation.type === 'string' && validation.pattern) {
    schema = modifiers.pattern(
      schema,
      validation.pattern,
      validation.errorMessages?.pattern
    );
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
