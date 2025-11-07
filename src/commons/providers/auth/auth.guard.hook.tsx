'use client';

import { useCallback } from 'react';

/**
 * 액션 권한 체크 Guard Hook
 * 
 * @description
 * 로그인이 필요한 액션을 실행하기 전에 권한을 체크합니다.
 * - 테스트 환경: window.__TEST_BYPASS__ === false 일 때 권한 체크 활성화
 * - 프로덕션 환경: 실제 로그인 상태 체크 (현재는 기본값 true)
 * 
 * @returns {Object} Guard 함수들
 * 
 * @example
 * ```tsx
 * const { guardAction } = useAuthGuard();
 * 
 * const handleDelete = guardAction(() => {
 *   // 삭제 로직
 * });
 * ```
 */
export const useAuthGuard = () => {
  /**
   * 로그인 상태 확인
   * 
   * @returns {boolean} 로그인 여부
   */
  const isLoggedIn = useCallback((): boolean => {
    // 테스트 환경에서 __TEST_BYPASS__ 확인
    if (typeof window !== 'undefined') {
      const testBypass = (window as any).__TEST_BYPASS__;
      
      // __TEST_BYPASS__가 false면 비로그인 상태
      if (testBypass === false) {
        return false;
      }
    }
    
    // 기본값: 로그인 상태 (규칙에 따름)
    return true;
  }, []);

  /**
   * 액션 Guard
   * 로그인이 필요한 액션을 실행하기 전에 권한 체크
   * 
   * @param {Function} action - 실행할 액션 함수
   * @param {Function} onUnauthorized - 권한이 없을 때 실행할 함수 (선택)
   * @returns {Function} Guard가 적용된 함수
   */
  const guardAction = useCallback(
    <T extends (...args: any[]) => any>(
      action: T,
      onUnauthorized?: () => void
    ): T => {
      return ((...args: any[]) => {
        if (!isLoggedIn()) {
          // 권한이 없을 때
          if (onUnauthorized) {
            onUnauthorized();
          } else {
            // 기본 동작: 로그인 페이지로 이동
            console.warn('로그인이 필요합니다.');
            // window.location.href = '/auth/login';
          }
          return;
        }
        
        // 권한이 있을 때 액션 실행
        return action(...args);
      }) as T;
    },
    [isLoggedIn]
  );

  return {
    isLoggedIn,
    guardAction,
  };
};

