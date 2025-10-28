import { test, expect } from '@playwright/test';
import { TEST_TIMEOUTS } from './test-constants';

/**
 * 다이어리 페이지네이션 기능 테스트
 * - 한 페이지에 3행 4열 = 12개 일기카드 표시
 * - 페이지 번호 1,2,3,4,5 형태로 5개 단위 표시
 * - 검색결과 페이지네이션
 * - 필터결과 페이지네이션
 */

test.describe('Diaries - 페이지네이션 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트용 일기 데이터 준비 (25개 - 3페이지분)
    const testDiaries = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `테스트 일기 ${i + 1}`,
      content: `테스트 내용 ${i + 1}`,
      emotion: ['Happy', 'Sad', 'Angry', 'Surprise', 'Etc'][i % 5],
      createdAt: `2024.01.${String(i + 1).padStart(2, '0')}`
    }));

    await page.goto('/diaries');
    
    // 로컬스토리지에 테스트 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('한 페이지에 3행 4열로 총 12개의 일기카드가 노출되는지 확인', async ({ page }) => {
    // 첫 번째 페이지에서 일기카드 개수 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12);
    
    // 다이어리 컨테이너가 보이는지 확인
    const diariesContainer = page.locator('[data-testid="diaries-container"]');
    await expect(diariesContainer).toBeVisible();
  });

  test('페이지 번호가 1, 2, 3, 4, 5 형태로 5개 단위로 노출되는지 확인', async ({ page }) => {
    // 페이지네이션 컨테이너 확인
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).toBeVisible();
    
    // 페이지 번호 버튼들 확인 (25개 데이터 = 3페이지)
    const pageButtons = pagination.locator('button').filter({ hasText: /^[1-3]$/ });
    await expect(pageButtons).toHaveCount(3);
    
    // 첫 번째 페이지가 활성화되어 있는지 확인
    const currentPageButton = pagination.locator('button').filter({ hasText: '1' }).first();
    await expect(currentPageButton).toHaveClass(/active/);
  });

  test('페이지번호 클릭 시 해당 페이지의 일기 컨텐츠가 표시되는지 확인', async ({ page }) => {
    // 첫 번째 페이지의 첫 번째 일기 제목 확인
    const firstPageFirstDiary = page.locator('[data-testid="diary-title-1"]');
    await expect(firstPageFirstDiary).toHaveText('테스트 일기 1');
    
    // 2페이지 클릭
    const page2Button = page.locator('[data-testid="pagination"] button').filter({ hasText: '2' });
    await page2Button.click();
    
    // 두 번째 페이지 데이터 확인 (13번째 일기부터)
    const secondPageFirstDiary = page.locator('[data-testid="diary-title-13"]');
    await expect(secondPageFirstDiary).toHaveText('테스트 일기 13');
    
    // 3페이지 클릭
    const page3button = page.locator('[data-testid="pagination"] button').filter({ hasText: '3' });
    await page3button.click();
    
    // 세 번째 페이지 데이터 확인 (25번째 일기만 있어야 함)
    const thirdPageDiary = page.locator('[data-testid="diary-title-25"]');
    await expect(thirdPageDiary).toHaveText('테스트 일기 25');
    
    // 마지막 페이지에는 1개의 일기만 있어야 함
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
  });

  test('검색결과에 맞게 페이지 수가 변경되는지 확인', async ({ page }) => {
    // "테스트 일기 1"로 검색 (12개 결과: 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21)
    const searchBar = page.locator('input[placeholder*="검색어"]');
    await searchBar.fill('1');
    await searchBar.press('Enter');
    
    // 검색 결과 로딩 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);
    
    // 검색된 결과에 맞는 페이지 번호 확인 (12개 결과 = 1페이지)
    const pagination = page.locator('[data-testid="pagination"]');
    const pageButtons = pagination.locator('button').filter({ hasText: /^[1-9]$/ });
    await expect(pageButtons).toHaveCount(1);
    
    // 검색된 일기 개수 확인
    const searchedCards = page.locator('[data-testid^="diary-card-"]');
    await expect(searchedCards).toHaveCount(12);
  });

  test('필터결과에 맞게 페이지 수가 변경되는지 확인', async ({ page }) => {
    // "행복해요" 필터 선택 (5개 결과: Happy 감정의 일기들)
    const filterSelectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    await filterSelectBox.click();
    
    const happyOption = page.locator('[data-testid="selectbox-option-Happy"]');
    await happyOption.click();
    
    // 필터 결과 로딩 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);
    
    // 필터된 결과에 맞는 페이지 번호 확인 (5개 결과 = 1페이지)
    const pagination = page.locator('[data-testid="pagination"]');
    const pageButtons = pagination.locator('button').filter({ hasText: /^[1-9]$/ });
    await expect(pageButtons).toHaveCount(1);
    
    // 필터된 일기 개수 확인 (Happy 감정: 1, 6, 11, 16, 21번 일기 = 5개)
    const filteredCards = page.locator('[data-testid^="diary-card-"]');
    await expect(filteredCards).toHaveCount(5);
    
    // 모든 카드가 "행복해요" 감정인지 확인
    const emotionLabels = page.locator('[data-testid^="diary-emotion-"]');
    for (let i = 0; i < 5; i++) {
      await expect(emotionLabels.nth(i)).toHaveText('행복해요');
    }
  });

  test('검색과 필터를 함께 적용했을 때 페이지네이션이 정상 작동하는지 확인', async ({ page }) => {
    // 먼저 "1"로 검색
    const searchBar = page.locator('input[placeholder*="검색어"]');
    await searchBar.fill('1');
    await searchBar.press('Enter');
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);
    
    // 그 다음 "행복해요" 필터 적용
    const filterSelectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    await filterSelectBox.click();
    
    const happyOption = page.locator('[data-testid="selectbox-option-Happy"]');
    await happyOption.click();
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT);
    
    // 검색 + 필터 결과 확인 (1, 11, 16, 21번 일기 = 4개)
    const combinedCards = page.locator('[data-testid^="diary-card-"]');
    await expect(combinedCards).toHaveCount(4);
    
    // 페이지 번호는 1페이지만 있어야 함
    const pagination = page.locator('[data-testid="pagination"]');
    const pageButtons = pagination.locator('button').filter({ hasText: /^[1-9]$/ });
    await expect(pageButtons).toHaveCount(1);
  });
});
