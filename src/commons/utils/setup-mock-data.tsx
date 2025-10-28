'use client';

import React from 'react';
import Button from '@/commons/components/button';
import { saveMockDiariesToLocalStorage, clearDiariesFromLocalStorage } from './mock-diaries';

/**
 * Mock 데이터 설정을 위한 개발 도구 컴포넌트
 * 개발 환경에서만 사용해야 합니다.
 */
export function MockDataSetup() {
  const handleSaveMockData = () => {
    saveMockDiariesToLocalStorage();
    // 페이지 새로고침하여 데이터 반영
    window.location.reload();
  };

  const handleClearData = () => {
    clearDiariesFromLocalStorage();
    // 페이지 새로고침하여 데이터 반영
    window.location.reload();
  };

  // 개발 환경에서만 렌더링
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontSize: '14px'
    }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>개발 도구</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button
          variant="primary"
          size="small"
          theme="light"
          onClick={handleSaveMockData}
        >
          Mock 데이터 저장 (60개)
        </Button>
        <Button
          variant="secondary"
          size="small"
          theme="light"
          onClick={handleClearData}
        >
          모든 데이터 삭제
        </Button>
      </div>
      <p style={{ 
        margin: '12px 0 0 0', 
        fontSize: '12px', 
        color: '#666',
        lineHeight: '1.4'
      }}>
        • Mock 데이터: 다양한 감정과 날짜의 일기 60개<br/>
        • 페이지네이션: 12개씩 5페이지 구성<br/>
        • 개발 환경에서만 표시됩니다
      </p>
    </div>
  );
}

export default MockDataSetup;
