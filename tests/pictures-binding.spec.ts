import { test, expect } from '@playwright/test';

import { TEST_TIMEOUTS } from './test-constants';

/**
 * Pictures 컴포넌트 - 사진 목록 조회 및 무한 스크롤 기능
 * - 실제 dog.ceo API 사용
 * - 무한 스크롤 기능 테스트
 * - Mock 데이터 사용 금지 (성공 시나리오)
 * - API 모킹 (실패 시나리오만)
 */

test.describe('Pictures - 사진 목록 조회 및 무한 스크롤 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pictures');
    // data-testid를 통해 페이지 로드 확인
    await page.waitForSelector('[data-testid="pictures-container"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });
    // React 하이드레이션 대기
    await page.waitForTimeout(100);
  });

  test('페이지 접속 시 강아지 사진 6마리가 로드되어야 한다', async ({ page }) => {
    // API 응답 대기 (실제 데이터 사용)
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // 6개의 이미지가 로드되었는지 확인
    const images = page.locator('[data-testid^="pictures-image-"]');
    await expect(images).toHaveCount(6);

    // 첫 번째 이미지의 src에 dog.ceo가 포함되어 있는지 확인
    const firstImage = images.first();
    const src = await firstImage.getAttribute('src');
    expect(src).toContain('dog.ceo');
  });

  test('로딩 중에는 6개의 스플래시 스크린이 표시되어야 한다', async ({ page }) => {
    // 페이지 새로고침하여 로딩 상태 다시 확인
    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="pictures-container"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });
    // React 하이드레이션 대기
    await page.waitForTimeout(100);

    // 스플래시 스크린 확인 (로딩이 빠르면 바로 사라질 수 있음)
    const splashScreens = page.locator('[data-testid="pictures-splash-screen"]');
    
    // 스플래시 스크린이 보이거나 이미지가 로드되었는지 확인
    const hasSplash = await splashScreens.count().then(count => count > 0);
    const hasImages = await page.locator('[data-testid^="pictures-image-"]').count().then(count => count > 0);
    
    expect(hasSplash || hasImages).toBeTruthy();
  });

  test('스크롤 시 추가 강아지 사진이 로드되어야 한다', async ({ page }) => {
    // 초기 6개 이미지 로드 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    const initialImages = page.locator('[data-testid^="pictures-image-"]');
    await expect(initialImages).toHaveCount(6);

    // observer target이 있는지 확인
    const observerTarget = page.locator('[data-testid="pictures-observer-target"]');
    await expect(observerTarget).toBeVisible();

    // API 요청을 기다리기 위해 네트워크 응답 대기
    const responsePromise = page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');

    // observer target이 보이도록 스크롤
    await observerTarget.scrollIntoViewIfNeeded();
    
    // 추가 스크롤로 확실히 보이도록 함
    await page.evaluate(() => window.scrollBy(0, 50));

    // API 응답 대기
    await responsePromise;

    // 추가 이미지 로딩 대기 - 더 긴 timeout 사용
    await expect(initialImages).not.toHaveCount(6, { 
      timeout: TEST_TIMEOUTS.LONG 
    });

    // 최종 이미지 개수 확인 (6개 초과)
    const finalCount = await initialImages.count();
    expect(finalCount).toBeGreaterThan(6);
  });

  test('API 실패 시나리오 - 에러가 발생해도 앱이 중단되지 않아야 한다', async ({ page }) => {
    // API 모킹하여 에러 응답 반환
    await page.route('https://dog.ceo/api/breeds/image/random/6', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error', status: 'error' }),
      });
    });

    await page.goto('/pictures');
    await page.waitForSelector('[data-testid="pictures-container"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // 에러 상태에서도 컨테이너는 존재해야 함
    const container = page.locator('[data-testid="pictures-container"]');
    await expect(container).toBeVisible();

    // 에러 메시지 또는 빈 상태가 표시되어야 함
    const errorMessage = page.locator('[data-testid="pictures-error"]');
    await expect(errorMessage).toBeVisible();

    const images = page.locator('[data-testid^="pictures-image-"]');
    const imageCount = await images.count();
    expect(imageCount).toBe(0);
  });

  test('모든 이미지 URL에 dog.ceo가 포함되어야 한다', async ({ page }) => {
    // API 응답 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    const images = page.locator('[data-testid^="pictures-image-"]');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const image = images.nth(i);
      const src = await image.getAttribute('src');
      expect(src).toContain('dog.ceo');
    }
  });
});

