'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import SelectBox from '@/commons/components/selectbox';
import SearchBar from '@/commons/components/searchbar';
import Button from '@/commons/components/button';
import Pagination from '@/commons/components/pagination';
import { EMOTION_META } from '@/commons/constants/enum';
import { useLinkModal } from './hooks/index.link.modal.hook';
import { useBindingHook } from './hooks/index.binding.hook';
import { useSearchHook } from './hooks/index.search.hook';
import { useRouter } from 'next/navigation';

export default function Diaries() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const { handleWriteDiary } = useLinkModal();
  const { diaries, isLoading } = useBindingHook();
  const filteredDiaries = useSearchHook(diaries, searchValue);
  const router = useRouter();

  const handleDiaryClick = (id: number) => {
    router.push(`/diaries/${id}`);
  };

  const filterOptions = [
    { value: 'all', label: '전체' },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
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
            onChange={setFilterValue}
            className={styles.selectBox}
          />
          <SearchBar
            variant="primary"
            size="large"
            theme="light"
            placeholder="검색어를 입력해 주세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
          filteredDiaries.map((diary) => {
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
                  <button 
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('삭제:', diary.id);
                    }}
                    aria-label="일기 삭제"
                  >
                    <Image
                      src="/icons/close_outline_light_m.svg"
                      alt="delete"
                      width={20}
                      height={20}
                    />
                  </button>
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
          onPageChange={setCurrentPage}
        />
      </div>
      <div className={styles.gap4}></div>
    </div>
  );
}

