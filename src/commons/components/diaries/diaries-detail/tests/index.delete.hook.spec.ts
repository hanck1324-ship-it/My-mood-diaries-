import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';
import { TEST_TIMEOUTS } from '@/tests/test-constants';

/**
 * 일기 상세 페이지 삭제 모달 기능 테스트
 * - 로컬스토리지에서 실제 데이터 삭제
 * - Mock 데이터 사용 금지
 * - 모달 UI 테스트
 */

test.describe('DiariesDetail - 삭제 모달 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: '첫 번째 일기',
          content: '첫 번째 일기 내용',
          emotion: 'Happy',
          createdAt: '2025-10-24T03:01:30.641Z',
        },
        {
          id: 2,
          title: '두 번째 일기',
          content: '두 번째 일기 내용',
          emotion: 'Sad',
          createdAt: '2025-10-27T11:36:08.973Z',
        },
        {
          id: 3,
          title: '세 번째 일기',
          content: '세 번째 일기 내용',
          emotion: 'Angry',
          createdAt: '2025-10-27T11:37:58.157Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('삭제 버튼을 클릭하면 삭제 확인 모달이 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 삭제 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 모달 제목 확인
    await expect(page.locator('[data-testid="delete-modal-title"]')).toContainText('일기 삭제');
    
    // 모달 설명 확인
    await expect(page.locator('[data-testid="delete-modal-description"]')).toContainText('정말 삭제하시겠습니까?');
    
    // 취소 버튼 확인
    await expect(page.locator('[data-testid="delete-modal-cancel"]')).toBeVisible();
    
    // 삭제 버튼 확인
    await expect(page.locator('[data-testid="delete-modal-confirm"]')).toBeVisible();
  });

  test('삭제 모달에서 취소 버튼을 클릭하면 모달이 닫혀야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 취소 버튼 클릭
    await page.locator('[data-testid="delete-modal-cancel"]').click();
    
    // 모달이 사라졌는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).not.toBeVisible();
    
    // 여전히 상세 페이지에 있는지 확인
    await expect(page).toHaveURL(/\/diaries\/1$/);
    
    // 일기 내용이 여전히 표시되는지 확인
    await expect(page.locator('[data-testid="diary-detail-title"]')).toContainText('첫 번째 일기');
  });

  test('삭제 모달에서 삭제 버튼을 클릭하면 일기가 삭제되고 목록 페이지로 이동해야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 삭제 확인 버튼 클릭
    await page.locator('[data-testid="delete-modal-confirm"]').click();
    
    // 목록 페이지로 이동 확인
    await expect(page).toHaveURL(/\/diaries$/);
    
    // 일기 목록이 로드되었는지 확인
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('삭제 모달에서 삭제 버튼을 클릭하면 로컬스토리지에서 데이터가 삭제되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 삭제 확인 버튼 클릭
    await page.locator('[data-testid="delete-modal-confirm"]').click();
    
    // 목록 페이지로 이동 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 잠시 대기 (삭제 처리 완료)
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT / 5);
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('diaries') || '[]');
    });
    
    // id=1이 삭제되었는지 확인
    expect(diaries.find((d: any) => d.id === 1)).toBeUndefined();
    
    // 나머지 일기는 유지되어야 함
    expect(diaries.length).toBe(2);
    expect(diaries.find((d: any) => d.id === 2)).toBeDefined();
    expect(diaries.find((d: any) => d.id === 3)).toBeDefined();
  });

  test('삭제 취소 시 데이터는 유지되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).toBeVisible();
    
    // 취소 버튼 클릭
    await page.locator('[data-testid="delete-modal-cancel"]').click();
    
    // 모달이 사라졌는지 확인
    await expect(page.locator('[data-testid="delete-modal"]')).not.toBeVisible();
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('diaries') || '[]');
    });
    
    // 모든 데이터가 유지되어야 함
    expect(diaries.length).toBe(3);
    expect(diaries.find((d: any) => d.id === 1)).toBeDefined();
    expect(diaries.find((d: any) => d.id === 2)).toBeDefined();
    expect(diaries.find((d: any) => d.id === 3)).toBeDefined();
  });
});

