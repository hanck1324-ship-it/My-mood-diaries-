'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import SelectBox from '@/commons/components/selectbox';
import SearchBar from '@/commons/components/searchbar';
import Button from '@/commons/components/button';
import Pagination from '@/commons/components/pagination';
import { Emotion, EMOTION_META } from '@/commons/constants/enum';
import { useLinkModal } from './hooks/index.link.modal.hook';

type DiaryCard = {
  id: number;
  date: string;
  emotion: Emotion;
  content: string;
};

const MOCK_DIARIES: DiaryCard[] = [
  {
    id: 1,
    date: '2024.10.13',
    emotion: Emotion.Happy,
    content: '오늘은 정말 행복한 하루였어요. 친구들과 즐거운 시간을 보냈습니다.',
  },
  {
    id: 2,
    date: '2024.10.12',
    emotion: Emotion.Sad,
    content: '오늘은 조금 우울한 날이었어요. 하지만 내일은 더 나아질 거예요.',
  },
  {
    id: 3,
    date: '2024.10.11',
    emotion: Emotion.Angry,
    content: '짜증나는 일이 있었지만, 잘 극복했어요.',
  },
  {
    id: 4,
    date: '2024.10.10',
    emotion: Emotion.Surprise,
    content: '예상치 못한 좋은 소식이 있었어요!',
  },
  {
    id: 5,
    date: '2024.10.09',
    emotion: Emotion.Etc,
    content: '평범한 하루였지만 나름 의미있었어요.',
  },
  {
    id: 6,
    date: '2024.10.08',
    emotion: Emotion.Happy,
    content: '가족과 함께한 즐거운 저녁시간이었어요.',
  },
  {
    id: 7,
    date: '2024.10.07',
    emotion: Emotion.Sad,
    content: '일이 생각대로 풀리지 않아 속상했어요.',
  },
  {
    id: 8,
    date: '2024.10.06',
    emotion: Emotion.Angry,
    content: '화가 났지만 침착하게 대처했어요.',
  },
];

export default function Diaries() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const { handleWriteDiary } = useLinkModal();

  const filterOptions = [
    { value: 'all', label: '전체' },
  ];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log('검색:', value);
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
        {MOCK_DIARIES.map((diary) => {
          const emotionMeta = EMOTION_META[diary.emotion];
          return (
            <div key={diary.id} className={styles.diaryCard}>
              <div className={styles.cardImage}>
                <Image
                  src={emotionMeta.image}
                  alt={emotionMeta.label}
                  fill
                  sizes="274px"
                  style={{ objectFit: 'cover' }}
                  priority={diary.id <= 4}
                />
                <button 
                  className={styles.deleteButton}
                  onClick={() => console.log('삭제:', diary.id)}
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
                <div className={styles.cardText}>{diary.content}</div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardEmotion} style={{ color: emotionMeta.color }}>
                    {emotionMeta.label}
                  </div>
                  <div className={styles.cardDate}>{diary.date}</div>
                </div>
              </div>
            </div>
          );
        })}
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

