/**
 * @file PostList.jsx
 * @description 포스트 리스트 컴포넌트 (통합 컴포넌트)
 * @reason 포스트 데이터를 가져와 슬라이드 형태로 렌더링
 * @analogy 도서관에서 책 목록을 슬라이드 선반에 표시
 * @returns {JSX.Element} - 포스트 리스트 컴포넌트
 */
import { useEffect, useRef } from 'react'; // @type {Function} - React 훅
// @description React의 useEffect, useRef 훅 가져오기
// @reason 컴포넌트 마운트 시 데이터 페칭 및 초기화 상태 관리
// @analogy 도서관에서 선반 준비 시 책 목록 로드

import { useQueryClient } from '@tanstack/react-query'; // @type {Function} - React Query 훅
// @description React Query의 useQueryClient 훅 가져오기
// @reason 캐시 갱신 및 관리
// @analogy 도서관에서 대여 기록 갱신 도구 가져오기

// import useLikeStore from '../../../stores/like/likeStore'; // @type {Object} - Zustand 스토어
import useLikeStore from '@/stores/like/likeStore';
// @description 좋아요 상태 관리 스토어 가져오기
// @reason 좋아요 상태와 카운트 초기화
// @analogy 도서관에서 대여 장부 시스템

import PostListSwiper from './parts/PostListSwiper'; // @type {Function} - 슬라이더 컴포넌트
// @description PostListSwiper 컴포넌트 가져오기
// @reason 포스트 목록을 슬라이드 형태로 렌더링
// @analogy 도서관에서 책 목록을 슬라이드 선반에 표시

import PostListLoading from './parts/PostListLoading'; // @type {Function} - 로딩 UI 컴포넌트
// @description PostListLoading 컴포넌트 가져오기
// @reason 로딩 상태 또는 데이터 없음 메시지 표시
// @analogy 도서관에서 책 목록 준비 중임을 알림

import { usePostAuthAndUser } from './hooks/usePostAuthAndUser'; // @type {Function} - 인증 및 사용자 훅
// @description usePostAuthAndUser 훅 가져오기
// @reason 사용자 인증 상태와 토큰 가져오기
// @analogy 도서관에서 사서의 상태와 인증 도구 준비

import { usePostFetchToken } from './hooks/usePostFetchToken'; // @type {Function} - 토큰 페칭 훅
// @description usePostFetchToken 훅 가져오기
// @reason 사용자 토큰 페칭 및 저장
// @analogy 도서관에서 사서의 인증 키 발급

import { usePostFetchPosts } from './hooks/usePostFetchPosts'; // @type {Function} - 포스트 페칭 훅
// @description usePostFetchPosts 훅 가져오기
// @reason 포스트 데이터 페칭 및 상태 초기화
// @analogy 도서관에서 책 목록 가져오기

import { usePostFlattenedPosts } from './hooks/usePostFlattenedPosts'; // @type {Function} - 포스트 배열 병합 훅
// @description usePostFlattenedPosts 훅 가져오기
// @reason 포스트 데이터를 단일 배열로 변환
// @analogy 도서관에서 여러 페이지의 책 목록을 하나로 합치기

import { useFetchUserLikesQuery } from '../../../api/like/queries/useFetchUserLikesQuery'; // @type {Function} - 사용자별 좋아요 페칭 훅
// @description 사용자별 좋아요 데이터를 페칭하는 훅 가져오기
// @reason 서버에서 사용자별 좋아요 데이터 가져오기
// @analogy 도서관에서 손님별 대여 기록 가져오기

