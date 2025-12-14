import { atom } from 'jotai';
import type { SubmitStatus } from '../types';

/**
 * 현재 폼 스텝 (0부터 시작)
 */
export const formStepAtom = atom(0);
formStepAtom.onMount = (set) => () => set(0);

/**
 * 현재 스텝의 필드 이름 목록
 */
export const currentFieldsAtom = atom<string[]>([]);
currentFieldsAtom.onMount = (set) => () => set([]);

/**
 * 마지막 스텝 여부
 */
export const isLastStepAtom = atom(false);
isLastStepAtom.onMount = (set) => () => set(false);

/**
 * 제출 상태
 */
export const submitStatusAtom = atom<SubmitStatus>('idle');
submitStatusAtom.onMount = (set) => () => set('idle');
