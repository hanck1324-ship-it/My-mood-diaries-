/**
 * Color Tokens for Design System
 * 
 * 피그마 파운데이션(Node ID: 3459:1130)을 기반으로 한 컬러 시스템
 * MCP: CursorTalkToFigmaMCP(채널명: t72csvlv)
 * 
 * - Light/Dark 모드 모두 지원
 * - CSS 변수 기반으로 동적 테마 전환
 * - globals.css의 CSS 변수와 동기화되어야 함
 * - Tailwind CSS와 통합하여 사용
 * 
 * @see globals.css - CSS 변수 정의
 * @see tailwind.config.ts - Tailwind 컬러 매핑
 */

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
};

export type SemanticColors = {
  background: string;
  foreground: string;
  muted: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
  destructive: string;
  ring: string;
  accent: string;
};

export type ColorTokens = {
  // 팔레트(원색/중립)
  gray: ColorScale;
  neutral: ColorScale;
  blue: ColorScale;
  red: ColorScale;
  green: ColorScale;
  yellow: ColorScale;
  purple: ColorScale;
  // 의미론적 토큰
  semantic: SemanticColors;
};

// CSS 변수 기반 토큰 매핑 (light/dark 모두 동일 키를 사용)
export const colors: ColorTokens = {
  gray: {
    50: "var(--gray-50)",
    100: "var(--gray-100)",
    200: "var(--gray-200)",
    300: "var(--gray-300)",
    400: "var(--gray-400)",
    500: "var(--gray-500)",
    600: "var(--gray-600)",
    700: "var(--gray-700)",
    800: "var(--gray-800)",
    900: "var(--gray-900)",
    950: "var(--gray-950)",
  },
  neutral: {
    50: "var(--neutral-50)",
    100: "var(--neutral-100)",
    200: "var(--neutral-200)",
    300: "var(--neutral-300)",
    400: "var(--neutral-400)",
    500: "var(--neutral-500)",
    600: "var(--neutral-600)",
    700: "var(--neutral-700)",
    800: "var(--neutral-800)",
    900: "var(--neutral-900)",
    950: "var(--neutral-950)",
  },
  blue: {
    50: "var(--blue-50)",
    100: "var(--blue-100)",
    200: "var(--blue-200)",
    300: "var(--blue-300)",
    400: "var(--blue-400)",
    500: "var(--blue-500)",
    600: "var(--blue-600)",
    700: "var(--blue-700)",
    800: "var(--blue-800)",
    900: "var(--blue-900)",
  },
  red: {
    50: "var(--red-50)",
    100: "var(--red-100)",
    200: "var(--red-200)",
    300: "var(--red-300)",
    400: "var(--red-400)",
    500: "var(--red-500)",
    600: "var(--red-600)",
    700: "var(--red-700)",
    800: "var(--red-800)",
    900: "var(--red-900)",
  },
  green: {
    50: "var(--green-50)",
    100: "var(--green-100)",
    200: "var(--green-200)",
    300: "var(--green-300)",
    400: "var(--green-400)",
    500: "var(--green-500)",
    600: "var(--green-600)",
    700: "var(--green-700)",
    800: "var(--green-800)",
    900: "var(--green-900)",
  },
  yellow: {
    50: "var(--yellow-50)",
    100: "var(--yellow-100)",
    200: "var(--yellow-200)",
    300: "var(--yellow-300)",
    400: "var(--yellow-400)",
    500: "var(--yellow-500)",
    600: "var(--yellow-600)",
    700: "var(--yellow-700)",
    800: "var(--yellow-800)",
    900: "var(--yellow-900)",
  },
  purple: {
    50: "var(--purple-50)",
    100: "var(--purple-100)",
    200: "var(--purple-200)",
    300: "var(--purple-300)",
    400: "var(--purple-400)",
    500: "var(--purple-500)",
    600: "var(--purple-600)",
    700: "var(--purple-700)",
    800: "var(--purple-800)",
    900: "var(--purple-900)",
  },
  semantic: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    muted: "var(--muted)",
    card: "var(--card)",
    border: "var(--border)",
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    destructive: "var(--destructive)",
    ring: "var(--ring)",
    accent: "var(--accent)",
  },
};

export default colors;

/**
 * 컬러 토큰 사용 예시:
 * 
 * // TypeScript/React에서
 * import { colors } from '@/commons/constants/color';
 * const textColor = colors.semantic.foreground; // "var(--foreground)"
 * 
 * // CSS/Tailwind에서
 * className="bg-background text-foreground"
 * className="bg-blue-500 dark:bg-blue-400"
 * 
 * // 직접 CSS에서
 * background-color: var(--background);
 * color: var(--foreground);
 */
