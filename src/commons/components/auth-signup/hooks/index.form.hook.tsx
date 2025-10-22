'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { UrlKey, getUrlPath } from '@/commons/constants/url';

// Zod 검증 스키마
const signupSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').refine(
    (val) => val.includes('@'),
    '이메일에 @가 포함되어야 합니다'
  ),
  password: z.string()
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .refine(
      (val) => /[a-zA-Z]/.test(val) && /[0-9]/.test(val),
      '비밀번호는 영문과 숫자를 포함해야 합니다'
    ),
  passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  name: z.string().min(1, '이름을 입력해주세요'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
});

type SignupFormData = z.infer<typeof signupSchema>;

// GraphQL API 응답 타입
interface CreateUserResponse {
  _id: string;
}

// GraphQL API 호출 함수
const createUser = async (input: { email: string; password: string; name: string }): Promise<CreateUserResponse> => {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation createUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
            _id
          }
        }
      `,
      variables: {
        createUserInput: input,
      },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0]?.message || '회원가입에 실패했습니다');
  }

  return result.data.createUser;
};

/**
 * 회원가입 폼을 관리하는 커스텀 훅
 * 
 * react-hook-form을 사용하여 폼 상태를 관리하고,
 * zod를 통해 유효성 검증을 수행하며,
 * @tanstack/react-query를 사용하여 GraphQL API를 호출합니다.
 * 
 * 회원가입 성공 시 가입완료 모달을 표시하고 로그인 페이지로 이동하며,
 * 실패 시 가입실패 모달을 표시합니다.
 * 
 * @returns {Object} 폼 관리 객체
 * @returns {Function} returns.register - react-hook-form의 입력 필드 등록 함수
 * @returns {Function} returns.handleSubmit - 폼 제출 핸들러 (onSubmit 포함)
 * @returns {Object} returns.errors - 폼 검증 에러 객체
 * @returns {boolean} returns.isValid - 폼 유효성 상태 (모든 필드 검증 통과 여부)
 * @returns {boolean} returns.isLoading - API 호출 중 상태 (로딩 표시용)
 * 
 * @example
 * ```tsx
 * const { register, handleSubmit, isValid, isLoading } = useSignupForm();
 * 
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input {...register('email')} />
 *     <button disabled={!isValid || isLoading}>회원가입</button>
 *   </form>
 * );
 * ```
 */
export const useSignupForm = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const hasShownSuccessModal = useRef(false);
  const hasShownFailureModal = useRef(false);

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // 성공 시 가입완료 모달 표시 (한 번만)
      if (hasShownSuccessModal.current) return;
      hasShownSuccessModal.current = true;

      openModal(
        <div data-testid="auth-signup-success-modal">
          <Modal
            variant="info"
            actions="single"
            theme="light"
            title="가입완료"
            description="회원가입이 완료되었습니다."
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              router.push(getUrlPath(UrlKey.Login));
            }}
          />
        </div>
      );
    },
    onError: (error: Error) => {
      // 실패 시 가입실패 모달 표시 (한 번만)
      if (hasShownFailureModal.current) return;
      hasShownFailureModal.current = true;

      openModal(
        <div data-testid="auth-signup-failure-modal">
          <Modal
            variant="danger"
            actions="single"
            theme="light"
            title="가입실패"
            description={error.message || '회원가입에 실패했습니다.'}
            confirmText="확인"
            onConfirm={() => {
              closeModal();
              hasShownFailureModal.current = false;
            }}
          />
        </div>
      );
    },
  });

  // 폼 제출 핸들러
  const onSubmit = useCallback((data: SignupFormData) => {
    hasShownSuccessModal.current = false;
    hasShownFailureModal.current = false;
    
    mutation.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  }, [mutation]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading: mutation.isPending,
  };
};
