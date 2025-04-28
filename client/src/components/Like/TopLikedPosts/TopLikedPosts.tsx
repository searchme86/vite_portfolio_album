import { useState } from 'react'; // 의미: React의 useState 훅 가져오기
// 이유: 상태 관리
// 비유: 도서관에서 회원증 상태 확인

import { useAuth } from '@clerk/clerk-react'; // 의미: Clerk의 useAuth 훅 가져오기
// 이유: 인증 상태 확인
// 비유: 도서관에서 회원증 확인 도구

import useTopLikedPostsFetch from './hooks/useTopLikedPostsFetch'; // 의미: 좋아요 상위 포스트 패칭 훅 가져오기
// 이유: 데이터 패칭 로직 분리
// 비유: 도서관에서 책 목록 요청 도구 가져오기

// 의미: 좋아요 상위 포스트 표시 컴포넌트
// 이유: 좋아요 기준 상위 포스트 목록 UI 표시
// 비유: 도서관에서 인기 책 목록을 보여주는 게시판
function TopLikedPosts() {
  console.log('TopLikedPosts - Rendering'); // 의미: 컴포넌트 렌더링 디버깅
  // 이유: 컴포넌트 렌더링 상태 확인
  // 비유: 게시판 업데이트 로그

  const { isLoaded, isSignedIn, getToken } = useAuth(); // 의미: Clerk 인증 상태 가져오기
  // 이유: 인증 상태 및 토큰 확인
  // 비유: 회원증 상태 및 인증 정보 확인

  const [authState] = useState({ isLoaded, isSignedIn }); // 의미: 인증 상태 저장
  // 이유: 인증 상태 참조
  // 비유: 회원증 상태 기록

  console.log('TopLikedPosts - Local authState:', authState); // 의미: 로컬 인증 상태 디버깅
  // 이유: 인증 상태 확인
  // 비유: 회원증 상태 로그

  // 의미: 좋아요 상위 포스트 패칭
  // 이유: 백엔드에서 데이터 가져오기
  // 비유: 도서관에서 인기 책 목록 요청
  const {
    posts,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    fetchNextPage,
  } = useTopLikedPostsFetch(isLoaded, isSignedIn, getToken);

  console.log('TopLikedPosts - Auth state:', { isLoaded, isSignedIn }); // 의미: 인증 상태 디버깅
  // 이유: 인증 상태 확인
  // 비유: 회원증 상태 로그

  console.log('TopLikedPosts - isLoaded:', isLoaded); // 의미: isLoaded 상태 디버깅
  // 이유: 인증 로드 상태 확인
  // 비유: 회원증 준비 여부 로그

  console.log('TopLikedPosts - isSignedIn:', isSignedIn); // 의미: isSignedIn 상태 디버깅
  // 이유: 로그인 상태 확인
  // 비유: 회원 로그인 여부 로그

  console.log('TopLikedPosts - useTopLikedPostsFetch result:', {
    posts,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  }); // 의미: 패칭 결과 디버깅
  // 이유: 패칭 결과 확인
  // 비유: 책 목록 요청 결과 로그

  // 의미: 로딩 중 UI 표시
  // 이유: 사용자에게 로딩 상태 알림
  // 비유: 책 목록 준비 중임을 손님에게 알림
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 의미: 에러 발생 시 UI 표시
  // 이유: 사용자에게 에러 알림
  // 비유: 책 목록 요청 실패 시 손님에게 알림
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 의미: 포스트 목록 확인 및 UI 표시
  // 이유: 데이터 유무에 따라 적절한 UI 렌더링
  // 비유: 책 목록이 있는지 확인 후 게시판에 표시
  if (!posts || posts.length === 0) {
    console.log('TopLikedPosts - No posts available. Check backend data.'); // 의미: 포스트 없음 디버깅
    // 이유: 데이터 없음 확인
    // 비유: 책 목록 없음 로그
    return <div>No posts available. Check backend data.</div>;
  }

  // 의미: 포스트 목록 렌더링
  // 이유: 가져온 데이터를 UI에 표시
  // 비유: 책 목록을 게시판에 표시
  return (
    <div>
      <h2>Top Liked Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

export default TopLikedPosts; // 의미: 컴포넌트 내보내기
// 이유: 다른 파일에서 사용
// 비유: 게시판을 다른 도서관에서 사용 가능
