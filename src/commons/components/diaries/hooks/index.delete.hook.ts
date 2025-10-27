import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Hook 반환 타입
 */
interface UseDeleteDiaryReturn {
  deleteDiary: (id: number) => void;
  isDeleting: boolean;
}

/**
 * 일기 삭제 Hook
 * 로컬스토리지에서 일기를 삭제하고 목록 페이지로 이동합니다.
 * 
 * @returns {UseDeleteDiaryReturn} Hook 반환값
 * 
 * @example
 * ```tsx
 * const { deleteDiary, isDeleting } = useDeleteDiary();
 * deleteDiary(1);
 * ```
 */
export const useDeleteDiary = (): UseDeleteDiaryReturn => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * 일기 삭제 함수
   * 
   * @param {number} id - 삭제할 일기 ID
   */
  const deleteDiary = (id: number) => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      // 로컬스토리지에서 일기 목록 가져오기
      const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
      
      // 해당 ID의 일기를 제거
      const updatedDiaries = diaries.filter((diary: any) => diary.id !== id);
      
      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      
      // 페이지 새로고침 또는 목록으로 이동
      router.push('/diaries');
      router.refresh();
    } catch (error) {
      console.error('일기 삭제 중 오류:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteDiary,
    isDeleting,
  };
};

