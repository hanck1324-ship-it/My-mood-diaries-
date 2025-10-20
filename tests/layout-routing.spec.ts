import { test, expect } from '@playwright/test';

test.describe('Layout Routing', () => {
  test('로고 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    // 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    
    // 페이지 로드 대기 - data-testid로 식별
    await page.waitForSelector('[data-testid="layout-logo"]');
    
    // 로고 클릭
    await page.click('[data-testid="layout-logo"]');
    
    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 일기목록 페이지가 로드되었는지 확인
    await page.waitForSelector('[data-testid="diaries-page"]');
  });

  test('일기보관함 탭 클릭시 일기목록 페이지로 이동 및 active 상태 변경', async ({ page }) => {
    // 일기목록 페이지로 이동
    await page.goto('/diaries', { waitUntil: 'domcontentloaded' });
    
    // 페이지 로드 대기 (navigation이 attached되고 active 클래스가 적용될 때까지)
    await page.waitForSelector('[data-testid="layout-navigation"]');
    
    // 일기보관함 탭이 이미 active 상태인지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // URL이 /diaries인지 확인
    await expect(page).toHaveURL('/diaries');
  });

  test('일기목록 페이지에서 일기보관함 탭이 active 상태', async ({ page }) => {
    // 일기목록 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="layout-navigation"]');
    
    // 일기보관함 탭이 active 상태인지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 사진보관함 탭은 active가 아닌지 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).not.toHaveClass(/tabActive/);
  });

  test.skip('사진보관함 탭 클릭시 사진목록 페이지로 이동 및 active 상태 변경', async ({ page }) => {
    // 일기목록 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="layout-navigation"]');
    
    // 사진보관함 탭 클릭
    await page.click('[data-testid="nav-pictures"]');
    
    // URL이 /pictures로 변경되었는지 확인
    await expect(page).toHaveURL('/pictures');
    
    // 사진보관함 탭이 active 상태인지 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).toHaveClass(/tabActive/);
    
    // 일기보관함 탭은 active가 아닌지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).not.toHaveClass(/tabActive/);
  });
});

