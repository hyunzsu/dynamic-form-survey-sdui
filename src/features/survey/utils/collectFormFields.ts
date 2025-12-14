import type {
  SurveyElement,
  SurveyFieldDefinition,
  SurveyValidationType,
} from '../types';
import { isQuestionElement } from '../types';

/**
 * 질문 역할(role)에 따른 유효성 검사 타입 매핑
 */
function resolveValidationType(role: string): SurveyValidationType {
  switch (role) {
    case 'singleChoice':
      return 'string';
    case 'multipleChoice':
      return 'array';
    case 'textInput':
      return 'string';
    case 'rating':
      return 'number';
    default:
      return 'string';
  }
}

/**
 * children 배열에서 모든 폼 필드 수집
 * - 재귀적으로 container 내 children도 탐색
 */
export function collectFormFields(
  elements: SurveyElement[]
): SurveyFieldDefinition[] {
  const fields: SurveyFieldDefinition[] = [];

  for (const element of elements) {
    // 질문 요소인 경우 필드 정의 추가
    if (isQuestionElement(element) && element.name) {
      fields.push({
        name: element.name,
        type: resolveValidationType(element.role),
        validation: element.validation ?? {
          type: resolveValidationType(element.role),
          required: element.required,
        },
      });
      continue;
    }

    // children이 있는 경우 재귀 탐색 (container 등)
    if (element.children && element.children.length > 0) {
      fields.push(...collectFormFields(element.children as SurveyElement[]));
    }
  }

  return fields;
}
