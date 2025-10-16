import React from 'react';
import styles from './styles.module.css';

export type InputVariant = 'primary' | 'secondary' | 'tertiary';
export type InputSize = 'small' | 'medium' | 'large';
export type InputTheme = 'light' | 'dark';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  theme?: InputTheme;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'primary', size = 'medium', theme = 'light', error = false, className, ...props }, ref) => {
    const inputClasses = [
      styles.input,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <input ref={ref} className={inputClasses} data-testid="input" {...props} />
    );
  }
);

Input.displayName = 'Input';

export default Input;

