import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type SearchBarVariant = 'primary' | 'secondary' | 'tertiary';
export type SearchBarSize = 'small' | 'medium' | 'large';
export type SearchBarTheme = 'light' | 'dark';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: SearchBarVariant;
  size?: SearchBarSize;
  theme?: SearchBarTheme;
  onSearch?: (value: string) => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ variant = 'primary', size = 'medium', theme = 'light', className, onSearch, ...props }, ref) => {
    const containerClasses = [
      styles.searchBarContainer,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.currentTarget.value);
      }
      props.onKeyDown?.(e);
    };

    const handleSearchClick = () => {
      if (onSearch && props.value) {
        onSearch(String(props.value));
      }
    };

    const isSearchable = props.value && String(props.value).trim().length > 0;

    return (
      <div className={containerClasses} data-testid="searchbar">
        <Image 
          src="/icons/search_outline_light_m.svg" 
          alt="search" 
          width={24}
          height={24}
          className={styles.searchIcon}
          onClick={isSearchable ? handleSearchClick : undefined}
          style={isSearchable ? { cursor: 'pointer', opacity: 1 } : undefined}
        />
        <input
          ref={ref}
          type="text"
          className={styles.input}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;

