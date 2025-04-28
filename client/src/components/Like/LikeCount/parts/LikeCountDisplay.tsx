// src/components/Like/LikeCount/parts/LikeCountDisplay.jsx

// 의미: 좋아요 수를 표시하는 컴포넌트
// 이유: 좋아요 수를 시각적으로 보여주기 위해 분리
// 비유: 도서관에서 책의 좋아요 수를 별도의 라벨로 표시
function LikeCountDisplay({ count }) {
  // console.log('LikeCountDisplay - Component mounted, count:', count); // 의미: 좋아요 수 로깅
  return (
    <>
      <span
        style={{
          fontSize: '14px', // 의미: 글자 크기 설정
          // 이유: 가독성 확보
          // 비유: 도서관에서 라벨 글자 크기 조정
          fontWeight: 'bold', // 의미: 글자 굵기 설정
          // 이유: 강조 효과
          // 비유: 도서관에서 라벨 강조
          color: '#333', // 의미: 글자 색상 설정
          // 이유: 시각적 일관성
          // 비유: 도서관에서 라벨 색상 통일
        }}
      >
        <span className="sr-only">현재</span>
        <span className="ml-1 mr-1">{count}</span>
        <span className="">개의</span> {/* 의미: 좋아요 수와 단위 표시 */}
        {/* 이유: 사용자에게 좋아요 수와 단위(단수/복수) 표시 */}
        {/* 비유: 도서관에서 좋아요 수와 단위 표시 */}
      </span>
      <span className="inline-block ml-1">
        {count === 1 ? 'Like' : 'Likes'}{' '}
      </span>
    </>
  );
}

export { LikeCountDisplay }; // 의미: 컴포넌트 내보내기
// 이유: LikeCount에서 사용 가능
// 비유: 도서관에서 라벨을 다른 부서에 전달
