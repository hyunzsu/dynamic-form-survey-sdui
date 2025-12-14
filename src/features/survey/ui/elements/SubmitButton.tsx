import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import type { SubmitButtonElement } from '../../types';
import { useFormActions } from '../../hooks';
import { withElementGuard } from '../hoc';

export interface SubmitButtonProps {
  /** 엘리먼트 데이터 */
  data?: SubmitButtonElement;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 비활성화 여부 */
  isDisabled?: boolean;
  /** 추가 클래스 */
  className?: string;
}

const buttonVariants = cva(
  'w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark active:scale-[0.98]',
        disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

/**
 * 제출 버튼 컴포넌트
 * - useFormActions로 폼 제출 처리
 */
function SubmitButtonBase({
  data,
  isLoading = false,
  isDisabled = false,
  className,
}: SubmitButtonProps) {
  const { submit } = useFormActions();

  const label = data?.label ?? '제출하기';
  const loadingLabel = data?.loadingLabel ?? '제출 중...';

  const disabled = isDisabled || isLoading;
  const displayLabel = isLoading ? loadingLabel : label;

  const handleClick = () => {
    submit();
  };

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant: disabled ? 'disabled' : 'primary' }),
        data?.className,
        className
      )}
    >
      {isLoading && <Spinner />}
      {displayLabel}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className='w-5 h-5 animate-spin'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}

export const SubmitButton = withElementGuard(SubmitButtonBase);
SubmitButton.displayName = 'SubmitButton';
