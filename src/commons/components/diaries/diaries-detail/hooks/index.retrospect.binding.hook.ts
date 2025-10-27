'use client';

import { useEffect, useState } from 'react';

/**
 * 회고 데이터 타입
 */
export type Retrospect = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

/**
 * 회고 바인딩 Hook 반환 타입
 */
export interface UseRetrospectBindingResult {
  retrospects: Retrospect[];
  isLoading: boolean;
  error: string | null;
}

/**
 * 회고 목록 데이터 바인딩 훅
 * - 로컬스토리지에서 retrospects 배열 읽기
 * - diaryId와 일치하는 회고만 필터링
 * - 시간 순서로 정렬
 * 
 * @param {number} diaryId - 일기 ID
 * @returns {object} 회고 목록 및 상태
 */
export function useRetrospectBinding(diaryId: number | null): UseRetrospectBindingResult {
  const [retrospects, setRetrospects] = useState<Retrospect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!diaryId) {
        setRetrospects([]);
        setIsLoading(false);
        return;
      }

      // 로컬스토리지에서 retrospects 가져오기
      const retrospectsData = localStorage.getItem('retrospects');
      
      if (!retrospectsData) {
        setRetrospects([]);
        setError(null);
        setIsLoading(false);
        return;
      }

      const allRetrospects: Retrospect[] = JSON.parse(retrospectsData);

      // diaryId와 일치하는 회고만 필터링
      const filteredRetrospects = allRetrospects.filter(
        (r) => r.diaryId === diaryId
      );

      // createdAt 기준으로 오름차순 정렬 (가장 오래된 것부터)
      const sortedRetrospects = [...filteredRetrospects].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setRetrospects(sortedRetrospects);
      setError(null);
    } catch (err) {
      setError('회고를 불러오는 중 오류가 발생했습니다.');
      console.error('Error loading retrospects:', err);
      setRetrospects([]);
    } finally {
      setIsLoading(false);
    }
  }, [diaryId]);

  return {
    retrospects,
    isLoading,
    error,
  };
}

