import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

/**
 * 일기 검색 기능 테스트
 * - 로컬스토리지에서 실제 데이터 사용
 * - title이 검색어에 포함되는 일기 카드 필터링
 * - Mock 데이터 사용 금지
 */

test.describe('Diaries - 검색 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정 후 페이지 로드
    await page.addInitScript(() => {
      const testDiaries = [
        {
          id: 1,
          title: '첫 번째 일기 제목',
          content: '첫 번째 일기 내용입니다.',
          emotion: 'Happy',
          createdAt: '2025-01-15T10:00:00.000Z',
        },
        {
          id: 2,
          title: '두 번째 일기 제목',
          content: '두 번째 일기 내용입니다.',
          emotion: 'Sad',
          createdAt: '2025-01-16T14:30:00.000Z',
        },
        {
          id: 3,
          title: '세 번째 일기 제목',
          content: '오늘은 정말 행복한 하루였어요.',
          emotion: 'Happy',
          createdAt: '2025-01-17T09:15:00.000Z',
        },
        {
          id: 4,
          title: '네 번째 일기 제목',
          content: '오늘은 조금 슬픈 일이 있었어요.',
          emotion: 'Sad',
          createdAt: '2025-01-18T11:20:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
    await page.goto('/diaries');
  });

  test('검색어 입력 후 엔터를 누르면 해당 검색어가 포함된 일기 카드만 표시되어야 한다', async ({ page }) => {
    // 페이지 로드 확인
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 검색창에 "세" 입력
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('세');
    
    // 엔터 키 입력 후 검색 결과 대기
    await searchInput.press('Enter');
    
    // "세"가 포함된 일기 카드만 표시되어야 함
    // id=3: "세 번째 일기 제목"만 표시되어야 함
    const diaryCard3 = page.locator('[data-testid="diary-card-3"]');
    await expect(diaryCard3).toBeVisible();
    
    // id=3의 제목 확인
    const title3 = page.locator('[data-testid="diary-title-3"]');
    await expect(title3).toHaveText('세 번째 일기 제목');
    
    // 다른 일기들은 보이지 않아야 함
    const diaryCard1 = page.locator('[data-testid="diary-card-1"]');
    await expect(diaryCard1).toBeHidden();
    
    const diaryCard2 = page.locator('[data-testid="diary-card-2"]');
    await expect(diaryCard2).toBeHidden();
    
    const diaryCard4 = page.locator('[data-testid="diary-card-4"]');
    await expect(diaryCard4).toBeHidden();
  });

  test('검색어로 "일기"를 입력하면 모든 일기 카드가 표시되어야 한다', async ({ page }) => {
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 검색창에 "일기" 입력
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('일기');
    
    // 엔터 키 입력 후 검색 결과 대기
    await searchInput.press('Enter');
    
    // 모든 일기 카드가 표시되어야 함 (모두 "일기"를 포함)
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
  });

  test('검색어로 존재하지 않는 단어를 입력하면 일치하는 일기 카드가 없다면 아무것도 표시되지 않아야 한다', async ({ page }) => {
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 검색창에 "없는단어" 입력 (제목에 없는 단어)
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('없는단어');
    
    // 엔터 키 입력 후 검색 결과 대기
    await searchInput.press('Enter');
    
    // 모든 일기 카드가 숨겨져야 함
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeHidden();
  });

  test('검색창을 비우고 엔터를 누르면 다시 모든 일기 카드가 표시되어야 한다', async ({ page }) => {
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 1. 검색어 입력
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('세');
    await searchInput.press('Enter');
    
    // 2. 검색 결과 확인 (1개만 표시)
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    
    // 3. 검색창 비우기
    await searchInput.clear();
    await searchInput.press('Enter');
    
    // 4. 모든 일기가 다시 표시되어야 함
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
  });

  test('부분 검색어로 여러 결과가 일치해야 한다', async ({ page }) => {
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 부분 문자열로 검색
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('번째');
    await searchInput.press('Enter');
    
    // "번째"가 포함된 모든 일기 카드 확인 (첫, 두, 세, 네 모두 포함)
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
  });

  test('부분 일치로 특정 일기만 필터링되어야 한다', async ({ page }) => {
    await page.waitForSelector('[data-testid="diaries-container"]');
    
    // 부분 문자열로 검색
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('두');
    await searchInput.press('Enter');
    
    // 일치하는 결과 확인
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-title-2"]')).toHaveText('두 번째 일기 제목');
    
    // 다른 일기들은 숨김
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeHidden();
  });
});

