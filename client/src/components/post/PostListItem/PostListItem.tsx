/**
 * @file PostListItem.jsx
 * @description 포스트 아이템 컴포넌트 (통합 컴포넌트)
 * @reason 개별 포스트 정보를 렌더링하고 좋아요 기능 포함
 * @analogy 도서관에서 책 정보를 표시하는 카드
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.post - 포스트 데이터
 * @param {boolean} props.isLoaded - 로딩 상태
 * @returns {JSX.Element} - 포스트 아이템 컴포넌트
 */
import { memo } from 'react'; // @type {Function} - React.memo
// @description React.memo 가져오기
// @reason 불필요한 리렌더링 방지
// @analogy 도서관에서 동일한 책 카드를 매번 새로 만들지 않도록

import { useInvalidateCache } from '../../../api/like/utils/useInvalidateCache'; // @type {Function} - 캐시 무효화 훅
// @description 캐시 무효화 훅 가져오기
// @reason 좋아요 토글 후 캐시 갱신
// @analogy 도서관 창고에서 게시판 갱신 도구 가져오기

import { usePostListItemExtractPostId } from './hooks/usePostListItemExtractPostId'; // @type {Function} - 포스트 ID 추출 훅
// @description usePostListItemExtractPostId 훅 가져오기
// @reason 포스트 ID 추출
// @analogy 도서관에서 책 번호 추출 도구 가져오기

import { usePostListItemExtractImageUrl } from './hooks/usePostListItemExtractImageUrl'; // @type {Function} - 이미지 URL 추출 훅
// @description usePostListItemExtractImageUrl 훅 가져오기
// @reason 이미지 URL 추출
// @analogy 도서관에서 책 표지 URL 추출 도구 가져오기

import PostListItemImage from './parts/PostListItemImage'; // @type {Function} - 이미지 컴포넌트
// @description PostListItemImage 컴포넌트 가져오기
// @reason 이미지 또는 대체 UI 렌더링
// @analogy 도서관에서 책 표지 표시 컴포넌트 가져오기

import PostListItemContent from './parts/PostListItemContent'; // @type {Function} - 콘텐츠 컴포넌트
// @description PostListItemContent 컴포넌트 가져오기
// @reason 제목과 내용 렌더링
// @analogy 도서관에서 책 제목과 내용 표시 컴포넌트 가져오기

import PostListItemActions from './parts/PostListItemActions'; // @type {Function} - 액션 컴포넌트
// @description PostListItemActions 컴포넌트 가져오기
// @reason 좋아요 버튼과 수 렌더링
// @analogy 도서관에서 좋아요 버튼과 수 표시 컴포넌트 가져오기

function PostListItem({ post, isLoaded }) {
  //====여기부터 수정됨====
  const postId = usePostListItemExtractPostId({ post }); // @type {string} - 포스트 ID
  // @description 포스트 ID 추출
  // @reason Mongoose 문서 구조에 맞게 ID 접근
  // @analogy 도서관에서 책 번호 확인
  // @why: 오타(BarrackItemExtractPostId)를 올바른 훅 이름(usePostListItemExtractPostId)으로 수정
  // @meaning: 올바른 훅을 호출하여 포스트 ID를 정확히 추출
  // @difference: 오타로 인해 훅이 호출되지 않던 문제를 해결
  //====여기까지 수정됨====

  const invalidate = useInvalidateCache(postId); // @type {Function} - 캐시 무효화 함수
  // @description 캐시 무효화 함수 호출
  // @reason 컴포넌트 최상단에서 호출하여 React 훅 규칙 준수
  // @analogy 도서관 문을 열자마자 게시판 갱신 도구 준비

  const imageUrl = usePostListItemExtractImageUrl({ post }); // @type {string | null} - 이미지 URL
  // @description 이미지 URL 추출
  // @reason Mongoose 문서 구조에 맞게 img 접근
  // @analogy 도서관에서 책 표지 URL 확인

  return (
    <article
      aria-labelledby={`post-title-${postId}`} // @type {string} - 접근성을 위한 포스트 제목 연결
      // @description 접근성을 위한 포스트 제목 연결
      // @reason 스크린 리더가 포스트 제목을 인식하도록
      // @analogy 도서관에서 책 제목을 손님에게 명확히 알림
      style={{
        border: '1px solid #ddd', // @description 포스트 카드 테두리 설정
        // @reason 시각적 구분
        // @analogy 도서관에서 책 카드 테두리 표시
        padding: '10px', // @description 내부 여백 설정
        // @reason 깔끔한 레이아웃
        // @analogy 도서관에서 책 카드 내부 여백 조정
        margin: '10px 0', // @description 외부 여백 설정
        // @reason 카드 간 간격 확보
        // @analogy 도서관에서 책 카드 간 간격 조정
      }}
    >
      <PostListItemImage imageUrl={imageUrl} post={post} />{' '}
      {/* @description 이미지 또는 대체 UI 렌더링 */}
      {/* @reason 포스트 이미지 표시 */}
      {/* @analogy 도서관에서 책 표지 표시 */}
      <PostListItemContent post={post} postId={postId} />{' '}
      {/* @description 제목과 내용 렌더링 */}
      {/* @reason 포스트 제목과 내용 표시 */}
      {/* @analogy 도서관에서 책 제목과 내용 표시 */}
      <PostListItemActions postId={postId} invalidate={invalidate} />{' '}
      {/* @description 좋아요 버튼과 수 렌더링 */}
      {/* @reason 좋아요 기능 표시 */}
      {/* @analogy 도서관에서 좋아요 버튼과 수 표시 */}
    </article>
  );
}

export default memo(PostListItem); // @description React.memo로 컴포넌트 래핑
// @description 불필요한 리렌더링 방지
// @analogy 도서관에서 책 카드를 효율적으로 관리
