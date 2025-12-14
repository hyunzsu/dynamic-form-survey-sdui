import { useAtomValue } from 'jotai';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { formStepAtom } from '../../stores';
import { withElementGuard } from '../hoc';

interface StepIndicatorData {
  totalSteps: number;
  labels?: string[];
  className?: string;
}

export interface StepIndicatorProps {
  data?: StepIndicatorData;
  className?: string;
}

type StepStatus = 'completed' | 'current' | 'pending';

const stepCircleVariants = cva(
  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
  {
    variants: {
      status: {
        completed: 'bg-primary text-white',
        current: 'bg-primary text-white ring-2 ring-primary ring-offset-2',
        pending: 'bg-gray-200 text-gray-500',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);

const stepLabelVariants = cva('mt-2 text-xs text-center whitespace-nowrap', {
  variants: {
    status: {
      completed: 'text-gray-500',
      current: 'text-primary font-medium',
      pending: 'text-gray-500',
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

const connectorVariants = cva('w-12 h-0.5 mx-2 mb-6', {
  variants: {
    completed: {
      true: 'bg-primary',
      false: 'bg-gray-200',
    },
  },
  defaultVariants: {
    completed: false,
  },
});

function getStepStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return 'completed';
  if (index === currentStep) return 'current';
  return 'pending';
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={3}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
    </svg>
  );
}

/**
 * 스텝 인디케이터 컴포넌트
 * - Jotai atom에서 현재 스텝을 가져옴
 */
function StepIndicatorBase({ data, className }: StepIndicatorProps) {
  const currentStep = useAtomValue(formStepAtom);
  const { totalSteps, labels } = data!;

  return (
    <div className={cn('mb-8', data?.className, className)}>
      <div className='flex items-center justify-center gap-0'>
        {Array.from({ length: totalSteps }, (_, index) => {
          const status = getStepStatus(index, currentStep);
          const label = labels?.[index];
          const isLast = index === totalSteps - 1;

          return (
            <div key={index} className='flex items-center'>
              {/* 스텝 아이템 */}
              <div className='flex flex-col items-center'>
                <div className={stepCircleVariants({ status })}>
                  {status === 'completed' ? (
                    <CheckIcon className='w-5 h-5' />
                  ) : (
                    index + 1
                  )}
                </div>
                {label && (
                  <span className={stepLabelVariants({ status })}>{label}</span>
                )}
              </div>

              {/* 연결선 */}
              {!isLast && (
                <div
                  className={connectorVariants({
                    completed: index < currentStep,
                  })}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const StepIndicator = withElementGuard(StepIndicatorBase);
StepIndicator.displayName = 'StepIndicator';
