"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface Modal {
  id: string;
  content: React.ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  modalStack: Modal[];
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalStack, setModalStack] = useState<Modal[]>([]);

  // 모달 스택에 추가
  const openModal = useCallback((content: React.ReactNode) => {
    const newModal: Modal = {
      id: `modal-${Date.now()}-${Math.random()}`,
      content,
    };
    setModalStack((prev) => [...prev, newModal]);
  }, []);

  // 모달 스택에서 마지막 모달 제거
  const closeModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  // 모달이 1개라도 열려있으면 body 스크롤 제거
  useEffect(() => {
    if (modalStack.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalStack.length]);

  const isOpen = modalStack.length > 0;

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalStack }}>
      {children}
      {typeof window !== "undefined" &&
        modalStack.map((modal, index) =>
          createPortal(
            <div
              key={modal.id}
              className={styles.modalContainer}
              style={{ zIndex: 50 + index * 10 }}
              onClick={closeModal}
            >
              <div
                className={styles.backdrop}
                aria-hidden="true"
              />
              <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
              >
                {modal.content}
              </div>
            </div>,
            document.body
          )
        )}
    </ModalContext.Provider>
  );
}

