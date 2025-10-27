import { useMemo } from 'react';
import { Emotion } from '@/commons/constants/enum';
import type { Diary } from './index.binding.hook';

/**
 * 필터 타입
 */
export type FilterType = 'all' | Emotion;

/**
 * 필터 옵션 타입
 */
export interface FilterOption {
  value: FilterType;
  label: string;
}

/**
 * 필터 옵션을 생성하는 함수
 */
export const getFilterOptions = (): FilterOption[] => {
  return [
    { value: 'all', label: '전체' },
    { value: Emotion.Happy, label: '행복해요' },
    { value: Emotion.Sad, label: '슬퍼요' },
    { value: Emotion.Surprise, label: '놀랐어요' },
    { value: Emotion.Angry, label: '화나요' },
  ];
};

/**
 * 일기 목록을 감정별로 필터링하는 Hook
 * 
 * @param diaries - 전체 일기 목록
 * @param filterValue - 선택된 필터 값
 * @returns {Diary[]} 필터링된 일기 목록
 * 
 * @example
 * ```tsx
 * const { diaries } = useBindingHook();
 * const filterValue = 'Happy';
 * const filteredDiaries = useFilterHook(diaries, filterValue);
 * 
 * // 'Happy' 감정의 일기만 반환됨
 * ```
 */
export function useFilterHook(diaries: Diary[], filterValue: FilterType): Diary[] {
  return useMemo(() => {
    // 'all' 선택 시 전체 일기 반환
    if (filterValue === 'all') {
      return diaries;
    }

    // 선택한 감정과 일치하는 일기만 필터링
    return diaries.filter((diary) => diary.emotion === filterValue);
  }, [diaries, filterValue]);
}

