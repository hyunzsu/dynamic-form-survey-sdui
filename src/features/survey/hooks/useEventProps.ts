import { useMemo } from 'react';
import type { SyntheticEvent } from 'react';
import type { ElementEvent } from '../types';
import { useActionsHandler } from './useActionsHandler';

/**
 * JSON에 정의된 event 설정을 받아
 * { onClick: ()=>…, onChange: ()=>… } 형태의 props 객체 반환
 */
export function useEventProps(event?: ElementEvent) {
  const handlers = useActionsHandler();

  return useMemo(() => {
    if (!event?.type || !event?.handler) return {};

    return {
      [event.type]: (e: SyntheticEvent<HTMLElement>) => {
        handlers(event.handler!, ...(event.args || []), e);
      },
    };
  }, [event, handlers]);
}
