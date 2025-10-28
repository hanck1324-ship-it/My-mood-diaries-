import { useMemo, useState } from 'react';

/**
 * 페이지네이션 기능을 제공하는 커스텀 훅
 * 
 * @description 배열 데이터를 페이지 단위로 분할하고 페이지 네비게이션 기능을 제공합니다.
 * 데이터가 변경되거나 현재 페이지가 범위를 벗어날 때 자동으로 첫 페이지로 리셋됩니다.
 * 
 * @template T - 페이지네이션할 데이터의 타입
 * @param {T[]} data - 전체 데이터 배열
 * @param {number} [itemsPerPage=12] - 페이지당 아이템 수 (기본값: 12)
 * 
 * @returns {Object} 페이지네이션 상태와 제어 함수들
 * @returns {number} currentPage - 현재 페이지 번호 (1부터 시작)
 * @returns {number} totalPages - 전체 페이지 수
 * @returns {T[]} paginatedData - 현재 페이지의 데이터 배열
 * @returns {function} handlePageChange - 페이지 변경 함수
 * @returns {function} resetToFirstPage - 첫 페이지로 리셋하는 함수
 * @returns {boolean} hasNextPage - 다음 페이지 존재 여부
 * @returns {boolean} hasPrevPage - 이전 페이지 존재 여부
 * @returns {number} startIndex - 현재 페이지 첫 번째 아이템의 인덱스 (1부터 시작)
 * @returns {number} endIndex - 현재 페이지 마지막 아이템의 인덱스
 * @returns {number} totalItems - 전체 아이템 수
 * 
 * @example
 * ```typescript
 * const diaries = [
 *   { id: 1, title: '일기 1' },
 *   { id: 2, title: '일기 2' },
 *   // ... 더 많은 데이터
 * ];
 * 
 * const {
 *   currentPage,
 *   totalPages,
 *   paginatedData,
 *   handlePageChange,
 *   hasNextPage,
 *   hasPrevPage
 * } = usePagination(diaries, 10);
 * 
 * // 페이지 변경
 * handlePageChange(2);
 * 
 * // 조건부 렌더링
 * {paginatedData.map(diary => <DiaryCard key={diary.id} diary={diary} />)}
 * ```
 */
export function usePagination<T>(data: T[], itemsPerPage: number = 12) {
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  // 현재 페이지의 데이터만 추출
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // 데이터가 변경될 때 첫 페이지로 리셋
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  // 데이터 길이가 변경될 때 현재 페이지가 유효한지 확인
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
    resetToFirstPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: (currentPage - 1) * itemsPerPage + 1,
    endIndex: Math.min(currentPage * itemsPerPage, data.length),
    totalItems: data.length
  };
}
