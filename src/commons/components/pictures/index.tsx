'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import SelectBox from '../selectbox';
import { useDogImages } from './hooks/index.binding.hook';

import styles from './styles.module.css';

export type PicturesProps = React.HTMLAttributes<HTMLDivElement>;

// Mock 데이터
const FILTER_OPTIONS = [
  { value: 'default', label: '기본' },
  { value: 'newest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
];

/**
 * Pictures 컴포넌트
 * 
 * 사진 목록과 필터 영역을 포함하는 컴포넌트
 * 
 * @param props - PicturesProps
 * @returns Pictures 컴포넌트
 * 
 * @example
 * ```tsx
 * <Pictures />
 * ```
 */
/**
 * 스플래시 스크린 컴포넌트
 */
const SplashScreen = () => (
  <div className={styles.splashScreen} data-testid="pictures-splash-screen" />
);

export const Pictures = React.forwardRef<HTMLDivElement, PicturesProps>(
  ({ className, ...props }, ref) => {
    const [selectedFilter, setSelectedFilter] = useState('default');
    const { images, isLoading, isFetchingNextPage, isError, observerTarget } = useDogImages();

    const containerClasses = [
      styles.container,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div 
        ref={ref} 
        className={containerClasses} 
        data-testid="pictures-container"
        {...props}
      >
        <div className={styles.gap} data-testid="pictures-gap-top"></div>
        
        <div className={styles.filter} data-testid="pictures-filter">
          <SelectBox
            variant="primary"
            size="large"
            theme="light"
            options={FILTER_OPTIONS}
            value={selectedFilter}
            onChange={setSelectedFilter}
            className={styles.selectBox}
          />
        </div>
        
        <div className={styles.gap} data-testid="pictures-gap-bottom"></div>
        
        <div className={styles.main} data-testid="pictures-main">
          {/* 초기 로딩 중 - 스플래시 스크린 6개 표시 */}
          {isLoading && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <SplashScreen key={`splash-${i}`} />
              ))}
            </>
          )}

          {/* 에러가 발생한 경우 */}
          {isError && !isLoading && (
            <div data-testid="pictures-error">
              이미지를 불러오는데 실패했습니다.
            </div>
          )}

          {/* 이미지 로드 성공 */}
          {!isLoading && !isError && images.map((image, index) => (
            <div key={image.id} className={styles.imageCard}>
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={640}
                className={styles.image}
                data-testid={`pictures-image-${index}`}
                unoptimized
              />
            </div>
          ))}

          {/* 추가 페이지 로딩 중 */}
          {isFetchingNextPage && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <SplashScreen key={`splash-next-${i}`} />
              ))}
            </>
          )}

          {/* 무한 스크롤을 위한 observer target */}
          {!isLoading && !isError && images.length >= 4 && (
            <div 
              ref={observerTarget} 
              className={styles.observerTarget}
              data-testid="pictures-observer-target"
            />
          )}
        </div>
      </div>
    );
  }
);

Pictures.displayName = 'Pictures';

export default Pictures;
