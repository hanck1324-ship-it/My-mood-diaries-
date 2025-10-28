/**
 * 테스트에서 사용하는 공통 상수 모음
 * 
 * @description 테스트 코드의 일관성과 유지보수성을 위해 
 * 하드코딩된 값들을 상수로 관리합니다.
 */

/**
 * 테스트 timeout 설정
 * 
 * @example
 * ```typescript
 * await page.waitForSelector('[data-testid="component"]', { 
 *   timeout: TEST_TIMEOUTS.SHORT 
 * });
 * ```
 */
export const TEST_TIMEOUTS = {
  /** 짧은 대기 시간: 500ms */
  SHORT: 500,
  /** 중간 대기 시간: 2000ms */
  MEDIUM: 2000,
  /** 긴 대기 시간: 5000ms */
  LONG: 5000,
} as const;

/**
 * 테스트용 데이터 크기 상수
 */
export const TEST_DATA_SIZE = {
  /** 페이지네이션 테스트용 */
  PAGINATION: 25,
  /** 한 페이지당 아이템 수 */
  ITEMS_PER_PAGE: 12,
  /** 최소 테스트 데이터 */
  MINIMAL: 3,
} as const;

/**
 * 테스트용 날짜 포맷 상수
 */
export const TEST_DATE_FORMAT = {
  /** 일기 생성일 포맷: YYYY.MM.DD */
  DIARY_DATE: 'YYYY.MM.DD',
  /** ISO 포맷: YYYY-MM-DDTHH:mm:ss.sssZ */
  ISO_DATE: 'YYYY-MM-DDTHH:mm:ss.sssZ',
} as const;

/**
 * 테스트용 URL 경로
 */
export const TEST_ROUTES = {
  HOME: '/',
  DIARIES: '/diaries',
  DIARY_DETAIL: (id: number) => `/diaries/${id}`,
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
} as const;