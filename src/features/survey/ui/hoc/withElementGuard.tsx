import type { ComponentType } from 'react';

/**
 * 고차 컴포넌트(HOC)로,
 * props.data 가 없으면 null을 반환하고,
 * 있으면 WrappedComponent를 렌더한다.
 */
export function withElementGuard<P extends { data?: unknown }>(
  WrappedComponent: ComponentType<P>
) {
  function GuardedComponent(props: P) {
    // data가 없으면 null 반환
    if (!props.data) return null;

    // 정상적으로 존재하면 원래 컴포넌트 렌더
    return <WrappedComponent {...props} />;
  }

  // 디버깅 편의 위해 displayName 세팅
  GuardedComponent.displayName = `withElementGuard(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return GuardedComponent;
}
