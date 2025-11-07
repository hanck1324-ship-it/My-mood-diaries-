'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/commons/components/button';
import Pagination from '@/commons/components/pagination';
import SearchBar from '@/commons/components/searchbar';
import SelectBox from '@/commons/components/selectbox';
import { EMOTION_META } from '@/commons/constants/enum';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import { useBindingHook } from './hooks/index.binding.hook';
import { useDeleteDiary } from './hooks/index.delete.hook';
import { useFilterHook, getFilterOptions, FilterType } from './hooks/index.filter.hook';
import { useLinkModal } from './hooks/index.link.modal.hook';
import { usePagination } from './hooks/index.pagination.hook';
import { useSearchHook } from './hooks/index.search.hook';

import styles from './styles.module.css';

export default function Diaries() {
  const [filterValue, setFilterValue] = useState<FilterType>('all');
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState(''); // 입력 중인 검색어

  const { handleWriteDiary } = useLinkModal();
  const { diaries, isLoading } = useBindingHook();
  const router = useRouter();
  const { openDeleteModal, isDeleting } = useDeleteDiary();
  const { isLoggedIn } = useAuthGuard();

  // 필터링: 먼저 검색으로 필터링, 그 다음 감정으로 필터링
  const searchedDiaries = useSearchHook(diaries, searchValue);
  const filteredDiaries = useFilterHook(searchedDiaries, filterValue);

  // 페이지네이션: 필터링된 데이터를 12개씩 페이지네이션
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedDiaries,
    handlePageChange,
    resetToFirstPage
  } = usePagination(filteredDiaries, 12);

  const handleDiaryClick = (id: number) => {
    router.push(`/diaries/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    openDeleteModal(id);
  };

  const filterOptions = getFilterOptions();

  const handleFilterChange = (value: string) => {
    setFilterValue(value as FilterType);
    resetToFirstPage(); // 필터 변경 시 첫 페이지로 리셋
  };

  const handleSearch = (value: string) => {
    setSearchValue(value.trim());
    resetToFirstPage(); // 검색 시 첫 페이지로 리셋
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.container} data-testid="diaries-container">
      <div className={styles.gap}></div>
      <div className={styles.search}>
        <div className={styles.searchLeft}>
          <SelectBox
            variant="primary"
            size="medium"
            theme="light"
            options={filterOptions}
            value={filterValue}
            onChange={handleFilterChange}
            className={styles.selectBox}
            data-testid="diaries-filter-selectbox"
          />
          <SearchBar
            variant="primary"
            size="large"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            value={inputValue}
            onChange={handleInputChange}
            onSearch={handleSearch}
            className={styles.searchBar}
          />
        </div>
        <Button
          variant="primary"
          size="large"
          theme="light"
          onClick={handleWriteDiary}
          className={styles.writeButton}
          data-testid="diaries-write-button"
        >
          <Image 
            src="/icons/plus_outline_light_m.svg" 
            alt="add" 
            width={24} 
            height={24}
          />
          일기쓰기
        </Button>
      </div>
      <div className={styles.gap2}></div>
      <div className={styles.main}>
        {isLoading ? (
          <div>로딩중...</div>
        ) : (
          paginatedDiaries.map((diary) => {
            const emotionMeta = EMOTION_META[diary.emotion];
            return (
              <div 
                key={diary.id} 
                className={styles.diaryCard}
                onClick={() => handleDiaryClick(diary.id)}
                data-testid={`diary-card-${diary.id}`}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={emotionMeta.image}
                    alt={emotionMeta.label}
                    fill
                    sizes="274px"
                    style={{ objectFit: 'cover' }}
                    priority={diary.id <= 4}
                    data-testid={`diary-image-${diary.id}`}
                  />
                  {isLoggedIn() && (
                    <button 
                      className={styles.deleteButton}
                      onClick={(e) => handleDeleteClick(e, diary.id)}
                      aria-label="일기 삭제"
                    >
                      <Image
                        src="/icons/close_outline_light_m.svg"
                        alt="delete"
                        width={20}
                        height={20}
                      />
                    </button>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <div 
                    className={styles.cardText}
                    data-testid={`diary-title-${diary.id}`}
                  >
                    {diary.title}
                  </div>
                  <div className={styles.cardFooter}>
                    <div 
                      className={styles.cardEmotion} 
                      style={{ color: emotionMeta.color }}
                      data-testid={`diary-emotion-${diary.id}`}
                    >
                      {emotionMeta.label}
                    </div>
                    <div 
                      className={styles.cardDate}
                      data-testid={`diary-date-${diary.id}`}
                    >
                      {diary.createdAt}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className={styles.gap3}></div>
      <div className={styles.pagination}>
        <Pagination
          variant="primary"
          size="small"
          theme="light"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          data-testid="diaries-pagination"
        />
      </div>
      <div className={styles.gap4}></div>
    </div>
  );
}