function PostList() {
  const queryClient = useQueryClient(); // @type {Object} - React Query 클라이언트
  // @description React Query 캐시 관리
  // @reason 좋아요 상태 변경 시 캐시 갱신
  // @analogy 도서관에서 대여 기록 갱신 도구 준비

  const { isLoaded, isSignedIn, user, getToken } = usePostAuthAndUser(); // @type {{ isLoaded: boolean, isSignedIn: boolean, user: Object | null, getToken: Function }} - 인증 및 사용자 상태
  // @description 인증 및 사용자 상태 가져오기
  // @reason 사용자 인증 상태에 따라 데이터 페칭 제어
  // @analogy 도서관에서 사서가 로그인했는지 확인

  const { token, setToken, postsData } = usePostFetchToken({
    isLoaded,
    user,
    getToken,
  }); // @type {{ token: string | null, setToken: Function, postsData: { pages: Array<Array>, pageParams: Array<number> } | null }} - 토큰 및 포스트 데이터
  // @description 토큰 페칭 및 저장
  // @reason API 요청 시 인증에 필요
  // @analogy 도서관에서 인증 키 발급 및 저장

  usePostFetchPosts({ token, isLoaded }); // @description 포스트 데이터 페칭 및 상태 초기화
  // @reason 백엔드에서 포스트 데이터 가져오기
  // @analogy 도서관에서 책 목록 가져오기

  const flattenedPosts = usePostFlattenedPosts({ postsData }); // @type {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} - 병합된 포스트 배열
  // @description 포스트 데이터를 단일 배열로 변환
  // @reason 렌더링 시 단일 포스트 배열 필요
  // @analogy 도서관에서 여러 페이지의 책 목록을 하나로 합치기

  const setInitialLikes = useLikeStore((state) => state.setInitialLikes); // @type {Function} - 초기 좋아요 상태 설정 함수
  // @description Zustand 스토어에서 setInitialLikes 함수 가져오기
  // @reason 사용자별 좋아요 상태 초기화
  // @analogy 도서관에서 대여 장부 초기화

  const userId = user?.id || null; // @type {string|null} - 사용자 ID
  // @description 사용자 객체에서 ID 가져오기
  // @reason 서버 요청에 필요
  // @analogy 도서관에서 손님 이름 가져오기

  const sessionId = user?.sessionId || null; // @type {string|null} - 세션 ID
  // @description 사용자 객체에서 세션 ID 가져오기
  // @reason 서버 요청에 필요
  // @analogy 도서관에서 예약 번호 가져오기

  const {
    data: userLikes,
    isLoading: isUserLikesLoading,
    error: userLikesError,
  } = useFetchUserLikesQuery(token, userId, sessionId); // @type {{ data: Array, isLoading: boolean, error: Error|null }} - 사용자별 좋아요 데이터
  // @description React Query로 사용자별 좋아요 데이터 페칭, userId와 sessionId 추가
  // @reason 서버 요구사항 충족
  // @analogy 도서관에서 손님별 대여 기록 가져오기

  const isInitialLoad = useRef(true); // @type {Object} - 초기 로드 상태
  // @description 컴포넌트의 초기 로드 여부 추적
  // @reason setInitialLikes를 최초 로드 시에만 실행
  // @analogy 도서관에서 장부를 처음 한 번만 초기화

  useEffect(() => {
    if (isUserLikesLoading || userLikesError || !userLikes) return; // @description 로딩 중이거나 에러 시 스킵
    // @reason 데이터 준비 완료 확인
    // @analogy 도서관에서 대여 기록 준비 완료 확인

    if (isInitialLoad.current) {
      setInitialLikes(userLikes); // @type {Array} - 사용자별 좋아요 데이터
      // @description 서버에서 받은 좋아요 데이터로 Zustand 상태 초기화
      // @reason 사용자별 상태와 카운트 동기화 (최초 로드 시에만)
      // @analogy 도서관에서 서버의 대여 정보를 장부에 반영
      isInitialLoad.current = false; // @description 초기 로드 완료 표시
      // @reason 이후에는 setInitialLikes 호출 방지
      // @analogy 도서관에서 초기 설정 완료 후 더 이상 초기화 안 함
    }
  }, [userLikes, isUserLikesLoading, userLikesError, setInitialLikes]); // @description 의존성 배열
  // @reason 데이터 변경 시 실행
  // @analogy 도서관에서 대여 기록 변경 시 동작

  if (userLikesError) {
    console.error(
      'PostList - Failed to fetch user likes:',
      userLikesError.message
    ); // @description 에러 로깅
    // @reason 디버깅: 에러 원인 확인
    // @analogy 도서관에서 실패 원인 기록
    const errorMessage =
      userLikesError.response?.data?.message || userLikesError.message; // @type {string} - 에러 메시지
    // @description 서버 응답 메시지 또는 기본 에러 메시지 사용
    // @reason 더 구체적인 에러 메시지 제공
    // @analogy 도서관에서 실패 사유 구체화
    return (
      <div>
        <h1>포스트 목록</h1>
        <p>좋아요 데이터를 불러오는 데 실패했습니다: {errorMessage}</p>
        <button type="button" onClick={() => window.location.reload()}>
          새로고침
        </button>
      </div>
    ); // @description 에러 UI 렌더링
    // @reason 사용자에게 에러 알림 및 해결 방법 제시
    // @analogy 도서관에서 손님에게 실패 메시지와 재시도 버튼 제공
  }

  return (
    <div>
      <h1>포스트 목록</h1> {/* @description 페이지 제목 표시 */}
      {/* @reason 사용자에게 섹션 알림 */}
      {/* @analogy 도서관에서 책 목록 섹션 이름 표시 */}
      <PostListLoading
        isLoaded={isLoaded}
        postsData={postsData}
        flattenedPosts={flattenedPosts}
      />{' '}
      {/* @description 로딩 상태 또는 데이터 없음 메시지 표시 */}
      {/* @reason 데이터 로드 전 UI 표시 */}
      {/* @analogy 도서관에서 책 목록 준비 중임을 알림 */}
      <PostListSwiper
        flattenedPosts={flattenedPosts}
        isLoaded={isLoaded}
      />{' '}
      {/* @description 포스트 목록을 슬라이드 형태로 렌더링 */}
      {/* @reason 포스트 데이터를 슬라이드 형태로 표시 */}
      {/* @analogy 도서관에서 책 목록을 슬라이드 선반에 표시 */}
    </div>
  );
}

export default PostList; // @description PostList 컴포넌트 내보내기
// @reason 다른 파일에서 사용 가능하도록
// @analogy 도서관에서 책 목록 컴포넌트 공유
