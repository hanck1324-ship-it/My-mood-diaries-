import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

/**
 * Diaries 데이터 바인딩 테스트
 * 로컬스토리지의 실제 데이터를 바인딩하여 표시하는 기능을 테스트
 */

type Diary = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

test.describe('Diaries - 데이터 바인딩 Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => localStorage.clear());
  });

  test('로컬스토리지에 일기 데이터가 있으면 정상적으로 표시되어야 한다', async ({ page }) => {
    // 테스트 데이터 준비
    const testDiaries: Diary[] = [
      {
        id: 1,
        title: '행복한 하루',
        content: '오늘은 정말 행복한 하루였어요.',
        emotion: Emotion.Happy,
        createdAt: '2024.10.13',
      },
      {
        id: 2,
        title: '슬픈 하루',
        content: '오늘은 조금 슬픈 날이었어요.',
        emotion: Emotion.Sad,
        createdAt: '2024.10.12',
      },
    ];

    // 로컬스토리지에 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기 카드가 2개 표시되어야 함
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(2);

    // 첫 번째 일기 카드 확인
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await expect(firstCard).toBeVisible();

    // 첫 번째 일기의 제목 확인
    const firstTitle = firstCard.locator('[data-testid="diary-title-1"]');
    await expect(firstTitle).toHaveText('행복한 하루');

    // 첫 번째 일기의 날짜 확인
    const firstDate = firstCard.locator('[data-testid="diary-date-1"]');
    await expect(firstDate).toHaveText('2024.10.13');

    // 첫 번째 일기의 감정 확인
    const firstEmotion = firstCard.locator('[data-testid="diary-emotion-1"]');
    await expect(firstEmotion).toHaveText('행복해요');
  });

  test('로컬스토리지에 데이터가 없으면 빈 상태로 표시되어야 한다', async ({ page }) => {
    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });

    // 페이지 새로고침
    await page.reload();

    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 일기 카드가 없어야 함
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('모든 감정 타입이 올바르게 표시되어야 한다', async ({ page }) => {
    // 모든 감정 타입의 테스트 데이터 준비
    const testDiaries: Diary[] = [
      {
        id: 1,
        title: '행복',
        content: '행복한 내용',
        emotion: Emotion.Happy,
        createdAt: '2024.10.13',
      },
      {
        id: 2,
        title: '슬픔',
        content: '슬픈 내용',
        emotion: Emotion.Sad,
        createdAt: '2024.10.12',
      },
      {
        id: 3,
        title: '분노',
        content: '화난 내용',
        emotion: Emotion.Angry,
        createdAt: '2024.10.11',
      },
      {
        id: 4,
        title: '놀람',
        content: '놀란 내용',
        emotion: Emotion.Surprise,
        createdAt: '2024.10.10',
      },
      {
        id: 5,
        title: '기타',
        content: '기타 내용',
        emotion: Emotion.Etc,
        createdAt: '2024.10.09',
      },
    ];

    // 로컬스토리지에 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    // 페이지 새로고침
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 각 감정 확인
    await expect(page.locator('[data-testid="diary-emotion-1"]')).toHaveText('행복해요');
    await expect(page.locator('[data-testid="diary-emotion-2"]')).toHaveText('슬퍼요');
    await expect(page.locator('[data-testid="diary-emotion-3"]')).toHaveText('화나요');
    await expect(page.locator('[data-testid="diary-emotion-4"]')).toHaveText('놀랐어요');
    await expect(page.locator('[data-testid="diary-emotion-5"]')).toHaveText('기타');
  });

  test('긴 제목이 말줄임표로 표시되어야 한다', async ({ page }) => {
    // 긴 제목을 가진 테스트 데이터
    const testDiaries: Diary[] = [
      {
        id: 1,
        title: '이것은 매우 긴 제목입니다. 일기 카드의 크기를 넘어가는 경우 말줄임표로 표시되어야 합니다.',
        content: '내용',
        emotion: Emotion.Happy,
        createdAt: '2024.10.13',
      },
    ];

    // 로컬스토리지에 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    // 페이지 새로고침
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 제목 요소 확인
    const titleElement = page.locator('[data-testid="diary-title-1"]');
    await expect(titleElement).toBeVisible();

    // CSS overflow 속성 확인
    const overflow = await titleElement.evaluate((el) => {
      return window.getComputedStyle(el).textOverflow;
    });
    expect(overflow).toBe('ellipsis');
  });

  test('감정에 따른 이미지가 올바르게 표시되어야 한다', async ({ page }) => {
    // 테스트 데이터
    const testDiaries: Diary[] = [
      {
        id: 1,
        title: '행복',
        content: '행복한 내용',
        emotion: Emotion.Happy,
        createdAt: '2024.10.13',
      },
    ];

    // 로컬스토리지에 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    // 페이지 새로고침
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]');

    // 이미지 요소 확인
    const imageElement = page.locator('[data-testid="diary-image-1"]');
    await expect(imageElement).toBeVisible();

    // 이미지 src 확인
    const src = await imageElement.getAttribute('src');
    expect(src).toContain('emotion-happy-m.png');
  });
});

