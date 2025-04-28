/**
 * @file LikeButton.jsx
 * @description 좋아요 버튼 컴포넌트
 * @reason 포스트에 좋아요 토글 기능 제공
 * @analogy 도서관에서 손님이 책에 좋아요를 누를 수 있는 버튼
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.postId - 포스트 ID
 */
import { memo } from 'react'; // @type {Function} - React.memo
// @description React.memo 가져오기
// @reason 불필요한 리렌더링 방지
// @analogy 도서관에서 동일한 버튼을 매번 새로 만들지 않도록

import { useAuth } from '@clerk/clerk-react'; // @type {Object} - Clerk 인증 훅
// @description Clerk 인증 훅 가져오기
// @reason 인증 상태 확인
// @analogy 도서관에서 손님의 회원증 상태 확인

import { useToggleLikeMutation } from '../../../api/like/mutations/toggleLikeMutation'; // @type {Function} - 좋아요 토글 뮤테이션 훅
// @description 좋아요 토글 뮤테이션 훅 가져오기
// @reason 백엔드와 동기화 및 캐시 무효화
// @analogy 도서관에서 대여 요청과 선반 정리를 처리하는 도구

import { useInvalidateCache } from '../../../api/like/utils/useInvalidateCache'; // @type {Function} - 캐시 무효화 훅
// @description 캐시 무효화 훅 가져오기
// @reason 좋아요 변경 후 캐시 갱신
// @analogy 도서관에서 게시판 갱신 도구 사용

import LikeButtonIcon from './parts/LikeButtonIcon'; // @type {Function} - 좋아요 버튼 아이콘 컴포넌트
// @description 좋아요 버튼 아이콘 컴포넌트 가져오기
// @reason 버튼에 아이콘 표시
// @analogy 도서관에서 버튼에 아이콘 추가

import LikeButtonLabel from './parts/LikeButtonLabel'; // @type {Function} - 좋아요 버튼 라벨 컴포넌트
// @description 좋아요 버튼 라벨 컴포넌트 가져오기
// @reason 버튼에 라벨 표시
// @analogy 도서관에서 버튼에 텍스트 추가

import useLikeStore from '../../../stores/like/likeStore'; // @type {Object} - 좋아요 Zustand 스토어
// @description 좋아요 Zustand 스토어 가져오기
// @reason 상태 관리와 상태 업데이트
// @analogy 도서관에서 대여 장부 관리 시스템 가져오기

