'use client';

import React from 'react';

import { Button } from '../button';
import { Input } from '../input';

import styles from './styles.module.css';

export type AuthLoginProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * 로그인 컴포넌트
 * 
 * 글래스모피즘 스타일의 로그인 폼을 제공합니다.
 * 이메일, 비밀번호 입력 필드와 로그인 버튼을 포함합니다.
 * 
 * @param {AuthLoginProps} props - 컴포넌트 props
 * @param {React.Ref} ref - 컴포넌트 ref
 * @returns {JSX.Element} 로그인 폼 컴포넌트
 * 
 * @example
 * ```tsx
 * <AuthLogin />
 * ```
 */
export const AuthLogin = React.forwardRef<HTMLDivElement, AuthLoginProps>(
  ({ className, ...props }, ref) => {
    const containerClasses = [
      styles.container,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div 
        ref={ref} 
        className={containerClasses}
        data-testid="auth-login-container"
        {...props}
      >
        <div className={styles.card} data-testid="auth-login-card">
          <div className={styles.header} data-testid="auth-login-header">
            <h1 className={styles.title}>로그인</h1>
            <p className={styles.subtitle}>계정에 로그인하세요</p>
          </div>

          <form 
            className={styles.form} 
            data-testid="auth-login-form"
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
                data-testid="auth-login-email-input"
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
                data-testid="auth-login-password-input"
              />
            </div>

            <div className={styles.options} data-testid="auth-login-options">
              <label className={styles.checkboxLabel} data-testid="auth-login-remember-me">
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>로그인 상태 유지</span>
              </label>
              <a 
                href="/auth/forgot-password" 
                className={styles.forgotLink}
                data-testid="auth-login-forgot-password-link"
              >
                비밀번호 찾기
              </a>
            </div>

            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                variant="primary"
                theme="light"
                size="large"
                className={styles.submitButton}
                data-testid="auth-login-submit-button"
              >
                로그인
              </Button>
            </div>
          </form>

          <div className={styles.footer} data-testid="auth-login-footer">
            <p className={styles.footerText}>
              계정이 없으신가요?{' '}
              <a 
                href="/auth/signup" 
                className={styles.link}
                data-testid="auth-login-signup-link"
              >
                회원가입
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

AuthLogin.displayName = 'AuthLogin';

export default AuthLogin;

