import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './index';

const meta = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '인풋의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '인풋의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '인풋의 테마',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '인풋 비활성화 상태',
    },
    placeholder: {
      control: 'text',
      description: '인풋 플레이스홀더',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    placeholder: 'Primary Input',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const PrimaryDark: Story = {
  args: {
    placeholder: 'Primary Input',
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
    placeholder: 'Secondary Input',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const SecondaryDark: Story = {
  args: {
    placeholder: 'Secondary Input',
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
    placeholder: 'Tertiary Input',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

export const TertiaryDark: Story = {
  args: {
    placeholder: 'Tertiary Input',
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
    placeholder: 'Small Input',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium Input',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large Input',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// 상태 변형
export const Disabled: Story = {
  args: {
    placeholder: 'Disabled Input',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Error Input',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    error: true,
    value: 'Invalid input',
  },
};

export const ErrorDark: Story = {
  args: {
    placeholder: 'Error Input',
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    error: true,
    value: 'Invalid input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    placeholder: 'Input',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="primary" size="small" theme="light" placeholder="Small Primary" />
        <Input variant="primary" size="medium" theme="light" placeholder="Medium Primary" />
        <Input variant="primary" size="large" theme="light" placeholder="Large Primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="secondary" size="small" theme="light" placeholder="Small Secondary" />
        <Input variant="secondary" size="medium" theme="light" placeholder="Medium Secondary" />
        <Input variant="secondary" size="large" theme="light" placeholder="Large Secondary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="tertiary" size="small" theme="light" placeholder="Small Tertiary" />
        <Input variant="tertiary" size="medium" theme="light" placeholder="Medium Tertiary" />
        <Input variant="tertiary" size="large" theme="light" placeholder="Large Tertiary" />
      </div>
    </div>
  ),
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    placeholder: 'Input',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="primary" size="small" theme="dark" placeholder="Small Primary" />
        <Input variant="primary" size="medium" theme="dark" placeholder="Medium Primary" />
        <Input variant="primary" size="large" theme="dark" placeholder="Large Primary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="secondary" size="small" theme="dark" placeholder="Small Secondary" />
        <Input variant="secondary" size="medium" theme="dark" placeholder="Medium Secondary" />
        <Input variant="secondary" size="large" theme="dark" placeholder="Large Secondary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="tertiary" size="small" theme="dark" placeholder="Small Tertiary" />
        <Input variant="tertiary" size="medium" theme="dark" placeholder="Medium Tertiary" />
        <Input variant="tertiary" size="large" theme="dark" placeholder="Large Tertiary" />
      </div>
    </div>
  ),
};

// 상태 모음
export const AllStates: Story = {
  args: {
    placeholder: 'Input',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="primary" theme="light" placeholder="Normal State" />
        <Input variant="primary" theme="light" placeholder="Disabled State" disabled />
        <Input variant="primary" theme="light" placeholder="Error State" error value="Invalid input" />
      </div>
    </div>
  ),
};

// 비활성화 상태 모음
export const DisabledStates: Story = {
  args: {
    placeholder: 'Input',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Input variant="primary" theme="light" placeholder="Primary" disabled />
        <Input variant="secondary" theme="light" placeholder="Secondary" disabled />
        <Input variant="tertiary" theme="light" placeholder="Tertiary" disabled />
      </div>
    </div>
  ),
};

// 타입별 인풋 (HTML input types)
export const InputTypes: Story = {
  args: {
    placeholder: 'Input',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <Input variant="primary" theme="light" type="text" placeholder="Text Input" />
      <Input variant="primary" theme="light" type="email" placeholder="Email Input" />
      <Input variant="primary" theme="light" type="password" placeholder="Password Input" />
      <Input variant="primary" theme="light" type="number" placeholder="Number Input" />
      <Input variant="primary" theme="light" type="tel" placeholder="Tel Input" />
      <Input variant="primary" theme="light" type="url" placeholder="URL Input" />
    </div>
  ),
};

