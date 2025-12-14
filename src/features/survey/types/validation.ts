/**
 * 설문 유효성 검사 타입
 */
export type SurveyValidationType =
  | 'string'
  | 'number'
  | 'array'
  | 'boolean';

/**
 * 설문 필드 유효성 검사 설정
 */
export interface SurveyValidation {
  /** 검증 타입 */
  type: SurveyValidationType;
  /** 필수 여부 */
  required?: boolean;
  /** 최소 길이 (문자열) */
  minLength?: number;
  /** 최대 길이 (문자열) */
  maxLength?: number;
  /** 최소 선택 개수 (배열) */
  minSelect?: number;
  /** 최대 선택 개수 (배열) */
  maxSelect?: number;
  /** 최소값 (숫자/평점) */
  min?: number;
  /** 최대값 (숫자/평점) */
  max?: number;
  /** 정규식 패턴 */
  pattern?: string;

  /** 에러 메시지 */
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    minSelect?: string;
    maxSelect?: string;
    min?: string;
    max?: string;
    pattern?: string;
  };
}

/**
 * 필드 정의 (동적 스키마 생성용)
 */
export interface SurveyFieldDefinition {
  /** 필드 이름 (질문 ID) */
  name: string;
  /** 필드 타입 */
  type: SurveyValidationType;
  /** 유효성 검사 규칙 */
  validation?: SurveyValidation;
}
