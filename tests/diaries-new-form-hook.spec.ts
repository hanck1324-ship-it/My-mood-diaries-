import { test, expect } from '@playwright/test';

/**
 * 일기쓰기 폼 등록 기능 테스트
 * - react-hook-form + zod 검증
 * - 로컬스토리지 저장
 * - 등록 완료 모달 표시
 * - 상세 페이지로 이동
 */

test.describe('DiariesNew - Form Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => localStorage.clear());
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-container"]', { timeout: 500 });
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    const writeButton = page.locator('[data-testid="diaries-write-button"]');
    await writeButton.click();
    
    // 일기쓰기 모달이 표시되는지 확인
    await page.waitForSelector('[data-testid="diaries-new-modal"]', { timeout: 500 });
  });

  test('모든 필드가 입력되지 않으면 등록하기 버튼이 비활성화되어야 한다', async ({ page }) => {
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    
    // 초기 상태: 버튼 비활성화
    await expect(submitButton).toBeDisabled();
  });

  test('emotion만 선택하고 title과 content가 비어있으면 등록하기 버튼이 비활성화되어야 한다', async ({ page }) => {
    // emotion 선택 (label 클릭)
    const happyLabel = page.locator('label:has(input[type="radio"][value="Happy"])');
    await happyLabel.click();
    
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('emotion과 title만 입력하고 content가 비어있으면 등록하기 버튼이 비활성화되어야 한다', async ({ page }) => {
    // emotion 선택 (label 클릭)
    const happyLabel = page.locator('label:has(input[type="radio"][value="Happy"])');
    await happyLabel.click();
    
    // title 입력
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('테스트 제목');
    
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });

  test('모든 필드가 입력되면 등록하기 버튼이 활성화되어야 한다', async ({ page }) => {
    // emotion 선택 (label 클릭)
    const happyLabel = page.locator('label:has(input[type="radio"][value="Happy"])');
    await happyLabel.click();
    
    // title 입력
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('테스트 제목');
    
    // content 입력
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력해주세요"]');
    await contentTextarea.fill('테스트 내용입니다.');
    
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await expect(submitButton).toBeEnabled();
  });

  test('로컬스토리지가 비어있을 때 등록하면 id=1로 새로운 diaries 배열이 생성되어야 한다', async ({ page }) => {
    // 모든 필드 입력
    const happyLabel = page.locator('label:has(input[type="radio"][value="Happy"])');
    await happyLabel.click();
    
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('첫 번째 일기');
    
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력해주세요"]');
    await contentTextarea.fill('첫 번째 일기 내용입니다.');
    
    // 등록하기 버튼 클릭
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await submitButton.click();
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diaries).not.toBeNull();
    expect(diaries).toHaveLength(1);
    expect(diaries[0]).toMatchObject({
      id: 1,
      title: '첫 번째 일기',
      content: '첫 번째 일기 내용입니다.',
      emotion: 'Happy',
    });
    expect(diaries[0].createdAt).toBeTruthy();
  });

  test('로컬스토리지에 diaries가 이미 존재할 때 등록하면 기존 배열에 추가되어야 한다', async ({ page }) => {
    // 로컬스토리지에 기존 데이터 추가
    await page.evaluate(() => {
      const existingDiaries = [
        {
          id: 1,
          title: '기존 일기',
          content: '기존 일기 내용',
          emotion: 'Happy',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(existingDiaries));
    });
    
    // 모든 필드 입력
    const sadLabel = page.locator('label:has(input[type="radio"][value="Sad"])');
    await sadLabel.click();
    
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('두 번째 일기');
    
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력해주세요"]');
    await contentTextarea.fill('두 번째 일기 내용입니다.');
    
    // 등록하기 버튼 클릭
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await submitButton.click();
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diaries).not.toBeNull();
    expect(diaries).toHaveLength(2);
    expect(diaries[1]).toMatchObject({
      id: 2,
      title: '두 번째 일기',
      content: '두 번째 일기 내용입니다.',
      emotion: 'Sad',
    });
    expect(diaries[1].createdAt).toBeTruthy();
  });

  test('등록 완료 후 등록완료 모달이 표시되어야 한다', async ({ page }) => {
    // 모든 필드 입력
    const happyLabel = page.locator('label:has(input[type="radio"][value="Happy"])');
    await happyLabel.click();
    
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('테스트 제목');
    
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력해주세요"]');
    await contentTextarea.fill('테스트 내용입니다.');
    
    // 등록하기 버튼 클릭
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await submitButton.click();
    
    // 등록완료 모달 확인
    const successModal = page.locator('[data-testid="registration-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 500 });
  });

  test('등록완료 모달의 확인 버튼을 클릭하면 상세 페이지로 이동하고 모든 모달이 닫혀야 한다', async ({ page }) => {
    // 모든 필드 입력
    const happyLabel = page.locator('label:has(input[type="radio"][value="Happy"])');
    await happyLabel.click();
    
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('테스트 제목');
    
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력해주세요"]');
    await contentTextarea.fill('테스트 내용입니다.');
    
    // 등록하기 버튼 클릭
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await submitButton.click();
    
    // 등록완료 모달 확인
    const successModal = page.locator('[data-testid="registration-success-modal"]');
    await expect(successModal).toBeVisible({ timeout: 500 });
    
    // 확인 버튼 클릭
    const confirmButton = successModal.locator('button').filter({ hasText: '확인' });
    await confirmButton.click();
    
    // 페이지 이동 확인 (URL이 /diaries/1로 변경되어야 함)
    await page.waitForURL('/diaries/1');
    await expect(page).toHaveURL('/diaries/1');
    
    // 모든 모달이 닫혀야 함
    await expect(successModal).not.toBeVisible();
    const diariesNewModal = page.locator('[data-testid="diaries-new-modal"]');
    await expect(diariesNewModal).not.toBeVisible();
  });

  test('여러 개의 일기가 있을 때 새로운 일기의 id는 최대 id + 1이어야 한다', async ({ page }) => {
    // 로컬스토리지에 여러 데이터 추가
    await page.evaluate(() => {
      const existingDiaries = [
        {
          id: 5,
          title: '다섯 번째 일기',
          content: '다섯 번째 일기 내용',
          emotion: 'Happy',
          createdAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: '세 번째 일기',
          content: '세 번째 일기 내용',
          emotion: 'Sad',
          createdAt: new Date().toISOString(),
        },
        {
          id: 8,
          title: '여덟 번째 일기',
          content: '여덟 번째 일기 내용',
          emotion: 'Angry',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(existingDiaries));
    });
    
    // 모든 필드 입력
    const etcLabel = page.locator('label:has(input[type="radio"][value="Etc"])');
    await etcLabel.click();
    
    const titleInput = page.locator('input[placeholder="제목을 입력해주세요"]');
    await titleInput.fill('새로운 일기');
    
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력해주세요"]');
    await contentTextarea.fill('새로운 일기 내용입니다.');
    
    // 등록하기 버튼 클릭
    const submitButton = page.locator('[data-testid="diaries-new-submit-button"]');
    await submitButton.click();
    
    // 로컬스토리지 확인
    const diaries = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diaries).not.toBeNull();
    expect(diaries).toHaveLength(4);
    
    // 새로운 일기의 id는 9여야 함 (최대 id 8 + 1)
    const newDiary = diaries.find((d: any) => d.title === '새로운 일기');
    expect(newDiary.id).toBe(9);
  });
});

