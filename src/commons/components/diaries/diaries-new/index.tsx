'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { Emotion, EMOTIONS, EMOTION_META } from '@/commons/constants/enum';

export default function DiariesNew() {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEmotionChange = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleClose = () => {
    // 닫기 기능 구현
    console.log('닫기');
  };

  const handleSubmit = () => {
    // 등록하기 기능 구현
    console.log('등록하기', { selectedEmotion, title, content });
  };

  return (
    <div className={styles.wrapper}>
      {/* header */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>일기쓰기</h2>
      </div>
      <div className={styles.gap}></div>
      
      {/* emotion-box */}
      <div className={styles.emotionBox}>
        <p className={styles.emotionQuestion}>오늘 기분은 어땠나요?</p>
        <div className={styles.emotionRadioGroup}>
          {EMOTIONS.map((emotion) => (
            <label key={emotion} className={styles.emotionRadioLabel}>
              <input
                type="radio"
                name="emotion"
                value={emotion}
                checked={selectedEmotion === emotion}
                onChange={() => handleEmotionChange(emotion)}
                className={styles.emotionRadioInput}
              />
              <span className={styles.emotionRadioCustom}>
                {selectedEmotion === emotion && (
                  <span className={styles.emotionRadioChecked}></span>
                )}
              </span>
              <span className={styles.emotionLabel}>
                {EMOTION_META[emotion].label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.gap}></div>
      
      {/* input-title */}
      <div className={styles.inputTitle}>
        <Input
          variant="primary"
          theme="light"
          size="large"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
      </div>
      <div className={styles.gap24}></div>
      
      {/* input-content */}
      <div className={styles.inputContent}>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentTextarea}
        />
      </div>
      <div className={styles.gap}></div>
      
      {/* footer */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          theme="light"
          size="medium"
          onClick={handleClose}
          className={styles.closeButton}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="medium"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

