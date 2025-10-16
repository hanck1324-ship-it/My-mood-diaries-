import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoText}>민지의 다이어리</span>
          </div>
        </div>
      </header>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Banner */}
      <div className={styles.banner}>
        <Image
          src="/images/banner.png"
          alt="Banner"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.navigationInner}>
          <div className={styles.tabContainer}>
            <div className={styles.tabActive}>
              <span className={styles.tabActiveText}>일기보관함</span>
            </div>
            <div className={styles.tab}>
              <span className={styles.tabText}>사진보관함</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className={styles.main}>{children}</main>

      {/* Gap before Footer */}
      <div className={styles.gapFooter}></div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerTitle}>민지의 다이어리</p>
          <p className={styles.footerInfo}>대표 : {'{name}'}</p>
          <p className={styles.footerCopyright}>
            Copyright © 2024. {'{name}'} Co., Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}

