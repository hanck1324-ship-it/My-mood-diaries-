'use client';

import styles from './styles.module.css';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EMOTIONS, EMOTION_META } from '@/commons/constants/enum';
import { useLinkModalClose } from './hooks/index.link.modal.close.hook';
import { useDiaryForm } from './hooks/index.form.hook';

export default function DiariesNew() {
  const { handleCloseWithConfirmation } = useLinkModalClose();
  const {
    register,
    handleSubmit,
    handleEmotionChange,
    isValid,
    watchedValues,
  } = useDiaryForm();

  const handleClose = () => {
    handleCloseWithConfirmation();
  };

  return (
    <div className={styles.wrapper} data-testid="diaries-new-modal">
      {/* header */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle} data-testid="diaries-new-title">일기쓰기</h2>
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
                checked={watchedValues.emotion === emotion}
                onChange={() => handleEmotionChange(emotion)}
                className={styles.emotionRadioInput}
              />
              <span className={styles.emotionRadioCustom}>
                {watchedValues.emotion === emotion && (
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
          {...register('title')}
          className={styles.titleInput}
        />
      </div>
      <div className={styles.gap24}></div>
      
      {/* input-content */}
      <div className={styles.inputContent}>
        <textarea
          placeholder="내용을 입력해주세요"
          {...register('content')}
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
          data-testid="diaries-new-close-button"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="medium"
          onClick={handleSubmit}
          disabled={!isValid}
          className={styles.submitButton}
          data-testid="diaries-new-submit-button"
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}

