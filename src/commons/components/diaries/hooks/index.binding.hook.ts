'use client';

import { useState, useEffect } from 'react';
import { Emotion } from '@/commons/constants/enum';

/**
 * 일기 데이터 타입
 */
export type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

/**
 * 로컬스토리지에서 일기 데이터를 불러오는 Hook
 * 
 * @returns {Object} 일기 데이터와 로딩 상태
 * @returns {Diary[]} diaries - 일기 데이터 배열
 * @returns {boolean} isLoading - 로딩 상태
 * 
 * @example
 * const { diaries, isLoading } = useBindingHook();
 * 
 * if (isLoading) return <div>로딩중...</div>;
 * 
 * return (
 *   <div>
 *     {diaries.map((diary) => (
 *       <DiaryCard key={diary.id} diary={diary} />
 *     ))}
 *   </div>
 * );
 */
export function useBindingHook() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // 로컬스토리지에서 diaries 데이터 불러오기
      const storedDiaries = localStorage.getItem('diaries');
      
      if (storedDiaries) {
        const parsedDiaries = JSON.parse(storedDiaries) as Diary[];
        setDiaries(parsedDiaries);
      } else {
        setDiaries([]);
      }
    } catch (error) {
      console.error('Failed to load diaries from localStorage:', error);
      setDiaries([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    diaries,
    isLoading,
  };
}

