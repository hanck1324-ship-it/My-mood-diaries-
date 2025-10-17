import { test, expect } from '@playwright/test';

/**
 * 일기쓰기 모달 닫기 기능 테스트
 * - 닫기 버튼 클릭 시 등록취소 확인 모달 표시
 * - 등록취소 모달의 계속작성 버튼 클릭 시 등록취소 모달만 닫기
 * - 등록취소 모달의 등록취소 버튼 클릭 시 두 모달 모두 닫기
 */

test.describe('DiariesNew - Close Modal Hook', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await writeButton.click();

    // 일기쓰기 모달이 표시되는지 확인
    await page.waitForSelector('[data-testid="diaries-new-modal"]');
  });

  test('닫기 버튼 클릭 시 등록취소 확인 모달이 표시되어야 한다', async ({ page }) => {
    // 초기 상태: 등록취소 모달이 없어야 함
    await expect(page.locator('[data-testid="cancel-registration-modal"]')).not.toBeVisible();

    // 일기쓰기 모달의 닫기 버튼 클릭
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 확인 모달이 표시되어야 함
    const cancelModal = page.locator('[data-testid="cancel-registration-modal"]');
    await expect(cancelModal).toBeVisible();

    // 일기쓰기 모달은 여전히 표시되어야 함 (2중 모달)
    const diariesNewModal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(diariesNewModal).toBeVisible();
  });

  test('등록취소 모달의 계속작성 버튼 클릭 시 등록취소 모달만 닫혀야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 모달이 표시되는지 확인
    const cancelModal = page.locator('[data-testid="cancel-registration-modal"]');
    await expect(cancelModal).toBeVisible();

    // 계속작성 버튼 찾기 (Modal 컴포넌트의 cancelText="계속작성")
    // Modal의 dual actions에서 첫 번째 버튼은 secondary (취소 버튼)
    const continueButton = cancelModal.locator('button').filter({ hasText: '계속작성' });
    await continueButton.click();

    // 등록취소 모달만 닫혀야 함
    await expect(cancelModal).not.toBeVisible();

    // 일기쓰기 모달은 여전히 표시되어야 함
    const diariesNewModal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(diariesNewModal).toBeVisible();
  });

  test('등록취소 모달의 등록취소 버튼 클릭 시 두 모달 모두 닫혀야 한다', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 모달이 표시되는지 확인
    const cancelModal = page.locator('[data-testid="cancel-registration-modal"]');
    await expect(cancelModal).toBeVisible();

    // 등록취소 버튼 찾기 (Modal 컴포넌트의 confirmText="등록취소")
    // Modal의 dual actions에서 두 번째 버튼은 primary (확인 버튼)
    const cancelButton = cancelModal.locator('button').filter({ hasText: '등록취소' });
    await cancelButton.click();

    // 등록취소 모달이 닫혀야 함
    await expect(cancelModal).not.toBeVisible();

    // 일기쓰기 모달도 닫혀야 함
    const diariesNewModal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(diariesNewModal).not.toBeVisible();
  });
});

