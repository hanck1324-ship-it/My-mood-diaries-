import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toggle } from './index';
import { useState } from 'react';

const meta = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '토글의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '토글의 테마',
    },
    checked: {
      control: 'boolean',
      description: '토글 체크 상태',
    },
    disabled: {
      control: 'boolean',
      description: '토글 비활성화 상태',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
};

export const PrimaryChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const PrimaryDarkChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    checked: true,
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
    checked: false,
  },
};

export const SecondaryChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    checked: true,
  },
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    checked: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const SecondaryDarkChecked: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    checked: true,
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
    checked: false,
  },
};

export const TertiaryChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    checked: true,
  },
};

export const TertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    checked: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const TertiaryDarkChecked: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    checked: true,
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
    checked: false,
  },
};

export const SmallChecked: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    checked: true,
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
  },
};

export const MediumChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    checked: false,
  },
};

export const LargeChecked: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    checked: true,
  },
};

// 상태 변형
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    checked: true,
    disabled: true,
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Small Primary:</span>
          <Toggle variant="primary" size="small" theme="light" checked={false} />
          <Toggle variant="primary" size="small" theme="light" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Medium Primary:</span>
          <Toggle variant="primary" size="medium" theme="light" checked={false} />
          <Toggle variant="primary" size="medium" theme="light" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Large Primary:</span>
          <Toggle variant="primary" size="large" theme="light" checked={false} />
          <Toggle variant="primary" size="large" theme="light" checked={true} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Small Secondary:</span>
          <Toggle variant="secondary" size="small" theme="light" checked={false} />
          <Toggle variant="secondary" size="small" theme="light" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Medium Secondary:</span>
          <Toggle variant="secondary" size="medium" theme="light" checked={false} />
          <Toggle variant="secondary" size="medium" theme="light" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Large Secondary:</span>
          <Toggle variant="secondary" size="large" theme="light" checked={false} />
          <Toggle variant="secondary" size="large" theme="light" checked={true} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Small Tertiary:</span>
          <Toggle variant="tertiary" size="small" theme="light" checked={false} />
          <Toggle variant="tertiary" size="small" theme="light" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Medium Tertiary:</span>
          <Toggle variant="tertiary" size="medium" theme="light" checked={false} />
          <Toggle variant="tertiary" size="medium" theme="light" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px' }}>Large Tertiary:</span>
          <Toggle variant="tertiary" size="large" theme="light" checked={false} />
          <Toggle variant="tertiary" size="large" theme="light" checked={true} />
        </div>
      </div>
    </div>
  ),
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    checked: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Small Primary:</span>
          <Toggle variant="primary" size="small" theme="dark" checked={false} />
          <Toggle variant="primary" size="small" theme="dark" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Medium Primary:</span>
          <Toggle variant="primary" size="medium" theme="dark" checked={false} />
          <Toggle variant="primary" size="medium" theme="dark" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Large Primary:</span>
          <Toggle variant="primary" size="large" theme="dark" checked={false} />
          <Toggle variant="primary" size="large" theme="dark" checked={true} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Small Secondary:</span>
          <Toggle variant="secondary" size="small" theme="dark" checked={false} />
          <Toggle variant="secondary" size="small" theme="dark" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Medium Secondary:</span>
          <Toggle variant="secondary" size="medium" theme="dark" checked={false} />
          <Toggle variant="secondary" size="medium" theme="dark" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Large Secondary:</span>
          <Toggle variant="secondary" size="large" theme="dark" checked={false} />
          <Toggle variant="secondary" size="large" theme="dark" checked={true} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Small Tertiary:</span>
          <Toggle variant="tertiary" size="small" theme="dark" checked={false} />
          <Toggle variant="tertiary" size="small" theme="dark" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Medium Tertiary:</span>
          <Toggle variant="tertiary" size="medium" theme="dark" checked={false} />
          <Toggle variant="tertiary" size="medium" theme="dark" checked={true} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '120px', color: 'white' }}>Large Tertiary:</span>
          <Toggle variant="tertiary" size="large" theme="dark" checked={false} />
          <Toggle variant="tertiary" size="large" theme="dark" checked={true} />
        </div>
      </div>
    </div>
  ),
};

// 상태 모음
export const AllStates: Story = {
  args: {
    checked: false,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '120px' }}>Normal:</span>
        <Toggle variant="primary" theme="light" checked={false} />
        <Toggle variant="primary" theme="light" checked={true} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '120px' }}>Disabled:</span>
        <Toggle variant="primary" theme="light" checked={false} disabled />
        <Toggle variant="primary" theme="light" checked={true} disabled />
      </div>
    </div>
  ),
};

// 비활성화 상태 모음
export const DisabledStates: Story = {
  args: {
    disabled: true,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '120px' }}>Primary:</span>
        <Toggle variant="primary" theme="light" checked={false} disabled />
        <Toggle variant="primary" theme="light" checked={true} disabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '120px' }}>Secondary:</span>
        <Toggle variant="secondary" theme="light" checked={false} disabled />
        <Toggle variant="secondary" theme="light" checked={true} disabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '120px' }}>Tertiary:</span>
        <Toggle variant="tertiary" theme="light" checked={false} disabled />
        <Toggle variant="tertiary" theme="light" checked={true} disabled />
      </div>
    </div>
  ),
};

// 인터랙티브 예시 (상태 관리 포함)
export const Interactive: Story = {
  args: {
    checked: false,
  },
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Toggle 
            variant="primary" 
            theme="light" 
            checked={checked} 
            onChange={setChecked}
          />
          <span>상태: {checked ? 'ON' : 'OFF'}</span>
        </div>
      </div>
    );
  },
};

// 실제 사용 예시 (알림 설정)
export const NotificationSettings: Story = {
  args: {
    checked: false,
  },
  render: () => {
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(false);
    const [smsNotif, setSmsNotif] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>이메일 알림</span>
          <Toggle 
            variant="tertiary" 
            theme="light" 
            checked={emailNotif} 
            onChange={setEmailNotif}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>푸시 알림</span>
          <Toggle 
            variant="tertiary" 
            theme="light" 
            checked={pushNotif} 
            onChange={setPushNotif}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>SMS 알림</span>
          <Toggle 
            variant="tertiary" 
            theme="light" 
            checked={smsNotif} 
            onChange={setSmsNotif}
          />
        </div>
      </div>
    );
  },
};

// 실제 사용 예시 (다크모드 토글)
export const DarkModeToggle: Story = {
  args: {
    checked: false,
  },
  render: () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          padding: '20px',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          borderRadius: '8px',
          transition: 'background-color 0.2s',
        }}
      >
        <span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
          {isDarkMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </span>
        <Toggle 
          variant="primary" 
          theme={isDarkMode ? 'dark' : 'light'} 
          checked={isDarkMode} 
          onChange={setIsDarkMode}
        />
      </div>
    );
  },
};

