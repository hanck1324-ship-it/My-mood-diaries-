import { test, expect } from '@playwright/test';
import { TEST_TIMEOUTS } from '@/tests/test-constants';

/**
 * Diaries Detail - 회고 등록 폼 Hook 테스트
 * 로컬스토리지에 회고를 등록하는 기능을 테스트
 */

type Retrospect = {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
};

test.describe('Diaries Detail - 회고 등록 폼 Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries/1');
    await page.evaluate(() => {
      localStorage.clear();
    });

    // 테스트용 일기 데이터 설정
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([
        {
          id: 1,
          title: '테스트 일기',
          content: '테스트 내용',
          emotion: 'Happy',
          createdAt: '2025-01-15',
        },
      ]));
    });

    // 페이지 새로고침
    await page.reload();
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
  });

  test('회고 입력 후 입력 버튼 클릭 시 로컬스토리지에 저장되어야 한다', async ({ page }) => {
    // 회고 입력
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    await retrospectInput.fill('오늘도 즐거운 하루였다.');
    
    // 입력 버튼 클릭
    const inputButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(inputButton).toBeEnabled();
    await inputButton.click();

    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : [];
    });

    expect(retrospects).toHaveLength(1);
    expect(retrospects[0].content).toBe('오늘도 즐거운 하루였다.');
    expect(retrospects[0].diaryId).toBe(1);
    expect(retrospects[0].id).toBe(1);
    expect(retrospects[0].createdAt).toBeDefined();
  });

  test('회고가 입력되지 않으면 입력 버튼이 비활성화되어야 한다', async ({ page }) => {
    const inputButton = page.locator('[data-testid="retrospect-submit-button"]');
    await expect(inputButton).toBeDisabled();
  });

  test('여러 회고를 등록할 때 id가 순차적으로 증가해야 한다', async ({ page }) => {
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    const inputButton = page.locator('[data-testid="retrospect-submit-button"]');

    // 첫 번째 회고 등록
    await retrospectInput.fill('첫 번째 회고');
    await inputButton.click();

    // 페이지 새로고침 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);

    // 두 번째 회고 등록
    await retrospectInput.fill('두 번째 회고');
    await inputButton.click();

    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : [];
    });

    expect(retrospects).toHaveLength(2);
    expect(retrospects[0].id).toBe(1);
    expect(retrospects[1].id).toBe(2);
  });

  test('회고 등록 후 입력 필드가 초기화되어야 한다', async ({ page }) => {
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    const inputButton = page.locator('[data-testid="retrospect-submit-button"]');

    // 회고 입력 및 등록
    await retrospectInput.fill('테스트 회고');
    await inputButton.click();

    // 페이지 새로고침 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);

    // 입력 필드 확인
    await expect(retrospectInput).toHaveValue('');
  });

  test('다른 일기에 대한 회고는 diaryId가 다르게 저장되어야 한다', async ({ page }) => {
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    const inputButton = page.locator('[data-testid="retrospect-submit-button"]');

    // 첫 번째 일기에 회고 등록
    await retrospectInput.fill('첫 번째 일기 회고');
    await inputButton.click();
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);

    // 두 번째 일기 페이지로 이동
    await page.goto('/diaries/2');
    await page.waitForSelector('[data-testid="diary-detail-container"]');

    // 두 번째 일기 데이터 설정
    await page.evaluate(() => {
      const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
      diaries.push({
        id: 2,
        title: '두 번째 일기',
        content: '두 번째 내용',
        emotion: 'Sad',
        createdAt: '2025-01-16',
      });
      localStorage.setItem('diaries', JSON.stringify(diaries));
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diary-detail-container"]');

    // 두 번째 일기에 회고 등록
    await retrospectInput.fill('두 번째 일기 회고');
    await inputButton.click();

    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : [];
    });

    expect(retrospects).toHaveLength(2);
    expect(retrospects[0].diaryId).toBe(1);
    expect(retrospects[1].diaryId).toBe(2);
  });
});
