'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { useLayoutRouting } from './hooks/index.link.routing.hook';
import { useAreaVisibility } from './hooks/index.area.hook';
import { Button } from '@/commons/components/button';
import { getUrlPath, UrlKey } from '@/commons/constants/url';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDiariesActive, isPicturesActive } = useLayoutRouting();
  const { header, banner, navigation, footer } = useAreaVisibility();
  const router = useRouter();

  // 로그인 상태 (기본값: 로그인 안됨)
  const isLoggedIn = true; // 규칙에 따라 기본값은 로그인 상태

  return (
    <div className={styles.container}>
      {/* Header */}
      {header.visible && (
        <header className={styles.header} data-testid="layout-header">
          <div className={styles.headerInner}>
            {header.logo && (
              <Link 
                href={getUrlPath(UrlKey.DiaryList)}
                className={styles.logo}
                data-testid="layout-logo"
              >
                <span className={styles.logoText}>민지의 다이어리</span>
              </Link>
            )}
            <div className={styles.authSection} data-testid="layout-auth-section">
              {isLoggedIn ? (
                <Button
                  variant="secondary"
                  size="medium"
                  theme="light"
                  onClick={() => router.push('/auth/logout')}
                  data-testid="layout-logout-button"
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="medium"
                  theme="light"
                  onClick={() => router.push('/auth/login')}
                  data-testid="layout-login-button"
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Gap */}
      {(header.visible || banner) && <div className={styles.gap}></div>}

      {/* Banner */}
      {banner && (
        <div className={styles.bannerWrapper}>
          <div className={styles.banner} data-testid="layout-banner">
            <Image
              src="/images/banner.png"
              alt="Banner"
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="1168px"
            />
          </div>
        </div>
      )}

      {/* Gap */}
      {banner && <div className={styles.gap}></div>}

      {/* Navigation */}
      {navigation && (
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
      )}

      {/* Main */}
      <main className={styles.main}>{children}</main>

      {/* Gap before Footer */}
      {footer && <div className={styles.gapFooter}></div>}

      {/* Footer */}
      {footer && (
        <footer className={styles.footer} data-testid="layout-footer">
          <div className={styles.footerInner}>
            <p className={styles.footerTitle}>민지의 다이어리</p>
            <p className={styles.footerInfo}>대표 : {'{name}'}</p>
            <p className={styles.footerCopyright}>
              Copyright © 2024. {'{name}'} Co., Ltd.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
