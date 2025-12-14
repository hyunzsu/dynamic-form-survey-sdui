import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils';
import { withElementGuard } from '../hoc';

interface CompleteAction {
  /** 라벨 */
  label: string;
  /** URL (링크) */
  href?: string;
  /** 클릭 핸들러 (버튼) */
  onClick?: () => void;
  /** 스타일 변형 */
  variant?: 'primary' | 'secondary';
}

interface CompletePageData {
  title: string;
  message?: string;
  actions?: CompleteAction[];
  className?: string;
}

export interface CompletePageProps {
  /** 엘리먼트 데이터 */
  data?: CompletePageData;
  /** 완료 제목 */
  title?: string;
  /** 완료 메시지 */
  message?: string;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 액션 버튼들 */
  actions?: CompleteAction[];
  /** 추가 클래스 */
  className?: string;
}

const actionVariants = cva(
  'px-6 py-3 rounded-lg font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

/**
 * 설문 완료 페이지 컴포넌트
 */
function CompletePageBase({
  data,
  title: titleProp,
  message: messageProp,
  icon,
  actions: actionsProp,
  className,
}: CompletePageProps) {
  const title = data?.title ?? titleProp ?? '완료';
  const message = data?.message ?? messageProp;
  const actions = data?.actions ?? actionsProp;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-[400px] p-8',
        data?.className,
        className
      )}
    >
      {/* 아이콘 */}
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-scale-in">
        {icon || <CheckIcon />}
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold text-gray-900 mt-6">{title}</h1>

      {/* 메시지 */}
      {message && (
        <p className="text-gray-500 mt-2 text-center">{message}</p>
      )}

      {/* 액션 버튼들 */}
      {actions && actions.length > 0 && (
        <div className="flex gap-3 mt-8">
          {actions.map((action, index) => {
            const variant = action.variant || (index === 0 ? 'primary' : 'secondary');

            if (action.href) {
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className={actionVariants({ variant })}
                >
                  {action.label}
                </a>
              );
            }

            return (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className={actionVariants({ variant })}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      data-testid="check-icon"
      className="w-8 h-8 text-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export const CompletePage = withElementGuard(CompletePageBase);
CompletePage.displayName = 'CompletePage';
