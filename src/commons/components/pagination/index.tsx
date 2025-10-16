import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type PaginationVariant = 'primary' | 'secondary' | 'tertiary';
export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationTheme = 'light' | 'dark';

export interface PaginationProps {
  variant?: PaginationVariant;
  size?: PaginationSize;
  theme?: PaginationTheme;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      currentPage,
      totalPages,
      onPageChange,
      className,
      maxVisiblePages = 5,
    },
    ref
  ) => {
    const containerClasses = [
      styles.pagination,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const leftSide = Math.floor(maxVisiblePages / 2);
        const rightSide = maxVisiblePages - leftSide - 1;
        
        if (currentPage <= leftSide + 1) {
          for (let i = 1; i <= maxVisiblePages - 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - rightSide) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    const handlePageClick = (page: number | string) => {
      if (typeof page === 'number' && page !== currentPage) {
        onPageChange(page);
      }
    };

    const pages = getPageNumbers();
    const isPrevDisabled = currentPage === 1;
    const isNextDisabled = currentPage === totalPages;

    return (
      <div ref={ref} className={containerClasses} data-testid="pagination">
        <button
          className={`${styles.navButton} ${isPrevDisabled ? styles.disabled : ''}`}
          onClick={handlePrevious}
          disabled={isPrevDisabled}
          aria-label="Previous page"
        >
          <Image
            src={isPrevDisabled ? '/icons/leftdisabled_outline_light_m.svg' : '/icons/leftenable_outline_light_m.svg'}
            alt="Previous"
            width={24}
            height={24}
            className={styles.icon}
          />
        </button>

        <div className={styles.pageNumbers}>
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                className={`${styles.pageButton} ${
                  page === currentPage ? styles.active : ''
                }`}
                onClick={() => handlePageClick(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          className={`${styles.navButton} ${isNextDisabled ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="Next page"
        >
          <Image
            src={isNextDisabled ? '/icons/rightdisabled_outline_light_m.svg' : '/icons/rightenable_outline_light_m.svg'}
            alt="Next"
            width={24}
            height={24}
            className={styles.icon}
          />
        </button>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;

