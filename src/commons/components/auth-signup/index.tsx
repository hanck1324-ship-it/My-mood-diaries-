import React from 'react';

import { Button } from '../button';
import { Input } from '../input';

import styles from './styles.module.css';

/**
 * 회원가입 컴포넌트
 * 
 * 글래스모피즘 스타일의 회원가입 폼을 제공합니다.
 * 이메일, 비밀번호, 비밀번호 확인, 이름 입력 필드와 회원가입 버튼을 포함합니다.
 * 
 * @returns {JSX.Element} 회원가입 폼 컴포넌트
 * 
 * @example
 * ```tsx
 * <AuthSignup />
 * ```
 */
export const AuthSignup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>새로운 계정을 만들어보세요</p>
        </div>

        <form className={styles.form}>
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
            />
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
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="secondary"
              theme="light"
              size="large"
              className={styles.submitButton}
            >
              회원가입
            </Button>
          </div>
        </form>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            이미 계정이 있으신가요?{' '}
            <a href="/auth/login" className={styles.link}>
              로그인하기
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthSignup;
