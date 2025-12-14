import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { useFormField } from '../../hooks';
import type { SingleChoiceElement } from '../../types';
import { withElementGuard } from '../hoc';
import { QuestionHeader } from './QuestionHeader';
import { FormError } from './FormError';

export interface SingleChoiceProps {
  data?: SingleChoiceElement;
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

function SingleChoiceBase({
  data,
  isDisabled = false,
  className,
}: SingleChoiceProps) {
  const { name, title, description, required, children: options = [] } = data!;
  const { register, value, error } = useFormField(name);

  return (
    <div className={cn('flex flex-col gap-1 pb-6', className)}>
      {/* 질문 헤더 */}
      <QuestionHeader
        title={title}
        description={description}
        required={required}
      />

      {/* 선택지 */}
      <div className='flex flex-col gap-2' role='radiogroup'>
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.id ?? option.value}
              className={optionVariants({
                selected: isSelected,
                disabled: isDisabled,
              })}
            >
              <input
                type='radio'
                value={option.value}
                disabled={isDisabled}
                aria-label={option.label}
                className='sr-only'
                {...register}
              />
              {/* 라디오 인디케이터 */}
              <span
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                  isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <span className='w-2 h-2 rounded-full bg-white' />
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

export const SingleChoice = withElementGuard(SingleChoiceBase);
SingleChoice.displayName = 'SingleChoice';
