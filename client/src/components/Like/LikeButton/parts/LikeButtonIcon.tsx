// src/components/Like/LikeButton/parts/LikeButtonIcon.jsx

// 의미: 좋아요 버튼 아이콘 컴포넌트
// 이유: 버튼의 아이콘 부분을 분리하여 재사용 가능
// 비유: 도서관에서 좋아요 버튼의 아이콘을 별도로 관리
function LikeButtonIcon({ isLiked }) {
  return (
    <span
      style={{
        marginRight: '5px', // 의미: 라벨과의 간격 조정
        // 이유: 시각적 레이아웃 개선
        // 비유: 도서관에서 아이콘과 텍스트 사이 간격 조정
      }}
    >
      {isLiked ? '❤️' : '🤍'} {/* 의미: 좋아요 상태에 따라 아이콘 변경 */}
      {/* 이유: 시각적 피드백 제공 */}
      {/* 비유: 도서관에서 좋아요 상태에 따라 아이콘 변경 */}
    </span>
  );
}

export default LikeButtonIcon; // 의미: 컴포넌트 내보내기
// 이유: LikeButton에서 사용 가능
// 비유: 도서관에서 아이콘을 버튼 부서에 전달
