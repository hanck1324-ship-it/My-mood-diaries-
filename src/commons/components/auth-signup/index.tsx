'use client';

import React from 'react';

import { Button } from '../button';
import { Input } from '../input';
import { useSignupForm } from './hooks/index.form.hook';

import styles from './styles.module.css';

export type AuthSignupProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * 회원가입 컴포넌트
 * 
 * 글래스모피즘 스타일의 회원가입 폼을 제공합니다.
 * 이메일, 비밀번호, 비밀번호 확인, 이름 입력 필드와 회원가입 버튼을 포함합니다.
 * 
 * @param {AuthSignupProps} props - 컴포넌트 props
 * @param {React.Ref} ref - 컴포넌트 ref
 * @returns {JSX.Element} 회원가입 폼 컴포넌트
 * 
 * @example
 * ```tsx
 * <AuthSignup />
 * ```
 */
export const AuthSignup = React.forwardRef<HTMLDivElement, AuthSignupProps>(
  ({ className, ...props }, ref) => {
    const { register, handleSubmit, errors, isValid, isLoading } = useSignupForm();

    const containerClasses = [
      styles.container,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 에러 메시지 표시 여부 확인
    const hasPasswordConfirmError = !!errors.passwordConfirm;

    return (
      <div 
        ref={ref} 
        className={containerClasses}
        data-testid="auth-signup-container"
        {...props}
      >
        <div className={styles.card} data-testid="auth-signup-card">
          <div className={styles.header} data-testid="auth-signup-header">
            <h1 className={styles.title}>회원가입</h1>
            <p className={styles.subtitle}>새로운 계정을 만들어보세요</p>
          </div>

          <form 
            className={styles.form} 
            data-testid="auth-signup-form"
            onSubmit={handleSubmit}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                이메일
              </label>
              <Input
                id="email"
                type="email"
                variant="primary"
                theme="light"
                size="large"
                placeholder="이메일을 입력하세요"
                className={styles.input}
                data-testid="auth-signup-email-input"
                {...register('email')}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                variant="primary"
                theme="light"
                size="large"
                placeholder="비밀번호를 입력하세요"
                className={styles.input}
                data-testid="auth-signup-password-input"
                {...register('password')}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="passwordConfirm" className={styles.label}>
                비밀번호 재입력
              </label>
              <Input
                id="passwordConfirm"
                type="password"
                variant="primary"
                theme="light"
                size="large"
                placeholder="비밀번호를 다시 입력하세요"
                className={styles.input}
                data-testid="auth-signup-password-confirm-input"
                {...register('passwordConfirm')}
              />
              {hasPasswordConfirmError && (
                <p className={styles.errorMessage} data-testid="auth-signup-password-error">
                  {errors.passwordConfirm?.message || '패스워드가 일치하지 않습니다.'}
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                이름
              </label>
              <Input
                id="name"
                type="text"
                variant="primary"
                theme="light"
                size="large"
                placeholder="이름을 입력하세요"
                className={styles.input}
                data-testid="auth-signup-name-input"
                {...register('name')}
              />
            </div>

            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                variant="secondary"
                theme="light"
                size="large"
                className={styles.submitButton}
                data-testid="auth-signup-submit-button"
                disabled={!isValid || isLoading}
              >
                {isLoading ? '처리중...' : '회원가입'}
              </Button>
            </div>
          </form>

          <div className={styles.footer} data-testid="auth-signup-footer">
            <p className={styles.footerText}>
              이미 계정이 있으신가요?{' '}
              <a 
                href="/auth/login" 
                className={styles.link}
                data-testid="auth-signup-login-link"
              >
                로그인하기
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

AuthSignup.displayName = 'AuthSignup';

export default AuthSignup;

