'use client';

import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import DiariesNew from '../diaries-new';

/**
 * 일기 관련 모달 연동을 관리하는 Hook
 * 
 * @returns {Object} 모달 제어 함수들
 * @returns {Function} handleWriteDiary - 일기쓰기 모달을 여는 함수
 * 
 * @example
 * const { handleWriteDiary } = useLinkModal();
 * 
 * <Button onClick={handleWriteDiary}>
 *   일기쓰기
 * </Button>
 */
export function useLinkModal() {
  const { openModal } = useModal();

  /**
   * 일기쓰기 모달을 여는 함수
   * DiariesNew 컴포넌트를 모달로 표시
   */
  const handleWriteDiary = useCallback(() => {
    openModal(<DiariesNew />);
  }, [openModal]);

  return {
    handleWriteDiary,
  };
}

