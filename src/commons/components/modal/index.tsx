"use client";

import React from 'react';
import { Button } from '../button';
import styles from './styles.module.css';

export type ModalVariant = 'info' | 'danger';
export type ModalActions = 'single' | 'dual';
export type ModalTheme = 'light' | 'dark';

export interface ModalProps {
  variant?: ModalVariant;
  actions?: ModalActions;
  theme?: ModalTheme;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const Modal = ({
  variant = 'info',
  actions = 'single',
  theme = 'light',
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ModalProps) => {
  const modalClasses = [
    styles.modal,
    styles[`variant-${variant}`],
    styles[`actions-${actions}`],
    styles[`theme-${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={modalClasses}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.buttonArea}>
        {actions === 'dual' && (
          <>
            <Button
              variant="secondary"
              size="large"
              theme="light"
              onClick={onCancel}
              className={styles.buttonDual}
            >
              {cancelText}
            </Button>
            <Button
              variant="primary"
              size="large"
              theme="light"
              onClick={onConfirm}
              className={styles.buttonDual}
            >
              {confirmText}
            </Button>
          </>
        )}
        {actions === 'single' && (
          <Button
            variant="primary"
            size="large"
            theme="light"
            onClick={onConfirm}
            className={styles.buttonSingle}
          >
            {confirmText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;

