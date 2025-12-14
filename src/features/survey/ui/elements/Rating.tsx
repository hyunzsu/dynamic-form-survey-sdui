import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { useFormField } from '../../hooks';
import type { RatingElement } from '../../types';
import { withElementGuard } from '../hoc';
import { QuestionHeader } from './QuestionHeader';
import { FormError } from './FormError';

export interface RatingProps {
  data?: RatingElement;
  isDisabled?: boolean;
  className?: string;
}

const ratingButtonVariants = cva(
  'flex-1 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all text-sm font-medium',
  {
    variants: {
      selected: {
        true: 'bg-primary text-white',
        false: 'bg-gray-100 text-gray-400 hover:bg-gray-200',
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

function RatingBase({ data, isDisabled = false, className }: RatingProps) {
  const { name, title, description, required, maxRating = 5 } = data!;
  const { value, setValue, error } = useFormField(name);

  /** 평점 배열 생성 (1 ~ maxRating) */
  const ratings = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <div className={cn('flex flex-col gap-3 pb-6', className)}>
      {/* 질문 헤더 */}
      <QuestionHeader
        title={title}
        description={description}
        required={required}
      />

      {/* 평점 버튼 */}
      <div className='flex gap-2'>
        {ratings.map((rating) => {
          const isSelected = value === rating;

          return (
            <button
              key={rating}
              type='button'
              disabled={isDisabled}
              aria-label={`${rating}점`}
              aria-pressed={isSelected}
              className={ratingButtonVariants({
                selected: isSelected,
                disabled: isDisabled,
              })}
              onClick={() => !isDisabled && setValue(rating)}
            >
              {rating}
            </button>
          );
        })}
      </div>

      {/* 에러 메시지 */}
      <FormError error={error} />
    </div>
  );
}

export const Rating = withElementGuard(RatingBase);
Rating.displayName = 'Rating';
