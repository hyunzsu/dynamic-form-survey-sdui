import { useMemo, type CSSProperties } from 'react';
import type { SurveyDocument, SurveyElement } from '../../types';
import { ElementListRenderer } from './ElementListRenderer';
import { ElementRenderer } from './ElementRenderer';
import { cn } from '@/shared/utils/cn';

interface PageRendererProps {
  /** 설문 문서 데이터 */
  document?: SurveyDocument;
  /** 페이지 데이터 (단일 엘리먼트) */
  pageData?: SurveyElement;
  /** 추가 클래스 */
  className?: string;
}

export function PageRenderer({
  document,
  pageData,
  className,
}: PageRendererProps) {
  // items가 없는 경우
  const itemEntries = useMemo(() => {
    if (!document?.body?.items) return [];

    // e.g. [ [ 'header', Element[] ], [ 'stepIndicator', Element[] ], [ 'survey', Element[] ] ... ]
    return Object.entries(document.body.items);
  }, [document]);

  // body.style.default.base 스타일 추출
  const bodyStyle = useMemo((): CSSProperties => {
    return document?.body?.style?.default?.base || {};
  }, [document]);

  if (!pageData && !itemEntries.length) return null;

  return (
    <div className={cn(className)} style={bodyStyle}>
      {itemEntries.map(([key, elements]) => (
        <ElementListRenderer key={key} elements={elements as SurveyElement[]} />
      ))}
      {pageData && <ElementRenderer element={pageData} />}
    </div>
  );
}
