import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { useFormField } from '../../hooks';
import type { TextInputElement } from '../../types';
import { withElementGuard } from '../hoc';
import { QuestionHeader } from './QuestionHeader';
import { FormError } from './FormError';

export interface TextInputProps {
  data?: TextInputElement;
  isDisabled?: boolean;
  className?: string;
}

const inputVariants = cva(
  'w-full px-4 py-3 rounded-lg border border-gray-200 transition-all outline-none text-gray-900 placeholder:text-gray-400',
  {
    variants: {
      disabled: {
        true: 'bg-gray-50 cursor-not-allowed',
        false:
          'bg-white focus:border-primary focus:ring-2 focus:ring-primary/20',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

function TextInputBase({
  data,
  isDisabled = false,
  className,
}: TextInputProps) {
  const {
    name,
    title,
    description,
    required,
    placeholder,
    multiline = false,
    rows = 4,
  } = data!;

  const { register, error } = useFormField(name);

  /** 공통 입력 필드 props */
  const inputProps = {
    placeholder,
    disabled: isDisabled,
    className: inputVariants({ disabled: isDisabled }),
    ...register,
  };

  return (
    <div className={cn('flex flex-col gap-1 pb-6', className)}>
      {/* 질문 헤더 */}
      <QuestionHeader
        title={title}
        description={description}
        required={required}
      />

      {/* 입력 필드 */}
      {multiline ? (
        <textarea {...inputProps} rows={rows} style={{ resize: 'none' }} />
      ) : (
        <input type='text' {...inputProps} />
      )}

      {/* 에러 메시지 */}
      <FormError error={error} />
    </div>
  );
}

export const TextInput = withElementGuard(TextInputBase);
TextInput.displayName = 'TextInput';
