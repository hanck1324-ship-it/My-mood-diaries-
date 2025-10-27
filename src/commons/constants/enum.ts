import colors from "@/commons/constants/color";

export enum Emotion {
  Happy = "Happy",
  Sad = "Sad",
  Angry = "Angry",
  Surprise = "Surprise",
  Etc = "Etc",
}

export type EmotionSize = "m" | "s";

export type EmotionMeta = {
  label: string; // 화면에 표시될 한글 라벨
  color: string; // color token (e.g., colors.red[600])
  image: string; // 이미지 경로 (m 사이즈)
  icon: string; // 아이콘 경로 (s 사이즈)
};

export const EMOTION_META: Record<Emotion, EmotionMeta> = {
  [Emotion.Happy]: {
    label: "행복해요",
    color: colors.red[600],
    image: "/images/emotion-happy-m.png",
    icon: "/images/emotion-happy-s.png",
  },
  [Emotion.Sad]: {
    label: "슬퍼요",
    color: colors.blue[600],
    image: "/images/emotion-sad-m.png",
    icon: "/images/emotion-sad-s.png",
  },
  [Emotion.Angry]: {
    label: "화나요",
    color: colors.gray[600],
    image: "/images/emotion-angry-m.png",
    icon: "/images/emotion-angry-s.png",
  },
  [Emotion.Surprise]: {
    label: "놀랐어요",
    color: colors.yellow[600],
    image: "/images/emotion-surprise-m.png",
    icon: "/images/emotion-surprise-s.png",
  },
  [Emotion.Etc]: {
    label: "기타",
    color: colors.green[600],
    image: "/images/emotion-etc-m.png",
    icon: "/images/emotion-etc-s.png",
  },
};

export const EMOTIONS: Emotion[] = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Angry,
  Emotion.Surprise,
  Emotion.Etc,
];

export const getEmotionLabel = (emotion: Emotion): string =>
  EMOTION_META[emotion].label;

export const getEmotionColor = (emotion: Emotion): string =>
  EMOTION_META[emotion].color;

export const getEmotionImage = (emotion: Emotion): string =>
  EMOTION_META[emotion].image;

export const getEmotionIcon = (emotion: Emotion): string =>
  EMOTION_META[emotion].icon;


