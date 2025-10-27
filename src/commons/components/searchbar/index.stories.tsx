import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SearchBar } from './index';

const meta = {
  title: 'Commons/Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '검색바의 테마',
    },
    disabled: {
      control: 'boolean',
      description: '검색바 비활성화 상태',
    },
    placeholder: {
      control: 'text',
      description: '검색바 플레이스홀더',
    },
    onSearch: {
      action: 'searched',
      description: '검색 실행 시 호출되는 콜백 함수',
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const PrimaryDark: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Secondary 변형
export const Secondary: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const SecondaryDark: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Tertiary 변형
export const Tertiary: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

export const TertiaryDark: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 크기 변형
export const Small: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// 상태 변형
export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="primary" size="small" theme="light" placeholder="Small Primary Search" />
        <SearchBar variant="primary" size="medium" theme="light" placeholder="Medium Primary Search" />
        <SearchBar variant="primary" size="large" theme="light" placeholder="Large Primary Search" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="secondary" size="small" theme="light" placeholder="Small Secondary Search" />
        <SearchBar variant="secondary" size="medium" theme="light" placeholder="Medium Secondary Search" />
        <SearchBar variant="secondary" size="large" theme="light" placeholder="Large Secondary Search" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="tertiary" size="small" theme="light" placeholder="Small Tertiary Search" />
        <SearchBar variant="tertiary" size="medium" theme="light" placeholder="Medium Tertiary Search" />
        <SearchBar variant="tertiary" size="large" theme="light" placeholder="Large Tertiary Search" />
      </div>
    </div>
  ),
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    placeholder: 'Search...',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="primary" size="small" theme="dark" placeholder="Small Primary Search" />
        <SearchBar variant="primary" size="medium" theme="dark" placeholder="Medium Primary Search" />
        <SearchBar variant="primary" size="large" theme="dark" placeholder="Large Primary Search" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="secondary" size="small" theme="dark" placeholder="Small Secondary Search" />
        <SearchBar variant="secondary" size="medium" theme="dark" placeholder="Medium Secondary Search" />
        <SearchBar variant="secondary" size="large" theme="dark" placeholder="Large Secondary Search" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="tertiary" size="small" theme="dark" placeholder="Small Tertiary Search" />
        <SearchBar variant="tertiary" size="medium" theme="dark" placeholder="Medium Tertiary Search" />
        <SearchBar variant="tertiary" size="large" theme="dark" placeholder="Large Tertiary Search" />
      </div>
    </div>
  ),
};

// 상태 모음
export const AllStates: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="primary" theme="light" placeholder="Normal State" />
        <SearchBar variant="primary" theme="light" placeholder="Disabled State" disabled />
        <SearchBar variant="primary" theme="light" placeholder="With Value" value="Search query" />
      </div>
    </div>
  ),
};

// 비활성화 상태 모음
export const DisabledStates: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <SearchBar variant="primary" theme="light" placeholder="Primary" disabled />
        <SearchBar variant="secondary" theme="light" placeholder="Secondary" disabled />
        <SearchBar variant="tertiary" theme="light" placeholder="Tertiary" disabled />
      </div>
    </div>
  ),
};

// 검색 인터랙션 예제
export const SearchInteraction: Story = {
  args: {
    placeholder: 'Enter 키를 눌러 검색하세요...',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// 다양한 크기 비교
export const SizeComparison: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Small (32px)</div>
        <SearchBar variant="primary" size="small" theme="light" placeholder="Small search bar" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Medium (40px)</div>
        <SearchBar variant="primary" size="medium" theme="light" placeholder="Medium search bar" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>Large (48px)</div>
        <SearchBar variant="primary" size="large" theme="light" placeholder="Large search bar" />
      </div>
    </div>
  ),
};

// 테마 비교
export const ThemeComparison: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px', padding: '20px', background: '#ffffff' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Light Theme</div>
        <SearchBar variant="primary" size="medium" theme="light" placeholder="Primary" />
        <SearchBar variant="secondary" size="medium" theme="light" placeholder="Secondary" />
        <SearchBar variant="tertiary" size="medium" theme="light" placeholder="Tertiary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px', padding: '20px', background: '#1a1a1a' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>Dark Theme</div>
        <SearchBar variant="primary" size="medium" theme="dark" placeholder="Primary" />
        <SearchBar variant="secondary" size="medium" theme="dark" placeholder="Secondary" />
        <SearchBar variant="tertiary" size="medium" theme="dark" placeholder="Tertiary" />
      </div>
    </div>
  ),
};

