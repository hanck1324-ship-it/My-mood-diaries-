import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


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
 * 회고 등록 폼 스키마
 */
const retrospectSchema = z.object({
  content: z.string().min(1, '회고를 입력해주세요'),
});

type RetrospectFormData = z.infer<typeof retrospectSchema>;

/**
 * 회고 등록 폼 Hook
 * 
 * 로컬스토리지에 회고를 등록하고 관리하는 기능을 제공합니다.
 * 
 * @param {number} diaryId - 일기 ID
 * @returns {object} 회고 폼 제어 객체
 */
export function useRetrospectForm(diaryId: number) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RetrospectFormData>({
    resolver: zodResolver(retrospectSchema),
    mode: 'onChange',
  });

  const contentValue = watch('content');
  const isDisabled = !contentValue || contentValue.trim().length === 0;

  /**
   * 로컬스토리지에서 회고 목록 가져오기
   */
  const getRetrospects = (): Retrospect[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('retrospects');
    return data ? JSON.parse(data) : [];
  };

  /**
   * 로컬스토리지에 회고 저장
   */
  const saveRetrospect = (retrospects: Retrospect[], newRetrospect: Omit<Retrospect, 'id'>): Retrospect[] => {
    const maxId = retrospects.length > 0 
      ? Math.max(...retrospects.map(r => r.id))
      : 0;
    
    const retrospectToAdd: Retrospect = {
      ...newRetrospect,
      id: maxId + 1,
    };

    return [...retrospects, retrospectToAdd];
  };

  /**
   * 회고 등록 처리
   */
  const onSubmit = async (data: RetrospectFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const currentRetrospects = getRetrospects();
      const newRetrospect: Omit<Retrospect, 'id'> = {
        content: data.content,
        diaryId,
        createdAt: new Date().toISOString(),
      };

      const updatedRetrospects = saveRetrospect(currentRetrospects, newRetrospect);
      
      localStorage.setItem('retrospects', JSON.stringify(updatedRetrospects));
      
      // 폼 초기화
      reset();
      
      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error('회고 등록 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isDisabled,
    isSubmitting,
  };
}
