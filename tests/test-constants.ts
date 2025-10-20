/**
 * Playwright 테스트에서 사용하는 상수 정의
 */

/**
 * 테스트 타임아웃 상수
 * - SHORT: 일반 DOM 요소 대기 (500ms)
 * - MEDIUM: 네트워크 요청 대기 (2000ms)
 * - LONG: 긴 네트워크 요청 대기 (5000ms)
 */
export const TEST_TIMEOUTS = {
  SHORT: 500,
  MEDIUM: 2000,
  LONG: 5000,
} as const;

