import { test, expect } from '@playwright/test';
import { TEST_TIMEOUTS } from '@/tests/test-constants';
import { Emotion } from '@/commons/constants/enum';

/**
 * 일기 삭제 기능 테스트 (권한 분기 포함)
 * - 비로그인 유저: 삭제 아이콘(X) 미노출
 * - 로그인 유저: 삭제 아이콘(X) 노출, 모달을 통한 삭제 처리
 * - Mock 데이터 사용 금지, 실제 로컬스토리지 데이터 사용
 */

test.describe('Diaries - 삭제 기능 (비로그인 유저)', () => {
  test.beforeEach(async ({ page }) => {
    // 비로그인 상태 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      // 비로그인 유저 모드 활성화
      (window as any).__TEST_BYPASS__ = false;
      
      // 테스트 데이터 설정
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
          emotion: 'Happy',
          createdAt: '2025-10-27T11:37:58.157Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('비로그인 유저는 일기카드의 삭제아이콘(X)이 보이지 않아야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 일기 카드가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 삭제 버튼이 보이지 않는지 확인
    const deleteButtons = await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').count();
    expect(deleteButtons).toBe(0);
  });

  test('비로그인 유저는 모든 일기카드의 삭제아이콘(X)이 보이지 않아야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 모든 일기 카드 확인
    const allDeleteButtons = await page.locator('button[aria-label="일기 삭제"]').count();
    expect(allDeleteButtons).toBe(0);
  });
});

test.describe('Diaries - 삭제 기능 (로그인 유저)', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 상태 설정 (기본값)
    await page.goto('/diaries');
    await page.evaluate(() => {
      // 로그인 유저는 기본값이므로 __TEST_BYPASS__ 설정 불필요
      
      // 테스트 데이터 설정
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
          emotion: 'Happy',
          createdAt: '2025-10-27T11:37:58.157Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('로그인 유저는 일기카드의 삭제아이콘(X)이 보여야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 일기 카드가 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 삭제 버튼이 보이는지 확인
    const deleteButton = page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]');
    await expect(deleteButton).toBeVisible();
  });

  test('로그인 유저는 모든 일기카드의 삭제아이콘(X)이 보여야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 모든 삭제 버튼 확인
    const allDeleteButtons = await page.locator('button[aria-label="일기 삭제"]').count();
    expect(allDeleteButtons).toBeGreaterThan(0);
  });

  test('삭제아이콘(X) 클릭 시 삭제 모달이 노출되어야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').click();
    
    // 모달이 나타나는지 확인
    await expect(page.locator('[data-testid="diary-delete-modal"]')).toBeVisible();
  });

  test('삭제 모달에서 "취소" 클릭 시 모달이 닫혀야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').click();
    
    // 모달 대기
    await page.waitForSelector('[data-testid="diary-delete-modal"]');
    
    // 취소 버튼 클릭
    await page.locator('[data-testid="diary-delete-modal-cancel"]').click();
    
    // 모달이 사라지는지 확인
    await expect(page.locator('[data-testid="diary-delete-modal"]')).not.toBeVisible();
  });

  test('삭제 모달에서 "삭제" 클릭 시 일기가 삭제되고 모달이 닫혀야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 첫 번째 일기 존재 확인
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').click();
    
    // 모달 대기
    await page.waitForSelector('[data-testid="diary-delete-modal"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-delete-modal-confirm"]').click();
    
    // 모달이 사라질 때까지 대기
    await expect(page.locator('[data-testid="diary-delete-modal"]')).not.toBeVisible();
    
    // 로컬스토리지에서 데이터 삭제 확인
    const diaries = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('diaries') || '[]');
    });
    
    // id=1이 삭제되었는지 확인
    expect(diaries.find((d: any) => d.id === 1)).toBeUndefined();
  });

  test('삭제 후 페이지가 새로고침되어야 한다', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="diary-card-1"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-card-1"] button[aria-label="일기 삭제"]').click();
    
    // 모달 대기
    await page.waitForSelector('[data-testid="diary-delete-modal"]');
    
    // 삭제 버튼 클릭
    await page.locator('[data-testid="diary-delete-modal-confirm"]').click();
    
    // 페이지 새로고침 후 컨테이너 재로드 확인
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // URL이 /diaries인지 확인
    await expect(page).toHaveURL(/\/diaries$/);
  });
});

