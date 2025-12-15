import { Link } from 'react-router-dom';

interface SurveyCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  features: string[];
}

const SURVEY_EXAMPLES: SurveyCard[] = [
  {
    id: 'singlestep',
    title: '고객 만족도 조사',
    description: '단일 페이지 설문조사 예시',
    tags: ['Single Step', 'Basic'],
    gradient: 'from-gray-600 to-gray-800',
    features: ['텍스트 입력', '단일 선택', '다중 선택', '평점'],
  },
  {
    id: 'multistep',
    title: '사용자 경험 설문',
    description: '3단계 멀티스텝 설문조사',
    tags: ['Multi Step', '3 Steps'],
    gradient: 'from-slate-600 to-slate-800',
    features: ['단계 표시기', '이전/다음 버튼', '진행률 표시'],
  },
  {
    id: 'registration',
    title: '컨퍼런스 참가 신청',
    description: '정규식 패턴 유효성 검사 예시',
    tags: ['Pattern Validation', 'Registration'],
    gradient: 'from-teal-500 to-teal-700',
    features: ['이메일 패턴 검증', '전화번호 패턴', '글자 수 제한'],
  },
  {
    id: 'onboarding',
    title: '맞춤 서비스 설정',
    description: '2단계 온보딩 설문',
    tags: ['Multi Step', 'Onboarding'],
    gradient: 'from-indigo-500 to-indigo-700',
    features: ['최소/최대 선택 제한', '2단계 진행', '평점 라벨'],
  },
];

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Server-Driven UI
            <span className='block text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500 mt-2'>
              Survey System
            </span>
          </h1>
          <p className='text-slate-400 text-lg max-w-2xl mx-auto'>
            JSON 스키마 기반으로 동적 폼을 생성하는 SDUI 설문조사 시스템입니다.
            <br />
            아래 예시 중 하나를 선택하여 직접 체험해보세요.
          </p>
        </header>
        {/* Survey Cards Grid */}
        <div className='grid md:grid-cols-2 gap-6 mb-16'>
          {SURVEY_EXAMPLES.map((survey) => (
            <Link
              key={survey.id}
              to={`/survey/${survey.id}`}
              className='group block'
            >
              <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 h-full transition-all duration-300 hover:border-slate-500 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1'>
                {/* Card Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${survey.gradient} flex items-center justify-center`}
                  >
                    <svg
                      className='w-6 h-6 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                  <div className='flex gap-2'>
                    {survey.tags.map((tag) => (
                      <span
                        key={tag}
                        className='px-2 py-1 text-xs font-medium text-slate-300 bg-slate-700/50 rounded-full'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content */}
                <h2 className='text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors'>
                  {survey.title}
                </h2>
                <p className='text-slate-400 mb-4'>{survey.description}</p>

                {/* Features */}
                <div className='flex flex-wrap gap-2'>
                  {survey.features.map((feature) => (
                    <span
                      key={feature}
                      className='px-2 py-1 text-xs text-slate-400 border border-slate-700 rounded-md'
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className='mt-4 flex items-center text-slate-500 group-hover:text-blue-400 transition-colors'>
                  <span className='text-sm font-medium'>체험하기</span>
                  <svg
                    className='w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>{' '}
      </div>
    </div>
  );
}
