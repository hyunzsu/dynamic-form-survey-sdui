import type { ElementType } from 'react';
import type { ElementStyle } from './style';
import type { ElementEvent } from './event';
import type { SurveyValidation } from './validation';

/**
 * 엘리먼트 역할 정의
 * - 설문 전용 SDUI role
 */
export type ElementRole =
  // Layout
  | 'container'
  | 'text'
  | 'progressBar'
  | 'stepIndicator'
  // Form
  | 'surveyForm'
  | 'form'
  | 'singleChoice'
  | 'multipleChoice'
  | 'textInput'
  | 'rating'
  | 'option'
  // Actions
  | 'button'
  | 'prevButton'
  | 'nextButton'
  | 'submitButton'
  | 'completePage';

/**
 * 기본 엘리먼트 속성 공통 타입
 */
export interface ElementBase {
  /** 고유 식별자 */
  id?: string;
  /** HTML 태그 타입 */
  type?: ElementType;
  /** 컴포넌트 역할 (렌더러 매핑에 사용) */
  role: ElementRole;
  /** 필드 이름 (폼 요소용) */
  name?: string;
  /** 값 (옵션 요소용) */
  value?: string;
  /** 제목 (질문 요소용) */
  title?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 텍스트 콘텐츠 */
  content?: string;
  /** 설명 */
  description?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 플레이스홀더 (텍스트 입력용) */
  placeholder?: string;
  /** 멀티라인 여부 (텍스트 입력용) */
  multiline?: boolean;
  /** 행 수 (멀티라인용) */
  rows?: number;
  /** 최대 평점 (레이팅용) */
  maxRating?: number;
  /** 왼쪽 라벨 (레이팅용) */
  leftLabel?: string;
  /** 오른쪽 라벨 (레이팅용) */
  rightLabel?: string;
  /** 퍼센트 표시 여부 (프로그레스바용) */
  showPercentage?: boolean;
  /** 카운트 표시 여부 (프로그레스바용) */
  showCount?: boolean;
  /** 로딩 라벨 (버튼용) */
  loadingLabel?: string;
  /** 완료 메시지 (완료 페이지용) */
  message?: string;
  /** 이벤트 핸들러 */
  event?: ElementEvent;
  /** 유효성 검사 규칙 */
  validation?: SurveyValidation;
  /** 인라인 스타일 (상태별) */
  style?: ElementStyle;
  /** 추가 클래스명 */
  className?: string;
  /** 자식 요소 간 간격 */
  gap?: 'sm' | 'md' | 'lg';
  /** 자식 엘리먼트 */
  children?: ElementBase[];
}
