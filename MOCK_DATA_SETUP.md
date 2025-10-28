# 일기 Mock 데이터 설정 가이드

## 개요
일기 애플리케이션 개발 및 테스트를 위한 Mock 데이터를 로컬스토리지에 저장하는 방법을 안내합니다.

## Mock 데이터 구성
- **총 개수**: 60개의 일기 데이터
- **감정 종류**: Happy, Sad, Angry, Surprise, Etc 모든 감정 포함 (각 12개씩)
- **날짜**: 2024-12-01 ~ 2025-01-30 (60일간)
- **내용**: 다양한 상황과 감정을 담은 실제와 같은 일기 내용
- **페이지네이션**: 12개씩 5페이지로 구성되어 페이지네이션 테스트에 최적화

## 사용 방법

### 방법 1: 개발 도구 컴포넌트 사용 (권장)

1. **컴포넌트 추가**
   ```tsx
   // src/app/page.tsx 또는 원하는 페이지에 추가
   import MockDataSetup from '@/commons/utils/setup-mock-data';
   
   export default function Page() {
     return (
       <div>
         {/* 기존 컴포넌트들 */}
         <MockDataSetup />
       </div>
     );
   }
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **Mock 데이터 저장**
   - 브라우저 우측 상단에 "개발 도구" 패널이 표시됩니다
   - "Mock 데이터 저장 (60개)" 버튼을 클릭합니다
   - 확인 대화상자에서 "확인"을 클릭합니다
   - 페이지가 자동으로 새로고침되어 데이터가 반영됩니다

### 방법 2: 브라우저 개발자 도구 사용

1. **브라우저 개발자 도구 열기** (F12)

2. **콘솔 탭에서 실행**
   ```javascript
   // Mock 데이터 저장
   saveMockDiaries();
   
   // 모든 데이터 삭제 (필요시)
   clearDiaries();
   
   // Mock 데이터 확인
   console.log(mockDiaries);
   ```

### 방법 3: 직접 함수 호출

```tsx
import { saveMockDiariesToLocalStorage, clearDiariesFromLocalStorage } from '@/commons/utils/mock-diaries';

// Mock 데이터 저장
saveMockDiariesToLocalStorage();

// 데이터 삭제
clearDiariesFromLocalStorage();
```

## 데이터 확인

### 로컬스토리지 확인
1. 브라우저 개발자 도구 → Application 탭 → Local Storage
2. `diaries` 키에서 저장된 데이터 확인

### 애플리케이션에서 확인
- `/diaries` 페이지에서 등록된 일기 목록 확인
- 다양한 감정별 필터링 테스트 가능
- 검색 기능 테스트 가능
- 페이지네이션 테스트 가능

## Mock 데이터 예시

```json
{
  "id": 1,
  "title": "첫 번째 일기",
  "content": "오늘은 정말 기분 좋은 하루였다...",
  "emotion": "Happy",
  "createdAt": "2024-12-01"
}
```

## 주의사항

1. **개발 환경 전용**: MockDataSetup 컴포넌트는 개발 환경에서만 표시됩니다
2. **데이터 덮어쓰기**: 이미 데이터가 있는 경우 확인 후 덮어씁니다
3. **자동 새로고침**: Mock 데이터 저장 후 페이지가 자동으로 새로고침됩니다

## 테스트 시나리오

1. **감정별 필터링**: 각 감정(행복해요, 슬퍼요, 화나요, 놀랐어요, 기타)별로 필터링 테스트
2. **검색 기능**: 제목이나 내용으로 검색 테스트
3. **페이지네이션**: 12개씩 페이지 나누기 테스트 (총 5페이지)
4. **일기 상세보기**: 각 일기 클릭하여 상세 페이지 이동 테스트
5. **일기 삭제**: 일기 삭제 기능 테스트

이제 충분한 양의 Mock 데이터로 애플리케이션의 모든 기능을 테스트할 수 있습니다!
