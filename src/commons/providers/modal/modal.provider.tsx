"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";

interface ModalContextType {
  isOpen: boolean;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = useCallback((content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div
              className="absolute inset-0 bg-black/50"
              aria-hidden="true"
            />
            <div
              className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {modalContent}
            </div>
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
}

