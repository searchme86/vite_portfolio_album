// src/components/Like/LikeButton/hooks/useLikeButtonInteraction.js

// 의미: 좋아요 버튼의 인터랙션 로직을 관리하는 훅
// 이유: 버튼 스타일 및 클릭 핸들러를 분리
// 비유: 도서관에서 버튼의 동작과 스타일을 별도로 관리
export const useLikeButtonInteraction = (toggleLike, postId) => {
  // 의미: 버튼 스타일 정의
  // 이유: 좋아요 상태에 따라 색상 변경
  // 비유: 도서관에서 버튼 색상을 상태에 따라 변경
  const buttonStyle = {
    backgroundColor: 'transparent', // 의미: 기본 배경색 투명
    // 이유: 아이콘과 텍스트만 보이도록
    // 비유: 도서관에서 버튼 배경을 투명하게 설정
    color: 'black', // 의미: 텍스트 색상 검정
    // 이유: 가독성 확보
    // 비유: 도서관에서 텍스트 색상 설정
    padding: '5px 10px', // 의미: 버튼 패딩 설정
    // 이유: 시각적 여백 제공
    // 비유: 도서관에서 버튼 크기 조정
    border: '1px solid gray', // 의미: 버튼 테두리 설정
    // 이유: 버튼 경계 표시
    // 비유: 도서관에서 버튼 테두리 표시
    borderRadius: '5px', // 의미: 버튼 모서리 둥글게
    // 이유: 부드러운 UI 제공
    // 비유: 도서관에서 버튼 모서리 디자인
    display: 'flex', // 의미: 플렉스 박스 레이아웃
    // 이유: 아이콘과 라벨 정렬
    // 비유: 도서관에서 아이콘과 텍스트 정렬
    alignItems: 'center', // 의미: 세로 중앙 정렬
    // 이유: 아이콘과 라벨 정렬
    // 비유: 도서관에서 아이콘과 텍스트 세로 정렬
  };

  // 의미: 좋아요 버튼 클릭 핸들러
  // 이유: 버튼 클릭 시 좋아요 토글
  // 비유: 손님이 좋아요 버튼을 누름
  const handleToggle = () => {
    toggleLike(postId); // 의미: 좋아요 토글 뮤테이션 호출
    // 이유: 좋아요 상태 변경
    // 비유: 손님이 책에 좋아요를 누르거나 취소
  };

  return {
    buttonStyle, // 의미: 버튼 스타일 반환
    // 이유: 컴포넌트에서 스타일 적용
    // 비유: 도서관에서 버튼 스타일 제공
    handleToggle, // 의미: 클릭 핸들러 반환
    // 이유: 컴포넌트에서 클릭 이벤트 처리
    // 비유: 도서관에서 버튼 동작 제공
  };
};
