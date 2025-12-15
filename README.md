# Server-Driven UI 동적 설문 시스템

JSON으로 UI를 정의하고, React 컴포넌트로 동적 렌더링하는 설문 시스템

**배포 링크**: [dynamic-form-survey-sdui.vercel.app](https://dynamic-form-survey-sdui.vercel.app)


## 프로젝트 소개

B2B HR SaaS에서 **고객사마다 다른 설문 요구사항**을 유연하게 대응하기 위한 Server-Driven UI 기반 설문 시스템입니다.

> 직원 만족도 조사, 인사평가, 온보딩 설문, 퇴사 면담 등
> 고객사마다 다른 설문을 **코드 수정 없이 JSON만으로** 즉시 대응할 수 있습니다.

### 3일간의 구현 기록

- **Day 1** - SDUI 아키텍처 설계, 재귀 렌더링 엔진 구현
- **Day 2** - 동적 Zod 스키마 생성, 폼 컴포넌트 17개 구현
- **Day 3** - 멀티스텝 폼 상태 관리, 테스트 및 문서화

### 핵심 가치

- **배포 사이클 제거** - 설문 추가/수정이 JSON 변경만으로 즉시 반영
- **단일 코드베이스** - 고객사별 분기 없이 모든 설문 대응
- **동적 유효성 검사** - JSON에서 검증 규칙 정의, 런타임에 Zod 스키마 생성

### 기술 하이라이트

- **재귀 렌더링 엔진** - JSON 트리 → React 컴포넌트 트리 자동 변환
- **런타임 Zod 스키마** - JSON validation 속성에서 유효성 검사 동적 생성
- **멀티스텝 폼 관리** - Jotai 기반 단계별 상태 + 스텝별 검증
- **17개** SDUI 컴포넌트 | **9개** 커스텀 훅 | 싱글/멀티스텝 폼 지원


## 데모

랜딩 페이지에서 4가지 설문 예시를 체험할 수 있습니다.


<img width="500" height="695" alt="스크린샷 2025-12-15 09 51 00" src="https://github.com/user-attachments/assets/b874b288-ec5a-4a0b-aea3-3d30c1201454" />




| 설문 | 설명 | 주요 기능 |
|------|------|----------|
| 고객 만족도 조사 | 싱글스텝 기본 설문 | 텍스트 입력, 단일/다중 선택, 평점 |
| 사용자 경험 설문 | 3단계 멀티스텝 | 단계 표시기, 이전/다음 버튼, 진행률 |
| 컨퍼런스 참가 신청 | 패턴 유효성 검사 | 이메일/전화번호 정규식 검증 |
| 맞춤 서비스 설정 | 2단계 온보딩 | 최소/최대 선택 제한, 평점 라벨 |


## 빠른 시작

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 `http://localhost:5173` 접속 후 원하는 설문 선택


## 핵심 개념

### Server-Driven UI란?

서버가 UI 구조를 JSON으로 정의하고, 클라이언트가 이를 파싱하여 렌더링하는 아키텍처입니다.

### 동작 흐름

```
JSON 데이터  →  useLocalJsonData  →  PageRenderer
                                          │
                                          ▼
                                   ElementListRenderer
                                          │
                                          ▼
                                    ElementRenderer
                                    (재귀적 렌더링)
                                          │
                                          ▼
                                   COMPONENT_MAP[role]
                                          │
                                          ▼
                                     React DOM
```

### Before / After

**Before: 고객사별 하드코딩**

```tsx
function SurveyPage({ company }) {
  if (company === 'companyA') {
    return <CompanyASurvey />;
  }
  if (company === 'companyB') {
    return <CompanyBSurvey />;
  }
  // 고객사 추가될 때마다 분기 증가...
}
```

**After: JSON 기반 동적 렌더링**

```tsx
function SurveyPage({ surveyJson }) {
  return <PageRenderer document={surveyJson} />;
}
// 고객사 구분 없이 동일한 코드
// 설문 변경은 JSON만 수정
```


## 아키텍처

### 재귀 렌더링 엔진

JSON의 `role` 값으로 React 컴포넌트를 매핑하고, 중첩된 `children`을 재귀적으로 렌더링합니다.

```tsx
export const ElementRenderer = memo(function ElementRenderer({
  element,
  isActive,
  isDisabled,
}: ElementRendererProps) {
  const children = useMemo(
    () =>
      (element.children ?? []).map((child, idx) => (
        <ElementRenderer
          key={child.id ?? idx}
          element={child}
          isActive={isActive}
          isDisabled={isDisabled}
        />
      )),
    [element.children, isActive, isDisabled]
  );

  const Component = COMPONENT_MAP[element.role] ?? COMPONENT_MAP.container;

  return (
    <Component data={element} isActive={isActive} isDisabled={isDisabled}>
      {children}
    </Component>
  );
});
```

### 동적 Zod 스키마 생성

JSON의 `validation` 속성을 읽어 런타임에 Zod 스키마를 동적으로 생성합니다.

**JSON에서 유효성 검사 정의**

```json
{
  "name": "email",
  "role": "textInput",
  "validation": {
    "type": "string",
    "required": true,
    "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    "errorMessages": {
      "required": "이메일을 입력해주세요",
      "pattern": "유효한 이메일 형식을 입력해주세요"
    }
  }
}
```

**스키마 생성 흐름**

```
JSON children
     │
     ▼
collectFormFields()     → 필드 정의 추출
     │
     ▼
createSurveyValidationSchema()
     │
     ├─ getBaseSchema()  → 타입별 기본 스키마
     │
     └─ modifiers        → 검증 규칙 추가
     │
     ▼
z.object({ ... })       → 최종 Zod 스키마
```

### 멀티스텝 폼 상태 관리

`formStep` 속성으로 단계를 구분하고, Jotai로 전역 상태를 관리합니다.

```json
{
  "role": "surveyForm",
  "totalSteps": 3,
  "children": [
    { "role": "container", "formStep": 0, "children": [...] },
    { "role": "container", "formStep": 1, "children": [...] },
    { "role": "container", "formStep": 2, "children": [...] }
  ]
}
```

```tsx
// Jotai 상태
export const formStepAtom = atom(0);
export const currentFieldsAtom = atom<string[]>([]);
export const isLastStepAtom = atom(false);
```

## JSON 스키마 레퍼런스

### 지원하는 role 목록

| role | 설명 |
|------|------|
| `container` | 레이아웃 컨테이너 |
| `text` | 텍스트 (h1~h6, p, span) |
| `progressBar` | 진행률 표시 |
| `stepIndicator` | 멀티스텝 인디케이터 |
| `surveyForm` | 설문 폼 래퍼 |
| `singleChoice` | 단일 선택 (라디오) |
| `multipleChoice` | 다중 선택 (체크박스) |
| `textInput` | 텍스트 입력 |
| `rating` | 평점 (1~5) |
| `button` | 일반 버튼 |
| `submitButton` | 제출 버튼 |
| `prevButton` | 이전 버튼 |
| `nextButton` | 다음 버튼 |
| `completePage` | 완료 페이지 |

### validation 설정

```json
{
  "validation": {
    "type": "string | number | array | boolean",
    "required": true,
    "minLength": 1,
    "maxLength": 100,
    "min": 1,
    "max": 5,
    "pattern": "정규식",
    "errorMessages": {
      "required": "필수 입력 항목입니다",
      "minLength": "최소 1자 이상 입력해주세요"
    }
  }
}
```

### event 설정

```json
{
  "event": {
    "type": "onClick | onChange",
    "handler": "submit | goPrevStep | goNextStep | setValue",
    "args": ["인자1", "인자2"]
  }
}
```


## 프로젝트 구조

```
src/
├── app/                          # 앱 진입점
│   ├── App.tsx
│   └── Providers.tsx             # Jotai Provider
│
├── features/
│   └── survey/
│       ├── hooks/                # 커스텀 훅 (9개)
│       │   ├── useFormBase.ts
│       │   ├── useSurveyForm.ts
│       │   ├── useMultiStepForm.ts
│       │   ├── useFormField.ts
│       │   ├── useFormActions.ts
│       │   ├── useStepActions.ts
│       │   ├── useActionsHandler.ts
│       │   ├── useEventProps.ts
│       │   └── useLocalJsonData.ts
│       │
│       ├── stores/               # Jotai 상태
│       │   └── form.ts
│       │
│       ├── types/                # TypeScript 타입
│       │
│       ├── ui/
│       │   ├── elements/         # UI 컴포넌트 (17개)
│       │   ├── hoc/
│       │   │   └── withElementGuard.tsx
│       │   └── renderers/
│       │       ├── PageRenderer.tsx
│       │       ├── ElementListRenderer.tsx
│       │       ├── ElementRenderer.tsx
│       │       └── componentMap.ts
│       │
│       └── utils/                # 유틸리티
│
├── shared/                       # 공통 모듈
│
└── main.tsx
```


## 확장 가이드

### 새 컴포넌트 추가하기

```tsx
// 1. 타입 정의 (types/element.ts)
export interface SliderElement extends ElementBase {
  role: 'slider';
  name: string;
  min: number;
  max: number;
}

// 2. Union Type에 추가 (types/base.ts)
type ElementRole = ... | 'slider';

// 3. 컴포넌트 구현 (ui/elements/Slider.tsx)
function SliderBase({ data }: { data: SliderElement }) {
  const { register } = useFormField(data.name);
  return <input type="range" {...register} />;
}
export const Slider = withElementGuard(SliderBase);

// 4. COMPONENT_MAP에 등록 (ui/renderers/componentMap.ts)
export const COMPONENT_MAP = {
  ...
  slider: Slider,
};
```

### 새 검증 규칙 추가하기

```tsx
// utils/schemaModifiers.ts에 추가
export const modifiers = {
  ...
  exactLength: (schema, length, message) =>
    schema.length(length, { message }),
};
```


## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 19, TypeScript |
| Build | Vite 7 |
| 라우팅 | react-router-dom v7 |
| 폼 관리 | react-hook-form, @hookform/resolvers |
| 유효성 검사 | Zod |
| 상태 관리 | Jotai |
| 스타일링 | Tailwind CSS v4, class-variance-authority |

---
