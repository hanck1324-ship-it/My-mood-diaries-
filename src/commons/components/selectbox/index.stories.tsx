import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SelectBox, SelectBoxOption } from './index';

const meta = {
  title: 'Commons/Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스의 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스의 크기',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: '셀렉트박스의 테마',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '셀렉트박스 비활성화 상태',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Figma 디자인 기반 옵션 데이터
const emotionOptions: SelectBoxOption[] = [
  { value: 'all', label: '전체' },
  { value: 'happy', label: '행복해요' },
  { value: 'sad', label: '슬퍼요' },
  { value: 'surprise', label: '놀랐어요' },
  { value: 'angry', label: '화나요' },
  { value: 'etc', label: '기타' },
];

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
    placeholder: '선택하세요',
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

// Primary 변형
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('all');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const PrimaryDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: emotionOptions,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('all');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

// Secondary 변형
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const SecondaryDark: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    theme: 'dark',
    options: emotionOptions,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

// Tertiary 변형
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const TertiaryDark: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    theme: 'dark',
    options: emotionOptions,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

// 크기 변형
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    theme: 'light',
    options: emotionOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    theme: 'light',
    options: emotionOptions,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

// 상태 변형
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
    disabled: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const Error: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    options: emotionOptions,
    error: true,
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

export const ErrorDark: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'dark',
    options: emotionOptions,
    error: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: function Render(args) {
    const [value, setValue] = useState<string>('');
    return <SelectBox {...args} value={value} onChange={setValue} />;
  },
};

// 모든 변형 조합 (Light Theme)
export const AllVariantsLight: Story = {
  args: {
    options: emotionOptions,
  },
  render: function Render() {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [value3, setValue3] = useState<string>('');
    const [value4, setValue4] = useState<string>('');
    const [value5, setValue5] = useState<string>('');
    const [value6, setValue6] = useState<string>('');
    const [value7, setValue7] = useState<string>('');
    const [value8, setValue8] = useState<string>('');
    const [value9, setValue9] = useState<string>('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0 }}>Primary</h3>
          <SelectBox variant="primary" size="small" theme="light" options={emotionOptions} value={value1} onChange={setValue1} />
          <SelectBox variant="primary" size="medium" theme="light" options={emotionOptions} value={value2} onChange={setValue2} />
          <SelectBox variant="primary" size="large" theme="light" options={emotionOptions} value={value3} onChange={setValue3} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0 }}>Secondary</h3>
          <SelectBox variant="secondary" size="small" theme="light" options={emotionOptions} value={value4} onChange={setValue4} />
          <SelectBox variant="secondary" size="medium" theme="light" options={emotionOptions} value={value5} onChange={setValue5} />
          <SelectBox variant="secondary" size="large" theme="light" options={emotionOptions} value={value6} onChange={setValue6} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0 }}>Tertiary</h3>
          <SelectBox variant="tertiary" size="small" theme="light" options={emotionOptions} value={value7} onChange={setValue7} />
          <SelectBox variant="tertiary" size="medium" theme="light" options={emotionOptions} value={value8} onChange={setValue8} />
          <SelectBox variant="tertiary" size="large" theme="light" options={emotionOptions} value={value9} onChange={setValue9} />
        </div>
      </div>
    );
  },
};

// 모든 변형 조합 (Dark Theme)
export const AllVariantsDark: Story = {
  args: {
    options: emotionOptions,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: function Render() {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [value3, setValue3] = useState<string>('');
    const [value4, setValue4] = useState<string>('');
    const [value5, setValue5] = useState<string>('');
    const [value6, setValue6] = useState<string>('');
    const [value7, setValue7] = useState<string>('');
    const [value8, setValue8] = useState<string>('');
    const [value9, setValue9] = useState<string>('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0, color: '#ffffff' }}>Primary</h3>
          <SelectBox variant="primary" size="small" theme="dark" options={emotionOptions} value={value1} onChange={setValue1} />
          <SelectBox variant="primary" size="medium" theme="dark" options={emotionOptions} value={value2} onChange={setValue2} />
          <SelectBox variant="primary" size="large" theme="dark" options={emotionOptions} value={value3} onChange={setValue3} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0, color: '#ffffff' }}>Secondary</h3>
          <SelectBox variant="secondary" size="small" theme="dark" options={emotionOptions} value={value4} onChange={setValue4} />
          <SelectBox variant="secondary" size="medium" theme="dark" options={emotionOptions} value={value5} onChange={setValue5} />
          <SelectBox variant="secondary" size="large" theme="dark" options={emotionOptions} value={value6} onChange={setValue6} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ margin: 0, color: '#ffffff' }}>Tertiary</h3>
          <SelectBox variant="tertiary" size="small" theme="dark" options={emotionOptions} value={value7} onChange={setValue7} />
          <SelectBox variant="tertiary" size="medium" theme="dark" options={emotionOptions} value={value8} onChange={setValue8} />
          <SelectBox variant="tertiary" size="large" theme="dark" options={emotionOptions} value={value9} onChange={setValue9} />
        </div>
      </div>
    );
  },
};

// 상태 모음
export const AllStates: Story = {
  args: {
    options: emotionOptions,
  },
  render: function Render() {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [value3, setValue3] = useState<string>('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={{ margin: '0 0 8px' }}>Normal</p>
          <SelectBox variant="primary" theme="light" options={emotionOptions} value={value1} onChange={setValue1} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px' }}>Disabled</p>
          <SelectBox variant="primary" theme="light" options={emotionOptions} disabled value={value2} onChange={setValue2} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px' }}>Error</p>
          <SelectBox variant="primary" theme="light" options={emotionOptions} error value={value3} onChange={setValue3} />
        </div>
      </div>
    );
  },
};

// Figma 감정 선택 예시
export const EmotionSelector: Story = {
  args: {
    options: emotionOptions,
  },
  render: function Render() {
    const [value, setValue] = useState<string>('all');
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px' }}>감정 선택</h3>
        <SelectBox 
          variant="primary" 
          theme="light" 
          options={emotionOptions} 
          value={value} 
          onChange={setValue} 
        />
        <p style={{ marginTop: '16px' }}>선택된 값: {value}</p>
      </div>
    );
  },
};
