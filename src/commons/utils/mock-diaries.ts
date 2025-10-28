'use client';

import { Emotion } from '@/commons/constants/enum';
import { Diary } from '@/commons/components/diaries/hooks/index.binding.hook';

/**
 * 일기 Mock 데이터
 */
export const MOCK_DIARIES: Diary[] = [
  {
    id: 1,
    title: "첫 번째 일기",
    content: "오늘은 정말 기분 좋은 하루였다. 새로운 프로젝트를 시작하게 되어서 설레고 기대가 된다. 팀원들과의 첫 미팅도 성공적이었고, 앞으로의 계획도 잘 세워진 것 같다.",
    emotion: Emotion.Happy,
    createdAt: "2024-12-01"
  },
  {
    id: 2,
    title: "힘든 하루",
    content: "오늘은 정말 힘든 하루였다. 예상치 못한 문제들이 계속 발생해서 스트레스를 많이 받았다. 그래도 포기하지 않고 끝까지 해결해보려고 노력했다.",
    emotion: Emotion.Sad,
    createdAt: "2024-12-02"
  },
  {
    id: 3,
    title: "화나는 일이 있었던 날",
    content: "오늘 회의에서 정말 이해할 수 없는 결정이 내려졌다. 충분히 준비했던 제안이 제대로 검토도 없이 기각되어서 너무 화가 났다. 다음에는 더 설득력 있게 준비해야겠다.",
    emotion: Emotion.Angry,
    createdAt: "2024-12-03"
  },
  {
    id: 4,
    title: "깜짝 놀란 하루",
    content: "오늘 예상치 못한 좋은 소식을 들었다! 지원했던 프로그램에 선발되었다는 연락을 받았다. 정말 믿을 수 없어서 몇 번이나 메일을 다시 읽어봤다.",
    emotion: Emotion.Surprise,
    createdAt: "2024-12-04"
  },
  {
    id: 5,
    title: "평범한 일상",
    content: "오늘은 특별한 일 없이 평범한 하루였다. 루틴대로 일하고, 점심 먹고, 저녁에는 책을 조금 읽었다. 가끔은 이런 평범한 일상이 소중하게 느껴진다.",
    emotion: Emotion.Etc,
    createdAt: "2024-12-05"
  },
  {
    id: 6,
    title: "성공적인 발표",
    content: "오늘 중요한 발표가 있었는데 정말 잘 됐다! 준비한 만큼 좋은 결과를 얻을 수 있었고, 상사와 동료들로부터도 좋은 피드백을 받았다. 뿌듯하고 행복한 하루였다.",
    emotion: Emotion.Happy,
    createdAt: "2024-12-06"
  },
  {
    id: 7,
    title: "실망스러운 하루",
    content: "기대했던 일이 취소되어서 정말 실망스럽다. 오랫동안 준비해왔던 일인데 갑작스럽게 무산되어 버렸다. 허탈하고 슬프다.",
    emotion: Emotion.Sad,
    createdAt: "2024-12-07"
  },
  {
    id: 8,
    title: "짜증나는 교통체증",
    content: "오늘 출근길에 심한 교통체증에 걸려서 2시간이나 늦었다. 중요한 회의가 있었는데 늦어서 정말 짜증났다. 대중교통을 이용할 걸 그랬다.",
    emotion: Emotion.Angry,
    createdAt: "2024-12-08"
  },
  {
    id: 9,
    title: "예상 밖의 만남",
    content: "길을 걷다가 우연히 오랜 친구를 만났다! 정말 몇 년 만에 보는 건데 이렇게 우연히 만나게 될 줄 몰랐다. 반가워서 근처 카페에서 오랫동안 이야기했다.",
    emotion: Emotion.Surprise,
    createdAt: "2024-12-09"
  },
  {
    id: 10,
    title: "취미 생활",
    content: "오늘은 새로운 취미를 시작해봤다. 그림 그리기 클래스에 등록했는데 생각보다 재미있다. 실력은 아직 부족하지만 차근차근 배워나가고 싶다.",
    emotion: Emotion.Etc,
    createdAt: "2024-12-10"
  },
  {
    id: 11,
    title: "가족과의 시간",
    content: "오늘 가족들과 함께 맛있는 저녁을 먹었다. 오랜만에 모든 가족이 모여서 대화도 많이 하고 웃음도 많이 나눴다. 이런 시간이 정말 소중하다고 느꼈다.",
    emotion: Emotion.Happy,
    createdAt: "2024-12-11"
  },
  {
    id: 12,
    title: "건강 검진 결과",
    content: "건강 검진 결과가 나왔는데 몇 가지 개선이 필요한 부분이 있다고 나왔다. 걱정되긴 하지만 의사 선생님이 관리하면 충분히 좋아질 수 있다고 하셔서 다행이다.",
    emotion: Emotion.Sad,
    createdAt: "2024-12-12"
  },
  {
    id: 13,
    title: "무례한 사람",
    content: "오늘 마트에서 정말 무례한 사람을 만났다. 줄을 새치기하고 직원에게도 불친절하게 대하는 걸 보니 정말 화가 났다. 어떻게 저럴 수 있는지 이해가 안 된다.",
    emotion: Emotion.Angry,
    createdAt: "2024-12-13"
  },
  {
    id: 14,
    title: "갑작스러운 승진 소식",
    content: "오늘 상사가 갑자기 부르더니 승진 이야기를 꺼냈다! 전혀 예상하지 못했던 일이라 정말 놀랐다. 아직 실감이 안 나지만 더 열심히 해야겠다는 생각이 든다.",
    emotion: Emotion.Surprise,
    createdAt: "2024-12-14"
  },
  {
    id: 15,
    title: "독서 모임",
    content: "오늘 독서 모임에 참석했다. 다양한 사람들과 책에 대해 이야기하는 시간이 정말 유익했다. 새로운 관점들을 들을 수 있어서 좋았고, 다음 모임도 기대된다.",
    emotion: Emotion.Etc,
    createdAt: "2024-12-15"
  },
  {
    id: 16,
    title: "완벽한 주말",
    content: "오늘은 정말 완벽한 주말이었다! 늦잠도 자고, 좋아하는 음식도 먹고, 영화도 보고, 친구들과도 만났다. 이런 여유로운 시간이 있어서 행복하다.",
    emotion: Emotion.Happy,
    createdAt: "2024-12-16"
  },
  {
    id: 17,
    title: "반려동물과의 이별",
    content: "오늘 10년 동안 함께했던 우리 강아지가 하늘나라로 떠났다. 너무 슬프고 마음이 아프다. 그동안 정말 많은 행복을 줬는데, 이제 볼 수 없다니 믿어지지 않는다.",
    emotion: Emotion.Sad,
    createdAt: "2024-12-17"
  },
  {
    id: 18,
    title: "부당한 대우",
    content: "오늘 직장에서 부당한 대우를 받았다. 내 잘못이 아닌데도 불구하고 책임을 떠넘기려고 하는 걸 보니 정말 화가 났다. 이런 상황을 어떻게 해결해야 할지 고민이다.",
    emotion: Emotion.Angry,
    createdAt: "2024-12-18"
  },
  {
    id: 19,
    title: "로또 당첨!",
    content: "믿을 수 없지만 로또에 당첨됐다! 물론 큰 돈은 아니지만 그래도 당첨된 게 신기하고 놀랍다. 이런 일이 실제로 일어날 줄 몰랐다.",
    emotion: Emotion.Surprise,
    createdAt: "2024-12-19"
  },
  {
    id: 20,
    title: "요리 실험",
    content: "오늘은 새로운 요리를 시도해봤다. 인터넷에서 찾은 레시피를 따라 해봤는데 생각보다 잘 나왔다. 요리하는 재미를 새롭게 발견한 것 같다.",
    emotion: Emotion.Etc,
    createdAt: "2024-12-20"
  },
  {
    id: 21,
    title: "운동 시작",
    content: "오늘부터 헬스장을 다니기 시작했다! 운동이 익숙하지 않아서 힘들었지만 기분이 상쾌하다. 꾸준히 해서 건강한 몸을 만들고 싶다.",
    emotion: Emotion.Happy,
    createdAt: "2024-12-21"
  },
  {
    id: 22,
    title: "친구와의 갈등",
    content: "오랜 친구와 오해로 인한 갈등이 생겼다. 서로의 입장을 이해하지 못해서 마음이 아프다. 어떻게 해결해야 할지 고민이 많다.",
    emotion: Emotion.Sad,
    createdAt: "2024-12-22"
  },
  {
    id: 23,
    title: "불공정한 평가",
    content: "오늘 팀 프로젝트 평가에서 내 기여도가 제대로 인정받지 못했다. 열심히 했는데 결과가 이렇게 나와서 정말 화가 난다. 억울하다.",
    emotion: Emotion.Angry,
    createdAt: "2024-12-23"
  },
  {
    id: 24,
    title: "깜짝 파티",
    content: "친구들이 내 생일을 위해 깜짝 파티를 준비해줬다! 전혀 예상하지 못했는데 정말 감동적이었다. 이런 친구들이 있어서 행복하다.",
    emotion: Emotion.Surprise,
    createdAt: "2024-12-24"
  },
  {
    id: 25,
    title: "새로운 취미 발견",
    content: "우연히 시작한 사진 촬영이 정말 재미있다. 일상의 소소한 순간들을 담는 것이 이렇게 즐거울 줄 몰랐다. 새로운 취미를 찾은 것 같아서 기분이 좋다.",
    emotion: Emotion.Etc,
    createdAt: "2024-12-25"
  },
  {
    id: 26,
    title: "승진 확정",
    content: "드디어 승진이 확정되었다! 지금까지의 노력이 결실을 맺은 것 같아서 정말 기쁘다. 새로운 책임감도 생기지만 도전할 준비가 되어 있다.",
    emotion: Emotion.Happy,
    createdAt: "2024-12-26"
  },
  {
    id: 27,
    title: "건강 검진 결과 걱정",
    content: "건강 검진에서 재검사를 받으라고 나왔다. 큰 문제는 아니라고 하지만 걱정이 되고 불안하다. 건강을 더욱 챙겨야겠다는 생각이 든다.",
    emotion: Emotion.Sad,
    createdAt: "2024-12-27"
  },
  {
    id: 28,
    title: "교통 사고 목격",
    content: "출근길에 교통사고를 목격했다. 다행히 큰 부상은 없었지만 보는 순간 정말 화가 났다. 난폭 운전하는 사람들 때문에 이런 일이 생긴다.",
    emotion: Emotion.Angry,
    createdAt: "2024-12-28"
  },
  {
    id: 29,
    title: "예상치 못한 소식",
    content: "오랫동안 연락이 끊어졌던 고등학교 친구에게서 연락이 왔다! 결혼한다는 소식을 들었는데 정말 놀랍고 축하해주고 싶다.",
    emotion: Emotion.Surprise,
    createdAt: "2024-12-29"
  },
  {
    id: 30,
    title: "연말 정리",
    content: "올해를 돌아보면서 여러 가지 일들이 있었다. 좋은 일도 힘든 일도 있었지만 모든 것이 나를 성장시켜준 경험이었다. 내년에는 더 나은 모습이 되고 싶다.",
    emotion: Emotion.Etc,
    createdAt: "2024-12-30"
  },
  {
    id: 31,
    title: "새해 다짐",
    content: "새해가 밝았다! 올해는 더 건강하고 행복한 한 해를 보내고 싶다. 운동도 꾸준히 하고 새로운 것들에 도전해보는 한 해가 되었으면 좋겠다.",
    emotion: Emotion.Happy,
    createdAt: "2025-01-01"
  },
  {
    id: 32,
    title: "감기 몸살",
    content: "며칠 전부터 감기 기운이 있더니 오늘 정말 몸살이 심하다. 몸이 아프니까 마음도 우울해진다. 푹 쉬어서 빨리 나아야겠다.",
    emotion: Emotion.Sad,
    createdAt: "2025-01-02"
  },
  {
    id: 33,
    title: "주차 문제로 싸움",
    content: "아파트 주차장에서 다른 차 때문에 내 차가 막혀서 1시간이나 기다렸다. 차 주인이 나타났을 때 정말 화가 나서 말다툼이 벌어졌다.",
    emotion: Emotion.Angry,
    createdAt: "2025-01-03"
  },
  {
    id: 34,
    title: "복권 당첨",
    content: "평소처럼 복권을 샀는데 5등에 당첨됐다! 큰 돈은 아니지만 예상치 못한 행운이라서 기분이 좋다. 오늘은 운이 좋은 날인 것 같다.",
    emotion: Emotion.Surprise,
    createdAt: "2025-01-04"
  },
  {
    id: 35,
    title: "온라인 강의 수강",
    content: "새해 목표 중 하나인 온라인 강의를 시작했다. 평소 관심있던 분야라 재미있게 들을 수 있을 것 같다. 새로운 지식을 배우는 것은 언제나 즐겁다.",
    emotion: Emotion.Etc,
    createdAt: "2025-01-05"
  },
  {
    id: 36,
    title: "프로젝트 성공",
    content: "몇 달간 준비한 프로젝트가 성공적으로 마무리되었다! 팀원들과 함께 노력한 결과가 좋은 성과로 이어져서 정말 기쁘고 뿌듯하다.",
    emotion: Emotion.Happy,
    createdAt: "2025-01-06"
  },
  {
    id: 37,
    title: "외할머니 입원",
    content: "외할머니가 갑자기 쓰러지셔서 병원에 입원하셨다. 나이가 많으셔서 걱정이 정말 많다. 빨리 회복되시기를 간절히 기도한다.",
    emotion: Emotion.Sad,
    createdAt: "2025-01-07"
  },
  {
    id: 38,
    title: "무책임한 동료",
    content: "팀 프로젝트에서 한 동료가 자신의 역할을 제대로 하지 않아서 다른 사람들이 고생하고 있다. 이런 무책임한 태도가 정말 화나고 답답하다.",
    emotion: Emotion.Angry,
    createdAt: "2025-01-08"
  },
  {
    id: 39,
    title: "예상치 못한 만남",
    content: "길을 걷다가 초등학교 은사님을 우연히 만났다! 20년 만에 뵈었는데 나를 알아보시고 반가워해주셔서 정말 놀랍고 감사했다.",
    emotion: Emotion.Surprise,
    createdAt: "2025-01-09"
  },
  {
    id: 40,
    title: "독서 모임 참여",
    content: "지역 도서관에서 진행하는 독서 모임에 참여했다. 다양한 연령대의 사람들과 책에 대해 이야기하는 시간이 정말 유익하고 즐거웠다.",
    emotion: Emotion.Etc,
    createdAt: "2025-01-10"
  },
  {
    id: 41,
    title: "동생 결혼식",
    content: "동생의 결혼식이 있었다. 어린 동생이 이제 결혼을 한다니 믿어지지 않지만 행복한 모습을 보니 정말 기쁘다. 새로운 가족이 생긴 것을 진심으로 축하한다.",
    emotion: Emotion.Happy,
    createdAt: "2025-01-11"
  },
  {
    id: 42,
    title: "직장 스트레스",
    content: "요즘 직장에서 업무량이 너무 많아서 스트레스가 심하다. 퇴근 후에도 일 생각이 나서 제대로 쉬지 못하고 있다. 번아웃이 오는 것 같아서 걱정이다.",
    emotion: Emotion.Sad,
    createdAt: "2025-01-12"
  },
  {
    id: 43,
    title: "부당한 요구",
    content: "상사가 업무 시간 외에 개인적인 일을 시키려고 한다. 이런 부당한 요구에 대해 정말 화가 나지만 어떻게 대응해야 할지 고민이다.",
    emotion: Emotion.Angry,
    createdAt: "2025-01-13"
  },
  {
    id: 44,
    title: "갑작스러운 휴가 승인",
    content: "신청했던 휴가가 갑자기 승인됐다! 원래는 거절될 줄 알았는데 예상외로 허가가 나서 정말 놀랍고 기쁘다. 오랜만에 여행을 갈 수 있겠다.",
    emotion: Emotion.Surprise,
    createdAt: "2025-01-14"
  },
  {
    id: 45,
    title: "새로운 언어 학습",
    content: "새해 목표 중 하나인 외국어 공부를 시작했다. 처음에는 어렵지만 조금씩 실력이 느는 것 같아서 재미있다. 꾸준히 해서 유창하게 하고 싶다.",
    emotion: Emotion.Etc,
    createdAt: "2025-01-15"
  },
  {
    id: 46,
    title: "친구들과의 여행",
    content: "대학 동기들과 함께 1박 2일 여행을 다녀왔다. 오랜만에 만나서 추억도 나누고 새로운 추억도 만들어서 정말 즐거웠다. 이런 시간이 소중하다.",
    emotion: Emotion.Happy,
    createdAt: "2025-01-16"
  },
  {
    id: 47,
    title: "반려동물 병원비",
    content: "우리 고양이가 아파서 병원에 갔는데 치료비가 예상보다 많이 나왔다. 돈은 둘째 치고 아픈 모습을 보니 마음이 아프다. 빨리 나아야 하는데...",
    emotion: Emotion.Sad,
    createdAt: "2025-01-17"
  },
  {
    id: 48,
    title: "층간 소음 문제",
    content: "윗집에서 계속 소음을 내서 참다 참다 올라가서 이야기했다. 그런데 오히려 화를 내면서 무시하는 태도를 보여서 정말 화가 났다.",
    emotion: Emotion.Angry,
    createdAt: "2025-01-18"
  },
  {
    id: 49,
    title: "예상치 못한 승진 제의",
    content: "다른 부서에서 갑자기 스카우트 제의가 들어왔다! 더 좋은 조건이라서 정말 놀랍고 고민이 된다. 현재 팀을 떠나기는 아쉽지만 기회인 것 같다.",
    emotion: Emotion.Surprise,
    createdAt: "2025-01-19"
  },
  {
    id: 50,
    title: "새로운 카페 발견",
    content: "집 근처에 새로 생긴 카페에 가봤다. 분위기도 좋고 커피도 맛있어서 새로운 단골 카페가 생긴 것 같다. 이런 소소한 발견이 일상을 풍요롭게 만든다.",
    emotion: Emotion.Etc,
    createdAt: "2025-01-20"
  },
  {
    id: 51,
    title: "마라톤 완주",
    content: "드디어 하프 마라톤을 완주했다! 몇 달간 준비한 보람이 있었다. 힘들었지만 끝까지 포기하지 않고 완주해서 정말 기쁘고 뿌듯하다.",
    emotion: Emotion.Happy,
    createdAt: "2025-01-21"
  },
  {
    id: 52,
    title: "가족 갈등",
    content: "가족 모임에서 형제들과 의견 차이로 다툼이 벌어졌다. 서로 다른 생각을 가지고 있는 건 이해하지만 이렇게 감정이 상하게 될 줄 몰랐다.",
    emotion: Emotion.Sad,
    createdAt: "2025-01-22"
  },
  {
    id: 53,
    title: "불친절한 서비스",
    content: "오늘 간 식당에서 직원의 서비스가 정말 불친절했다. 손님을 무시하는 듯한 태도를 보여서 기분이 나빴다. 다시는 가고 싶지 않다.",
    emotion: Emotion.Angry,
    createdAt: "2025-01-23"
  },
  {
    id: 54,
    title: "깜짝 선물",
    content: "연인이 기념일도 아닌데 갑자기 선물을 줬다! 평소에 갖고 싶어했던 것을 기억해서 사온 거라서 정말 감동적이고 놀라웠다.",
    emotion: Emotion.Surprise,
    createdAt: "2025-01-24"
  },
  {
    id: 55,
    title: "봄 준비",
    content: "벌써 2월이 되어가니 봄이 오는 것 같다. 겨울 옷정리도 하고 봄에 할 일들을 계획해보고 있다. 새로운 계절을 맞이하는 기분이 설렌다.",
    emotion: Emotion.Etc,
    createdAt: "2025-01-25"
  },
  {
    id: 56,
    title: "자격증 합격",
    content: "몇 달간 준비한 자격증 시험에 합격했다! 열심히 공부한 보람이 있었다. 이 자격증으로 더 많은 기회가 생길 것 같아서 기대가 된다.",
    emotion: Emotion.Happy,
    createdAt: "2025-01-26"
  },
  {
    id: 57,
    title: "우울한 날씨",
    content: "며칠째 계속 비가 오고 날씨가 흐려서 기분도 우울해진다. 햇빛을 못 본 지 오래된 것 같다. 빨리 맑은 날씨가 왔으면 좋겠다.",
    emotion: Emotion.Sad,
    createdAt: "2025-01-27"
  },
  {
    id: 58,
    title: "주변 공사 소음",
    content: "집 주변에서 공사를 하는데 새벽부터 소음이 너무 심하다. 잠도 제대로 못 자고 집중도 안 된다. 언제까지 이런 상황이 계속될지 화가 난다.",
    emotion: Emotion.Angry,
    createdAt: "2025-01-28"
  },
  {
    id: 59,
    title: "뜻밖의 재회",
    content: "오늘 지하철에서 중학교 동창을 만났다! 정말 오랜만이라서 서로 많이 변한 모습에 놀랐지만 반가웠다. 연락처를 교환하고 나중에 만나기로 했다.",
    emotion: Emotion.Surprise,
    createdAt: "2025-01-29"
  },
  {
    id: 60,
    title: "한 달 마무리",
    content: "1월의 마지막 날이다. 새해가 시작된 게 얼마 안 된 것 같은데 벌써 한 달이 지났다. 시간이 참 빠르다. 2월도 의미있게 보내야겠다.",
    emotion: Emotion.Etc,
    createdAt: "2025-01-30"
  }
];

