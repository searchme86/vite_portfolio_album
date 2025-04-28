/**
 * @file PostListItemImage.jsx
 * @description PostListItem의 이미지 컴포넌트
 * @reason 포스트 이미지를 렌더링하거나 대체 UI 표시
 * @analogy 도서관에서 책 표지를 표시하는 조각
 * @param {Object} props - 컴포넌트 props
 * @param {string | null} props.imageUrl - 이미지 URL
 * @param {Object} props.post - 포스트 데이터
 * @returns {JSX.Element} - 이미지 컴포넌트
 */
function PostListItemImage({ imageUrl, post }) {
  return imageUrl ? (
    <img
      src={imageUrl} // @description 백엔드에서 제공된 이미지 URL로 이미지 표시
      // @reason 포스트에 실제 이미지를 렌더링
      // @analogy 도서관에서 책의 실제 표지 표시
      alt={post?.title || '포스트 이미지'} // @type {string} - 접근성을 위한 대체 텍스트
      // @description 접근성을 위한 대체 텍스트
      // @reason 이미지가 로드되지 않을 경우 설명 제공
      // @analogy 도서관에서 책 표지가 없으면 설명 제공
      style={{
        maxWidth: '100%', // @description 이미지 최대 너비 설정
        // @reason 레이아웃 깨짐 방지
        // @analogy 도서관에서 책 표지 크기 조정
        height: 'auto', // @description 이미지 비율 유지
        // @reason 이미지 왜곡 방지
        // @analogy 도서관에서 책 표지 비율 유지
        marginBottom: '10px', // @description 하단 여백 설정
        // @reason 깔끔한 레이아웃
        // @analogy 도서관에서 책 표지와 내용 간 간격 조정
      }}
      onError={(e) => {
        console.error('PostListItemImage - Image load failed:', imageUrl); // @description 이미지 로드 실패 로깅
        // @reason 디버깅
        // @analogy 도서관에서 책 표지 로드 실패 기록
        e.target.style.display = 'none'; // @description 이미지 로드 실패 시 숨김
        // @reason 깨진 이미지 표시 방지
        // @analogy 도서관에서 깨진 표지 숨김
      }}
    />
  ) : (
    <div
      style={{
        width: '100%', // @description 대체 UI 너비 설정
        // @reason 레이아웃 일관성 유지
        // @analogy 도서관에서 대체 표지 크기 설정
        height: '150px', // @description 대체 UI 높이 설정
        // @reason 시각적 일관성
        // @analogy 도서관에서 대체 표지 높이 설정
        backgroundColor: '#f0f0f0', // @description 대체 UI 배경색 설정
        // @reason 이미지 없음을 시각적으로 표시
        // @analogy 도서관에서 대체 표지 색상 설정
        display: 'flex', // @description 플렉스 박스 레이아웃
        // @reason 텍스트 중앙 정렬
        // @analogy 도서관에서 대체 텍스트 중앙 배치
        alignItems: 'center', // @description 세로 중앙 정렬
        // @reason 깔끔한 정렬
        // @analogy 도서관에서 대체 텍스트 세로 정렬
        justifyContent: 'center', // @description 가로 중앙 정렬
        // @reason 깔끔한 정렬
        // @analogy 도서관에서 대체 텍스트 가로 정렬
        marginBottom: '10px', // @description 하단 여백 설정
        // @reason 깔끔한 레이아웃
        // @analogy 도서관에서 대체 표지와 내용 간 간격 조정
      }}
    >
      이미지가 없습니다. {/* @description 이미지 없음 메시지 표시 */}
      {/* @reason 사용자에게 이미지 부재 알림 */}
      {/* @analogy 도서관에서 손님에게 표지 없음 알림 */}
    </div>
  );
}

export default PostListItemImage; // @description PostListItemImage 컴포넌트 내보내기
// @reason PostListItem에서 사용 가능하도록
// @analogy 도서관에서 책 표지 컴포넌트 공유
