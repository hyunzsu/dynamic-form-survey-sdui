import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { cn } from '@/shared/utils';
import type { ProgressBarElement } from '../../types';
import { currentFieldsAtom } from '../../stores';
import { withElementGuard } from '../hoc';

export interface ProgressBarProps {
  /** 엘리먼트 데이터 */
  data?: ProgressBarElement;
  /** 현재 진행률 (0-100) - data가 없을 때 사용 */
  progress?: number;
  /** 퍼센트 텍스트 표시 여부 */
  showPercentage?: boolean;
  /** 현재/전체 카운트 표시 여부 */
  showCount?: boolean;
  /** 현재 완료 수 */
  current?: number;
  /** 전체 수 */
  total?: number;
  /** 추가 클래스 */
  className?: string;
}

/**
 * 진행률 표시 컴포넌트
 * - form context에서 진행률 자동 계산
 */
function ProgressBarBase({
  data,
  progress: progressProp,
  showPercentage = false,
  showCount = false,
  current: currentProp,
  total: totalProp,
  className,
}: ProgressBarProps) {
  const { watch } = useFormContext();
  const currentFields = useAtomValue(currentFieldsAtom);

  // data에서 설정 추출 (data가 없으면 props 사용)
  const displayPercentage = data?.showPercentage ?? showPercentage;
  const displayCount = data?.showCount ?? showCount;

  // 진행률 계산
  let progress = progressProp ?? 0;
  let current = currentProp ?? 0;
  let total = totalProp ?? 0;

  // SDUI 모드: form context에서 진행률 계산
  if (data && currentFields.length > 0) {
    const formValues = watch();
    const answered = currentFields.filter((field) => {
      const value = formValues[field];
      if (value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      return true;
    });

    current = answered.length;
    total = currentFields.length;
    progress = total > 0 ? Math.round((current / total) * 100) : 0;
  }

  // progress를 0-100 범위로 제한
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // sticky 설정
  const isSticky = data?.sticky === 'top';
  const stickyClass = isSticky
    ? 'sticky top-0 z-10 bg-white -mx-6 px-6 pt-6 -mt-6 pb-4'
    : '';

  return (
    <div className={cn('mb-6', stickyClass, data?.className, className)}>
      {/* 정보 표시 영역 */}
      {(displayPercentage || displayCount) && (
        <div className='flex justify-between items-center mb-2 text-sm text-gray-500'>
          {displayCount && total > 0 && (
            <span>
              {current} / {total}
            </span>
          )}
          {displayPercentage && (
            <span className={displayCount ? '' : 'ml-auto'}>
              {clampedProgress}%
            </span>
          )}
        </div>
      )}

      {/* 진행률 바 */}
      <div
        role='progressbar'
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        className='h-2 bg-gray-200 rounded-full overflow-hidden'
      >
        <div
          className='h-full bg-primary rounded-full transition-all duration-300'
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}

export const ProgressBar = withElementGuard(ProgressBarBase);
ProgressBar.displayName = 'ProgressBar';
