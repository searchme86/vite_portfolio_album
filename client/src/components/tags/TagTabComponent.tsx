// src/components/TagTabComponent.jsx
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 1. 특정 태그를 가진 포스트를 가져오는 함수
// 2. API 요청으로 태그별 포스트 리스트를 반환
const fetchPostsByTag = async (tag) => {
  const apiUrl = import.meta.env.VITE_API_URL; // 1. 환경 변수에서 API URL 가져오기
  // 2. 요청 URL 구성
  if (!apiUrl) {
    throw new Error('VITE_API_URL is not defined in .env'); // 1. 환경 변수 누락 시 에러
    // 2. 디버깅 용이성 확보
  }
  const res = await axios.get(`${apiUrl}/posts/by-tag?tag=${tag}`); // 1. 태그로 포스트 조회 (경로 변경) <--------여기수정
  // 2. GET 요청으로 데이터 가져오기 (/posts/by-tag 사용)
  console.log(`Posts for tag ${tag}:`, res.data); // 1. 디버깅 로그
  // 2. 반환된 데이터 확인
  return res.data; // 1. 응답 데이터 반환
  // 2. 포스트 리스트 제공
};

function TagTabComponent({ tags }) {
  const [selectedTag, setSelectedTag] = useState(tags[0] || null); // 1. 선택된 태그 상태
  // 2. 첫 번째 태그를 기본 선택
  const tabRefs = useRef([]); // 1. 탭 버튼 참조 배열
  // 2. 키보드 내비게이션을 위해 사용

  // 1. 선택된 태그에 해당하는 포스트를 가져오는 쿼리
  // 2. React Query로 데이터 페칭 관리
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['postsByTag', selectedTag], // 1. 쿼리 키 설정
    // 2. 태그별로 캐싱
    queryFn: () => fetchPostsByTag(selectedTag), // 1. 선택된 태그로 포스트 조회
    // 2. fetchPostsByTag 호출
    enabled: !!selectedTag, // 1. selectedTag가 있을 때만 쿼리 실행
    // 2. 초기 렌더링 시 불필요한 요청 방지
  });

  // 1. 탭 변경 시 포커스 관리
  // 2. 웹 접근성을 위해 포커스 이동
  useEffect(() => {
    const index = tags.indexOf(selectedTag);
    if (tabRefs.current[index]) {
      tabRefs.current[index].focus(); // 1. 선택된 탭으로 포커스 이동
      // 2. 키보드 내비게이션 지원
    }
  }, [selectedTag, tags]);

  // 1. 키보드 내비게이션 핸들러
  // 2. 화살표 키로 탭 간 이동
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); // 1. 기본 동작 방지
      // 2. 스크롤 방지
      const newIndex =
        e.key === 'ArrowRight'
          ? (index + 1) % tags.length // 1. 오른쪽으로 이동
          : // 2. 마지막 탭에서 첫 번째로 순환
            (index - 1 + tags.length) % tags.length; // 1. 왼쪽으로 이동
      // 2. 첫 번째 탭에서 마지막으로 순환
      setSelectedTag(tags[newIndex]); // 1. 새로운 태그 선택
      // 2. 탭 변경
    }
  };

  if (!tags || tags.length === 0) {
    return <div className="text-gray-500">No tags available</div>; // 1. 태그가 없으면 메시지 표시
    // 2. 사용자 피드백 제공
  }

  return (
    <div className="mt-6">
      {/* 탭 메뉴 */}
      <div
        role="tablist"
        className="flex gap-2 border-b border-gray-200"
        aria-label="Tag Tabs"
      >
        {tags.map((tag, index) => (
          <button
            key={tag}
            ref={(el) => (tabRefs.current[index] = el)} // 1. 탭 버튼 참조 저장
            // 2. 포커스 관리
            role="tab"
            id={`tab-${tag}`}
            aria-selected={selectedTag === tag}
            aria-controls={`panel-${tag}`}
            tabIndex={selectedTag === tag ? 0 : -1} // 1. 선택된 탭만 포커스 가능
            // 2. 웹 접근성 지원
            onClick={() => setSelectedTag(tag)} // 1. 탭 클릭 시 태그 선택
            // 2. 선택된 태그 변경
            onKeyDown={(e) => handleKeyDown(e, index)} // 1. 키보드 내비게이션
            // 2. 화살표 키로 탭 이동
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              selectedTag === tag
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
          >
            #{tag} {/* 1. 태그 이름 표시 */}
            {/* 2. # 접두사로 태그 스타일 */}
          </button>
        ))}
      </div>

      {/* 탭 패널 */}
      {tags.map((tag) => (
        <div
          key={tag}
          role="tabpanel"
          id={`panel-${tag}`}
          aria-labelledby={`tab-${tag}`}
          hidden={selectedTag !== tag} // 1. 선택되지 않은 패널 숨김
          // 2. DOM에서 제외하지 않고 CSS로 숨김
          className={`mt-4 ${selectedTag !== tag ? 'hidden' : ''}`}
        >
          {selectedTag === tag && (
            <>
              {isLoading && <div>Loading posts...</div>}{' '}
              {/* 1. 로딩 상태 표시 */}
              {/* 2. 사용자 피드백 */}
              {error && (
                <div className="text-red-500">
                  Failed to load posts: {error.message}
                </div>
              )}{' '}
              {/* 1. 에러 상태 표시 */}
              {/* 2. 사용자 피드백 */}
              {posts && posts.posts && posts.posts.length > 0 ? ( // 1. posts.posts로 접근하도록 수정 <--------여기수정
                <ul className="space-y-4">
                  {posts.posts.map(
                    (
                      post // 1. posts.posts로 접근하도록 수정 <--------여기수정
                    ) => (
                      <li
                        key={post._id}
                        className="p-4 bg-gray-100 rounded-lg shadow-sm"
                      >
                        <Link
                          to={`/posts/${post.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          <h3 className="text-lg font-semibold">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600">{post.desc}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          Written by {post.user.username} on{' '}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <div className="text-gray-500">No posts found for #{tag}.</div>
              )}{' '}
              {/* 1. 포스트 리스트 렌더링 */}
              {/* 2. 포스트가 없으면 메시지 표시 */}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TagTabComponent;
