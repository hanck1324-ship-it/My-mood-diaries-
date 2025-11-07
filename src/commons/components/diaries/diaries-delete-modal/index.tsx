'use client';

import React from 'react';
import Modal from '@/commons/components/modal';

/**
 * 일기 삭제 모달 Props
 */
export interface DiariesDeleteModalProps {
  /** 모달 노출 여부 */
  isOpen?: boolean;
  /** 삭제 확인 콜백 */
  onConfirm: () => void;
  /** 취소 콜백 */
  onCancel: () => void;
}

/**
 * 일기 삭제 확인 모달 컴포넌트
 * 
 * @param {DiariesDeleteModalProps} props - 컴포넌트 Props
 * @returns {React.ReactElement | null} 모달 컴포넌트
 * 
 * @example
 * ```tsx
 * <DiariesDeleteModal
 *   isOpen={isModalOpen}
 *   onConfirm={handleDelete}
 *   onCancel={handleCancel}
 * />
 * ```
 */
export const DiariesDeleteModal = React.forwardRef<HTMLDivElement, DiariesDeleteModalProps>(
  ({ isOpen = true, onConfirm, onCancel }, ref) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
      onConfirm();
    };

    const handleCancel = () => {
      onCancel();
    };

    return (
      <Modal
        ref={ref}
        variant="danger"
        actions="dual"
        theme="light"
        title="일기 삭제"
        description="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        data-testid="diary-delete-modal"
      />
    );
  }
);

DiariesDeleteModal.displayName = 'DiariesDeleteModal';

export default DiariesDeleteModal;

