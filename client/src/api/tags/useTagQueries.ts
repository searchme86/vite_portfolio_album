// src/api/tags/useTagQueries.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addTag, deleteTag, fetchTags } from './tagApiFunctions.js';

// 1. 태그 목록 조회 훅
// 2. 특정 포스트의 태그를 가져오기
export const useFetchTags = (postId) => {
  return useQuery({
    queryKey: ['tags', postId], // 1. 쿼리 키 설정
    // 2. postId별로 캐싱 구분
    queryFn: () => fetchTags(postId), // 1. 태그 조회 함수 호출
    // 2. fetchTags로 데이터 가져오기
    enabled: !!postId && postId !== 'null', // 1. postId가 유효할 때만 쿼리 실행 <--여기수정
    // 2. postId가 null이거나 falsy 값일 경우 쿼리 실행 방지
    onSuccess: (data) => {
      console.log('Tags fetched successfully:', data); // 1. 디버깅용 로그
      // 2. 태그 조회 성공 확인
    },
    onError: (error) => {
      console.log('Error fetching tags:', error); // 1. 디버깅용 로그
      // 2. 태그 조회 에러 확인
    },
  });
};

// 1. 태그 추가 훅
// 2. 포스트에 태그를 추가
export const useAddTag = () => {
  const queryClient = useQueryClient(); // 1. QueryClient 인스턴스 가져오기
  // 2. 캐시 업데이트를 위해 사용
  return useMutation({
    mutationFn: ({ postId, tag }) => addTag(postId, tag), // 1. 태그 추가 함수 호출
    // 2. addTag로 태그 추가
    onSuccess: (data, variables) => {
      console.log('Tag added successfully:', data); // 1. 디버깅용 로그
      // 2. 태그 추가 성공 확인
      queryClient.invalidateQueries(['tags', variables.postId]); // 1. 태그 캐시 무효화
      // 2. 태그 목록을 새로고침
    },
    onError: (error) => {
      console.log('Error adding tag:', error); // 1. 디버깅용 로그
      // 2. 태그 추가 에러 확인
    },
  });
};

// 1. 태그 삭제 훅
// 2. 포스트에서 태그를 삭제
export const useDeleteTag = () => {
  const queryClient = useQueryClient(); // 1. QueryClient 인스턴스 가져오기
  // 2. 캐시 업데이트를 위해 사용
  return useMutation({
    mutationFn: ({ postId, tag }) => deleteTag(postId, tag), // 1. 태그 삭제 함수 호출
    // 2. deleteTag로 태그 삭제
    onSuccess: (data, variables) => {
      console.log('Tag deleted successfully:', data); // 1. 디버깅용 로그
      // 2. 태그 삭제 성공 확인
      queryClient.invalidateQueries(['tags', variables.postId]); // 1. 태그 캐시 무효화
      // 2. 태그 목록을 새로고침
    },
    onError: (error) => {
      console.log('Error deleting tag:', error); // 1. 디버깅용 로그
      // 2. 태그 삭제 에러 확인
    },
  });
};
