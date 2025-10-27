'use client';

import { useMemo } from 'react';
import type { Diary } from './index.binding.hook';

/**
 * 일기 검색 Hook
 * - 검색어를 입력받아 title에 포함된 일기만 필터링
 * - 빈 검색어일 경우 모든 일기 반환
 * 
 * @param diaries - 전체 일기 목록
 * @param searchQuery - 검색어
 * @returns {Diary[]} 검색된 일기 목록
 * 
 * @example
 * const { diaries } = useBindingHook();
 * const searchQuery = '행복';
 * const filteredDiaries = useSearchHook(diaries, searchQuery);
 * 
 * // "행복"이 포함된 title을 가진 일기만 반환됨
 */
export function useSearchHook(diaries: Diary[], searchQuery: string): Diary[] {
  return useMemo(() => {
    // 검색어가 비어있으면 모든 일기 반환
    if (!searchQuery.trim()) {
      return diaries;
    }

    // 검색어가 포함된 title의 일기만 필터링
    const trimmedQuery = searchQuery.trim().toLowerCase();
    
    return diaries.filter((diary) => {
      return diary.title.toLowerCase().includes(trimmedQuery);
    });
  }, [diaries, searchQuery]);
}

