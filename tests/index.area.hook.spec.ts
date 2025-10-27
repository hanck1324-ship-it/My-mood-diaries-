import { test, expect } from '@playwright/test';

/**
 * 영역별 노출 여부 테스트
 * URL에 따라 header, banner, navigation, footer 영역의 노출 여부를 테스트
 */

// 테스트 대상 페이지들
const testPages = [
  {
    path: '/diaries',
    name: 'DiaryList',
    expected: {
      header: true,
      logo: true,
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  {
    path: '/diaries/1',
    name: 'DiaryDetail',
    expected: {
      header: true,
      logo: true,
      banner: false,
      navigation: false,
      footer: true,
    },
  },
];

testPages.forEach(({ path, name, expected }) => {
  test.describe(`${name} 페이지 영역 노출 테스트`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      // React 하이드레이션 완료 대기 (header 요소가 attached될 때까지)
      await page.waitForSelector('[data-testid="layout-header"]');
    });

    test(`header 영역 노출 여부 - ${expected.header ? '노출' : '미노출'}`, async ({ page }) => {
      const header = page.locator('[data-testid="layout-header"]');
      if (expected.header) {
        await expect(header).toBeVisible();
      } else {
        await expect(header).not.toBeVisible();
      }
    });

    test(`logo 노출 여부 - ${expected.logo ? '노출' : '미노출'}`, async ({ page }) => {
      const logo = page.locator('[data-testid="layout-logo"]');
      if (expected.logo) {
        await expect(logo).toBeVisible();
      } else {
        await expect(logo).not.toBeVisible();
      }
    });

    test(`banner 영역 노출 여부 - ${expected.banner ? '노출' : '미노출'}`, async ({ page }) => {
      const banner = page.locator('[data-testid="layout-banner"]');
      if (expected.banner) {
        // banner 요소가 DOM에 존재하는지 확인
        await expect(banner).toBeAttached();
        // banner 영역의 크기가 0보다 큰지 확인 (실제로 렌더링되었는지)
        const box = await banner.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);
      } else {
        await expect(banner).not.toBeAttached();
      }
    });

    test(`navigation 영역 노출 여부 - ${expected.navigation ? '노출' : '미노출'}`, async ({ page }) => {
      const navigation = page.locator('[data-testid="layout-navigation"]');
      if (expected.navigation) {
        await expect(navigation).toBeVisible();
      } else {
        await expect(navigation).not.toBeVisible();
      }
    });

    test(`footer 영역 노출 여부 - ${expected.footer ? '노출' : '미노출'}`, async ({ page }) => {
      const footer = page.locator('[data-testid="layout-footer"]');
      if (expected.footer) {
        await expect(footer).toBeVisible();
      } else {
        await expect(footer).not.toBeVisible();
      }
    });
  });
});

