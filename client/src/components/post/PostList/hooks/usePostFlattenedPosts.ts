// @file usePostFlattenedPosts.js
// @description PostList 전용 포스트 배열 병합 훅
// @reason 포스트 데이터를 단일 배열로 변환
// @analogy 도서관에서 여러 페이지의 책 목록을 하나로 합치기
import { useMemo } from 'react'; // @type {Function} - React 훅
// @description useMemo 훅 가져오기
// @reason 메모이제이션 처리
// @analogy 도서관에서 책 목록 합본 작업 최적화
// @typescript {typeof import('react').useMemo} - React.useMemo 타입

// @description 포스트 데이터를 단일 배열로 변환하는 훅
// @param {Object} params - 훅 매개변수
// @param {{ pages: Array<Array>, pageParams: Array<number> } | null} params.postsData - 포스트 데이터
// @returns {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} - 병합된 포스트 배열
// @typescript { params: { postsData: { pages: Array<Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>>, pageParams: number[] } | null } } - 매개변수 타입
export const usePostFlattenedPosts = ({ postsData }) => {
  const flattenedPosts = useMemo(() => {
    // @type {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} - 병합된 포스트 배열
    // @description 페이지별 포스트를 단일 배열로 병합
    // @reason 렌더링 시 단일 포스트 배열 필요
    // @analogy 도서관에서 여러 페이지의 책 목록을 하나로 합치기
    // @typescript {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} - 반환 타입
    const mergedPosts = postsData?.pages?.flatMap((page) => page.posts) || [];

    // 여기부터 시작===
    // @description 중복 데이터 관리 부족 문제 해결: _id 기준으로 중복 포스트 제거 강화
    // @reason 동일한 포스트가 여러 번 렌더링되지 않도록, _id가 없는 경우 에러 방지
    // @analogy 도서관에서 같은 책이 여러 번 선반에 올라가지 않도록 정리
    // @improvement key 중복 에러 완전히 방지, 안정성 향상
    const uniquePosts = Array.from(
      new Map(
        mergedPosts.map((post, index) => {
          // @type {string} - 포스트의 고유 키
          // @description _id가 없거나 유효하지 않은 경우 대비
          // @reason 데이터 구조가 예상과 다를 경우 에러 방지
          // @analogy 도서관에서 책의 고유 번호가 없으면 임시 번호 부여
          const key = post._id || post._doc?._id || `fallback-${index}`;
          return [key, post];
        })
      ).values()
    );
    // 여기부터 끝===

    return uniquePosts; // @description 중복 제거된 포스트 배열 반환
    // @reason 최종적으로 렌더링에 사용할 데이터 제공
    // @analogy 도서관에서 정리된 책 목록 제공
  }, [postsData]); // @type {Array} - 의존성 배열
  // @description 의존성 배열
  // @reason postsData 변경 시 재계산
  // @analogy 도서관에서 책 목록 변경 시 합본 갱신
  // @typescript {Array<unknown>} - 의존성 배열 타입

  return flattenedPosts; // @description 병합된 포스트 배열 반환
  // @reason PostList에서 사용
  // @analogy 도서관에서 합본된 책 목록 반환
};
