import Image from 'next/image';
import styles from './styles.module.css';
import Button from '@/commons/components/button';
import Input from '@/commons/components/input';
import { Emotion, EMOTION_META } from '@/commons/constants/enum';

// Mock data
const mockDiaryDetail = {
  title: '오늘 강아지와 함께한 특별한 하루',
  emotion: Emotion.Happy,
  date: '2025.01.15',
  content: '오늘은 우리 강아지와 함께 공원에 다녀왔어요. 날씨가 정말 좋아서 산책하기 딱 좋았어요. 강아지가 다른 강아지들과 신나게 뛰어노는 모습을 보니 저도 덩달아 기분이 좋아졌답니다. 앞으로도 이런 행복한 순간들이 많았으면 좋겠어요.'
};

const mockRetrospects = [
  {
    id: 1,
    text: '강아지와 함께 공원에 갔던 기억이 정말 좋았어요.',
    date: '2025.01.16'
  },
  {
    id: 2,
    text: '다음에는 더 큰 공원에 가봐야겠어요.',
    date: '2025.01.17'
  },
];

export default function DiariesDetail() {
  const emotionMeta = EMOTION_META[mockDiaryDetail.emotion];

  return (
    <div className={styles.container}>
      <div className={styles.gap64}></div>
      
      {/* detail-title */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <div className={styles.titleLeft}>
            <h1 className={styles.titleText}>{mockDiaryDetail.title}</h1>
            <div className={styles.emotionWrapper}>
              <Image 
                src={emotionMeta.icon} 
                alt={emotionMeta.label}
                width={24}
                height={24}
                className={styles.emotionIcon}
              />
              <span className={styles.emotionText}>{emotionMeta.label}</span>
            </div>
          </div>
          <span className={styles.dateText}>{mockDiaryDetail.date}</span>
        </div>
      </div>

      <div className={styles.gap24}></div>
      
      {/* detail-content */}
      <div className={styles.detailContent}>
        <p className={styles.contentText}>{mockDiaryDetail.content}</p>
        <button className={styles.copyButton}>
          <Image 
            src="/icons/copy_outline_light_m.svg"
            alt="복사"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className={styles.gap24}></div>
      
      {/* detail-footer */}
      <div className={styles.detailFooter}>
        <Button 
          variant="secondary" 
          theme="light" 
          size="medium"
        >
          수정
        </Button>
        <Button 
          variant="secondary" 
          theme="light" 
          size="medium"
        >
          삭제
        </Button>
      </div>

      <div className={styles.gap24}></div>
      
      {/* retrospect-input */}
      <div className={styles.retrospectInput}>
        <div className={styles.retrospectInputWrapper}>
          <Input 
            variant="primary" 
            theme="light" 
            size="medium"
            placeholder="회고를 입력하세요"
          />
        </div>
        <Button 
          variant="primary" 
          theme="light" 
          size="medium"
        >
          입력
        </Button>
      </div>

      <div className={styles.gap16}></div>
      
      {/* retrospect-list */}
      <div className={styles.retrospectList}>
        {mockRetrospects.map((retrospect) => (
          <div key={retrospect.id} className={styles.retrospectItem}>
            <span className={styles.retrospectText}>{retrospect.text}</span>
            <span className={styles.retrospectDate}>{retrospect.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

