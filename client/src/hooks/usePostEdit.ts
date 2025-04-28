// src/hooks/usePostEdit.js
import { useAuth } from '@clerk/clerk-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; // useQueryClient 추가
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 포스트 데이터를 가져오는 함수
const fetchPostById = async (postId, token) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/id/${postId}`,
    {
      headers: { Authorization: `Bearer ${token}` }, // 인증 토큰 추가
      withCredentials: true, // 인증 정보 포함
    }
  );
  return res.data;
  // 1. 포스트 ID로 특정 포스트 데이터를 가져옴
  // 2. withCredentials로 Clerk의 쿠키/토큰 포함
};

// 포스트 수정 훅
export const usePostEdit = (postId) => {
  const { getToken } = useAuth(); // Clerk에서 인증 토큰 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const queryClient = useQueryClient(); // 쿼리 캐시 관리용 클라이언트 추가

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId], // 캐시 키 설정
    queryFn: async () => {
      const token = await getToken(); // 비동기 토큰 가져오기
      if (!token) throw new Error('Authentication token not found'); // 토큰 없으면 에러
      return fetchPostById(postId, token); // 포스트 데이터 가져오기
    },
    enabled: !!postId, // postId가 있을 때만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    cacheTime: 10 * 60 * 1000, // 10분 후 캐시 제거
    // 1. enabled로 불필요한 초기 요청 방지
    // 2. staleTime과 cacheTime으로 캐싱 성능 개선
  });

  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const token = await getToken(); // 비동기 토큰 가져오기
      if (!token) throw new Error('Authentication token not found'); // 토큰 없으면 에러
      return axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        updatedPost,
        {
          headers: { Authorization: `Bearer ${token}` }, // 인증 헤더 추가
          withCredentials: true, // 인증 정보 포함
        }
      );
    },
    onSuccess: (res) => {
      toast.success('Post updated successfully!'); // 성공 알림
      // // 여기부터 새로 추가: PostList.jsx의 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });
      queryClient.refetchQueries({ queryKey: ['posts'], exact: false });
      console.log('Invalidated and refetched queries for: ["posts"]');
      // 1. PostList.jsx가 사용하는 ['posts', ...] 쿼리 캐시 무효화
      // 2. 즉시 리패칭하여 최신 데이터 반영
      // 여기까지 새로 추가
      navigate(`/${res.data.slug}`); // 수정 후 포스트 상세 페이지로 이동
    },
    onError: (error) => {
      const errorMessage = error.response?.data || 'Failed to update post'; // 에러 메시지 추출
      toast.error(errorMessage); // 사용자에게 에러 알림
      console.error('Update error:', error); // 디버깅용 에러 로그
    },
  });

  return {
    data, // 가져온 포스트 데이터
    isLoading, // 로딩 상태
    error, // 에러 상태
    updatePost: mutation.mutate, // 포스트 수정 함수
  };
};
