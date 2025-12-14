import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  /** 최소 표시 시간 (ms) - 깜빡임 방지 */
  minTimeout?: number;
}

/**
 * 로딩 스피너 컴포넌트
 * - 200ms 이상 로딩 시에만 표시 (깜빡임 방지)
 */
export function LoadingSpinner({ minTimeout = 200 }: LoadingSpinnerProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(true), minTimeout);
    return () => clearTimeout(timeoutId);
  }, [minTimeout]);

  if (!loading) {
    return null;
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-9997'>
      <svg className='animate-spin' width={48} height={48} viewBox='0 0 48 48'>
        <defs>
          <linearGradient
            id='spinner-gradient'
            x1='0%'
            y1='0%'
            x2='0%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#878787' />
            <stop offset='100%' stopColor='#b9b9b9' />
          </linearGradient>
        </defs>
        <circle
          cx={24}
          cy={24}
          r={20}
          fill='none'
          stroke='#b9b9b9'
          strokeWidth={8}
        />
        <circle
          cx={24}
          cy={24}
          r={20}
          fill='none'
          stroke='url(#spinner-gradient)'
          strokeWidth={8}
          strokeDasharray='100, 76'
          strokeLinecap='round'
          className='origin-center'
        />
      </svg>
    </div>
  );
}
