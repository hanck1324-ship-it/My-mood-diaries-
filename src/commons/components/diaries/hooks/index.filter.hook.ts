'use client';

import { useMemo } from 'react';
import { Emotion, EMOTION_META } from '@/commons/constants/enum';
import type { Diary } from './index.binding.hook';

/**
 * 필터 타입
 */
export type FilterType = 'all' | Emotion;

/**
 * SelectBox 옵션 타입
 */
export type FilterOption = {
  value: FilterType;
  label: string;
};

/**
 * 필터 옵션 목록 생성 함수
 * - enum.ts의 Emotion을 참조하여 동적으로 생성
 * 
 * @returns {FilterOption[]} 필터 옵션 배열
 * 
 * @example
 * const options = getFilterOptions();
 * // [
 * //   { value: 'all', label: '전체' },
 * //   { value: 'Happy', label: '행복해요' },
 * //   ...
 * // ]
 */
export function getFilterOptions(): FilterOption[] {
  const options: FilterOption[] = [
    { value: 'all', label: '전체' },
  ];

  // enum.ts의 Emotion 순서대로 옵션 추가
  const emotionOrder = [
    Emotion.Happy,    // 행복해요
    Emotion.Sad,      // 슬퍼요
    Emotion.Surprise, // 놀랐어요
    Emotion.Angry,    // 화나요
  ];

  emotionOrder.forEach((emotion) => {
    options.push({
      value: emotion,
      label: EMOTION_META[emotion].label,
    });
  });

  return options;
}

/**
 * 일기 필터링 Hook
 * - emotion별로 일기를 필터링
 * - 'all' 선택 시 모든 일기 반환
 * 
 * @param diaries - 필터링할 일기 목록
 * @param filterType - 선택된 필터 타입
 * @returns {Diary[]} 필터링된 일기 목록
 * 
 * @example
 * const { diaries } = useBindingHook();
 * const filteredDiaries = useFilterHook(diaries, Emotion.Happy);
 * 
 * // Happy 감정의 일기만 반환
 */
export function useFilterHook(diaries: Diary[], filterType: FilterType): Diary[] {
  return useMemo(() => {
    // 'all' 선택 시 모든 일기 반환
    if (filterType === 'all') {
      return diaries;
    }

    // 선택한 emotion과 일치하는 일기만 필터링
    return diaries.filter((diary) => diary.emotion === filterType);
  }, [diaries, filterType]);
}
