import { useState } from 'react';

/**
 * 필터 타입 정의
 */
export type FilterType = 'default' | 'horizontal' | 'vertical';

/**
 * 필터 옵션 정의
 */
export interface FilterOption {
  value: FilterType;
  label: string;
}

/**
 * 이미지 크기 정의
 */
export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Hook 반환 타입
 */
export interface UseImageFilterReturn {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  filterOptions: FilterOption[];
  getImageSize: () => ImageSize;
  getImageCardSize: () => ImageSize;
}

/**
 * 필터에 따른 이미지 크기 반환
 * 
 * @param {FilterType} filter - 현재 선택된 필터
 * @returns {ImageSize} 이미지 크기
 * 
 * @example
 * const imageSize = getImageSizeByFilter('horizontal');
 * // { width: 640, height: 480 }
 */
const getImageSizeByFilter = (filter: FilterType): ImageSize => {
  switch (filter) {
    case 'horizontal':
      return { width: 640, height: 480 };
    case 'vertical':
      return { width: 480, height: 640 };
    case 'default':
    default:
      return { width: 640, height: 640 };
  }
};

/**
 * 이미지 필터 관리 Hook
 * 필터 선택 및 이미지 크기 관리를 담당합니다.
 * 
 * @returns {UseImageFilterReturn} Hook 반환값
 * @returns {FilterType} selectedFilter - 현재 선택된 필터
 * @returns {Function} setSelectedFilter - 필터 변경 함수
 * @returns {FilterOption[]} filterOptions - 필터 옵션 목록
 * @returns {Function} getImageSize - 현재 필터의 이미지 크기 반환
 * @returns {Function} getImageCardSize - 현재 필터의 이미지 카드 크기 반환
 * 
 * @example
 * ```tsx
 * const { selectedFilter, setSelectedFilter, getImageSize } = useImageFilter();
 * const size = getImageSize();
 * ```
 */
export const useImageFilter = (): UseImageFilterReturn => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('default');

  const filterOptions: FilterOption[] = [
    { value: 'default', label: '기본' },
    { value: 'horizontal', label: '가로형' },
    { value: 'vertical', label: '세로형' },
  ];

  /**
   * 현재 필터에 따른 이미지 크기 반환
   */
  const getImageSize = (): ImageSize => {
    return getImageSizeByFilter(selectedFilter);
  };

  /**
   * 현재 필터에 따른 이미지 카드 크기 반환
   */
  const getImageCardSize = (): ImageSize => {
    return getImageSizeByFilter(selectedFilter);
  };

  return {
    selectedFilter,
    setSelectedFilter,
    filterOptions,
    getImageSize,
    getImageCardSize,
  };
};

