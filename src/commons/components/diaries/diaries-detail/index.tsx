'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import Button from '@/commons/components/button';
import Input from '@/commons/components/input';
import { EMOTION_META } from '@/commons/constants/enum';
import { useDiaryDetailBinding } from './hooks/index.binding.hook';

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
  const { diary, error, isLoading, formattedDate } = useDiaryDetailBinding();

  // 로딩 중이거나 에러가 있는 경우 처리
  if (isLoading || error || !diary) {
    return (
      <div className={styles.container} data-testid="diary-detail-container">
        {error && <div data-testid="diary-detail-error">{error}</div>}
      </div>
    );
  }

  const emotionMeta = EMOTION_META[diary.emotion];

  return (
    <div className={styles.container} data-testid="diary-detail-container">
      <div className={styles.gap64}></div>
      
      {/* detail-title */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <div className={styles.titleLeft}>
            <h1 className={styles.titleText} data-testid="diary-detail-title">{diary.title}</h1>
            <div className={styles.emotionWrapper}>
              <Image 
                src={emotionMeta.icon} 
                alt={emotionMeta.label}
                width={24}
                height={24}
                className={styles.emotionIcon}
                data-testid="diary-detail-emotion-icon"
              />
              <span className={styles.emotionText} data-testid="diary-detail-emotion-text">{emotionMeta.label}</span>
            </div>
          </div>
          <span className={styles.dateText} data-testid="diary-detail-date">{formattedDate}</span>
        </div>
      </div>

      <div className={styles.gap24}></div>
      
      {/* detail-content */}
      <div className={styles.detailContent}>
        <p className={styles.contentText} data-testid="diary-detail-content">{diary.content}</p>
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

