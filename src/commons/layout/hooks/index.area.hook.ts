'use client';

import { usePathname } from 'next/navigation';
import { findUrlKeyByPath, getUrlUI, UIVisibility } from '@/commons/constants/url';

/**
 * 현재 경로에 따른 UI 영역 노출 여부를 반환하는 Hook
 * 
 * @returns {UIVisibility} UI 영역별 노출 설정 객체
 * 
 * @example
 * const { header, banner, navigation, footer } = useAreaVisibility();
 * 
 * if (header.visible) {
 *   // header 렌더링
 * }
 */
export function useAreaVisibility(): UIVisibility {
  const pathname = usePathname();
  
  // 현재 경로에 해당하는 URL 키 찾기
  const urlKey = findUrlKeyByPath(pathname);
  
  // URL 키가 없으면 기본값 (모두 숨김)
  if (!urlKey) {
    return {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    };
  }
  
  // URL 키에 해당하는 UI 설정 반환
  return getUrlUI(urlKey);
}

