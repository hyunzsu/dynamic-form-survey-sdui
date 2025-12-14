import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import type { ButtonElement } from '../../types';
import { useEventProps } from '../../hooks';
import { withElementGuard } from '../hoc/withElementGuard';

export interface ButtonProps {
  /** 엘리먼트 데이터 */
  data: ButtonElement;
  /** 외부 onClick (부득이하게 필요한 경우) */
  onClick?: () => void;
  /** 추가 클래스 */
  className?: string;
  /** 자식 요소 */
  children?: React.ReactNode;
}

const buttonVariants = cva(
  'px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark active:scale-[0.98]',
        secondary:
          'border border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.98]',
        disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

/**
 * 버튼 컴포넌트
 * - useEventProps로 JSON event 처리
 */
function ButtonBase({ data, onClick, className, children }: ButtonProps) {
  const eventProps = useEventProps(data.event);

  const label = data.label ?? children;
  const variant = data.className?.includes('secondary')
    ? 'secondary'
    : 'primary';

  return (
    <button
      type={data.buttonType || 'button'}
      className={cn(buttonVariants({ variant }), data.className, className)}
      {...eventProps}
      {...(onClick && { onClick })}
    >
      {label}
    </button>
  );
}

export const Button = withElementGuard(ButtonBase);
Button.displayName = 'Button';
