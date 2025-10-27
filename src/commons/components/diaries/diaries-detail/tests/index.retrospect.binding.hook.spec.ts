import { test, expect } from '@playwright/test';

/**
 * 회고 목록 데이터 바인딩 테스트
 * - 로컬스토리지에서 실제 데이터 읽기
 * - 동적 라우팅 [id]와 일치하는 diaryId의 회고만 표시
 * - Mock 데이터 사용 금지
 */

test.describe('DiariesDetail - Retrospect Binding', () => {
  test.beforeEach(async ({ page }) => {
    // 일기 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: '첫 번째 일기',
          content: '첫 번째 일기 내용',
          emotion: 'Happy',
          createdAt: '2025-01-15T10:00:00.000Z',
        },
        {
          id: 2,
          title: '두 번째 일기',
          content: '두 번째 일기 내용',
          emotion: 'Sad',
          createdAt: '2025-01-16T14:30:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));

      // 회고 데이터 설정
      const testRetrospects = [
        {
          id: 1,
          content: '첫 번째 일기의 회고 내용입니다.',
          diaryId: 1,
          createdAt: '2025-01-15T11:00:00.000Z',
        },
        {
          id: 2,
          content: '첫 번째 일기의 두 번째 회고 내용입니다.',
          diaryId: 1,
          createdAt: '2025-01-15T12:00:00.000Z',
        },
        {
          id: 3,
          content: '두 번째 일기의 회고 내용입니다.',
          diaryId: 2,
          createdAt: '2025-01-16T15:00:00.000Z',
        },
      ];
      localStorage.setItem('retrospects', JSON.stringify(testRetrospects));
    });
  });

  test('회고 목록이 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 회고 목록 영역 대기
    const retrospectList = page.locator('[data-testid="retrospect-list"]');
    await expect(retrospectList).toBeVisible();
    
    // 회고 아이템들이 표시되어야 함
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(2);
  });

  test('특정 일기의 회고만 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // diaryId=1의 회고만 표시되어야 함
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(2);
    
    // 첫 번째 회고 내용 확인
    const firstRetrospectContent = page.locator('[data-testid="retrospect-text"]').first();
    await expect(firstRetrospectContent).toHaveText('첫 번째 일기의 회고 내용입니다.');
    
    // 두 번째 회고 내용 확인
    const secondRetrospectContent = page.locator('[data-testid="retrospect-text"]').nth(1);
    await expect(secondRetrospectContent).toHaveText('첫 번째 일기의 두 번째 회고 내용입니다.');
  });

  test('다른 일기의 회고는 표시되지 않아야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // diaryId=2의 회고는 표시되지 않아야 함
    const retrospectContents = page.locator('[data-testid="retrospect-text"]');
    const allTexts = await retrospectContents.allTextContents();
    
    expect(allTexts).not.toContain('두 번째 일기의 회고 내용입니다.');
  });

  test('회고의 날짜가 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 회고 날짜 확인
    const retrospectDates = page.locator('[data-testid="retrospect-date"]');
    await expect(retrospectDates.first()).toBeVisible();
  });

  test('회고가 없는 경우 빈 목록이 표시되어야 한다', async ({ page }) => {
    // 회고 없는 새로운 일기 추가
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 5,
          title: '회고 없는 일기',
          content: '내용',
          emotion: 'Happy',
          createdAt: '2025-01-20T10:00:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
    
    await page.goto('/diaries/5');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 회고 목록은 존재하지만 아이템은 없어야 함
    const retrospectList = page.locator('[data-testid="retrospect-list"]');
    await expect(retrospectList).toBeVisible();
    
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(0);
  });

  test('다른 일기의 회고만 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/2');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // diaryId=2의 회고만 표시되어야 함
    const retrospectItems = page.locator('[data-testid="retrospect-item"]');
    await expect(retrospectItems).toHaveCount(1);
    
    const retrospectContent = page.locator('[data-testid="retrospect-text"]');
    await expect(retrospectContent).toHaveText('두 번째 일기의 회고 내용입니다.');
  });

  test('회고 목록은 시간 순서로 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 시간 순서로 표시되어야 함 (첫 번째가 먼저 생성됨)
    const retrospectContents = page.locator('[data-testid="retrospect-text"]');
    const firstText = await retrospectContents.nth(0).textContent();
    const secondText = await retrospectContents.nth(1).textContent();
    
    expect(firstText).toBe('첫 번째 일기의 회고 내용입니다.');
    expect(secondText).toBe('첫 번째 일기의 두 번째 회고 내용입니다.');
  });
});

