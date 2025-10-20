import { test, expect } from '@playwright/test';

/**
 * 일기 모달 연동 테스트
 * 일기쓰기 버튼 클릭 시 모달 표시 및 닫기 기능을 테스트
 */

test.describe('Diaries - Link Modal Hook', () => {
  test('일기쓰기 버튼 클릭 시 모달이 표시되어야 한다', async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 초기 상태: 모달이 없어야 함
    await expect(page.locator('[data-testid="diaries-new-modal"]')).not.toBeVisible();

    // 일기쓰기 버튼 찾기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await expect(writeButton).toBeVisible();

    // 일기쓰기 버튼 클릭
    await writeButton.click();

    // 모달이 표시되어야 함
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 모달 제목 확인
    const modalTitle = page.locator('[data-testid="diaries-new-title"]');
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toHaveText('일기쓰기');
  });

  test('모달의 닫기 버튼 클릭 시 등록취소 확인 모달이 표시되어야 한다', async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await writeButton.click();

    // 모달이 표시되는지 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 확인 모달이 표시되어야 함
    const cancelModal = page.locator('[data-testid="cancel-registration-modal"]');
    await expect(cancelModal).toBeVisible();

    // 일기쓰기 모달은 여전히 보여야 함 (2중 모달)
    await expect(modal).toBeVisible();
  });

  test('등록취소 확인 모달에서 "계속작성" 클릭 시 확인 모달만 닫혀야 한다', async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await writeButton.click();

    // 일기쓰기 모달 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 확인 모달 확인
    const cancelModal = page.locator('[data-testid="cancel-registration-modal"]');
    await expect(cancelModal).toBeVisible();

    // "계속작성" 버튼 클릭
    const continueButton = cancelModal.locator('button').filter({ hasText: '계속작성' });
    await continueButton.click();

    // 등록취소 확인 모달은 닫혀야 함
    await expect(cancelModal).not.toBeVisible();

    // 일기쓰기 모달은 여전히 보여야 함
    await expect(modal).toBeVisible();
  });

  test('등록취소 확인 모달에서 "등록취소" 클릭 시 모든 모달이 닫혀야 한다', async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await writeButton.click();

    // 일기쓰기 모달 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 닫기 버튼 클릭
    const closeButton = page.locator('[data-testid="diaries-new-close-button"]');
    await closeButton.click();

    // 등록취소 확인 모달 확인
    const cancelModal = page.locator('[data-testid="cancel-registration-modal"]');
    await expect(cancelModal).toBeVisible();

    // "등록취소" 버튼 클릭
    const cancelButton = cancelModal.locator('button').filter({ hasText: '등록취소' });
    await cancelButton.click();

    // 모든 모달이 닫혀야 함
    await expect(cancelModal).not.toBeVisible();
    await expect(modal).not.toBeVisible();
  });

  test('모달의 오버레이 클릭 시 모달이 즉시 닫혀야 한다', async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await writeButton.click();

    // 모달이 표시되는지 확인
    const modal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(modal).toBeVisible();

    // 오버레이 클릭 (모달 바깥 영역)
    await page.click('body', { position: { x: 0, y: 0 } });

    // 모달이 즉시 닫혀야 함 (등록취소 확인 모달 없이)
    await expect(modal).not.toBeVisible();
  });
});
