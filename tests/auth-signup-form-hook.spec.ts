import { test, expect } from '@playwright/test';
import { TEST_TIMEOUTS } from './test-constants';

/**
 * 회원가입 폼 등록 기능 테스트
 * - react-hook-form + zod 검증
 * - GraphQL API (createUser) 호출
 * - 가입완료/가입실패 모달 표시
 * - 로그인 페이지로 이동
 */

test.describe('AuthSignup - Form Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/auth/signup');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="auth-signup-container"]');
  });

  test('모든 필드가 입력되지 않으면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    
    // 초기 상태: 버튼 비활성화
    await expect(submitButton).toBeDisabled();
  });

  test('이메일만 입력하고 나머지가 비어있으면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호가 8자 미만이면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('abc123'); // 6자
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호에 영문 또는 숫자가 없으면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('12345678'); // 숫자만
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('비밀번호와 비밀번호 확인이 일치하지 않으면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1235'); // 다름
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('이메일에 @가 없으면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('testexample.com'); // @ 없음
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('이름이 비어있으면 회원가입 버튼이 비활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('모든 필드가 올바르게 입력되면 회원가입 버튼이 활성화되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeEnabled();
  });

  test('[성공시나리오] 회원가입에 성공하면 _id가 반환되고 가입완료 모달이 표시되어야 한다', async ({ page }) => {
    // timestamp를 포함한 이메일로 중복 방지
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@example.com`;
    
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill(uniqueEmail);
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await submitButton.click();
    
    // 가입완료 모달 확인
    const successModal = page.locator('[data-testid="auth-signup-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: TEST_TIMEOUTS.MEDIUM });
  });

  test('[성공시나리오] 가입완료 모달의 확인 버튼을 클릭하면 로그인 페이지로 이동하고 모든 모달이 닫혀야 한다', async ({ page }) => {
    // timestamp를 포함한 이메일로 중복 방지
    const timestamp = Date.now();
    const uniqueEmail = `test${timestamp}@example.com`;
    
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill(uniqueEmail);
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await submitButton.click();
    
    // 가입완료 모달 확인
    const successModal = page.locator('[data-testid="auth-signup-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: TEST_TIMEOUTS.MEDIUM });
    
    // 확인 버튼 클릭
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    // 페이지 이동 확인 (URL이 /auth/login로 변경되어야 함)
    await page.waitForURL('/auth/login');
    await expect(page).toHaveURL('/auth/login');
    
    // 모든 모달이 닫혀야 함
    await expect(successModal).not.toBeVisible();
  });

  test('[실패시나리오] 회원가입에 실패하면 가입실패 모달이 표시되어야 한다', async ({ page }) => {
    // API 모킹: 실패 응답
    await page.route('https://main-practice.codebootcamp.co.kr/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '이미 존재하는 이메일입니다.',
            },
          ],
        }),
      });
    });
    
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await submitButton.click();
    
    // 가입실패 모달 확인
    const failureModal = page.locator('[data-testid="auth-signup-failure-modal"]');
    await expect(failureModal).toBeVisible({ timeout: TEST_TIMEOUTS.MEDIUM });
  });

  test('[실패시나리오] 가입실패 모달의 확인 버튼을 클릭하면 모든 모달이 닫히고 페이지는 유지되어야 한다', async ({ page }) => {
    // API 모킹: 실패 응답
    await page.route('https://main-practice.codebootcamp.co.kr/graphql', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [
            {
              message: '이미 존재하는 이메일입니다.',
            },
          ],
        }),
      });
    });
    
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');
    
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('test1234');
    
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('test1234');
    
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');
    
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await submitButton.click();
    
    // 가입실패 모달 확인
    const failureModal = page.locator('[data-testid="auth-signup-failure-modal"]');
    await expect(failureModal).toBeVisible({ timeout: TEST_TIMEOUTS.MEDIUM });
    
    // 확인 버튼 클릭
    const confirmButton = failureModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    // 페이지 유지 확인
    await expect(page).toHaveURL('/auth/signup');
    
    // 모든 모달이 닫혀야 함
    await expect(failureModal).not.toBeVisible();
  });
});
