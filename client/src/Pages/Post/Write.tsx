import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import PostTagManager from '../../components/tags/PostTagManager';
import PostTagManager from '@/components/tags/PostTagManager';
// import ImageUploadManager from '../../components/handleImage/ImageUploadManager/ImageUploadManager';
import ImageUploadManager from '@/components/handleImage/ImageUploadManager/ImageUploadManager';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
// import { useCreatePost } from '../../api/post/write/useCreatePost';
import { useCreatePost } from '@/api/post/write/useCreatePost';
// import { useSafeAuthToken } from '../../lib/auth/useSafeAuthToken';
import { useSafeAuthToken } from '@/lib/auth/useSafeAuthToken';
// import { useTagManager } from '../../components/tags/hook/useTagManager';
import { useTagManager } from '@/components/tags/hook/useTagManager';

// 1. Write 컴포넌트 정의
// 2. 포스트 작성 페이지의 메인 로직
function Write() {
  // 1. 제목 상태 정의
  // 2. 로컬 상태로 관리
  const [title, setTitle] = useState('');
  // 1. 설명 상태 정의
  // 2. 로컬 상태로 관리
  const [desc, setDesc] = useState('');
  // 1. 본문 상태 정의
  // 2. 로컬 상태로 관리
  const [content, setContent] = useState('');
  // 1. 이미지 URL 상태 정의
  // 2. 로컬 상태로 관리
  const [imageUrls, setImageUrls] = useState([]);

  // 1. 태그 상태 정의
  // 2. 로컬 상태로 관리
  const [tempTags, setTempTags] = useState([]);

  console.log('Write - Initialized imageUrls:', imageUrls);
  console.log('Write - Initialized title:', title);
  console.log('Write - Initialized desc:', desc);
  console.log('Write - Initialized content:', content);
  console.log('Write - Initialized tempTags:', tempTags);

  // 1. 태그 상태 변경 시 디버깅 로그
  // 2. 최신 태그 상태 확인
  useEffect(() => {
    // 1. tempTags가 배열인지 확인
    // 2. 오류 방지
    const safeTempTags = Array.isArray(tempTags) ? tempTags : [];
    console.log('Write - tempTags updated:', safeTempTags);
  }, [tempTags]);

  // 1. 네비게이션 함수 가져오기
  // 2. react-router-dom의 useNavigate 사용
  const navigate = useNavigate();

  // 1. navigate가 함수인지 확인
  // 2. 오류 방지를 위해 폴백 처리
  const safeNavigate =
    typeof navigate === 'function'
      ? navigate
      : () => {
          console.log('Write - Fallback navigate called');
        };
  console.log('Write - Initialized safeNavigate');

  // 1. 안전한 인증 토큰 훅 호출
  // 2. src/lib/auth/useSafeAuthToken 사용
  const safeGetToken = useSafeAuthToken();

  // 1. 포스트 생성 훅 호출
  // 2. src/api/post/write/useCreatePost 사용
  const { data, isLoading, error, handleSubmit } = useCreatePost(
    title,
    desc,
    content,
    imageUrls,
    tempTags,
    safeGetToken,
    safeNavigate
  );

  // 여기부터 시작===
  // 1. 태그 관리 훅 호출
  // 2. handleAddTag와 handleDeleteTag 함수 가져오기
  const { handleAddTag, handleDeleteTag } = useTagManager(
    tempTags,
    setTempTags
  );
  // 여기부터 끝===

  // 1. 콘솔 로그로 현재 상태 디버깅
  // 2. 모든 상태를 추적
  console.log('Write - Current state:', {
    title,
    desc,
    content,
    imageUrls,
    tempTags,
  });

  // 1. 콘솔 로그로 뮤테이션 상태 디버깅
  // 2. 뮤테이션 상태 추적
  console.log('Write - Mutation state:', { data, isLoading, error });

  // 1. 페이지 렌더링
  // 2. UI와 공통 컴포넌트 조합
  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="mb-8">
        {/* 1. 페이지 제목 표시 */}
        {/* 2. Tailwind CSS로 스타일링 */}
        <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>
        {/* 1. ImageUploadManager 사용 */}
        {/* 2. 이미지 업로드 기능 통합 */}
        <ImageUploadManager
          postId="temp"
          initialImageUrls={[]}
          onImageUrlsChange={(urls) => {
            // 1. 이미지 URL 변경 시 상태 업데이트
            // 2. 디버깅 로그 추가
            console.log('Write - Image URLs updated:', urls);
            setImageUrls(urls || []);
          }}
          progressBarColor="bg-blue-600"
          minImages={1}
          maxImages={10}
          showSlide={false}
        />
      </div>
      {/* 1. 폼 요소로 입력 필드와 버튼 구성 */}
      {/* 2. flex-col로 세로 정렬, gap-4로 간격 설정 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* 1. 제목 입력 필드 */}
        {/* 2. p-2로 패딩, border로 테두리 */}
        <input
          type="text"
          value={title || ''}
          onChange={(e) => {
            // 1. 입력값을 상태로 업데이트
            // 2. 디버깅 로그 추가
            const newValue = e.target.value || '';
            console.log('Write - Title changed:', newValue);
            setTitle(newValue);
          }}
          placeholder="Title"
          className="p-2 border rounded-md"
          required
          aria-label="Post title"
        />
        {/* 1. 설명 입력 필드 */}
        {/* 2. h-32로 높이 설정, p-2로 패딩 */}
        <textarea
          value={desc || ''}
          onChange={(e) => {
            // 1. 입력값을 상태로 업데이트
            // 2. 디버깅 로그 추가
            const newValue = e.target.value || '';
            console.log('Write - Description changed:', newValue);
            setDesc(newValue);
          }}
          placeholder="Description"
          className="h-32 p-2 border rounded-md"
          required
          aria-label="Post description"
        />
        {/* 1. 본문 에디터 */}
        {/* 2. ReactQuill로 리치 텍스트 편집 */}
        <ReactQuill
          value={content || ''}
          onChange={(value) => {
            // 1. 본문 값을 상태로 업데이트
            // 2. 디버깅 로그 추가
            console.log('Write - Content changed:', value);
            setContent(value || '');
          }}
          placeholder="Write your post content here..."
          className="h-64 mb-4"
        />
        {/* 1. PostTagManager 사용 */}
        {/* 2. 태그 관리 기능 통합 */}
        <PostTagManager
          postId={null}
          tempTags={tempTags}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
        {/* 1. 제출 버튼 */}
        {/* 2. bg-green-600으로 배경색, hover:bg-green-700으로 호버 효과 */}
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Create post"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default Write;
// ===여기부터 코드 작업종료======
