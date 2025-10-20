# Storybook 설정

이 프로젝트는 Next.js + Vite + Storybook으로 구성되어 있습니다.

## 설치된 애드온

- **@chromatic-com/storybook**: Chromatic 통합
- **@storybook/addon-docs**: 자동 문서 생성
- **@storybook/addon-a11y**: 접근성 테스트
- **@storybook/addon-vitest**: Vitest 통합

## 주요 설정

### 1. 경로 Alias
- `@/*`가 `src/*`로 매핑되어 있습니다.
- Next.js 프로젝트와 동일한 import 경로를 사용할 수 있습니다.

### 2. 스타일
- Tailwind CSS가 자동으로 적용됩니다.
- `globals.css`가 자동으로 임포트됩니다.
- 프로젝트의 모든 CSS 변수와 유틸리티 클래스를 사용할 수 있습니다.

### 3. 폰트
- Geist Sans와 Geist Mono 폰트가 적용되어 있습니다.
- Next.js 프로젝트와 동일한 타이포그래피를 사용할 수 있습니다.

### 4. 정적 파일
- `public/` 폴더의 모든 파일이 자동으로 제공됩니다.
- 이미지와 아이콘을 바로 사용할 수 있습니다.

## 실행 방법

```bash
# 개발 서버 실행 (포트 6006)
npm run storybook

# 빌드
npm run build-storybook
```

## 스토리 작성 위치

스토리는 다음 경로에 작성할 수 있습니다:
- `src/**/*.stories.ts`
- `src/**/*.stories.tsx`
- `src/**/*.mdx`

## 접근성 테스트

- 스토리북에서 자동으로 a11y 검사를 수행합니다.
- 현재 설정: `test: 'todo'` (UI에서만 표시)
- CI에서 실패시키려면: `test: 'error'`로 변경

## Next.js 통합

- Next.js App Router 지원 (`appDirectory: true`)
- Next.js의 Image 컴포넌트 사용 가능
- 모든 Next.js 기능 사용 가능

