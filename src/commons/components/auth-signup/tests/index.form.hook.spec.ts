import { test, expect } from '@playwright/test';

/**
 * 회원가입 폼 Hook 테스트
 * - 회원가입 폼 유효성 검증
 * - 회원가입 API 호출
 * - 성공/실패 모달 표시
 */

test.describe('Auth Signup - Form Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/auth/signup');
    await page.waitForSelector('[data-testid="auth-signup-form"]');
  });

  test('이메일, 비밀번호, 이름 필드를 입력할 수 있어야 한다', async ({ page }) => {
    // 이메일 입력
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    await emailInput.fill('test@example.com');

    // 비밀번호 입력
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    await passwordInput.fill('password123');

    // 비밀번호 확인 입력
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    await passwordConfirmInput.fill('password123');

    // 이름 입력
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    await nameInput.fill('홍길동');

    // 입력값 확인
    await expect(emailInput).toHaveValue('test@example.com');
    await expect(passwordInput).toHaveValue('password123');
    await expect(passwordConfirmInput).toHaveValue('password123');
    await expect(nameInput).toHaveValue('홍길동');
  });

  test('이메일 형식이 올바르지 않으면 에러 메시지가 표시되어야 한다', async ({ page }) => {
    const emailInput = page.locator('[data-testid="auth-signup-email-input"]');
    
    // 잘못된 이메일 형식 입력
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-email-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('이메일에 @가 포함되어야 합니다');
  });

  test('비밀번호가 8자 미만이면 에러 메시지가 표시되어야 한다', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    
    // 8자 미만 비밀번호 입력
    await passwordInput.fill('pass1');
    await passwordInput.blur();

    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-password-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('비밀번호는 8자 이상이어야 합니다');
  });

  test('비밀번호에 영문과 숫자가 모두 포함되어야 한다', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    
    // 영문만 입력
    await passwordInput.fill('abcdefgh');
    await passwordInput.blur();

    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-password-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('비밀번호는 영문과 숫자를 포함해야 합니다');
  });

  test('비밀번호와 비밀번호 확인이 일치하지 않으면 에러 메시지가 표시되어야 한다', async ({ page }) => {
    const passwordInput = page.locator('[data-testid="auth-signup-password-input"]');
    const passwordConfirmInput = page.locator('[data-testid="auth-signup-password-confirm-input"]');
    
    // 비밀번호 입력
    await passwordInput.fill('password123');
    
    // 비밀번호 확인에 다른 값 입력
    await passwordConfirmInput.fill('password456');
    await passwordConfirmInput.blur();

    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-password-confirm-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('비밀번호가 일치하지 않습니다');
  });

  test('이름이 비어있으면 에러 메시지가 표시되어야 한다', async ({ page }) => {
    const nameInput = page.locator('[data-testid="auth-signup-name-input"]');
    
    // 이름 입력 후 비우기
    await nameInput.fill('홍길동');
    await nameInput.clear();
    await nameInput.blur();

    // 에러 메시지 확인
    const errorMessage = page.locator('[data-testid="auth-signup-name-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('이름을 입력해주세요');
  });

  test('모든 필드가 유효하면 회원가입 버튼이 활성화되어야 한다', async ({ page }) => {
    // 모든 필드 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('test@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('홍길동');

    // 회원가입 버튼 확인
    const submitButton = page.locator('[data-testid="auth-signup-submit-button"]');
    await expect(submitButton).toBeEnabled();
  });

  test('회원가입 성공 시 가입완료 모달이 표시되어야 한다', async ({ page }) => {
    // 모든 필드 입력
    await page.locator('[data-testid="auth-signup-email-input"]').fill('success@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('성공홍길동');

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 가입완료 모달 확인
    await expect(page.locator('[data-testid="auth-signup-success-modal"]')).toBeVisible();
    
    // 모달 내용 확인
    const modal = page.locator('[data-testid="auth-signup-success-modal"]');
    await expect(modal).toContainText('가입완료');
    await expect(modal).toContainText('회원가입이 완료되었습니다.');
  });

  test('회원가입 실패 시 가입실패 모달이 표시되어야 한다', async ({ page }) => {
    // 모든 필드 입력 (중복 이메일로 실패시나리오)
    await page.locator('[data-testid="auth-signup-email-input"]').fill('duplicate@example.com');
    await page.locator('[data-testid="auth-signup-password-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-password-confirm-input"]').fill('password123');
    await page.locator('[data-testid="auth-signup-name-input"]').fill('실패홍길동');

    // 회원가입 버튼 클릭
    await page.locator('[data-testid="auth-signup-submit-button"]').click();

    // 가입실패 모달 확인
    await expect(page.locator('[data-testid="auth-signup-failure-modal"]')).toBeVisible({ timeout: 10000 });
    
    // 모달 내용 확인
    const modal = page.locator('[data-testid="auth-signup-failure-modal"]');
    await expect(modal).toContainText('가입실패');
  });
});

