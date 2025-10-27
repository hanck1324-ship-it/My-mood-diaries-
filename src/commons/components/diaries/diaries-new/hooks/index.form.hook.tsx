'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Emotion } from '@/commons/constants/enum';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { buildUrl, UrlKey } from '@/commons/constants/url';

// Zod 스키마 정의
const diaryFormSchema = z.object({
  emotion: z.nativeEnum(Emotion, {
    message: '감정을 선택해주세요',
  }),
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
});

type DiaryFormData = z.infer<typeof diaryFormSchema>;

// 로컬스토리지에 저장될 일기 타입
type DiaryItem = {
  id: number;
  title: string;
  content: string;
  emotion: Emotion;
  createdAt: string;
};

export const useDiaryForm = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    mode: 'onChange',
    defaultValues: {
      emotion: undefined,
      title: '',
      content: '',
    },
  });

  // 폼 제출 핸들러
  const onSubmit = handleSubmit((data) => {
    // 로컬스토리지에서 기존 일기 목록 가져오기
    const existingDiariesJSON = localStorage.getItem('diaries');
    const existingDiaries: DiaryItem[] = existingDiariesJSON
      ? JSON.parse(existingDiariesJSON)
      : [];

    // 새로운 ID 계산
    const newId =
      existingDiaries.length > 0
        ? Math.max(...existingDiaries.map((d) => d.id)) + 1
        : 1;

    // 새로운 일기 생성
    const newDiary: DiaryItem = {
      id: newId,
      title: data.title,
      content: data.content,
      emotion: data.emotion,
      createdAt: new Date().toISOString(),
    };

    // 로컬스토리지에 저장
    const updatedDiaries = [...existingDiaries, newDiary];
    localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

    // 등록완료 모달 표시
    openModal(
      <div data-testid="registration-success-modal">
        <Modal
          variant="info"
          actions="single"
          theme="light"
          title="등록완료"
          description="일기가 성공적으로 등록되었습니다."
          confirmText="확인"
          onConfirm={() => {
            // 모든 모달 닫기
            closeModal(); // 등록완료 모달 닫기
            closeModal(); // 일기쓰기 모달 닫기
            
            // 상세 페이지로 이동
            const detailPageUrl = buildUrl(UrlKey.DiaryDetail, { id: newId });
            router.push(detailPageUrl);
          }}
        />
      </div>
    );
  });

  // 감정 변경 핸들러
  const handleEmotionChange = (emotion: Emotion) => {
    setValue('emotion', emotion, { shouldValidate: true });
  };

  // 현재 폼 값들
  const watchedValues = watch();

  return {
    register,
    handleSubmit: onSubmit,
    handleEmotionChange,
    errors,
    isValid,
    watchedValues,
  };
};

