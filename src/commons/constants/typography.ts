/**
 * Typography Tokens for Design System
 * 
 * 피그마 파운데이션(Node ID: 3459:1422)을 기반으로 한 타이포그래피 시스템
 * MCP: CursorTalkToFigmaMCP(채널명: zelf33ft)
 * 
 * - 모바일/데스크톱 반응형 지원
 * - 한국어/영문 언어별 분기 지원
 * - CSS 변수 기반으로 동적 타이포그래피 적용
 * - globals.css의 CSS 변수와 동기화되어야 함
 * 
 * @see globals.css - CSS 변수 정의
 */

export type TypographyPlatform = "mobile" | "desktop";
export type TypographyLanguage = "default" | "en";

export type TypographyStyle = {
  fontSize: string;
  lineHeight: string | number;
  fontWeight: number;
  letterSpacing: string;
};

export type TypographyToken =
  | "display2xl"
  | "displayXl"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "bodyLg"
  | "bodyMd"
  | "bodySm"
  | "caption";

type TypographyScale = Record<
  TypographyToken,
  {
    mobile: TypographyStyle;
    desktop: TypographyStyle;
    // optional per-language overrides (only define differences)
    langOverrides?: Partial<Record<TypographyLanguage, Partial<Record<TypographyPlatform, Partial<TypographyStyle>>>>>
  }
>;

