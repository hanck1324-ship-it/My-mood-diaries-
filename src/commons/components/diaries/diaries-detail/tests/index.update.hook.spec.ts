import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

test.describe('일기상세 수정 기능', () => {
  const testDiaries = [
    {
      id: 1,
      title: '테스트 일기 제목',
      content: '테스트 일기 내용입니다.',
      emotion: Emotion.Happy,
      createdAt: '2024-01-01T10:00:00.000Z'
    },
    {
      id: 2, 
      title: '다른 일기',
      content: '다른 일기 내용',
      emotion: Emotion.Sad,
      createdAt: '2024-01-02T10:00:00.000Z'
    }
  ];

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
  });

  test('일기상세 페이지 로드 후 수정 모드 전환 확인', async ({ page }) => {
    // 1. /diaries/1에 접속하여 페이지 로드 확인
    await page.goto('/diaries/1');
    
    // 페이지 로드 식별자 대기 (data-testid)
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText('테스트 일기 제목');
    
    // 2. 수정 버튼 클릭
    await page.locator('[data-testid="diary-detail-edit-button"]').click();
    
    // 3. 수정 모드로 UI 변경 확인
    await expect(page.locator('[data-testid="edit-mode-container"]')).toBeVisible();
    
    // 4. 수정 모드에서 회고 입력창 비활성화 확인
    await expect(page.locator('[data-testid="retrospect-input"]')).toBeDisabled();
    
    // 5. 수정 폼 필드들 확인
    await expect(page.locator('[data-testid="edit-emotion-select"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-title-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-content-textarea"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-submit-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-cancel-button"]')).toBeVisible();
  });

  test('수정 폼에 기존 데이터 표시 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    
    await page.locator('[data-testid="diary-detail-edit-button"]').click();
    await expect(page.locator('[data-testid="edit-mode-container"]')).toBeVisible();
    
    // 기존 데이터가 폼에 표시되는지 확인
    await expect(page.locator('[data-testid="edit-title-input"]')).toHaveValue('테스트 일기 제목');
    await expect(page.locator('[data-testid="edit-content-textarea"]')).toHaveValue('테스트 일기 내용입니다.');
    await expect(page.locator('[data-testid="edit-emotion-select"]')).toHaveValue(Emotion.Happy);
  });

  test('수정 완료 후 상세 페이지로 돌아가기', async ({ page }) => {
    await page.goto('/diaries/1');
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    
    // 수정 모드 진입
    await page.locator('[data-testid="diary-detail-edit-button"]').click();
    await expect(page.locator('[data-testid="edit-mode-container"]')).toBeVisible();
    
    // 데이터 수정
    await page.locator('[data-testid="edit-title-input"]').fill('수정된 제목');
    await page.locator('[data-testid="edit-content-textarea"]').fill('수정된 내용');
    await page.locator('[data-testid="edit-emotion-select"]').selectOption(Emotion.Angry);
    
    // 수정 완료
    await page.locator('[data-testid="edit-submit-button"]').click();
    
    // 상세 페이지로 돌아가기
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-mode-container"]')).not.toBeVisible();
    
    // 회고 입력창 다시 활성화 확인
    await expect(page.locator('[data-testid="retrospect-input"]')).not.toBeDisabled();
    
    // 수정된 데이터 확인
    await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText('수정된 제목');
    await expect(page.locator('[data-testid="diary-detail-content"]')).toHaveText('수정된 내용');
  });

  test('수정 취소 시 원본 데이터 유지', async ({ page }) => {
    await page.goto('/diaries/1');
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    
    // 수정 모드 진입
    await page.locator('[data-testid="diary-detail-edit-button"]').click();
    await expect(page.locator('[data-testid="edit-mode-container"]')).toBeVisible();
    
    // 데이터 수정 (but cancel)
    await page.locator('[data-testid="edit-title-input"]').fill('취소될 제목');
    await page.locator('[data-testid="edit-content-textarea"]').fill('취소될 내용');
    
    // 취소 버튼 클릭
    await page.locator('[data-testid="edit-cancel-button"]').click();
    
    // 상세 페이지로 돌아가기
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="edit-mode-container"]')).not.toBeVisible();
    
    // 원본 데이터 유지 확인
    await expect(page.locator('[data-testid="diary-detail-title"]')).toHaveText('테스트 일기 제목');
    await expect(page.locator('[data-testid="diary-detail-content"]')).toHaveText('테스트 일기 내용입니다.');
  });

  test('수정 데이터 로컬스토리지 저장 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    await expect(page.locator('[data-testid="diary-detail-container"]')).toBeVisible();
    
    // 수정 모드 진입 및 수정
    await page.locator('[data-testid="diary-detail-edit-button"]').click();
    await expect(page.locator('[data-testid="edit-mode-container"]')).toBeVisible();
    
    await page.locator('[data-testid="edit-title-input"]').fill('저장 확인 제목');
    await page.locator('[data-testid="edit-content-textarea"]').fill('저장 확인 내용');
    await page.locator('[data-testid="edit-emotion-select"]').selectOption(Emotion.Surprise);
    
    await page.locator('[data-testid="edit-submit-button"]').click();
    
    // 로컬스토리지에서 데이터 확인
    const updatedDiaries = await page.evaluate(() => {
      const diariesData = localStorage.getItem('diaries');
      return diariesData ? JSON.parse(diariesData) : [];
    });
    
    const updatedDiary = updatedDiaries.find((d: any) => d.id === 1);
    expect(updatedDiary).toBeTruthy();
    expect(updatedDiary.title).toBe('저장 확인 제목');
    expect(updatedDiary.content).toBe('저장 확인 내용');
    expect(updatedDiary.emotion).toBe(Emotion.Surprise);
  });
});
