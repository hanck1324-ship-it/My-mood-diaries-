import { test, expect } from '@playwright/test';

import { TEST_TIMEOUTS } from './test-constants';

/**
 * Pictures 컴포넌트 - 강아지 사진 필터 기능
 * 필터에 따라 이미지 크기가 변경되는지 테스트
 */

test.describe('Pictures - 강아지 사진 필터 기능', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pictures');
    // data-testid를 통해 페이지 로드 확인
    await page.waitForSelector('[data-testid="pictures-container"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });
    // React 하이드레이션 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT / 5);
  });

  test('기본 필터 선택 시 이미지가 640x640으로 표시되어야 한다', async ({ page }) => {
    // API 응답 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // 첫 번째 이미지 카드 확인
    const firstImageCard = page.locator('[data-testid^="pictures-image-"]').first();
    await expect(firstImageCard).toBeVisible();

    // 이미지 카드 스타일 확인 - 640x640
    const imageCardStyle = await firstImageCard.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el.parentElement as Element);
      return {
        width: computedStyle.width,
        height: computedStyle.height,
      };
    });

    expect(imageCardStyle.width).toBe('640px');
    expect(imageCardStyle.height).toBe('640px');
  });

  test('필터를 가로형으로 변경하면 이미지가 640x480으로 표시되어야 한다', async ({ page }) => {
    // API 응답 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // SelectBox 열기
    const selectbox = page.locator('[data-testid="selectbox"]');
    await selectbox.click();
    
    // 가로형 옵션 선택
    const horizontalOption = page.locator('[data-testid="selectbox-option-horizontal"]');
    await expect(horizontalOption).toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });
    await horizontalOption.click();

    // 이미지가 새로 로드될 때까지 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT / 2.5);

    // 첫 번째 이미지 카드 확인
    const firstImageCard = page.locator('[data-testid^="pictures-image-"]').first();
    await expect(firstImageCard).toBeVisible();

    // 이미지 카드 스타일 확인 - 640x480
    const imageCardStyle = await firstImageCard.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el.parentElement as Element);
      return {
        width: computedStyle.width,
        height: computedStyle.height,
      };
    });

    expect(imageCardStyle.width).toBe('640px');
    expect(imageCardStyle.height).toBe('480px');
  });

  test('필터를 세로형으로 변경하면 이미지가 480x640으로 표시되어야 한다', async ({ page }) => {
    // API 응답 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // SelectBox 열기
    const selectbox = page.locator('[data-testid="selectbox"]');
    await selectbox.click();
    
    // 세로형 옵션 선택
    const verticalOption = page.locator('[data-testid="selectbox-option-vertical"]');
    await expect(verticalOption).toBeVisible({ timeout: TEST_TIMEOUTS.SHORT });
    await verticalOption.click();

    // 이미지가 새로 로드될 때까지 대기
    await page.waitForTimeout(TEST_TIMEOUTS.SHORT / 2.5);

    // 첫 번째 이미지 카드 확인
    const firstImageCard = page.locator('[data-testid^="pictures-image-"]').first();
    await expect(firstImageCard).toBeVisible();

    // 이미지 카드 스타일 확인 - 480x640
    const imageCardStyle = await firstImageCard.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el.parentElement as Element);
      return {
        width: computedStyle.width,
        height: computedStyle.height,
      };
    });

    expect(imageCardStyle.width).toBe('480px');
    expect(imageCardStyle.height).toBe('640px');
  });

  test('필터 변경 시 모든 이미지의 크기가 일괄 변경되어야 한다', async ({ page }) => {
    // API 응답 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // 초기 이미지 개수 확인
    const images = page.locator('[data-testid^="pictures-image-"]');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThanOrEqual(6);

    // 가로형으로 변경
    const selectbox = page.locator('[data-testid="selectbox"]');
    await selectbox.click();
    
    const horizontalOption = page.locator('[data-testid="selectbox-option-horizontal"]');
    await horizontalOption.click();

    await page.waitForTimeout(TEST_TIMEOUTS.SHORT / 2.5);

    // 모든 이미지 카드의 크기 확인
    for (let i = 0; i < Math.min(imageCount, 6); i++) {
      const imageCard = page.locator('[data-testid^="pictures-image-"]').nth(i);
      const imageCardStyle = await imageCard.evaluate((el) => {
        const computedStyle = window.getComputedStyle(el.parentElement as Element);
        return {
          width: computedStyle.width,
          height: computedStyle.height,
        };
      });

      expect(imageCardStyle.width).toBe('640px');
      expect(imageCardStyle.height).toBe('480px');
    }
  });

  test('필터 변경 후 스크롤 시 새로 로드되는 이미지도 변경된 크기로 표시되어야 한다', async ({ page }) => {
    // API 응답 대기
    await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6');
    await page.waitForSelector('[data-testid^="pictures-image-"]', { 
      timeout: TEST_TIMEOUTS.MEDIUM 
    });

    // 세로형으로 변경
    const selectbox = page.locator('[data-testid="selectbox"]');
    await selectbox.click();
    
    const verticalOption = page.locator('[data-testid="selectbox-option-vertical"]');
    await verticalOption.click();

    await page.waitForTimeout(TEST_TIMEOUTS.SHORT / 2.5);

    // observer target까지 스크롤하여 추가 이미지 로드
    const observerTarget = page.locator('[data-testid="pictures-observer-target"]');
    if (await observerTarget.count() > 0) {
      await observerTarget.scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy(0, 50));

      // 추가 이미지 로드 대기
      await page.waitForResponse('**/dog.ceo/api/breeds/image/random/6', { 
        timeout: TEST_TIMEOUTS.MEDIUM 
      });

      // 새로 로드된 이미지도 세로형 크기인지 확인
      const allImages = page.locator('[data-testid^="pictures-image-"]');
      const totalImageCount = await allImages.count();
      
      expect(totalImageCount).toBeGreaterThan(6);

      // 마지막 이미지 카드의 크기 확인
      const lastImageCard = allImages.last();
      const imageCardStyle = await lastImageCard.evaluate((el) => {
        const computedStyle = window.getComputedStyle(el.parentElement as Element);
        return {
          width: computedStyle.width,
          height: computedStyle.height,
        };
      });

      expect(imageCardStyle.width).toBe('480px');
      expect(imageCardStyle.height).toBe('640px');
    }
  });
});