export const TYPOGRAPHY_SCALE: TypographyScale = {
  display2xl: {
    mobile: { fontSize: "3rem", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.01em" },
    desktop: { fontSize: "3.75rem", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.0125em" },
    langOverrides: {
      en: {
        mobile: { letterSpacing: "-0.015em" },
        desktop: { letterSpacing: "-0.02em" },
      },
    },
  },
  displayXl: {
    mobile: { fontSize: "2.5rem", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.01em" },
    desktop: { fontSize: "3rem", lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.015em" },
    langOverrides: {
      en: { desktop: { letterSpacing: "-0.02em" } },
    },
  },
  h1: {
    mobile: { fontSize: "2rem", lineHeight: 1.2, fontWeight: 700, letterSpacing: "-0.005em" },
    desktop: { fontSize: "2.5rem", lineHeight: 1.2, fontWeight: 700, letterSpacing: "-0.01em" },
    langOverrides: { en: { desktop: { letterSpacing: "-0.0125em" } } },
  },
  h2: {
    mobile: { fontSize: "1.5rem", lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.005em" },
    desktop: { fontSize: "2rem", lineHeight: 1.3, fontWeight: 700, letterSpacing: "-0.01em" },
  },
  h3: {
    mobile: { fontSize: "1.25rem", lineHeight: 1.35, fontWeight: 600, letterSpacing: "-0.003em" },
    desktop: { fontSize: "1.5rem", lineHeight: 1.35, fontWeight: 600, letterSpacing: "-0.006em" },
  },
  h4: {
    mobile: { fontSize: "1.125rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0em" },
    desktop: { fontSize: "1.25rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0em" },
  },
  h5: {
    mobile: { fontSize: "1rem", lineHeight: 1.45, fontWeight: 600, letterSpacing: "0em" },
    desktop: { fontSize: "1.125rem", lineHeight: 1.45, fontWeight: 600, letterSpacing: "0em" },
  },
  h6: {
    mobile: { fontSize: "0.875rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0.005em" },
    desktop: { fontSize: "1rem", lineHeight: 1.4, fontWeight: 600, letterSpacing: "0.0025em" },
  },
  bodyLg: {
    mobile: { fontSize: "1rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0em" },
    desktop: { fontSize: "1.0625rem", lineHeight: 1.65, fontWeight: 400, letterSpacing: "0em" },
  },
  bodyMd: {
    mobile: { fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0em" },
    desktop: { fontSize: "1rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0em" },
  },
  bodySm: {
    mobile: { fontSize: "0.875rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0.003em" },
    desktop: { fontSize: "0.9375rem", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0.002em" },
  },
  caption: {
    mobile: { fontSize: "0.75rem", lineHeight: 1.4, fontWeight: 400, letterSpacing: "0.01em" },
    desktop: { fontSize: "0.75rem", lineHeight: 1.4, fontWeight: 400, letterSpacing: "0.008em" },
  },
};

export const FONT_FAMILY_SANS_VAR = "var(--font-geist-sans)";
export const FONT_FAMILY_MONO_VAR = "var(--font-geist-mono)";

export function getTypographyStyles(
  token: TypographyToken,
  options?: { platform?: TypographyPlatform; lang?: TypographyLanguage }
): TypographyStyle & { fontFamily: string } {
  const platform: TypographyPlatform = options?.platform ?? "mobile";
  const lang: TypographyLanguage = options?.lang ?? "default";
  const base = TYPOGRAPHY_SCALE[token][platform];
  const overrides = TYPOGRAPHY_SCALE[token].langOverrides?.[lang]?.[platform] ?? {};
  const merged: TypographyStyle = { ...base, ...overrides };
  return { ...merged, fontFamily: FONT_FAMILY_SANS_VAR };
}

export const TYPO_TOKENS: TypographyToken[] = [
  "display2xl",
  "displayXl",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "bodyLg",
  "bodyMd",
  "bodySm",
  "caption",
];

/**
 * CSS 변수 기반 타이포그래피 객체
 * globals.css의 CSS 변수를 직접 참조
 */
export const typography = {
  display2xl: {
    fontSize: "var(--typo-display2xl-size)",
    lineHeight: "var(--typo-display2xl-line)",
    fontWeight: "var(--typo-display2xl-weight)",
    letterSpacing: "var(--typo-display2xl-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  displayXl: {
    fontSize: "var(--typo-displayXl-size)",
    lineHeight: "var(--typo-displayXl-line)",
    fontWeight: "var(--typo-displayXl-weight)",
    letterSpacing: "var(--typo-displayXl-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  h1: {
    fontSize: "var(--typo-h1-size)",
    lineHeight: "var(--typo-h1-line)",
    fontWeight: "var(--typo-h1-weight)",
    letterSpacing: "var(--typo-h1-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  h2: {
    fontSize: "var(--typo-h2-size)",
    lineHeight: "var(--typo-h2-line)",
    fontWeight: "var(--typo-h2-weight)",
    letterSpacing: "var(--typo-h2-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  h3: {
    fontSize: "var(--typo-h3-size)",
    lineHeight: "var(--typo-h3-line)",
    fontWeight: "var(--typo-h3-weight)",
    letterSpacing: "var(--typo-h3-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  h4: {
    fontSize: "var(--typo-h4-size)",
    lineHeight: "var(--typo-h4-line)",
    fontWeight: "var(--typo-h4-weight)",
    letterSpacing: "var(--typo-h4-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  h5: {
    fontSize: "var(--typo-h5-size)",
    lineHeight: "var(--typo-h5-line)",
    fontWeight: "var(--typo-h5-weight)",
    letterSpacing: "var(--typo-h5-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  h6: {
    fontSize: "var(--typo-h6-size)",
    lineHeight: "var(--typo-h6-line)",
    fontWeight: "var(--typo-h6-weight)",
    letterSpacing: "var(--typo-h6-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  bodyLg: {
    fontSize: "var(--typo-bodyLg-size)",
    lineHeight: "var(--typo-bodyLg-line)",
    fontWeight: "var(--typo-bodyLg-weight)",
    letterSpacing: "var(--typo-bodyLg-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  bodyMd: {
    fontSize: "var(--typo-bodyMd-size)",
    lineHeight: "var(--typo-bodyMd-line)",
    fontWeight: "var(--typo-bodyMd-weight)",
    letterSpacing: "var(--typo-bodyMd-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  bodySm: {
    fontSize: "var(--typo-bodySm-size)",
    lineHeight: "var(--typo-bodySm-line)",
    fontWeight: "var(--typo-bodySm-weight)",
    letterSpacing: "var(--typo-bodySm-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
  caption: {
    fontSize: "var(--typo-caption-size)",
    lineHeight: "var(--typo-caption-line)",
    fontWeight: "var(--typo-caption-weight)",
    letterSpacing: "var(--typo-caption-letter)",
    fontFamily: FONT_FAMILY_SANS_VAR,
  },
} as const;

/**
 * 타이포그래피 토큰 사용 예시:
 * 
 * // TypeScript/React에서 (정적 값)
 * import { TYPOGRAPHY_SCALE, getTypographyStyles } from '@/commons/constants/typography';
 * const h1Mobile = getTypographyStyles("h1", { platform: "mobile" });
 * 
 * // TypeScript/React에서 (CSS 변수 기반 - 권장)
 * import { typography } from '@/commons/constants/typography';
 * <h1 style={typography.h1}>제목</h1>
 * 
 * // CSS/Tailwind에서
 * className="typo-h1"
 * 
 * // 직접 CSS에서
 * font-size: var(--typo-h1-size);
 * line-height: var(--typo-h1-line);
 */
