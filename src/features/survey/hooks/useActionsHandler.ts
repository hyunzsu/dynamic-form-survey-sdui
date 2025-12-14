import { useMemo } from 'react';
import type { ActionType } from '../types';
import { useFormActions } from './useFormActions';
import { useStepActions } from './useStepActions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionsHandler = Record<string, (...args: any[]) => any>;

/**
 * 통합 액션 핸들러 훅
 * - 모든 액션 훅을 spread로 통합
 */
export const useActionsHandler = () => {
  const formActions = useFormActions();
  const stepActions = useStepActions();

  return useMemo(() => {
    const handlers: ActionsHandler = {
      ...formActions,
      ...stepActions,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (action: ActionType, ...args: any[]) => {
      if (handlers[action]) {
        return handlers[action](...args);
      }
      console.warn(`Action not found: ${action}`);
    };
  }, [formActions, stepActions]);
};
