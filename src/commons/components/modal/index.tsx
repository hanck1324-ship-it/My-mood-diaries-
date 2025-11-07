'use client';

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
  className?: string;
  'data-testid'?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      variant = 'info',
      actions = 'single',
      theme = 'light',
      title,
      description,
      confirmText = '확인',
      cancelText = '취소',
      onConfirm,
      onCancel,
      className,
      'data-testid': dataTestId,
    },
    ref
  ) => {
    const modalClasses = [
      styles.modal,
      styles[`variant-${variant}`],
      styles[`actions-${actions}`],
      styles[`theme-${theme}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={modalClasses} data-testid={dataTestId}>
        <div className={styles.content}>
          <h2 className={styles.title} data-testid={dataTestId ? `${dataTestId}-title` : undefined}>{title}</h2>
          <p className={styles.description} data-testid={dataTestId ? `${dataTestId}-description` : undefined}>{description}</p>
        </div>

        <div className={styles.buttonArea}>
          {actions === 'dual' && (
            <>
              <Button
                variant="secondary"
                size="large"
                theme={theme}
                onClick={onCancel}
                className={styles.buttonDual}
                data-testid={dataTestId ? `${dataTestId}-cancel` : undefined}
              >
                {cancelText}
              </Button>
              <Button
                variant="primary"
                size="large"
                theme={theme}
                onClick={onConfirm}
                className={styles.buttonDual}
                data-testid={dataTestId ? `${dataTestId}-confirm` : undefined}
              >
                {confirmText}
              </Button>
            </>
          )}
          {actions === 'single' && (
            <Button
              variant="primary"
              size="large"
              theme={theme}
              onClick={onConfirm}
              className={styles.buttonSingle}
              data-testid={dataTestId ? `${dataTestId}-confirm` : undefined}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;

