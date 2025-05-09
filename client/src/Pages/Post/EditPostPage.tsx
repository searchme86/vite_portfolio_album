// src/routes/EditPostPage.jsx
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
// import ImageUploadManager from '../../components/handleImage/ImageUploadManager/ImageUploadManager';

// 1. EditPostPage 컴포넌트: 기존 포스트 편집 페이지
// 2. 이미지 업로드, 포스트 내용 수정, 서버 업데이트 기능 제공
function EditPostPage() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // 1. postId가 없을 경우 기본값 설정
  // 2. API 호출 및 조건문 오류 방지
  const safePostId = postId || 'default-post-id';

  // 1. navigate가 함수가 아닌 경우 빈 함수로 대체
  // 2. 호출 시 에러 방지
  const safeNavigate = typeof navigate === 'function' ? navigate : () => {};

  // 1. queryClient가 객체가 아닌 경우 기본값 설정
  // 2. 메서드 호출 오류 방지
  const safeQueryClient =
    queryClient && typeof queryClient.invalidateQueries === 'function'
      ? queryClient
      : { invalidateQueries: () => {} };

  // 1. getToken이 함수가 아닌 경우 빈 함수로 대체
  // 2. 호출 시 에러 방지
  const safeGetToken =
    typeof getToken === 'function' ? getToken : () => Promise.resolve('');

  // 1. 포스트 데이터 조회 쿼리
  // 2. 서버에서 기존 포스트 데이터 가져오기
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', safePostId],
    queryFn: async () => {
      const token = await safeGetToken();
      const requestUrl = `${
        import.meta.env.VITE_API_URL || 'http://localhost:3000'
      }/posts/id/${safePostId}`;
      try {
        const res = await axios.get(requestUrl, {
          headers: { Authorization: `Bearer ${token || ''}` },
        });
        return res?.data || {};
      } catch (err) {
        console.error(
          'EditPostPage - Fetch error details:',
          err?.response || err || 'Unknown error'
        );
        throw err;
      }
    },
    enabled: !!safePostId,
  });

  // 1. 서버에서 가져온 포스트 데이터로 상태 초기화
  // 2. 기존 포스트 데이터를 UI에 반영
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setDesc(post.desc || '');
      setContent(post.content || '');
      setImageUrls(
        Array.isArray(post.img)
          ? post.img.map((url) =>
              url ? { url, isNew: false } : { url: '', isNew: false }
            )
          : []
      );
      console.log('EditPostPage - Server existing file names:', post.img || []);
    }
  }, [post]);

  // 1. 포스트 업데이트 뮤테이션
  // 2. 서버에 수정된 포스트 데이터 전송
  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const token = await safeGetToken();
      // 1. updatedPost가 객체가 아닌 경우 기본값 설정
      // 2. API 요청 오류 방지
      const safeUpdatedPost =
        typeof updatedPost === 'object' && updatedPost !== null
          ? updatedPost
          : {};
      return axios.patch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:3000'
        }/posts/${safePostId}`,
        safeUpdatedPost,
        {
          headers: { Authorization: `Bearer ${token || ''}` },
        }
      );
    },
    onSuccess: async () => {
      toast.success('Post updated successfully');
      safeQueryClient.invalidateQueries(['posts']);
      safeQueryClient.invalidateQueries(['post', safePostId]);
      safeNavigate(`/${post?.slug || ''}`);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to update post');
    },
  });

  // 1. 폼 제출 핸들러
  // 2. 수정된 포스트 데이터를 서버로 전송
  const handleSubmit = (e) => {
    e.preventDefault();
    // 1. imageUrls가 배열이 아닌 경우 빈 배열로 초기화
    // 2. map 오류 방지
    const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
    console.log(
      'EditPostPage - Submitting updated post with imageUrls:',
      safeImageUrls
    );
    const urlsToSubmit = safeImageUrls.map((item) => item?.url || '');
    mutation.mutate({
      title: title || '',
      desc: desc || '',
      content: content || '',
      img: urlsToSubmit,
    });
  };

  if (!safePostId) {
    console.error('EditPostPage - Error: postId is undefined');
    return <div>Error: Post ID is missing</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('EditPostPage - Fetch error:', error);
    return (
      <div>
        Failed to load post:{' '}
        {error?.response?.data?.message ||
          error?.message ||
          'An error occurred while fetching the post'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Edit Post</h1>
        {/* 1. ImageUploadManager 사용: 이미지 업로드 기능 통합 */}
        {/* 2. 내부적으로 ImageUploadContext.Provider를 통해 Context 값 제공 */}
        {/* <ImageUploadManager
          postId={safePostId}
          initialImageUrls={post?.img || []}
          onImageUrlsChange={(urls) => setImageUrls(urls || [])}
          progressBarColor="bg-blue-600"
          minImages={1}
          maxImages={10}
          showSlide={false}
        /> */}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title || ''}
          onChange={(e) => setTitle(e.target.value || '')}
          placeholder="Title"
          className="p-2 border rounded-md"
          required
          aria-label="Post title"
        />
        <textarea
          value={desc || ''}
          onChange={(e) => setDesc(e.target.value || '')}
          placeholder="Description"
          className="h-32 p-2 border rounded-md"
          required
          aria-label="Post description"
        />
        <ReactQuill
          value={content || ''}
          onChange={(value) => setContent(value || '')}
          placeholder="Write your post content here..."
          className="h-64 mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Update post"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
