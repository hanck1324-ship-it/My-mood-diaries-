'use client';

import Image from 'next/image';
import Button from '@/commons/components/button';
import Input from '@/commons/components/input';
import { EMOTION_META } from '@/commons/constants/enum';
import { useDiaryDetailBinding } from './hooks/index.binding.hook';
import { useRetrospectForm } from './hooks/index.retrospect.form.hook';
import { useDeleteDiary } from '../hooks/index.delete.hook';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function DiariesDetail() {
  const { diary, error, isLoading, formattedDate, diaryId } = useDiaryDetailBinding();
  const { register, handleSubmit, errors, isDisabled } = useRetrospectForm(diaryId || 0);
  const router = useRouter();
  const { deleteDiary } = useDeleteDiary();

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      if (diaryId) {
        deleteDiary(diaryId);
      }
    }
  };

  const handleEdit = () => {
    // 수정 기능은 추후 구현
    alert('수정 기능은 추후 구현 예정입니다.');
  };

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
          onClick={handleEdit}
          data-testid="diary-detail-edit-button"
        >
          수정
        </Button>
        <Button 
          variant="secondary" 
          theme="light" 
          size="medium"
          onClick={handleDelete}
          data-testid="diary-detail-delete-button"
        >
          삭제
        </Button>
      </div>

      <div className={styles.gap24}></div>
      
      {/* retrospect-input */}
      <form onSubmit={handleSubmit} className={styles.retrospectInput}>
        <div className={styles.retrospectInputWrapper}>
          <Input 
            variant="primary" 
            theme="light" 
            size="medium"
            placeholder="회고를 입력하세요"
            {...register('content')}
            data-testid="retrospect-input"
          />
          {errors.content && (
            <span className={styles.errorMessage} data-testid="retrospect-error">
              {errors.content.message}
            </span>
          )}
        </div>
        <Button 
          variant="primary" 
          theme="light" 
          size="medium"
          type="submit"
          disabled={isDisabled}
          data-testid="retrospect-submit-button"
        >
          입력
        </Button>
      </form>

      <div className={styles.gap16}></div>
      
      {/* retrospect-list */}
      <div className={styles.retrospectList}>
        {/* 회고 목록은 로컬스토리지에서 가져와야 함 */}
      </div>
    </div>
  );
}
