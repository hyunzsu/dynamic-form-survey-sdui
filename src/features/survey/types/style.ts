import type { CSSProperties } from 'react';

/**
 * 가상 선택자 스타일
 * @example
 * { ":hover": { "backgroundColor": "red" } }
 */
type ElementPseudoStyle = Record<string, CSSProperties>;

type ElementStyleItem = {
  base?: CSSProperties;
  pseudo?: ElementPseudoStyle;
};

/** 상태별 스타일 */
export type ElementStyleStatus = 'default' | 'active' | 'disabled' | 'error';

/** 상태별 CSS 스타일 매핑 */
export type ElementStyle = Partial<
  Record<ElementStyleStatus, ElementStyleItem>
>;

/**
 * Tailwind 클래스 기반 스타일
 */
export interface TailwindStyle {
  /** 기본 클래스 */
  className?: string;
  /** 상태별 클래스 */
  states?: {
    default?: string;
    active?: string;
    disabled?: string;
    error?: string;
  };
}
