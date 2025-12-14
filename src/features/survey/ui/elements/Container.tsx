import type { PropsWithChildren } from 'react';
import type { SurveyElement } from '../../types';
import { cn } from '@/shared/utils/cn';
import { withElementGuard } from '../hoc';

interface ContainerProps extends PropsWithChildren {
  data?: SurveyElement;
  className?: string;
}

function ContainerBase({ data, className, children }: ContainerProps) {
  return <div className={cn(data?.className, className)}>{children}</div>;
}

export const Container = withElementGuard(ContainerBase);
Container.displayName = 'Container';
