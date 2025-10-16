import React from 'react';
import styles from './styles.module.css';

export type ToggleVariant = 'primary' | 'secondary' | 'tertiary';
export type ToggleSize = 'small' | 'medium' | 'large';
export type ToggleTheme = 'light' | 'dark';

export interface ToggleProps {
  variant?: ToggleVariant;
  size?: ToggleSize;
  theme?: ToggleTheme;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      checked = false,
      onChange,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(!checked);
      }
    };

    const toggleClasses = [
      styles.toggle,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      checked ? styles.checked : styles.unchecked,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={toggleClasses}
        data-testid="toggle"
        {...props}
      >
        <span className={styles.knob} />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;

