'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Emotion } from '@/commons/constants/enum';
import { DiaryDetail } from './index.binding.hook';

// zod 스키마 정의
const updateDiarySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  emotion: z.nativeEnum(Emotion, { 
    message: '감정을 선택해주세요.' 
  }),
});

export type UpdateDiaryFormData = z.infer<typeof updateDiarySchema>;

export interface UseUpdateDiaryHookResult {
  // 수정 모드 상태
  isEditMode: boolean;
  setEditMode: (mode: boolean) => void;
  
  // 폼 관련
  register: ReturnType<typeof useForm<UpdateDiaryFormData>>['register'];
  handleSubmit: ReturnType<typeof useForm<UpdateDiaryFormData>>['handleSubmit'];
  errors: ReturnType<typeof useForm<UpdateDiaryFormData>>['formState']['errors'];
  reset: ReturnType<typeof useForm<UpdateDiaryFormData>>['reset'];
  setValue: ReturnType<typeof useForm<UpdateDiaryFormData>>['setValue'];
  watch: ReturnType<typeof useForm<UpdateDiaryFormData>>['watch'];
  
  // 수정 액션
  updateDiary: (data: UpdateDiaryFormData) => void;
  cancelEdit: () => void;
  
  // 상태
  isUpdating: boolean;
  updateError: string | null;
}

/**
 * 일기 수정 훅
 * - react-hook-form과 zod를 사용한 폼 검증
 * - 로컬스토리지에 데이터 저장
 * - 수정 모드 상태 관리
 */
export function useUpdateDiary(diary: DiaryDetail | null): UseUpdateDiaryHookResult {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UpdateDiaryFormData>({
    resolver: zodResolver(updateDiarySchema),
    defaultValues: {
      title: diary?.title || '',
      content: diary?.content || '',
      emotion: diary?.emotion || Emotion.Happy,
    },
  });

  // 수정 모드 설정
  const setEditMode = (mode: boolean) => {
    setIsEditMode(mode);
    setUpdateError(null);
    
    if (mode && diary) {
      // 수정 모드 진입시 현재 데이터로 폼 초기화
      setValue('title', diary.title);
      setValue('content', diary.content);
      setValue('emotion', diary.emotion);
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setIsEditMode(false);
    setUpdateError(null);
    if (diary) {
      reset({
        title: diary.title,
        content: diary.content,
        emotion: diary.emotion,
      });
    }
  };

  // 일기 수정 실행
  const updateDiary = async (data: UpdateDiaryFormData) => {
    if (!diary) {
      setUpdateError('수정할 일기가 없습니다.');
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // 로컬스토리지에서 기존 데이터 가져오기
      const diariesData = localStorage.getItem('diaries');
      
      if (!diariesData) {
        throw new Error('저장된 일기가 없습니다.');
      }

      const diaries: DiaryDetail[] = JSON.parse(diariesData);
      
      // 해당 일기 찾아서 업데이트
      const updatedDiaries = diaries.map(d => 
        d.id === diary.id 
          ? { 
              ...d, 
              title: data.title,
              content: data.content,
              emotion: data.emotion,
            }
          : d
      );

      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

      // 수정 모드 해제
      setIsEditMode(false);

      // 페이지 새로고침으로 업데이트된 데이터 반영
      window.location.reload();
      
    } catch (error) {
      console.error('일기 수정 중 오류 발생:', error);
      setUpdateError(
        error instanceof Error 
          ? error.message 
          : '일기 수정 중 오류가 발생했습니다.'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isEditMode,
    setEditMode,
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    watch,
    updateDiary,
    cancelEdit,
    isUpdating,
    updateError,
  };
}
