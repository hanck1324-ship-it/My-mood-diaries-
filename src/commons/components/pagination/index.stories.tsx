import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Pagination } from './index';

const meta = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '페이지네이션의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '페이지네이션의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '페이지네이션의 테마',
    },
    currentPage: {
      control: 'number',
      description: '현재 페이지 번호',
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
    },
    maxVisiblePages: {
      control: 'number',
      description: '표시할 최대 페이지 수',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Secondary 변형
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Tertiary 변형
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const TertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 크기 변형
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 상태 변형
export const FirstPage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const FewPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 2,
    totalPages: 3,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

export const ManyPages: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    currentPage: 15,
    totalPages: 50,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: () => {
    const [page1, setPage1] = useState(3);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(3);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="primary" size="small" theme="light" currentPage={page1} totalPages={10} onPageChange={setPage1} />
          <Pagination variant="primary" size="medium" theme="light" currentPage={page1} totalPages={10} onPageChange={setPage1} />
          <Pagination variant="primary" size="large" theme="light" currentPage={page1} totalPages={10} onPageChange={setPage1} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="secondary" size="small" theme="light" currentPage={page2} totalPages={10} onPageChange={setPage2} />
          <Pagination variant="secondary" size="medium" theme="light" currentPage={page2} totalPages={10} onPageChange={setPage2} />
          <Pagination variant="secondary" size="large" theme="light" currentPage={page2} totalPages={10} onPageChange={setPage2} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="tertiary" size="small" theme="light" currentPage={page3} totalPages={10} onPageChange={setPage3} />
          <Pagination variant="tertiary" size="medium" theme="light" currentPage={page3} totalPages={10} onPageChange={setPage3} />
          <Pagination variant="tertiary" size="large" theme="light" currentPage={page3} totalPages={10} onPageChange={setPage3} />
        </div>
      </div>
    );
  },
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => {
    const [page1, setPage1] = useState(3);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(3);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="primary" size="small" theme="dark" currentPage={page1} totalPages={10} onPageChange={setPage1} />
          <Pagination variant="primary" size="medium" theme="dark" currentPage={page1} totalPages={10} onPageChange={setPage1} />
          <Pagination variant="primary" size="large" theme="dark" currentPage={page1} totalPages={10} onPageChange={setPage1} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="secondary" size="small" theme="dark" currentPage={page2} totalPages={10} onPageChange={setPage2} />
          <Pagination variant="secondary" size="medium" theme="dark" currentPage={page2} totalPages={10} onPageChange={setPage2} />
          <Pagination variant="secondary" size="large" theme="dark" currentPage={page2} totalPages={10} onPageChange={setPage2} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Pagination variant="tertiary" size="small" theme="dark" currentPage={page3} totalPages={10} onPageChange={setPage3} />
          <Pagination variant="tertiary" size="medium" theme="dark" currentPage={page3} totalPages={10} onPageChange={setPage3} />
          <Pagination variant="tertiary" size="large" theme="dark" currentPage={page3} totalPages={10} onPageChange={setPage3} />
        </div>
      </div>
    );
  },
};

// 상태 모음
export const AllStates: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(10);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>First Page (이전 버튼 비활성화)</p>
          <Pagination variant="primary" theme="light" currentPage={page1} totalPages={10} onPageChange={setPage1} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Middle Page (모든 버튼 활성화)</p>
          <Pagination variant="primary" theme="light" currentPage={page2} totalPages={10} onPageChange={setPage2} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Last Page (다음 버튼 비활성화)</p>
          <Pagination variant="primary" theme="light" currentPage={page3} totalPages={10} onPageChange={setPage3} />
        </div>
      </div>
    );
  },
};

// 페이지 수 변형
export const PageVariations: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: () => {},
  },
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(15);
    const [page4, setPage4] = useState(5);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Single Page (1/1)</p>
          <Pagination variant="primary" theme="light" currentPage={page1} totalPages={1} onPageChange={setPage1} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Few Pages (3/5)</p>
          <Pagination variant="primary" theme="light" currentPage={page2} totalPages={5} onPageChange={setPage2} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Many Pages (15/50)</p>
          <Pagination variant="primary" theme="light" currentPage={page3} totalPages={50} onPageChange={setPage3} />
        </div>
        <div>
          <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Custom Max Visible Pages (5/20, maxVisiblePages: 7)</p>
          <Pagination variant="primary" theme="light" currentPage={page4} totalPages={20} onPageChange={setPage4} maxVisiblePages={7} />
        </div>
      </div>
    );
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: () => {},
  },
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
            현재 페이지: <strong>{currentPage}</strong> / 20
          </p>
        </div>
        <Pagination 
          variant="primary" 
          size="medium" 
          theme="light" 
          currentPage={currentPage} 
          totalPages={20} 
          onPageChange={setCurrentPage} 
        />
      </div>
    );
  },
};

