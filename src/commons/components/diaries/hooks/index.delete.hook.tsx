import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import DiariesDeleteModal from '../diaries-delete-modal';

/**
 * Hook 반환 타입
 */
interface UseDeleteDiaryReturn {
  /** 삭제 모달을 여는 함수 (권한 체크 포함) */
  openDeleteModal: (id: number) => void;
  /** 삭제 처리 중 여부 */
  isDeleting: boolean;
}

/**
 * 일기 삭제 Hook
 * - 권한 체크 후 삭제 모달 표시
 * - 로컬스토리지에서 일기를 삭제하고 페이지 새로고침
 * 
 * @returns {UseDeleteDiaryReturn} Hook 반환값
 * 
 * @example
 * ```tsx
 * const { openDeleteModal, isDeleting } = useDeleteDiary();
 * 
 * // 삭제 버튼 클릭 시
 * <button onClick={(e) => {
 *   e.stopPropagation();
 *   openDeleteModal(diary.id);
 * }}>삭제</button>
 * ```
 */
export const useDeleteDiary = (): UseDeleteDiaryReturn => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { guardAction } = useAuthGuard();
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * 실제 삭제 처리 함수
   * 
   * @param {number} id - 삭제할 일기 ID
   */
  const deleteDiary = useCallback((id: number) => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      // 로컬스토리지에서 일기 목록 가져오기
      const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
      
      // 해당 ID의 일기를 제거
      const updatedDiaries = diaries.filter((diary: any) => diary.id !== id);
      
      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      
      // 모달 닫기
      closeModal();
      
      // 페이지 새로고침
      window.location.href = '/diaries';
    } catch (error) {
      console.error('일기 삭제 중 오류:', error);
      setIsDeleting(false);
    }
  }, [isDeleting, closeModal]);

  /**
   * 삭제 모달 열기 함수 (권한 체크 포함)
   * 
   * @param {number} id - 삭제할 일기 ID
   */
  const openDeleteModal = useCallback(
    guardAction((id: number) => {
      openModal(
        <DiariesDeleteModal
          isOpen={true}
          onConfirm={() => deleteDiary(id)}
          onCancel={closeModal}
        />
      );
    }),
    [guardAction, openModal, deleteDiary, closeModal]
  );

  return {
    openDeleteModal,
    isDeleting,
  };
};

