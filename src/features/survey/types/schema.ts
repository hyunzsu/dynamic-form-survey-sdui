import type { ElementStyle } from './style';
import type { SurveyElement, SurveyFormElement } from './element';

// Re-export from element.ts
export type { SurveyFormElement } from './element';

/**
 * 설문 JSON 문서 구조
 */
export interface SurveyDocument {
  /** 문서 바디 */
  body: {
    /** 전체 스타일 */
    style?: ElementStyle;
    /** 요소 그룹 */
    items?: SurveyItems;
  };
}

/**
 * 요소 아이템 그룹
 * - e.g. { header: Element[], stepIndicator: Element[], survey: Element[] }
 */
export type SurveyItems = Record<string, SurveyElement[]>;

/**
 * 설문 제출 데이터
 */
export interface SurveySubmitPayload {
  /** 설문 ID */
  surveyId: string;
  /** 답변 데이터 */
  answers: Record<string, unknown>;
  /** 제출 시간 */
  submittedAt: string;
  /** 소요 시간 (초) */
  durationSeconds?: number;
}

/**
 * 설문 제출 응답
 */
export interface SurveySubmitResponse {
  /** 성공 여부 */
  success: boolean;
  /** 메시지 */
  message?: string;
  /** 제출 ID */
  submissionId?: string;
}

// 레거시 호환용 (deprecated)
export type SurveySchema = SurveyFormElement;
