import { cn } from '@/shared/utils';
import { useStepActions } from '../../hooks';
import { withElementGuard } from '../hoc';

interface StepButtonData {
  label?: string;
  className?: string;
}

interface StepButtonProps {
  data?: StepButtonData;
  className?: string;
}

/**
 * 이전 버튼
 * - useStepActions로 스텝 이동 처리
 */
function PrevButtonBase({ data, className }: StepButtonProps) {
  const { goPrevStep } = useStepActions();
  const label = data?.label ?? '이전';

  return (
    <button
      type='button'
      onClick={goPrevStep}
      className={cn(
        'flex-1 px-6 py-3 rounded-lg font-medium transition-all',
        'border border-gray-300 text-gray-700',
        'hover:bg-gray-50 active:scale-[0.98]',
        data?.className,
        className
      )}
    >
      {label}
    </button>
  );
}

/**
 * 다음 버튼
 * - useStepActions로 스텝 이동 처리 (유효성 검사 후)
 */
function NextButtonBase({ data, className }: StepButtonProps) {
  const { goNextStep } = useStepActions();
  const label = data?.label ?? '다음';

  return (
    <button
      type='button'
      onClick={goNextStep}
      className={cn(
        'flex-1 px-6 py-3 rounded-lg font-medium transition-all',
        'bg-primary text-white',
        'hover:bg-primary-dark active:scale-[0.98]',
        data?.className,
        className
      )}
    >
      {label}
    </button>
  );
}

export const PrevButton = withElementGuard(PrevButtonBase);
PrevButton.displayName = 'PrevButton';

export const NextButton = withElementGuard(NextButtonBase);
NextButton.displayName = 'NextButton';
