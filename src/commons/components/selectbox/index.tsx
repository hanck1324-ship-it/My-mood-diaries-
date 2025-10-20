'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type SelectBoxVariant = 'primary' | 'secondary' | 'tertiary';
export type SelectBoxSize = 'small' | 'medium' | 'large';
export type SelectBoxTheme = 'light' | 'dark';

export interface SelectBoxOption {
  value: string;
  label: string;
}

export interface SelectBoxProps {
  variant?: SelectBoxVariant;
  size?: SelectBoxSize;
  theme?: SelectBoxTheme;
  error?: boolean;
  options: SelectBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const SelectBox = React.forwardRef<HTMLDivElement, SelectBoxProps>(
  ({ 
    variant = 'primary', 
    size = 'medium', 
    theme = 'light', 
    error = false, 
    options = [],
    value,
    onChange,
    placeholder = '선택하세요',
    disabled = false,
    className,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (optionValue: string) => {
      if (!disabled) {
        onChange?.(optionValue);
        setIsOpen(false);
      }
    };

    const triggerClasses = [
      styles.trigger,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const optionsClasses = [
      styles.options,
      styles[`theme-${theme}`],
      isOpen && styles.open,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={containerRef} className={styles.container} data-testid="selectbox">
        <div ref={ref} className={triggerClasses} onClick={handleToggle}>
          <span className={styles.label}>
            {selectedOption?.label || placeholder}
          </span>
          <div className={styles.icon}>
            <Image 
              src="/icons/arrow_drop_down.svg" 
              alt="dropdown" 
              width={24} 
              height={24}
            />
          </div>
        </div>
        
        {isOpen && (
          <div className={optionsClasses}>
            {options.map((option) => {
              const isSelected = option.value === value;
              const optionClasses = [
                styles.option,
                styles[`theme-${theme}`],
                isSelected && styles.selected,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={option.value}
                  className={optionClasses}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isSelected && (
                    <div className={styles.checkIcon}>
                      <Image 
                        src="/icons/check_outline_light_xs.svg" 
                        alt="check" 
                        width={16} 
                        height={16}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
