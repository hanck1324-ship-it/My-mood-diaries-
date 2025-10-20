import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Modal } from './index';

const meta = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'danger'],
      description: '모달의 변형 타입',
    },
    actions: {
      control: 'select',
      options: ['single', 'dual'],
      description: '모달의 액션 버튼 타입',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '모달의 테마',
    },
    title: {
      control: 'text',
      description: '모달의 제목',
    },
    description: {
      control: 'text',
      description: '모달의 설명',
    },
    confirmText: {
      control: 'text',
      description: '확인 버튼 텍스트',
    },
    cancelText: {
      control: 'text',
      description: '취소 버튼 텍스트',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '모달 제목',
    description: '모달 설명 내용입니다.',
    confirmText: '확인',
  },
};

// Info Variant - Single Action
export const InfoSingleLight: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '정보 모달',
    description: '단일 버튼 액션을 가진 정보 모달입니다.',
    confirmText: '확인',
  },
};

export const InfoSingleDark: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    title: '정보 모달',
    description: '단일 버튼 액션을 가진 정보 모달입니다.',
    confirmText: '확인',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Info Variant - Dual Action
export const InfoDualLight: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '정보 모달',
    description: '이중 버튼 액션을 가진 정보 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
};

export const InfoDualDark: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'dark',
    title: '정보 모달',
    description: '이중 버튼 액션을 가진 정보 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Danger Variant - Single Action
export const DangerSingleLight: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'light',
    title: '경고 모달',
    description: '단일 버튼 액션을 가진 경고 모달입니다.',
    confirmText: '확인',
  },
};

export const DangerSingleDark: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    theme: 'dark',
    title: '경고 모달',
    description: '단일 버튼 액션을 가진 경고 모달입니다.',
    confirmText: '확인',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Danger Variant - Dual Action
export const DangerDualLight: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    title: '경고 모달',
    description: '이중 버튼 액션을 가진 경고 모달입니다.',
    confirmText: '삭제',
    cancelText: '취소',
  },
};

export const DangerDualDark: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'dark',
    title: '경고 모달',
    description: '이중 버튼 액션을 가진 경고 모달입니다.',
    confirmText: '삭제',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: 'All Variants',
    description: 'All modal variants',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Modal
        variant="info"
        actions="single"
        theme="light"
        title="Info - Single"
        description="단일 버튼 정보 모달"
        confirmText="확인"
      />
      <Modal
        variant="info"
        actions="dual"
        theme="light"
        title="Info - Dual"
        description="이중 버튼 정보 모달"
        confirmText="확인"
        cancelText="취소"
      />
      <Modal
        variant="danger"
        actions="single"
        theme="light"
        title="Danger - Single"
        description="단일 버튼 경고 모달"
        confirmText="확인"
      />
      <Modal
        variant="danger"
        actions="dual"
        theme="light"
        title="Danger - Dual"
        description="이중 버튼 경고 모달"
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  ),
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'dark',
    title: 'All Variants',
    description: 'All modal variants',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Modal
        variant="info"
        actions="single"
        theme="dark"
        title="Info - Single"
        description="단일 버튼 정보 모달"
        confirmText="확인"
      />
      <Modal
        variant="info"
        actions="dual"
        theme="dark"
        title="Info - Dual"
        description="이중 버튼 정보 모달"
        confirmText="확인"
        cancelText="취소"
      />
      <Modal
        variant="danger"
        actions="single"
        theme="dark"
        title="Danger - Single"
        description="단일 버튼 경고 모달"
        confirmText="확인"
      />
      <Modal
        variant="danger"
        actions="dual"
        theme="dark"
        title="Danger - Dual"
        description="이중 버튼 경고 모달"
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  ),
};

// 인터랙션이 있는 모달
export const WithInteraction: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '확인이 필요합니다',
    description: '이 작업을 계속 진행하시겠습니까?',
    confirmText: '확인',
    cancelText: '취소',
    onConfirm: () => alert('확인 버튼이 클릭되었습니다.'),
    onCancel: () => alert('취소 버튼이 클릭되었습니다.'),
  },
};

// 긴 텍스트를 가진 모달
export const WithLongText: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'light',
    title: '긴 제목을 가진 모달입니다',
    description: '이것은 매우 긴 설명 텍스트를 가진 모달입니다. 여러 줄에 걸쳐 표시될 수 있습니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
};

// 커스텀 버튼 텍스트
export const CustomButtonText: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'light',
    title: '파일 삭제',
    description: '정말로 이 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirmText: '삭제하기',
    cancelText: '유지하기',
  },
};

