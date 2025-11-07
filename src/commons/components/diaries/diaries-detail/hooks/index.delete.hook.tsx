'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useModal } from '@/commons/providers/modal/modal.provider';
import Modal from '@/commons/components/modal';
import { buildUrl, UrlKey } from '@/commons/constants/url';

/**
 * Hook 반환 타입
 */
interface UseDeleteDiaryDetailReturn {
  openDeleteModal: () => void;
  isDeleting: boolean;
}

/**
 * 일기 상세 페이지 삭제 모달 Hook
 * 삭제 확인 모달을 표시하고, 확인 시 로컬스토리지에서 일기를 삭제하고 목록 페이지로 이동합니다.
 * 
 * @param {number} diaryId - 삭제할 일기 ID
 * @returns {UseDeleteDiaryDetailReturn} Hook 반환값
 * 
 * @example
 * ```tsx
 * const { openDeleteModal, isDeleting } = useDeleteDiaryDetail(1);
 * 
 * <Button onClick={openDeleteModal}>삭제</Button>
 * ```
 */
export const useDeleteDiaryDetail = (diaryId: number): UseDeleteDiaryDetailReturn => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * 일기 삭제 함수
   * 로컬스토리지에서 일기를 삭제하고 목록 페이지로 이동합니다.
   */
  const deleteDiary = () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      // 로컬스토리지에서 일기 목록 가져오기
      const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
      
      // 해당 ID의 일기를 제거
      const updatedDiaries = diaries.filter((diary: any) => diary.id !== diaryId);
      
      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      
      // 모달 닫기
      closeModal();
      
      // 목록 페이지로 이동
      router.push(buildUrl(UrlKey.DiaryList));
      router.refresh();
    } catch (error) {
      console.error('일기 삭제 중 오류:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * 삭제 확인 모달 열기
   */
  const openDeleteModal = () => {
    openModal(
      <Modal
        variant="danger"
        actions="dual"
        theme="light"
        title="일기 삭제"
        description="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={deleteDiary}
        onCancel={closeModal}
        data-testid="delete-modal"
      />
    );
  };

  return {
    openDeleteModal,
    isDeleting,
  };
};
