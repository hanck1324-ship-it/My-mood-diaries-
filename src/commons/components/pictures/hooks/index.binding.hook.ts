import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

// API 응답 타입 정의
interface DogApiResponse {
  message: string[];
  status: string;
}

// 강아지 사진 데이터 타입
export interface DogImage {
  id: string;
  src: string;
  alt: string;
}

/**
 * 강아지 사진 API를 호출하는 함수
 */
const fetchDogImages = async (): Promise<DogImage[]> => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
  
  if (!response.ok) {
    throw new Error('Failed to fetch dog images');
  }
  
  const data: DogApiResponse = await response.json();
  
  return data.message.map((url, index) => ({
    id: `${Date.now()}-${index}`,
    src: url,
    alt: `강아지 사진 ${index + 1}`,
  }));
};

/**
 * Hook 반환 타입
 */
interface UseDogImagesReturn {
  images: DogImage[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  isError: boolean;
  observerTarget: React.RefObject<HTMLDivElement>;
}

/**
 * 강아지 사진 목록 조회 및 무한 스크롤 Hook
 * 
 * @returns {UseDogImagesReturn} Hook 반환값
 * @returns {DogImage[]} images - 강아지 이미지 배열
 * @returns {boolean} isLoading - 초기 로딩 상태
 * @returns {boolean} isFetchingNextPage - 추가 페이지 로딩 상태
 * @returns {boolean} hasNextPage - 다음 페이지 존재 여부
 * @returns {Function} fetchNextPage - 다음 페이지 로드 함수
 * @returns {boolean} isError - 에러 상태
 * @returns {React.RefObject} observerTarget - Intersection Observer 타겟 ref
 * 
 * @example
 * ```tsx
 * const { images, isLoading, observerTarget } = useDogImages();
 * ```
 */
export const useDogImages = (): UseDogImagesReturn => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['dogImages'],
    queryFn: fetchDogImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 무한 스크롤을 위해 항상 다음 페이지가 있다고 설정
      return allPages.length;
    },
  });

  // 무한 스크롤을 위한 Intersection Observer 설정
  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // observer target이 보이면 다음 페이지 로드
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('Intersection Observer triggered - fetching next page');
          fetchNextPage();
        }
      },
      {
        threshold: 0.1, // 10% 보이면 트리거
        rootMargin: '100px', // 100px 전에 미리 로드
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 이미지를 하나의 배열로 합치기
  const images = data?.pages.flat() ?? [];

  return {
    images,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    observerTarget,
  };
};

