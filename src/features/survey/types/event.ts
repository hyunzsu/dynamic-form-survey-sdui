import type { DOMAttributes } from 'react';
import type { ActionType } from './action';

/**
 * 엘리먼트 이벤트 정의
 */
export interface ElementEvent {
  /** 이벤트 종류 (ex. "onClick", "onChange") */
  type: keyof DOMAttributes<HTMLElement>;
  /** 이벤트 핸들러 함수 이름 (ex. "openModal") */
  handler: ActionType;
  /** 이벤트 핸들러에 전달할 인수 (ex. ["modalName"]) */
  args?: unknown[];
}
