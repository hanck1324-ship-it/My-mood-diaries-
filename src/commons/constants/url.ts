// URL 경로 및 메타데이터 관리
// 다이나믹 라우팅을 지원하며, Link 컴포넌트에서 사용 가능하도록 설계됨

// URL 키 정의
export enum UrlKey {
  Login = "Login",
  Signup = "Signup",
  DiaryList = "DiaryList",
  DiaryDetail = "DiaryDetail",
  PictureList = "PictureList",
}

// 접근 권한 타입
export enum AccessLevel {
  Public = "Public", // 누구나 접근 가능
  Member = "Member", // 회원 전용
}

// UI 노출 설정 타입
export type UIVisibility = {
  header: {
    visible: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
};

// URL 메타데이터 타입
export type UrlMeta = {
  path: string; // 실제 경로 (다이나믹 라우팅 포함)
  access: AccessLevel; // 접근 권한
  ui: UIVisibility; // UI 노출 설정
};

// URL 메타데이터 정의
export const URL_META: Record<UrlKey, UrlMeta> = {
  [UrlKey.Login]: {
    path: "/auth/login",
    access: AccessLevel.Public,
    ui: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  [UrlKey.Signup]: {
    path: "/auth/signup",
    access: AccessLevel.Public,
    ui: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  [UrlKey.DiaryList]: {
    path: "/diaries",
    access: AccessLevel.Public,
    ui: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  [UrlKey.DiaryDetail]: {
    path: "/diaries/[id]",
    access: AccessLevel.Member,
    ui: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  [UrlKey.PictureList]: {
    path: "/pictures",
    access: AccessLevel.Public,
    ui: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
};

// URL 키 목록 (순회 시 사용)
export const URL_KEYS: UrlKey[] = [
  UrlKey.Login,
  UrlKey.Signup,
  UrlKey.DiaryList,
  UrlKey.DiaryDetail,
  UrlKey.PictureList,
];

// ============================================
// Helper 함수들
// ============================================

/**
 * URL 키에 해당하는 경로를 반환
 * @param urlKey - URL 키
 * @returns 경로 문자열
 */
export const getUrlPath = (urlKey: UrlKey): string => URL_META[urlKey].path;

/**
 * URL 키에 해당하는 접근 권한을 반환
 * @param urlKey - URL 키
 * @returns 접근 권한
 */
export const getUrlAccess = (urlKey: UrlKey): AccessLevel =>
  URL_META[urlKey].access;

/**
 * URL 키에 해당하는 UI 노출 설정을 반환
 * @param urlKey - URL 키
 * @returns UI 노출 설정
 */
export const getUrlUI = (urlKey: UrlKey): UIVisibility => URL_META[urlKey].ui;

/**
 * 다이나믹 라우팅을 위한 URL 생성 함수
 * @param urlKey - URL 키
 * @param params - 다이나믹 파라미터 객체 (예: { id: "123" })
 * @returns 완성된 URL 문자열
 * @example
 * buildUrl(UrlKey.DiaryDetail, { id: "123" }) // "/diaries/123"
 */
export const buildUrl = (
  urlKey: UrlKey,
  params?: Record<string, string | number>
): string => {
  let path = getUrlPath(urlKey);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`[${key}]`, String(value));
    });
  }

  return path;
};

/**
 * 회원 전용 페이지인지 확인
 * @param urlKey - URL 키
 * @returns 회원 전용 여부
 */
export const isMemberOnly = (urlKey: UrlKey): boolean =>
  getUrlAccess(urlKey) === AccessLevel.Member;

/**
 * 헤더가 표시되는 페이지인지 확인
 * @param urlKey - URL 키
 * @returns 헤더 표시 여부
 */
export const hasHeader = (urlKey: UrlKey): boolean =>
  getUrlUI(urlKey).header.visible;

/**
 * 배너가 표시되는 페이지인지 확인
 * @param urlKey - URL 키
 * @returns 배너 표시 여부
 */
export const hasBanner = (urlKey: UrlKey): boolean => getUrlUI(urlKey).banner;

/**
 * 네비게이션이 표시되는 페이지인지 확인
 * @param urlKey - URL 키
 * @returns 네비게이션 표시 여부
 */
export const hasNavigation = (urlKey: UrlKey): boolean =>
  getUrlUI(urlKey).navigation;

/**
 * 푸터가 표시되는 페이지인지 확인
 * @param urlKey - URL 키
 * @returns 푸터 표시 여부
 */
export const hasFooter = (urlKey: UrlKey): boolean => getUrlUI(urlKey).footer;

/**
 * 현재 경로에 해당하는 URL 키를 찾는 함수
 * @param pathname - 현재 경로
 * @returns 매칭되는 URL 키 또는 undefined
 * @example
 * findUrlKeyByPath("/diaries/123") // UrlKey.DiaryDetail
 */
export const findUrlKeyByPath = (pathname: string): UrlKey | undefined => {
  return URL_KEYS.find((key) => {
    const pattern = getUrlPath(key);
    // 다이나믹 라우팅 패턴을 정규식으로 변환
    const regex = new RegExp(
      "^" + pattern.replace(/\[([^\]]+)\]/g, "([^/]+)") + "$"
    );
    return regex.test(pathname);
  });
};

export default URL_META;
