import type { ElementBase, ElementRole } from './base';
import type { ElementStyle } from './style';

// ============================================
// Survey Form Element (최상위 레벨)
// ============================================

/**
 * 설문 폼 스키마
 */
export interface SurveyFormElement {
  /** 요소 ID */
  id: string;
  /** 요소 역할 */
  role: Extract<ElementRole, 'surveyForm'>;
  /** 전체 스텝 수 (2 이상이면 멀티스텝) */
  totalSteps?: number;
  /** 자식 요소들 (ElementBase 배열, 순환 참조 방지) */
  children: ElementBase[];
  /** 인라인 스타일 */
  style?: ElementStyle;
  /** 추가 클래스명 */
  className?: string;
}

// ============================================
// Union Type: 모든 엘리먼트
// ============================================

export type SurveyElement =
  | ElementBase
  | ContainerElement
  | ProgressBarElement
  | StepIndicatorElement
  | FormElement
  | SingleChoiceElement
  | MultipleChoiceElement
  | TextInputElement
  | RatingElement
  | OptionElement
  | ButtonElement
  | PrevButtonElement
  | NextButtonElement
  | SubmitButtonElement
  | CompletePageElement
  | SurveyFormElement;

// ============================================
// Layout Elements
// ============================================

/** 컨테이너 요소 */
export interface ContainerElement extends ElementBase {
  role: 'container';
}

/** 진행률 표시 요소 */
export interface ProgressBarElement extends ElementBase {
  role: 'progressBar';
  /** 현재 진행률 표시 여부 */
  showPercentage?: boolean;
  /** 현재/전체 표시 여부 */
  showCount?: boolean;
  /** sticky 위치 */
  sticky?: 'top';
}

/** 스텝 인디케이터 요소 */
export interface StepIndicatorElement extends ElementBase {
  role: 'stepIndicator';
  /** 전체 스텝 수 */
  totalSteps: number;
  /** 각 스텝 라벨 */
  labels?: string[];
}

// ============================================
// Form Elements
// ============================================

/** 폼 요소 */
export interface FormElement extends ElementBase {
  role: 'form';
  name: string;
}

/** 단일 선택 요소 */
export interface SingleChoiceElement extends ElementBase {
  role: 'singleChoice';
  name: string;
  /** 질문 제목 */
  title: string;
  /** 질문 설명 */
  description?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 선택지 목록 */
  children: OptionElement[];
}

/** 다중 선택 요소 */
export interface MultipleChoiceElement extends ElementBase {
  role: 'multipleChoice';
  name: string;
  /** 질문 제목 */
  title: string;
  /** 질문 설명 */
  description?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 선택지 목록 */
  children: OptionElement[];
}

/** 텍스트 입력 요소 */
export interface TextInputElement extends ElementBase {
  role: 'textInput';
  name: string;
  /** 질문 제목 */
  title?: string;
  /** 질문 설명 */
  description?: string;
  /** 필수 여부 */
  required?: boolean;
  /** placeholder */
  placeholder?: string;
  /** 여러 줄 입력 여부 */
  multiline?: boolean;
  /** 줄 수 (multiline일 때) */
  rows?: number;
}

/** 평점 요소 */
export interface RatingElement extends ElementBase {
  role: 'rating';
  name: string;
  /** 질문 제목 */
  title: string;
  /** 질문 설명 */
  description?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 최대 점수 (기본: 5) */
  maxRating?: number;
  /** 왼쪽 라벨 */
  leftLabel?: string;
  /** 오른쪽 라벨 */
  rightLabel?: string;
}

/** 선택지 요소 */
export interface OptionElement extends ElementBase {
  role: 'option';
  /** 선택지 값 */
  value: string;
  /** 선택지 라벨 */
  label: string;
}

// ============================================
// Action Elements
// ============================================

/** 버튼 요소 */
export interface ButtonElement extends ElementBase {
  role: 'button';
  /** 버튼 타입 */
  buttonType?: 'submit' | 'reset' | 'button';
}

/** 이전 버튼 요소 */
export interface PrevButtonElement extends ElementBase {
  role: 'prevButton';
  /** 버튼 텍스트 */
  label?: string;
}

/** 다음 버튼 요소 */
export interface NextButtonElement extends ElementBase {
  role: 'nextButton';
  /** 버튼 텍스트 */
  label?: string;
}

/** 제출 버튼 요소 */
export interface SubmitButtonElement extends ElementBase {
  role: 'submitButton';
  /** 버튼 텍스트 */
  label?: string;
  /** 로딩 중 텍스트 */
  loadingLabel?: string;
}

/** 완료 페이지 요소 */
export interface CompletePageElement extends ElementBase {
  role: 'completePage';
  /** 완료 제목 */
  title: string;
  /** 완료 메시지 */
  message?: string;
  /** 추가 액션 버튼 */
  actions?: CompletePageAction[];
}

/** 완료 페이지 액션 */
export interface CompletePageAction {
  /** 라벨 */
  label: string;
  /** 클릭 핸들러 이름 */
  onClick?: string;
  /** URL */
  href?: string;
  /** 스타일 variant */
  variant?: 'primary' | 'secondary';
}

// ============================================
// Question Element Union Type
// ============================================

/** 질문 요소 (폼 입력) */
export type QuestionElement =
  | SingleChoiceElement
  | MultipleChoiceElement
  | TextInputElement
  | RatingElement;

// ============================================
// Type Guards
// ============================================

export function isSingleChoiceElement(
  element: SurveyElement
): element is SingleChoiceElement {
  return element.role === 'singleChoice';
}

export function isMultipleChoiceElement(
  element: SurveyElement
): element is MultipleChoiceElement {
  return element.role === 'multipleChoice';
}

export function isTextInputElement(
  element: SurveyElement
): element is TextInputElement {
  return element.role === 'textInput';
}

export function isRatingElement(
  element: SurveyElement
): element is RatingElement {
  return element.role === 'rating';
}

export function isQuestionElement(
  element: SurveyElement
): element is
  | SingleChoiceElement
  | MultipleChoiceElement
  | TextInputElement
  | RatingElement {
  return (
    element.role === 'singleChoice' ||
    element.role === 'multipleChoice' ||
    element.role === 'textInput' ||
    element.role === 'rating'
  );
}

export function isOptionElement(
  element: SurveyElement
): element is OptionElement {
  return element.role === 'option';
}
