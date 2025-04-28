// src/components/PostMenuActions.jsx
import { useAuth, useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function PostMenuActions({ post }) {
  const { user, isLoaded } = useUser(); // 현재 유저 정보 및 로딩 상태
  // 1. Clerk에서 현재 유저 정보를 가져옴
  // 2. isLoaded로 유저 정보 로딩 상태 확인
  const { getToken } = useAuth(); // 인증 토큰
  // 1. API 요청을 위한 인증 토큰 가져오기
  // 2. Clerk의 useAuth 훅 사용
  const navigate = useNavigate(); // 페이지 이동
  // 1. 포스트 삭제 후 페이지 이동에 사용
  // 2. react-router-dom의 useNavigate 훅
  const queryClient = useQueryClient(); // React Query 클라이언트
  // 1. 캐시 관리 및 갱신
  // 2. useQueryClient 훅 사용

  // 디버깅 로그
  console.log('PostMenuActions - Current user:', user);
  console.log('PostMenuActions - User loaded:', isLoaded);
  console.log('PostMenuActions - Post data:', post);
  console.log(
    'PostMenuActions - User ID:',
    user?.id,
    'Post User Clerk ID:',
    post.user?.clerkUserId
  ); // 조건 평가 확인

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success('Post has been deleted');
      queryClient.invalidateQueries(['posts']);
      navigate('/posts?sort=trending');
    },
    onError: (error) => {
      toast.error(error.response?.data || 'Failed to delete post');
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      mutation.mutate();
    }
  };

  // 유저 정보 로딩 중일 때
  if (!isLoaded) {
    return <p className="text-gray-500">Loading user info...</p>;
  }

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <p className="text-gray-500">
        Please{' '}
        <Link to="/login" className="text-blue-600">
          log in
        </Link>{' '}
        to edit or delete this post.
      </p>
    );
  }

  // 작성자 여부 확인 (clerkUserId로 비교) <-- 여기수정
  const isAuthor = user?.id === post.user?.clerkUserId;

  return (
    <div className="flex gap-2">
      {isAuthor ? (
        <>
          <Link to={`/edit/${post._id}`} className="text-blue-800">
            Edit
          </Link>
          <button onClick={handleDelete} className="text-red-600">
            Delete
          </button>
        </>
      ) : (
        <p className="text-gray-500">You are not the author of this post.</p>
      )}
    </div>
  );
}

export default PostMenuActions;
