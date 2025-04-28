// frontend/components/tag/hook/useTagQueries.js
import { useQuery } from '@tanstack/react-query'; // 1. React Query 훅 임포트
// 2. 데이터 페칭 관리
import {
  fetchAllTagsAxios,
  fetchPostsByTagAxios,
} from '../../../api/tags/axios.js'; // 1. 태그 관련 Axios 함수 임포트
// 2. API 요청에 사용

// 1. 모든 고유 태그를 가져오는 쿼리 훅
// 2. React Query로 고유 태그 리스트 페칭
export const useFetchAllTagsQuery = () => {
  return useQuery({
    queryKey: ['tags'], // 1. 쿼리 키 설정
    // 2. 캐싱 및 데이터 식별
    queryFn: fetchAllTagsAxios, // 1. 고유 태그 페칭 함수
    // 2. API 요청 실행
  });
};

// 1. 특정 태그를 가진 포스트를 가져오는 쿼리 훅
// 2. React Query로 태그별 포스트 리스트 페칭
export const useFetchPostsByTagQuery = (tag, page) => {
  return useQuery({
    queryKey: ['postsByTag', { tag, page }], // 1. 쿼리 키 설정
    // 2. 태그와 페이지별 캐싱
    queryFn: () => fetchPostsByTagAxios(tag, page), // 1. 태그별 포스트 페칭 함수
    // 2. API 요청 실행
  });
};
