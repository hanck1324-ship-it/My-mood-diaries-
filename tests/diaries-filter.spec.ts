import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

/**
 * 일기 필터 기능 테스트
 * - 로컬스토리지에서 실제 데이터 사용
 * - emotion별 필터링
 * - Mock 데이터 사용 금지
 */

test.describe('Diaries - 필터 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: '행복한 하루',
          content: '오늘은 정말 행복한 하루였어요.',
          emotion: 'Happy',
          createdAt: '2025-01-15T10:00:00.000Z',
        },
        {
          id: 2,
          title: '슬픈 날',
          content: '오늘은 조금 슬픈 일이 있었어요.',
          emotion: 'Sad',
          createdAt: '2025-01-16T14:30:00.000Z',
        },
        {
          id: 3,
          title: '놀라운 하루',
          content: '예상치 못한 일이 발생했어요.',
          emotion: 'Surprise',
          createdAt: '2025-01-17T09:15:00.000Z',
        },
        {
          id: 4,
          title: '화난 하루',
          content: '정말 화가 난 하루였어요.',
          emotion: 'Angry',
          createdAt: '2025-01-18T11:20:00.000Z',
        },
        {
          id: 5,
          title: '행복한 여행',
          content: '여행은 언제나 행복해요.',
          emotion: 'Happy',
          createdAt: '2025-01-19T15:45:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-container"]');
  });

  test('필터 선택박스를 클릭하면 전체, 행복해요, 슬퍼요, 놀랐어요, 화나요 옵션이 표시되어야 한다', async ({ page }) => {
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    
    // 필터 클릭
    await selectBox.click();
    
    // 옵션 확인
    await expect(page.getByText('전체')).toBeVisible();
    await expect(page.getByText('행복해요')).toBeVisible();
    await expect(page.getByText('슬퍼요')).toBeVisible();
    await expect(page.getByText('놀랐어요')).toBeVisible();
    await expect(page.getByText('화나요')).toBeVisible();
  });

  test('"행복해요" 필터를 선택하면 행복해요 감정의 일기 카드만 표시되어야 한다', async ({ page }) => {
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    
    // 필터 클릭
    await selectBox.click();
    
    // "행복해요" 선택
    await page.getByText('행복해요').click();
    
    // React 상태 업데이트 대기
    await page.waitForTimeout(100);
    
    // Happy 감정 일기만 표시 (id: 1, 5)
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-title-1"]')).toHaveText('행복한 하루');
    
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-title-5"]')).toHaveText('행복한 여행');
    
    // 다른 감정 일기들은 숨김
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeHidden(); // Sad
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeHidden(); // Surprise
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeHidden(); // Angry
  });

  test('"슬퍼요" 필터를 선택하면 슬퍼요 감정의 일기 카드만 표시되어야 한다', async ({ page }) => {
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    
    await selectBox.click();
    await page.getByText('슬퍼요').click();
    await page.waitForTimeout(100);
    
    // Sad 감정 일기만 표시 (id: 2)
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-title-2"]')).toHaveText('슬픈 날');
    
    // 다른 감정 일기들은 숨김
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeHidden();
  });

  test('"놀랐어요" 필터를 선택하면 놀랐어요 감정의 일기 카드만 표시되어야 한다', async ({ page }) => {
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    
    await selectBox.click();
    await page.getByText('놀랐어요').click();
    await page.waitForTimeout(100);
    
    // Surprise 감정 일기만 표시 (id: 3)
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-title-3"]')).toHaveText('놀라운 하루');
    
    // 다른 감정 일기들은 숨김
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeHidden();
  });

  test('"화나요" 필터를 선택하면 화나요 감정의 일기 카드만 표시되어야 한다', async ({ page }) => {
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    
    await selectBox.click();
    await page.getByText('화나요').click();
    await page.waitForTimeout(100);
    
    // Angry 감정 일기만 표시 (id: 4)
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-title-4"]')).toHaveText('화난 하루');
    
    // 다른 감정 일기들은 숨김
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeHidden();
  });

  test('필터를 "전체"로 변경하면 모든 일기 카드가 표시되어야 한다', async ({ page }) => {
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    
    // 1. "행복해요" 필터 선택
    await selectBox.click();
    await page.getByText('행복해요').click();
    await page.waitForTimeout(100);
    
    // 2. 2개만 표시되는지 확인
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeHidden();
    
    // 3. "전체" 필터 선택
    await selectBox.click();
    await page.getByText('전체').click();
    await page.waitForTimeout(100);
    
    // 4. 모든 일기 표시
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();
  });

  test('검색 결과에 필터를 적용하면 검색된 결과만 필터링되어야 한다', async ({ page }) => {
    // 1. 검색어 입력 (행복)
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    await page.waitForTimeout(100);
    
    // 2. 검색 결과 확인 (id: 1, 5)
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();
    
    // 3. "행복해요" 필터 선택 (변화 없음, 모든 검색 결과가 Happy)
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    await selectBox.click();
    await page.getByText('행복해요').click();
    await page.waitForTimeout(100);
    
    // 4. 여전히 2개 모두 표시되어야 함
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeVisible();
    
    // 5. "슬퍼요" 필터 선택 (결과 없음)
    await selectBox.click();
    await page.getByText('슬퍼요').click();
    await page.waitForTimeout(100);
    
    // 6. 검색 결과는 있지만 필터가 맞지 않으므로 모두 숨김
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden();
    await expect(page.locator('[data-testid="diary-card-5"]')).toBeHidden();
  });

  test('여러 감정이 섞인 검색 결과에 필터를 적용하면 선택한 감정만 표시되어야 한다', async ({ page }) => {
    // 1. 검색어 입력 ("하루" - id: 1, 3)
    const searchInput = page.locator('[data-testid="searchbar"] input');
    await searchInput.fill('하루');
    await searchInput.press('Enter');
    await page.waitForTimeout(100);
    
    // 2. 검색 결과 확인
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible(); // Happy
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible(); // Surprise
    
    // 3. "행복해요" 필터 선택
    const selectBox = page.locator('[data-testid="diaries-filter-selectbox"]');
    await selectBox.click();
    await page.getByText('행복해요').click();
    await page.waitForTimeout(100);
    
    // 4. Happy만 표시되어야 함
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible(); // Happy
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeHidden(); // Surprise
    
    // 5. "놀랐어요" 필터로 변경
    await selectBox.click();
    await page.getByText('놀랐어요').click();
    await page.waitForTimeout(100);
    
    // 6. Surprise만 표시되어야 함
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeHidden(); // Happy
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible(); // Surprise
  });
});

