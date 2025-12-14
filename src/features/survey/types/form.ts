/**
 * 답변 값 타입
 */
export type AnswerValue =
  | string // 단일 선택, 텍스트 입력
  | string[] // 다중 선택
  | number // 평점
  | null; // 미응답

/**
 * 설문 답변 상태
 * - key: 질문 ID
 * - value: 답변 값
 */
export type SurveyAnswers = Record<string, AnswerValue>;

/**
 * 설문 진행 상태
 */
export interface SurveyProgress {
  /** 현재 섹션 인덱스 */
  currentSectionIndex: number;
  /** 현재 질문 인덱스 (섹션 내) */
  currentQuestionIndex: number;
  /** 전체 질문 수 */
  totalQuestions: number;
  /** 완료된 질문 수 */
  completedQuestions: number;
  /** 진행률 (0-100) */
  percentage: number;
}

/**
 * 질문 가시성 상태
 * - key: 질문 ID
 * - value: 표시 여부
 */
export type QuestionVisibility = Record<string, boolean>;

/**
 * 설문 제출 상태
 */
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * 설문 폼 전체 상태
 */
export interface SurveyFormState {
  /** 답변 데이터 */
  answers: SurveyAnswers;
  /** 진행 상태 */
  progress: SurveyProgress;
  /** 가시성 상태 */
  visibility: QuestionVisibility;
  /** 제출 상태 */
  submitStatus: SubmitStatus;
  /** 에러 메시지 */
  errorMessage?: string;
}

/**
 * 폼 필드 에러
 */
export interface FieldError {
  /** 질문 ID */
  questionId: string;
  /** 에러 메시지 */
  message: string;
}

/**
 * 폼 유효성 검사 결과
 */
export interface ValidationResult {
  /** 유효 여부 */
  isValid: boolean;
  /** 에러 목록 */
  errors: FieldError[];
}
