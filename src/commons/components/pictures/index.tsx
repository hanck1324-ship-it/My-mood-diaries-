'use client';

import React from 'react';
import Image from 'next/image';

import SelectBox from '../selectbox';
import { useDogImages } from './hooks/index.binding.hook';
import { useImageFilter } from './hooks/index.filter.hook';

import styles from './styles.module.css';

export type PicturesProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Pictures 컴포넌트
 * 
 * 강아지 사진 목록을 무한 스크롤로 표시하는 컴포넌트
 * dog.ceo API를 사용하여 실시간으로 사진을 가져옵니다.
 * 
 * @param {PicturesProps} props - 컴포넌트 props
 * @param {React.Ref} ref - 컴포넌트 ref
 * @returns {JSX.Element} Pictures 컴포넌트
 * 
 * @example
 * ```tsx
 * <Pictures />
 * ```
 */
export const Pictures = React.forwardRef<HTMLDivElement, PicturesProps>(
  ({ className, ...props }, ref) => {
    const { selectedFilter, setSelectedFilter, filterOptions, getImageSize } = useImageFilter();
    const { images, isLoading, isFetchingNextPage, isError, observerTarget } = useDogImages();
    
    const imageSize = getImageSize();

    // SelectBox의 onChange는 string을 받지만, setSelectedFilter는 FilterType을 받음
    const handleFilterChange = (value: string) => {
      setSelectedFilter(value as 'default' | 'horizontal' | 'vertical');
    };

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
            options={filterOptions}
            value={selectedFilter}
            onChange={handleFilterChange}
            className={styles.selectBox}
          />
        </div>
        
        <div className={styles.gap} data-testid="pictures-gap-bottom"></div>
        
        <div className={styles.main} data-testid="pictures-main">
          {/* 초기 로딩 중 - 스플래시 스크린 6개 표시 */}
          {isLoading && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={`splash-${i}`}
                  className={styles.splashScreen} 
                  style={{
                    width: `${imageSize.width}px`,
                    height: `${imageSize.height}px`,
                  }}
                  data-testid="pictures-splash-screen"
                />
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
            <div 
              key={image.id} 
              className={styles.imageCard}
              style={{
                width: `${imageSize.width}px`,
                height: `${imageSize.height}px`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={imageSize.width}
                height={imageSize.height}
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
                <div 
                  key={`splash-next-${i}`}
                  className={styles.splashScreen}
                  style={{
                    width: `${imageSize.width}px`,
                    height: `${imageSize.height}px`,
                  }}
                  data-testid="pictures-splash-screen"
                />
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
