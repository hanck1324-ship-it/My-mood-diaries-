'use client';

import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import Modal from '@/commons/components/modal';

/**
 * 일기쓰기 모달 닫기 기능을 관리하는 Hook
 * 
 * 닫기 버튼 클릭 시 등록취소 확인 모달을 2중 모달로 표시하고,
 * 사용자 선택에 따라 적절한 모달을 닫는 기능을 제공
 * 
 * @returns {Object} 모달 제어 함수들
 * @returns {Function} handleCloseWithConfirmation - 등록취소 확인 모달을 여는 함수
 * 
 * @example
 * const { handleCloseWithConfirmation } = useLinkModalClose();
 * 
 * <Button onClick={handleCloseWithConfirmation}>
 *   닫기
 * </Button>
 */
export function useLinkModalClose() {
  const { openModal, closeModal } = useModal();

  /**
   * 계속작성 버튼 핸들러
   * 등록취소 확인 모달만 닫고, 일기쓰기 모달은 유지
   */
  const handleContinueWriting = useCallback(() => {
    closeModal(); // 등록취소 모달만 닫기
  }, [closeModal]);

  /**
   * 등록취소 버튼 핸들러
   * 등록취소 확인 모달과 일기쓰기 모달을 모두 닫기
   */
  const handleCancelRegistration = useCallback(() => {
    closeModal(); // 등록취소 모달 닫기
    closeModal(); // 일기쓰기 모달 닫기
  }, [closeModal]);

  /**
   * 닫기 버튼 클릭 시 등록취소 확인 모달을 여는 함수
   * Modal 컴포넌트를 사용하여 2중 모달로 표시
   */
  const handleCloseWithConfirmation = useCallback(() => {
    openModal(
      <div data-testid="cancel-registration-modal">
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="등록을 취소하시겠습니까?"
          description="작성 중인 내용이 저장되지 않습니다."
          cancelText="계속작성"
          confirmText="등록취소"
          onCancel={handleContinueWriting}
          onConfirm={handleCancelRegistration}
        />
      </div>
    );
  }, [openModal, handleContinueWriting, handleCancelRegistration]);

  return {
    handleCloseWithConfirmation,
  };
}

