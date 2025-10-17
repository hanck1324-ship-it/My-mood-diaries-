'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Emotion } from '@/commons/constants/enum';

export interface DiaryDetail {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
}

export interface UseDiaryDetailBindingResult {
  diary: DiaryDetail | null;
  error: string | null;
  isLoading: boolean;
  formattedDate: string;
}

/**
 * 일기 상세 데이터 바인딩 훅
 * - URL 파라미터에서 id를 추출
 * - 로컬스토리지에서 해당 id의 일기 데이터 조회
 * - 날짜 포맷팅 (YYYY.MM.DD)
 */
export function useDiaryDetailBinding(): UseDiaryDetailBindingResult {
  const params = useParams();
  const [diary, setDiary] = useState<DiaryDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // URL 파라미터에서 id 추출
      const id = params?.id;
      
      if (!id) {
        setError('일기 ID가 없습니다.');
        setIsLoading(false);
        return;
      }

      const diaryId = typeof id === 'string' ? parseInt(id, 10) : parseInt(id[0], 10);

      if (isNaN(diaryId)) {
        setError('유효하지 않은 일기 ID입니다.');
        setIsLoading(false);
        return;
      }

      // 로컬스토리지에서 diaries 가져오기
      const diariesData = localStorage.getItem('diaries');
      
      if (!diariesData) {
        setError('저장된 일기가 없습니다.');
        setIsLoading(false);
        return;
      }

      const diaries: DiaryDetail[] = JSON.parse(diariesData);

      // id와 일치하는 일기 찾기
      const foundDiary = diaries.find((d) => d.id === diaryId);

      if (!foundDiary) {
        setError('일기를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      setDiary(foundDiary);
      setError(null);
    } catch (err) {
      setError('일기를 불러오는 중 오류가 발생했습니다.');
      console.error('Error loading diary:', err);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  // 날짜 포맷팅 (YYYY.MM.DD)
  const formattedDate = diary?.createdAt
    ? new Date(diary.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\. /g, '.').replace(/\.$/, '')
    : '';

  return {
    diary,
    error,
    isLoading,
    formattedDate,
  };
}

