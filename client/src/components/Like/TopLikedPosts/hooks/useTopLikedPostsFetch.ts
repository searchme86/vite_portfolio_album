// src/components/Like/TopLikedPosts/hooks/useTopLikedPostsFetch.js

import { useInfiniteQuery } from '@tanstack/react-query'; // 의미: React Query의 useInfiniteQuery 훅 가져오기
// 이유: 무한 스크롤 데이터 패칭
// 비유: 도서관에서 책 목록을 페이지 단위로 가져오기

import { axiosGetPopularPosts } from '../../../../api/like/axios/axiosGetPopularPosts'; // 의미: 인기 포스트 조회 API 함수 가져오기
// 이유: 백엔드에서 좋아요 기준 상위 포스트 목록 가져오기
// 비유: 도서관에서 인기 책 목록 요청

// 의미: 좋아요 상위 포스트 패칭 커스텀 훅
// 이유: 좋아요 기준 상위 포스트 목록 가져오기
// 비유: 도서관에서 인기 책 목록을 가져오는 도구
function useTopLikedPostsFetch(isLoaded, isSignedIn, getToken) {
  console.log('useTopLikedPostsFetch - Hook called with:', {
    isLoaded,
    isSignedIn,
  }); // 의미: 훅 호출 디버깅
  // 이유: 훅 호출 상태 확인
  // 비유: 도서관에서 책 요청 상태 로그

  console.log('useTopLikedPostsFetch - Auth:', isLoaded ? 1 : 0); // 의미: 인증 상태 디버깅
  // 이유: isLoaded 값 확인
  // 비유: 회원증 준비 여부 로그

  // 의미: 좋아요 상위 포스트 패칭 쿼리
  // 이유: 백엔드에서 데이터 가져오기
  // 비유: 도서관에서 책 목록 요청
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['topLikedPosts', isLoaded], // 의미: 쿼리 키 설정
    // 이유: 캐시 관리 및 쿼리 식별, isLoaded 변경 시 쿼리 재실행
    // 비유: 도서관에서 책 목록 요청의 고유 코드, 회원증 준비 여부에 따라 요청서 새로 작성
    queryFn: async ({ pageParam = 1 }) => {
      console.log('useTopLikedPostsFetch - Fetching page:', pageParam); // 의미: 페이지 패칭 디버깅
      // 이유: 요청 페이지 확인
      // 비유: 도서관에서 몇 번째 책 목록 페이지 요청인지 로그

      if (!isLoaded) {
        console.log('useTopLikedPostsFetch - Auth not loaded, skipping fetch'); // 의미: 인증 미완료 디버깅
        // 이유: 인증 상태 확인
        // 비유: 회원증 확인이 안 됐으면 책 요청 안 함
        return { posts: [], nextPage: null };
      }

      const token = isSignedIn ? await getToken() : null; // 의미: 인증 토큰 가져오기
      // 이유: 로그인 상태에 따라 토큰 사용
      // 비유: 손님의 회원증으로 인증

      console.log(
        'useTopLikedPostsFetch - Token:',
        token ? 'Present' : 'Absent'
      ); // 의미: 토큰 존재 여부 디버깅
      // 이유: 토큰 상태 확인
      // 비유: 회원증 유무 확인 로그

      console.log('useTopLikedPostsFetch - API Call Parameters:', {
        pageParam,
        token: token ? 'Present' : 'Absent',
      }); // 의미: API 호출 파라미터 디버깅
      // 이유: API 호출 시 사용된 파라미터 확인
      // 비유: 도서관에 요청서를 보낼 때 어떤 정보를 보냈는지 확인

      try {
        const response = await axiosGetPopularPosts(pageParam, token); // 의미: 인기 포스트 조회
        // 이유: 백엔드에서 데이터 패칭
        // 비유: 도서관에서 인기 책 목록 가져오기

        console.log('useTopLikedPostsFetch - Detailed API Response:', response); // 의미: API 응답의 전체 구조 디버깅
        // 이유: response의 모든 속성을 확인하여 누락된 데이터 파악
        // 비유: 도서관에서 받은 책 목록의 모든 세부 정보 확인

        if (response.posts && response.posts.length === 0) {
          console.log(
            'useTopLikedPostsFetch - No posts returned. Checking totalPosts and hasMore:',
            {
              totalPosts: response.totalPosts,
              hasMore: response.hasMore,
            }
          ); // 의미: 포스트가 비어 있는 경우 디버깅
          // 이유: 데이터가 없는 이유 파악
          // 비유: 책 목록이 비어 있다면 이유 확인

          console.log(
            'useTopLikedPostsFetch - Possible reason: No posts have likes or filtering criteria too strict.'
          ); // 의미: 데이터가 없는 가능성 디버깅
          // 이유: 문제 원인 추적
          // 비유: 책 목록이 비어 있는 이유 추측 로그
        }

        console.log('useTopLikedPostsFetch - API Response:', response); // 의미: API 응답 디버깅
        // 이유: 응답 데이터 확인
        // 비유: 가져온 책 목록 확인 로그

        // 의미: 응답 데이터 구조 확인
        // 이유: 데이터가 예상 구조인지 확인하여 에러 방지
        // 비유: 책 목록이 제대로 왔는지 확인
        if (!response || typeof response !== 'object') {
          throw new Error('Invalid response structure from API'); // 의미: 응답 구조 에러 throw
          // 이유: 잘못된 응답 처리
          // 비유: 책 목록이 없거나 잘못된 형식이면 에러 알림
        }

        const posts = response.posts || []; // 의미: 응답에서 포스트 목록 추출
        // 이유: 데이터 가공
        // 비유: 책 목록에서 책만 꺼내기

        const nextPage = response.hasMore ? pageParam + 1 : null; // 의미: 다음 페이지 존재 여부 확인
        // 이유: 무한 스크롤을 위한 다음 페이지 설정
        // 비유: 다음 책 목록 페이지가 있는지 확인

        return { posts, nextPage }; // 의미: 패칭 결과 반환
        // 이유: 컴포넌트에서 사용할 데이터 제공
        // 비유: 손님에게 책 목록 전달
      } catch (err) {
        console.error('useTopLikedPostsFetch - Error fetching posts:', err); // 의미: 패칭 에러 디버깅
        // 이유: 문제 원인 추적
        // 비유: 책 목록 가져오기 실패 로그
        throw err; // 의미: 에러 throw
        // 이유: React Query가 에러 처리하도록
        // 비유: 문제 발생 시 손님에게 알림
      }
    },
    getNextPageParam: (lastPage) => {
      console.log('useTopLikedPostsFetch - getNextPageParam:', { lastPage }); // 의미: 다음 페이지 파라미터 디버깅
      // 이유: 다음 페이지 설정 확인
      // 비유: 다음 책 목록 페이지 번호 확인 로그
      return lastPage.nextPage;
    }, // 의미: 다음 페이지 파라미터 설정
    // 이유: 무한 스크롤 페이지네이션
    // 비유: 다음 책 목록 페이지 번호 설정
    enabled: isLoaded, // 의미: 쿼리 활성화 조건 설정
    // 이유: 인증이 완료된 경우에만 패칭
    // 비유: 회원증 확인 후 책 목록 요청
  });

  // 의미: 포스트 목록 평탄화
  // 이유: 페이지별 데이터를 하나의 배열로 합치기
  // 비유: 여러 페이지의 책 목록을 한 묶음으로 정리
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  console.log('useTopLikedPostsFetch - Flattened posts:', posts); // 의미: 평탄화된 포스트 디버깅
  // 이유: 데이터 확인
  // 비유: 정리된 책 목록 확인 로그

  // 의미: 훅 결과 반환
  // 이유: 컴포넌트에서 사용할 데이터와 함수 제공
  // 비유: 손님에게 책 목록과 추가 요청 도구 전달
  return {
    posts, // 의미: 포스트 목록
    // 이유: UI에 표시할 데이터
    // 비유: 손님에게 보여줄 책 목록
    hasNextPage, // 의미: 다음 페이지 존재 여부
    // 이유: 더 불러오기 버튼 표시 여부 결정
    // 비유: 더 가져올 책이 있는지 여부
    isLoading, // 의미: 로딩 상태
    // 이유: 로딩 UI 표시
    // 비유: 책 가져오는 중인지 여부
    isFetchingNextPage, // 의미: 다음 페이지 패칭 상태
    // 이유: 추가 로딩 UI 표시
    // 비유: 다음 책 목록 가져오는 중인지 여부
    error, // 의미: 에러 상태
    // 이유: 에러 UI 표시
    // 비유: 책 목록 가져오기 실패 여부
    fetchNextPage, // 의미: 다음 페이지 패칭 함수
    // 이유: 더 불러오기 기능 제공
    // 비유: 다음 책 목록 요청 도구
    refetch, // 의미: 데이터 새로고침 함수
    // 이유: 캐시 갱신 및 데이터 새로고침
    // 비유: 책 목록 새로고침 도구
  };
}

export default useTopLikedPostsFetch; // 의미: 훅 내보내기
// 이유: 다른 파일에서 사용
// 비유: 도서관 책 목록 요청 도구를 다른 도서관에서 사용 가능
