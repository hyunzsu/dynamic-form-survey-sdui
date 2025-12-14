import type { ElementType } from 'react';
import { cn } from '@/shared/utils';
import type { ElementBase } from '../../types';
import { withElementGuard } from '../hoc/withElementGuard';

export interface TextElement extends ElementBase {
  role: 'text';
  /** HTML 태그 타입 (p, span, h1~h6 등) */
  type?: ElementType;
  /** 텍스트 콘텐츠 */
  content?: string;
}

export interface TextProps {
  data: TextElement;
  className?: string;
}

/**
 * 범용 텍스트 컴포넌트
 * - type으로 렌더링할 HTML 태그 지정
 */
function TextBase({ data, className }: TextProps) {
  const { type: Component = 'p', content } = data;

  if (!content) return null;

  return (
    <Component className={cn(data.className, className)}>{content}</Component>
  );
}

export const Text = withElementGuard(TextBase);
Text.displayName = 'Text';
