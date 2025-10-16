import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import DiariesNew from '../diaries-new';

export const useLinkModal = () => {
  const { openModal } = useModal();

  const handleWriteDiary = useCallback(() => {
    openModal(<DiariesNew />);
  }, [openModal]);

  return {
    handleWriteDiary,
  };
};

