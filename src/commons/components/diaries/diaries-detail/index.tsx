'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/commons/components/button';
import Input from '@/commons/components/input';
import { EMOTION_META, Emotion, EMOTIONS } from '@/commons/constants/enum';
import { useDiaryDetailBinding } from './hooks/index.binding.hook';
import { useRetrospectBinding } from './hooks/index.retrospect.binding.hook';
import { useRetrospectForm } from './hooks/index.retrospect.form.hook';
import { useUpdateDiary } from './hooks/index.update.hook';
import { useDeleteDiaryDetail } from './hooks/index.delete.hook';

import styles from './styles.module.css';

export default function DiariesDetail() {
  const { diary, error, isLoading, formattedDate, diaryId } = useDiaryDetailBinding();
  const { register, handleSubmit, errors, isDisabled } = useRetrospectForm(diaryId || 0);
  const { retrospects: retrospectsList, isLoading: isRetrospectsLoading } = useRetrospectBinding(diaryId);
  const router = useRouter();
  const { openDeleteModal, isDeleting } = useDeleteDiaryDetail(diaryId || 0);
  
  // 수정 기능 훅
  const {
    isEditMode,
    setEditMode,
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    errors: updateErrors,
    updateDiary,
    cancelEdit,
    isUpdating,
    updateError,
  } = useUpdateDiary(diary);

  /**
   * 회고 날짜 포맷팅 (YYYY.MM.DD)
   */
  const formatRetrospectDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\. /g, '.').replace(/\.$/, '');
    } catch {
      return '';
    }
  };

  const handleDelete = () => {
    openDeleteModal();
  };

  const handleEdit = () => {
    setEditMode(true);
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
    <div className={styles.container}>
      {/* 수정 모드 */}
      {isEditMode ? (
        <div data-testid="edit-mode-container">
          <div className={styles.gap64}></div>
          
          <form onSubmit={handleUpdateSubmit(updateDiary)} className={styles.editForm}>
            <div className={styles.editFormHeader}>
              <h2 className={styles.editTitle}>일기 수정</h2>
            </div>
            
            <div className={styles.gap24}></div>
            
            {/* 감정 선택 */}
            <div className={styles.editField}>
              <label className={styles.editLabel}>감정</label>
              <select 
                {...registerUpdate('emotion')}
                className={styles.editEmotionSelect}
                data-testid="edit-emotion-select"
              >
                {EMOTIONS.map(emotion => (
                  <option key={emotion} value={emotion}>
                    {EMOTION_META[emotion].label}
                  </option>
                ))}
              </select>
              {updateErrors.emotion && (
                <span className={styles.errorMessage} data-testid="edit-emotion-error">
                  {updateErrors.emotion.message}
                </span>
              )}
            </div>
            
            <div className={styles.gap16}></div>
            
            {/* 제목 입력 */}
            <div className={styles.editField}>
              <label className={styles.editLabel}>제목</label>
              <Input
                variant="primary"
                theme="light" 
                size="medium"
                {...registerUpdate('title')}
                data-testid="edit-title-input"
                placeholder="제목을 입력하세요"
              />
              {updateErrors.title && (
                <span className={styles.errorMessage} data-testid="edit-title-error">
                  {updateErrors.title.message}
                </span>
              )}
            </div>
            
            <div className={styles.gap16}></div>
            
            {/* 내용 입력 */}
            <div className={styles.editField}>
              <label className={styles.editLabel}>내용</label>
              <textarea
                {...registerUpdate('content')}
                className={styles.editContentTextarea}
                data-testid="edit-content-textarea"
                placeholder="내용을 입력하세요"
                rows={10}
              />
              {updateErrors.content && (
                <span className={styles.errorMessage} data-testid="edit-content-error">
                  {updateErrors.content.message}
                </span>
              )}
            </div>
            
            <div className={styles.gap24}></div>
            
            {/* 에러 메시지 */}
            {updateError && (
              <div className={styles.errorMessage} data-testid="update-error">
                {updateError}
              </div>
            )}
            
            {/* 수정 폼 버튼 */}
            <div className={styles.editButtons}>
              <Button
                variant="secondary"
                theme="light"
                size="medium"
                type="button"
                onClick={cancelEdit}
                disabled={isUpdating}
                data-testid="edit-cancel-button"
              >
                취소
              </Button>
              <Button
                variant="primary"
                theme="light"
                size="medium"
                type="submit"
                disabled={isUpdating}
                data-testid="edit-submit-button"
              >
                {isUpdating ? '수정 중...' : '수정하기'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* 일반 모드 */
        <div data-testid="diary-detail-container">
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
          disabled={isDeleting}
          data-testid="diary-detail-delete-button"
        >
          삭제
        </Button>
      </div>

        </div>
      )}
      
      {/* 회고 입력 섹션 - 항상 렌더링 */}
      <div className={styles.gap24}></div>
      
      <form onSubmit={handleSubmit} className={styles.retrospectInput}>
        <div className={styles.retrospectInputWrapper}>
          <Input 
            variant="primary" 
            theme="light" 
            size="medium"
            placeholder="회고를 입력하세요"
            {...register('content')}
            disabled={isEditMode}
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
          disabled={isDisabled || isEditMode}
          data-testid="retrospect-submit-button"
        >
          입력
        </Button>
      </form>

      <div className={styles.gap16}></div>
      
      {/* 회고 목록 - 항상 렌더링 */}
      <div className={styles.retrospectList} data-testid="retrospect-list">
        {!isRetrospectsLoading && retrospectsList.length === 0 && (
          <div className={styles.retrospectEmpty}>
            등록된 회고가 없습니다.
          </div>
        )}
        {retrospectsList.map((retrospect) => (
          <div key={retrospect.id} className={styles.retrospectItem} data-testid="retrospect-item">
            <p className={styles.retrospectText} data-testid="retrospect-text">
              {retrospect.content}
            </p>
            <span className={styles.retrospectDate} data-testid="retrospect-date">
              {formatRetrospectDate(retrospect.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
