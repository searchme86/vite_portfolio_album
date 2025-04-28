// src/components/Like/LikeButton/parts/LikeButtonLabel.jsx

// 여기부터 시작===
import LoadingSpinner from '../../../common/LoadingSpinner'; // 의미: 로딩 스피너 컴포넌트 가져오기 <!---여기추가
// 이유: 로딩 상태 시각적 표시
// 비유: 도서관에서 로딩 표시를 버튼에 추가
// 여기부터 끝===

// 의미: 좋아요 버튼 라벨 컴포넌트
// 이유: 버튼의 텍스트 부분을 분리하여 재사용 가능
// 비유: 도서관에서 좋아요 버튼의 텍스트를 별도로 관리
function LikeButtonLabel({ isLoading, isLiked }) {
  console.log('isliked:', isLiked); // 의미: 좋아요 상태 로깅
  return (
    <span
      style={{
        display: 'flex', // 의미: 플렉스 박스 레이아웃
        // 이유: 스피너와 텍스트 정렬
        // 비유: 도서관에서 스피너와 텍스트 정렬
        alignItems: 'center', // 의미: 세로 중앙 정렬
        // 이유: 스피너와 텍스트 정렬
        // 비유: 도서관에서 스피너와 텍스트 세로 정렬
      }}
    >
      {isLoading && (
        <LoadingSpinner /> // 의미: 로딩 중일 때 스피너 표시 <!---여기추가
        // 이유: 로딩 상태 시각적 피드백
        // 비유: 도서관에서 로딩 상태 알림
      )}
      <span style={{ marginLeft: isLoading ? '5px' : '0' }}>
        {isLoading ? 'Loading' : isLiked ? '좋아요' : ''}{' '}
        {/* 의미: 로딩 상태 및 좋아요 상태에 따라 텍스트 변경 <!---여기수정 */}
        {/* 이유: 사용자에게 현재 상태 알림 */}
        {/* 비유: 손님에게 버튼 상태 알림 */}
      </span>
    </span>
  );
}

export default LikeButtonLabel; // 의미: 컴포넌트 내보내기
// 이유: LikeButton에서 사용 가능
// 비유: 도서관에서 라벨을 버튼 부서에 전달
