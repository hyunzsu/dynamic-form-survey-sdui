import { memo } from 'react';
import type { SurveyElement } from '../../types';
import { ElementRenderer } from './ElementRenderer';

export interface ElementListRendererProps {
  /** 렌더링할 엘리먼트 배열 */
  elements: SurveyElement[];
  /** 활성화 여부 */
  isActive?: boolean;
  /** 비활성화 여부 */
  isDisabled?: boolean;
}

/**
 * 엘리먼트 리스트 렌더러
 * - 엘리먼트 배열을 순회하며 ElementRenderer로 렌더링
 */
export const ElementListRenderer = memo(function ElementListRenderer({
  elements,
  isActive,
  isDisabled,
}: ElementListRendererProps) {
  if (!elements?.length) return null;

  return (
    <>
      {elements.map((element, idx) => (
        <ElementRenderer
          key={element.id ?? idx}
          element={element}
          isActive={isActive}
          isDisabled={isDisabled}
        />
      ))}
    </>
  );
});

ElementListRenderer.displayName = 'ElementListRenderer';