function LikeButton({ postId }) {
  const { isSignedIn, getToken } = useAuth(); // @type {{ isSignedIn: boolean, getToken: Function }} - 인증 상태 및 토큰 함수
  // @description Clerk 인증 상태와 토큰 가져오기
  // @reason 좋아요 요청 시 인증 필요
  // @analogy 도서관에서 손님의 회원증과 인증 키 확인
  const isLiked = useLikeStore(
    (state) => state.getLikeStatuses()[postId] || false // @type {boolean} - 해당 포스트의 좋아요 상태
    // @description Zustand 스토어에서 해당 포스트의 좋아요 상태 가져오기
    // @reason UI 스타일 결정
    // @analogy 도서관에서 책의 대여 상태 확인
  );
  const count = useLikeStore(
    (state) => state.getLikeCounts()[postId] || 0 // @type {number} - 해당 포스트의 좋아요 카운트
    // @description Zustand 스토어에서 해당 포스트의 좋아요 카운트 가져오기
    // @reason UI에 카운트 표시
    // @analogy 도서관에서 책의 대여 횟수 확인
  );
  const toggleLike = useLikeStore(
    (state) => state.toggleLike // @type {Function} - 좋아요 토글 함수
    // @description Zustand 스토어에서 toggleLike 함수 가져오기
    // @reason 좋아요 상태 변경
    // @analogy 도서관에서 대여 상태 변경 도구 가져오기
  );
  const { mutateAsync } = useToggleLikeMutation(isSignedIn, getToken); // @type {Function} - 좋아요 토글 뮤테이션
  // @description 좋아요 토글 뮤테이션 함수 가져오기
  // @reason 서버와 좋아요 상태 동기화
  // @analogy 도서관에서 대여 요청 서버와 동기화
  const invalidate = useInvalidateCache(postId); // @type {Function} - 캐시 무효화 함수
  // @description 캐시 무효화 함수 가져오기
  // @reason 좋아요 변경 후 캐시 갱신
  // @analogy 도서관에서 게시판 갱신 도구 준비

  const handleToggle = async () => {
    if (!isSignedIn) {
      alert('Please sign in to like a post.'); // @description 인증 실패 알림
      // @reason 사용자에게 인증 필요 알림
      // @analogy 도서관에서 손님에게 회원증 필요 알림
      return;
    }

    try {
      await toggleLike(postId, mutateAsync, invalidate); // @description 좋아요 토글 실행
      // @reason Zustand 상태 변경 및 서버 동기화
      // @analogy 도서관에서 대여 상태 변경 및 서버 요청
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        'Failed to toggle like. Please try again.'; // @type {string} - 에러 메시지
      // @description 서버 응답 에러 메시지 또는 기본 메시지 사용
      // @reason 사용자에게 구체적인 에러 알림
      // @analogy 도서관에서 실패 사유 구체화
      alert(errorMessage); // @description 에러 알림
      // @reason 사용자에게 에러 알림
      // @analogy 도서관에서 손님에게 실패 메시지 표시
    }
  };

  return (
    <div>
      <button
        type="button"
        style={{
          padding: '5px 10px', // @description 버튼 패딩 설정
          // @reason 깔끔한 레이아웃
          // @analogy 도서관에서 버튼 크기 조정
          backgroundColor: isLiked ? '#ff4d4f' : '#d9d9d9', // @type {string} - 배경색
          // @description 좋아요 상태에 따라 배경색 변경
          // @reason 시각적 피드백 제공
          // @analogy 도서관에서 대여 상태에 따라 버튼 색상 변경
          color: isLiked ? '#fff' : '#000', // @type {string} - 글자색
          // @description 좋아요 상태에 따라 글자색 변경
          // @reason 가독성 향상
          // @analogy 도서관에서 버튼 글자색 조정
          border: 'none', // @description 테두리 제거
          // @reason 깔끔한 디자인
          // @analogy 도서관에서 버튼 테두리 제거
          borderRadius: '4px', // @description 둥근 모서리 설정
          // @reason 부드러운 디자인
          // @analogy 도서관에서 버튼 모서리 둥글게
        }}
        onClick={handleToggle} // @description 클릭 시 handleToggle 실행
        // @reason 좋아요 토글 기능 실행
        // @analogy 도서관에서 버튼 클릭 시 대여 요청
        disabled={!isSignedIn} // @type {boolean} - 버튼 비활성화 여부
        // @description 인증되지 않은 경우 비활성화
        // @reason 인증 필요
        // @analogy 도서관에서 회원증 없으면 버튼 비활성화
        aria-label={isLiked ? '좋아요 취소' : '좋아요'} // @type {string} - 접근성을 위한 라벨
        // @description 스크린 리더가 버튼 역할 인식하도록
        // @reason 접근성 향상
        // @analogy 도서관에서 손님에게 버튼 역할 명확히 알림
      >
        <LikeButtonIcon isLiked={isLiked} />{' '}
        {/* @description 좋아요 아이콘 렌더링 */}
        {/* @reason 시각적 피드백 제공 */}
        {/* @analogy 도서관에서 대여 상태 아이콘 표시 */}
        <LikeButtonLabel
          isLoading={false}
          isLiked={isLiked}
          count={count}
        />{' '}
        {/* @description 좋아요 라벨 렌더링 */}
        {/* @reason 좋아요 상태와 카운트 표시 */}
        {/* @analogy 도서관에서 대여 상태와 횟수 표시 */}
      </button>
    </div>
  );
}

export default memo(LikeButton, (prevProps, nextProps) => {
  return prevProps.postId === nextProps.postId; // @description React.memo 비교 함수
  // @reason postId 변경 시에만 리렌더링
  // @analogy 도서관에서 책 번호 변경 시에만 버튼 업데이트
});
