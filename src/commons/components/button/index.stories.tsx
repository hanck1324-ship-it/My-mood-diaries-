import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './index';

const meta = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '버튼의 테마',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 상태',
    },
    children: {
      control: 'text',
      description: '버튼 내용',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const PrimaryDark: Story = {
  args: {
    children: 'Primary Button',
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
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
  },
};

export const SecondaryDark: Story = {
  args: {
    children: 'Secondary Button',
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
    children: 'Tertiary Button',
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
  },
};

export const TertiaryDark: Story = {
  args: {
    children: 'Tertiary Button',
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
    children: 'Small Button',
    variant: 'primary',
    size: 'small',
    theme: 'light',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'large',
    theme: 'light',
  },
};

// 상태 변형
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: true,
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" size="small" theme="light">Small</Button>
        <Button variant="primary" size="medium" theme="light">Medium</Button>
        <Button variant="primary" size="large" theme="light">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="secondary" size="small" theme="light">Small</Button>
        <Button variant="secondary" size="medium" theme="light">Medium</Button>
        <Button variant="secondary" size="large" theme="light">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="tertiary" size="small" theme="light">Small</Button>
        <Button variant="tertiary" size="medium" theme="light">Medium</Button>
        <Button variant="tertiary" size="large" theme="light">Large</Button>
      </div>
    </div>
  ),
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" size="small" theme="dark">Small</Button>
        <Button variant="primary" size="medium" theme="dark">Medium</Button>
        <Button variant="primary" size="large" theme="dark">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="secondary" size="small" theme="dark">Small</Button>
        <Button variant="secondary" size="medium" theme="dark">Medium</Button>
        <Button variant="secondary" size="large" theme="dark">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="tertiary" size="small" theme="dark">Small</Button>
        <Button variant="tertiary" size="medium" theme="dark">Medium</Button>
        <Button variant="tertiary" size="large" theme="dark">Large</Button>
      </div>
    </div>
  ),
};

// 비활성화 상태 모음
export const DisabledStates: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="primary" theme="light" disabled>Primary</Button>
        <Button variant="secondary" theme="light" disabled>Secondary</Button>
        <Button variant="tertiary" theme="light" disabled>Tertiary</Button>
      </div>
    </div>
  ),
};

