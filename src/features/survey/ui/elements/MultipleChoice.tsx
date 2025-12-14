import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { useFormField } from '../../hooks';
import type { MultipleChoiceElement } from '../../types';
import { withElementGuard } from '../hoc';
import { QuestionHeader } from './QuestionHeader';
import { FormError } from './FormError';

export interface MultipleChoiceProps {
  data?: MultipleChoiceElement;
  isDisabled?: boolean;
  className?: string;
}

const optionVariants = cva(
  'flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all',
  {
    variants: {
      selected: {
        true: 'border-primary bg-primary/10',
        false: 'border-gray-200 hover:border-gray-300',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      selected: false,
      disabled: false,
    },
  }
);

function MultipleChoiceBase({
  data,
  isDisabled = false,
  className,
}: MultipleChoiceProps) {
  const { name, title, description, required, children: options = [] } = data!;
  const { value = [], setValue, error } = useFormField(name);
  const currentValues = value as string[];

  /** 선택/해제 토글 핸들러 */
  const handleToggle = (optionValue: string) => {
    if (isDisabled) return;

    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];

    setValue(newValues);
  };

  return (
    <div className={cn('flex flex-col gap-1 pb-6', className)}>
      {/* 질문 헤더 */}
      <QuestionHeader
        title={title}
        description={description}
        required={required}
      />

      {/* 선택지 */}
      <div className='flex flex-col gap-2' role='group'>
        {options.map((option) => {
          const isSelected = currentValues.includes(option.value);

          return (
            <label
              key={option.id ?? option.value}
              className={optionVariants({
                selected: isSelected,
                disabled: isDisabled,
              })}
            >
              <input
                type='checkbox'
                checked={isSelected}
                disabled={isDisabled}
                aria-label={option.label}
                className='sr-only'
                onChange={() => handleToggle(option.value)}
              />
              {/* 체크박스 인디케이터 */}
              <span
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0',
                  isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <svg
                    className='w-3 h-3 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </span>
              <span className='text-gray-900'>{option.label}</span>
            </label>
          );
        })}
      </div>

      {/* 에러 메시지 */}
      <FormError error={error} />
    </div>
  );
}

export const MultipleChoice = withElementGuard(MultipleChoiceBase);
MultipleChoice.displayName = 'MultipleChoice';
