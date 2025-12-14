import { cn } from '@/shared/utils';

export interface QuestionHeaderProps {
  title?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

/**
 * 질문 헤더 컴포넌트
 * - 질문 제목, 설명, 필수 표시를 렌더링
 */
export function QuestionHeader({
  title,
  description,
  required,
  className,
}: QuestionHeaderProps) {
  if (!title) return null;

  return (
    <div className={cn('mb-2', className)}>
      <h3 className='text-base font-medium text-gray-900'>
        {title}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </h3>
      {description && (
        <p className='text-sm text-gray-500 mt-1'>{description}</p>
      )}
    </div>
  );
}
