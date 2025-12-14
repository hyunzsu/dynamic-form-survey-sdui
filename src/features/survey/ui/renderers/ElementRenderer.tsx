import { memo, useMemo } from 'react';
import type { SurveyElement } from '../../types';
import { COMPONENT_MAP } from './componentMap';

export interface ElementRendererProps {
  /** 렌더링할 엘리먼트 */
  element: SurveyElement;
  /** 활성화 여부 */
  isActive?: boolean;
  /** 비활성화 여부 */
  isDisabled?: boolean;
}

/**
 * children을 자체적으로 처리하는 role
 * - surveyForm: FormProvider 내부에서 children 렌더링
 * - singleChoice, multipleChoice, rating: options를 내부에서 렌더링
 * - 명시적 필터링으로 불필요한 element 생성 방지
 */
const SELF_RENDERING_ROLES = new Set([
  'surveyForm',
  'singleChoice',
  'multipleChoice',
  'rating',
]);

/**
 * 엘리먼트 렌더러
 * - role에 따라 적절한 컴포넌트를 렌더링
 * - children을 재귀적으로 렌더링 (SELF_RENDERING_ROLES 제외)
 */
export const ElementRenderer = memo(function ElementRenderer({
  element,
  isActive,
  isDisabled,
}: ElementRendererProps) {
  // children 재귀 렌더링 여부
  const shouldRenderChildren = !SELF_RENDERING_ROLES.has(element.role);

  // 자식 엘리먼트 렌더링
  const children = useMemo(
    () =>
      shouldRenderChildren
        ? (element.children ?? []).map((child, idx) => (
            <ElementRenderer
              key={child.id ?? idx}
              element={child}
              isActive={isActive}
              isDisabled={isDisabled}
            />
          ))
        : null,
    [element.children, isActive, isDisabled, shouldRenderChildren]
  );

  // role에 해당하는 컴포넌트
  const Component = COMPONENT_MAP[element.role] ?? COMPONENT_MAP.container;

  return (
    <Component
      data={element}
      className={element.className}
      isActive={isActive}
      isDisabled={isDisabled}
    >
      {children}
    </Component>
  );
});

ElementRenderer.displayName = 'ElementRenderer';
