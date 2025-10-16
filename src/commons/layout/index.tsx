'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { useLayoutRouting } from './hooks/index.link.routing.hook';
import { getUrlPath, UrlKey } from '@/commons/constants/url';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDiariesActive, isPicturesActive } = useLayoutRouting();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link 
            href={getUrlPath(UrlKey.DiaryList)}
            className={styles.logo}
            data-testid="layout-logo"
          >
            <span className={styles.logoText}>민지의 다이어리</span>
          </Link>
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
      <nav className={styles.navigation} data-testid="layout-navigation">
        <div className={styles.navigationInner}>
          <div className={styles.tabContainer}>
            <Link 
              href={getUrlPath(UrlKey.DiaryList)}
              className={isDiariesActive() ? styles.tabActive : styles.tab}
              data-testid="nav-diaries"
            >
              <span className={isDiariesActive() ? styles.tabActiveText : styles.tabText}>
                일기보관함
              </span>
            </Link>
            <Link 
              href={getUrlPath(UrlKey.PictureList)}
              className={isPicturesActive() ? styles.tabActive : styles.tab}
              data-testid="nav-pictures"
            >
              <span className={isPicturesActive() ? styles.tabActiveText : styles.tabText}>
                사진보관함
              </span>
            </Link>
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

