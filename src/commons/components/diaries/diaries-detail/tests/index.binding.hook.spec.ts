import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

/**
 * 일기 상세 데이터 바인딩 Hook 테스트
 * - URL 파라미터에서 id 추출
 * - 로컬스토리지에서 해당 id의 일기 데이터 조회
 * - 날짜 포맷팅 검증
 */

test.describe('DiariesDetail - Binding Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate(() => {
      const testDiaries = [
        {
          id: 1,
          title: '첫 번째 일기 제목',
          content: '첫 번째 일기 내용입니다. 오늘은 정말 행복한 하루였어요.',
          emotion: 'Happy',
          createdAt: '2025-01-15T10:00:00.000Z',
        },
        {
          id: 2,
          title: '두 번째 일기 제목',
          content: '두 번째 일기 내용입니다. 오늘은 조금 슬픈 일이 있었어요.',
          emotion: 'Sad',
          createdAt: '2025-01-16T14:30:00.000Z',
        },
        {
          id: 3,
          title: '세 번째 일기 제목',
          content: '세 번째 일기 내용입니다. 화가 나는 일이 있었습니다.',
          emotion: 'Angry',
          createdAt: '2025-01-17T09:15:00.000Z',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(testDiaries));
    });
  });

  test('일기 상세 페이지가 로드되면 로컬스토리지에서 해당 id의 일기 데이터를 가져와야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 제목이 로컬스토리지 데이터와 일치하는지 확인
    const titleElement = page.locator('[data-testid="diary-detail-title"]');
    await expect(titleElement).toHaveText('첫 번째 일기 제목');
  });

  test('일기 상세 페이지에 제목이 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/2');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    const titleElement = page.locator('[data-testid="diary-detail-title"]');
    await expect(titleElement).toHaveText('두 번째 일기 제목');
  });

  test('일기 상세 페이지에 내용이 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    const contentElement = page.locator('[data-testid="diary-detail-content"]');
    await expect(contentElement).toHaveText('첫 번째 일기 내용입니다. 오늘은 정말 행복한 하루였어요.');
  });

  test('일기 상세 페이지에 감정 텍스트가 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // Happy 감정은 "행복해요"로 표시되어야 함
    const emotionTextElement = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionTextElement).toHaveText('행복해요');
  });

  test('일기 상세 페이지에 감정 아이콘이 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/2');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // Sad 감정 아이콘이 표시되어야 함
    const emotionIconElement = page.locator('[data-testid="diary-detail-emotion-icon"]');
    await expect(emotionIconElement).toBeVisible();
    
    // 아이콘의 alt 텍스트 확인
    await expect(emotionIconElement).toHaveAttribute('alt', '슬퍼요');
  });

  test('일기 상세 페이지에 작성일이 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/3');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    const dateElement = page.locator('[data-testid="diary-detail-date"]');
    // ISO 날짜를 포맷된 형식으로 확인 (예: 2025.01.17)
    await expect(dateElement).toContainText('2025');
  });

  test('다른 감정(Angry)의 일기도 올바르게 표시되어야 한다', async ({ page }) => {
    await page.goto('/diaries/3');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    const emotionTextElement = page.locator('[data-testid="diary-detail-emotion-text"]');
    await expect(emotionTextElement).toHaveText('화나요');
    
    const emotionIconElement = page.locator('[data-testid="diary-detail-emotion-icon"]');
    await expect(emotionIconElement).toHaveAttribute('alt', '화나요');
  });

  test('존재하지 않는 id의 경우 에러 처리되어야 한다', async ({ page }) => {
    await page.goto('/diaries/999');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 에러 메시지 또는 빈 상태 확인
    const errorElement = page.locator('[data-testid="diary-detail-error"]');
    await expect(errorElement).toBeVisible();
  });

  test('로컬스토리지가 비어있는 경우 에러 처리되어야 한다', async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => localStorage.clear());
    
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 에러 메시지 확인
    const errorElement = page.locator('[data-testid="diary-detail-error"]');
    await expect(errorElement).toBeVisible();
  });

  test('여러 일기 중 특정 id의 일기만 표시되어야 한다', async ({ page }) => {
    // id=2의 일기로 이동
    await page.goto('/diaries/2');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // id=2의 데이터만 표시되어야 함
    const titleElement = page.locator('[data-testid="diary-detail-title"]');
    await expect(titleElement).toHaveText('두 번째 일기 제목');
    
    // 다른 일기의 제목이 표시되지 않아야 함
    await expect(titleElement).not.toHaveText('첫 번째 일기 제목');
    await expect(titleElement).not.toHaveText('세 번째 일기 제목');
  });

  test('날짜가 YYYY.MM.DD 형식으로 포맷되어야 한다', async ({ page }) => {
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    const dateElement = page.locator('[data-testid="diary-detail-date"]');
    const dateText = await dateElement.textContent();
    
    // 날짜 형식 확인 (YYYY.MM.DD)
    expect(dateText).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
  });
});

