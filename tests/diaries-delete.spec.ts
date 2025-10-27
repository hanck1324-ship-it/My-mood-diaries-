import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

/**
 * 일기 삭제 기능 테스트
 * - 로컬스토리지에서 실제 데이터 삭제
 * - Mock 데이터 사용 금지
 * - 삭제 확인 다이얼로그 테스트
 */

test.describe('Diaries - 삭제 기능', () => {
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
          emotion: 'Happy',
          createdAt: '2025-10-27T11:36:08.973Z',
        },
        {
          id: 3,
          title: '세 번째 일기',
          content: '세 번째 일기 내용',
          emotion: 'Happy',
          createdAt: '2025-10-27T11:37:58.157Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('일기 카드의 삭제 버튼을 클릭하면 확인 다이얼로그가 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 다이얼로그 확인 버튼 클릭 (클릭 전에 리스너 설정)
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('정말 삭제');
      await dialog.accept();
    });
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').click();
  });

  test('일기 카드 삭제 버튼 클릭 후 확인하면 해당 일기가 목록에서 사라져야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 첫 번째 일기가 존재하는지 확인
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    
    // 다이얼로그 자동 확인 (클릭 전에 리스너 설정)
    page.on('dialog', dialog => dialog.accept());
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').click();
    
    // 페이지 새로고침 대기
    await page.waitForTimeout(100);
    
    // 데이터가 삭제되었는지 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('diaries') || '[]');
    });
    
    // id=1이 삭제되었는지 확인
    expect(diaries.find((d: any) => d.id === 1)).toBeUndefined();
  });

  test('일기 상세 페이지의 삭제 버튼을 클릭하면 확인 다이얼로그가 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 다이얼로그 확인 (클릭 전에 리스너 설정)
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('정말 삭제');
      await dialog.accept();
    });
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
  });

  test('일기 상세 페이지에서 삭제 후 확인하면 목록 페이지로 이동해야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 다이얼로그 자동 확인 (클릭 전에 리스너 설정)
    page.on('dialog', dialog => dialog.accept());
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 목록 페이지로 이동 확인
    await expect(page).toHaveURL(/\/diaries$/);
    
    // 일기 목록이 로드되었는지 확인
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('일기 상세 페이지에서 삭제 후 로컬스토리지에서 데이터가 삭제되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 다이얼로그 자동 확인 (클릭 전에 리스너 설정)
    page.on('dialog', dialog => dialog.accept());
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-detail-delete-button"]').click();
    
    // 목록 페이지로 이동 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 잠시 대기 (삭제 처리 완료)
    await page.waitForTimeout(100);
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('diaries') || '[]');
    });
    
    // id=1이 삭제되었는지 확인
    expect(diaries.find((d: any) => d.id === 1)).toBeUndefined();
  });
});