/**
 * 로컬스토리지에 Mock 일기 데이터를 저장하는 함수
 */
export function saveMockDiariesToLocalStorage(): void {
  try {
    const existingDiaries = localStorage.getItem('diaries');
    
    if (existingDiaries) {
      const confirm = window.confirm(
        '이미 저장된 일기 데이터가 있습니다. 덮어쓰시겠습니까?'
      );
      if (!confirm) {
        console.log('Mock 데이터 저장이 취소되었습니다.');
        return;
      }
    }
    
    localStorage.setItem('diaries', JSON.stringify(MOCK_DIARIES));
    console.log(`${MOCK_DIARIES.length}개의 Mock 일기 데이터가 로컬스토리지에 저장되었습니다.`);
    
    // 저장 완료 알림
    alert(`${MOCK_DIARIES.length}개의 Mock 일기 데이터가 성공적으로 저장되었습니다!\n(12개씩 ${Math.ceil(MOCK_DIARIES.length/12)}페이지로 구성됩니다)`);
    
  } catch (error) {
    console.error('Mock 데이터 저장 중 오류가 발생했습니다:', error);
    alert('Mock 데이터 저장 중 오류가 발생했습니다.');
  }
}

/**
 * 로컬스토리지의 일기 데이터를 초기화하는 함수
 */
export function clearDiariesFromLocalStorage(): void {
  try {
    const confirm = window.confirm(
      '로컬스토리지의 모든 일기 데이터를 삭제하시겠습니까?'
    );
    
    if (confirm) {
      localStorage.removeItem('diaries');
      console.log('로컬스토리지의 일기 데이터가 삭제되었습니다.');
      alert('모든 일기 데이터가 삭제되었습니다.');
    }
  } catch (error) {
    console.error('데이터 삭제 중 오류가 발생했습니다:', error);
    alert('데이터 삭제 중 오류가 발생했습니다.');
  }
}

/**
 * 브라우저 개발자 도구에서 사용할 수 있도록 window 객체에 함수들을 추가
 */
if (typeof window !== 'undefined') {
  (window as any).saveMockDiaries = saveMockDiariesToLocalStorage;
  (window as any).clearDiaries = clearDiariesFromLocalStorage;
  (window as any).mockDiaries = MOCK_DIARIES;
}
