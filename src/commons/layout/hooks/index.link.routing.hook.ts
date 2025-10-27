'use client';

import { usePathname } from 'next/navigation';
import { UrlKey, getUrlPath } from '@/commons/constants/url';

/**
 * Layout에서 사용하는 라우팅 및 active 상태 관리 훅
 */
export function useLayoutRouting() {
  const pathname = usePathname();

  /**
   * 현재 경로가 특정 URL 키와 매칭되는지 확인
   */
  const isActive = (urlKey: UrlKey): boolean => {
    const targetPath = getUrlPath(urlKey);
    
    // 다이나믹 라우팅 패턴을 정규식으로 변환하여 매칭
    const regex = new RegExp(
      '^' + targetPath.replace(/\[([^\]]+)\]/g, '([^/]+)') + '$'
    );
    
    return regex.test(pathname);
  };

  /**
   * 일기보관함 탭이 활성화되어야 하는지 확인
   * /diaries 또는 /diaries/[id] 경로에서 활성화
   */
  const isDiariesActive = (): boolean => {
    return isActive(UrlKey.DiaryList) || isActive(UrlKey.DiaryDetail);
  };

  /**
   * 사진보관함 탭이 활성화되어야 하는지 확인
   * /pictures 경로에서 활성화
   */
  const isPicturesActive = (): boolean => {
    return isActive(UrlKey.PictureList);
  };

  return {
    isDiariesActive,
    isPicturesActive,
  };
}

