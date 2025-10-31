// 브라우저 콘솔에서 바로 실행할 수 있는 Mock 데이터 저장 스크립트

// 60개 Mock 데이터
const mockDiaries = [
  {id: 1, title: "첫 번째 일기", content: "오늘은 정말 기분 좋은 하루였다.", emotion: "Happy", createdAt: "2024-12-01"},
  {id: 2, title: "힘든 하루", content: "오늘은 정말 힘든 하루였다.", emotion: "Sad", createdAt: "2024-12-02"},
  {id: 3, title: "화나는 일이 있었던 날", content: "오늘 회의에서 정말 화가 났다.", emotion: "Angry", createdAt: "2024-12-03"},
  {id: 4, title: "깜짝 놀란 하루", content: "예상치 못한 좋은 소식을 들었다!", emotion: "Surprise", createdAt: "2024-12-04"},
  {id: 5, title: "평범한 일상", content: "오늘은 특별한 일 없이 평범한 하루였다.", emotion: "Etc", createdAt: "2024-12-05"},
  {id: 6, title: "성공적인 발표", content: "오늘 중요한 발표가 정말 잘 됐다!", emotion: "Happy", createdAt: "2024-12-06"},
  {id: 7, title: "실망스러운 하루", content: "기대했던 일이 취소되어서 실망스럽다.", emotion: "Sad", createdAt: "2024-12-07"},
  {id: 8, title: "짜증나는 교통체증", content: "출근길에 심한 교통체증에 걸렸다.", emotion: "Angry", createdAt: "2024-12-08"},
  {id: 9, title: "예상 밖의 만남", content: "오랜 친구를 우연히 만났다!", emotion: "Surprise", createdAt: "2024-12-09"},
  {id: 10, title: "취미 생활", content: "새로운 취미를 시작해봤다.", emotion: "Etc", createdAt: "2024-12-10"},
  {id: 11, title: "가족과의 시간", content: "가족들과 맛있는 저녁을 먹었다.", emotion: "Happy", createdAt: "2024-12-11"},
  {id: 12, title: "건강 검진 결과", content: "건강 검진 결과가 걱정된다.", emotion: "Sad", createdAt: "2024-12-12"},
  {id: 13, title: "무례한 사람", content: "정말 무례한 사람을 만났다.", emotion: "Angry", createdAt: "2024-12-13"},
  {id: 14, title: "갑작스러운 승진 소식", content: "승진 이야기를 들었다!", emotion: "Surprise", createdAt: "2024-12-14"},
  {id: 15, title: "독서 모임", content: "독서 모임에 참석했다.", emotion: "Etc", createdAt: "2024-12-15"},
  {id: 16, title: "완벽한 주말", content: "정말 완벽한 주말이었다!", emotion: "Happy", createdAt: "2024-12-16"},
  {id: 17, title: "반려동물과의 이별", content: "반려동물이 하늘나라로 떠났다.", emotion: "Sad", createdAt: "2024-12-17"},
  {id: 18, title: "부당한 대우", content: "부당한 대우를 받았다.", emotion: "Angry", createdAt: "2024-12-18"},
  {id: 19, title: "로또 당첨!", content: "로또에 당첨됐다!", emotion: "Surprise", createdAt: "2024-12-19"},
  {id: 20, title: "요리 실험", content: "새로운 요리를 시도해봤다.", emotion: "Etc", createdAt: "2024-12-20"},
  {id: 21, title: "운동 시작", content: "헬스장을 다니기 시작했다!", emotion: "Happy", createdAt: "2024-12-21"},
  {id: 22, title: "친구와의 갈등", content: "친구와 갈등이 생겼다.", emotion: "Sad", createdAt: "2024-12-22"},
  {id: 23, title: "불공정한 평가", content: "평가가 불공정했다.", emotion: "Angry", createdAt: "2024-12-23"},
  {id: 24, title: "깜짝 파티", content: "친구들이 파티를 준비해줬다!", emotion: "Surprise", createdAt: "2024-12-24"},
  {id: 25, title: "새로운 취미 발견", content: "사진 촬영이 재미있다.", emotion: "Etc", createdAt: "2024-12-25"},
  {id: 26, title: "승진 확정", content: "승진이 확정되었다!", emotion: "Happy", createdAt: "2024-12-26"},
  {id: 27, title: "건강 검진 결과 걱정", content: "재검사를 받으라고 나왔다.", emotion: "Sad", createdAt: "2024-12-27"},
  {id: 28, title: "교통 사고 목격", content: "교통사고를 목격했다.", emotion: "Angry", createdAt: "2024-12-28"},
  {id: 29, title: "예상치 못한 소식", content: "고등학교 친구 연락이 왔다!", emotion: "Surprise", createdAt: "2024-12-29"},
  {id: 30, title: "연말 정리", content: "올해를 돌아보는 시간.", emotion: "Etc", createdAt: "2024-12-30"},
  {id: 31, title: "새해 다짐", content: "새해가 밝았다!", emotion: "Happy", createdAt: "2025-01-01"},
  {id: 32, title: "감기 몸살", content: "몸살이 심하다.", emotion: "Sad", createdAt: "2025-01-02"},
  {id: 33, title: "주차 문제로 싸움", content: "주차 문제로 다툼이 벌어졌다.", emotion: "Angry", createdAt: "2025-01-03"},
  {id: 34, title: "복권 당첨", content: "5등에 당첨됐다!", emotion: "Surprise", createdAt: "2025-01-04"},
  {id: 35, title: "온라인 강의 수강", content: "온라인 강의를 시작했다.", emotion: "Etc", createdAt: "2025-01-05"},
  {id: 36, title: "프로젝트 성공", content: "프로젝트가 성공했다!", emotion: "Happy", createdAt: "2025-01-06"},
  {id: 37, title: "외할머니 입원", content: "외할머니가 입원하셨다.", emotion: "Sad", createdAt: "2025-01-07"},
  {id: 38, title: "무책임한 동료", content: "동료가 무책임하다.", emotion: "Angry", createdAt: "2025-01-08"},
  {id: 39, title: "예상치 못한 만남", content: "은사님을 우연히 만났다!", emotion: "Surprise", createdAt: "2025-01-09"},
  {id: 40, title: "독서 모임 참여", content: "독서 모임에 참여했다.", emotion: "Etc", createdAt: "2025-01-10"},
  {id: 41, title: "동생 결혼식", content: "동생의 결혼식이 있었다.", emotion: "Happy", createdAt: "2025-01-11"},
  {id: 42, title: "직장 스트레스", content: "업무량이 너무 많다.", emotion: "Sad", createdAt: "2025-01-12"},
  {id: 43, title: "부당한 요구", content: "상사가 부당한 요구를 한다.", emotion: "Angry", createdAt: "2025-01-13"},
  {id: 44, title: "갑작스러운 휴가 승인", content: "휴가가 승인됐다!", emotion: "Surprise", createdAt: "2025-01-14"},
  {id: 45, title: "새로운 언어 학습", content: "외국어 공부를 시작했다.", emotion: "Etc", createdAt: "2025-01-15"},
  {id: 46, title: "친구들과의 여행", content: "동기들과 여행을 다녀왔다.", emotion: "Happy", createdAt: "2025-01-16"},
  {id: 47, title: "반려동물 병원비", content: "고양이 치료비가 많이 나왔다.", emotion: "Sad", createdAt: "2025-01-17"},
  {id: 48, title: "층간 소음 문제", content: "윗집 소음이 심하다.", emotion: "Angry", createdAt: "2025-01-18"},
  {id: 49, title: "예상치 못한 승진 제의", content: "스카우트 제의가 들어왔다!", emotion: "Surprise", createdAt: "2025-01-19"},
  {id: 50, title: "새로운 카페 발견", content: "새 카페를 발견했다.", emotion: "Etc", createdAt: "2025-01-20"},
  {id: 51, title: "마라톤 완주", content: "하프 마라톤을 완주했다!", emotion: "Happy", createdAt: "2025-01-21"},
  {id: 52, title: "가족 갈등", content: "형제들과 다툼이 벌어졌다.", emotion: "Sad", createdAt: "2025-01-22"},
  {id: 53, title: "불친절한 서비스", content: "직원이 불친절했다.", emotion: "Angry", createdAt: "2025-01-23"},
  {id: 54, title: "깜짝 선물", content: "연인이 선물을 줬다!", emotion: "Surprise", createdAt: "2025-01-24"},
  {id: 55, title: "봄 준비", content: "봄이 오는 것 같다.", emotion: "Etc", createdAt: "2025-01-25"},
  {id: 56, title: "자격증 합격", content: "자격증 시험에 합격했다!", emotion: "Happy", createdAt: "2025-01-26"},
  {id: 57, title: "우울한 날씨", content: "날씨가 우울하다.", emotion: "Sad", createdAt: "2025-01-27"},
  {id: 58, title: "주변 공사 소음", content: "공사 소음이 심하다.", emotion: "Angry", createdAt: "2025-01-28"},
  {id: 59, title: "뜻밖의 재회", content: "중학교 동창을 만났다!", emotion: "Surprise", createdAt: "2025-01-29"},
  {id: 60, title: "한 달 마무리", content: "1월의 마지막 날이다.", emotion: "Etc", createdAt: "2025-01-30"}
];

// 로컬스토리지에 저장
console.log('Mock 데이터 저장 중...');
localStorage.setItem('diaries', JSON.stringify(mockDiaries));
console.log(`${mockDiaries.length}개의 Mock 일기 데이터가 로컬스토리지에 저장되었습니다!`);

// 확인
const savedData = localStorage.getItem('diaries');
if (savedData) {
  const parsedData = JSON.parse(savedData);
  console.log(`저장된 데이터 개수: ${parsedData.length}개`);
  console.log('첫 번째 일기:', parsedData[0]);
} else {
  console.error('데이터 저장에 실패했습니다.');
}

// 페이지 새로고침 (선택사항)
// window.location.reload();



