// src/routes/SinglePostPage.jsx
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
// import PostMenuActions from '../components/PostMenuActions';
import PostMenuActions from '@/components/PostMenuActions';
// import Search from '../components/Search';
import Search from '@/components/Search';
// import Comments from '../components/Comments';
import Comments from '@/components/Comments';
// import TagTabComponent from '../components/tags/TagTabComponent'; // 1. TagTabComponent 임포트 추가 <--------여기추가
import TagTabComponent from '@/components/tags/TagTabComponent';
// 2. 태그를 탭으로 표시하기 위해 임포트
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 포스트 데이터를 가져오는 함수
const fetchPost = async (slug) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL; // 환경 변수에서 API URL 가져오기
    // 1. 환경 변수에서 API URL을 가져와 요청 URL을 구성
    // 2. 환경 변수가 없으면 에러를 발생시켜 디버깅 용이
    if (!apiUrl) {
      throw new Error('VITE_API_URL is not defined in .env');
    }
    const res = await axios.get(`${apiUrl}/posts/${slug}`); // API 요청
    // 1. 주어진 slug로 포스트 데이터를 가져옴
    // 2. axios를 사용해 GET 요청을 보냄

    console.log('4/7내가직접코드 수정 res.data', res.data); // 디버깅 로그

    return res.data; // 응답 데이터 반환
  } catch (error) {
    console.error('Error fetching post:', error.message); // 에러 로그 출력
    // 1. 에러 발생 시 콘솔에 에러 메시지 출력
    // 2. 디버깅을 위해 에러를 상세히 기록
    throw error; // 에러를 상위로 전달
  }
};

function SinglePostPage() {
  const { slug } = useParams(); // URL 파라미터에서 slug 추출
  // 1. useParams 훅으로 URL에서 slug 값을 가져옴
  // 2. slug를 사용해 특정 포스트 데이터를 요청

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug], // 쿼리 키 설정
    // 1. ['post', slug]를 키로 사용해 캐싱
    // 2. slug가 변경될 때마다 새로운 쿼리 실행
    queryFn: () => fetchPost(slug), // fetchPost 함수 호출
    // 1. fetchPost 함수를 호출해 데이터 가져옴
    // 2. useQuery로 비동기 데이터 관리
  });

  if (isPending) return <div>Loading...</div>; // 로딩 중일 때 표시
  // 1. 데이터 로딩 중일 때 사용자에게 로딩 상태 표시
  // 2. UX를 위해 로딩 메시지 제공
  if (error)
    return (
      <div>Failed to load post: {error.message || 'Something went wrong!'}</div>
    ); // 에러 발생 시 표시
  // 1. 에러 발생 시 사용자에게 에러 메시지 표시
  // 2. 에러 메시지가 없으면 기본 메시지 제공
  if (!data) return <div>Post not found!</div>; // 데이터가 없을 때 표시
  // 1. 데이터가 없으면 포스트가 없다는 메시지 표시
  // 2. 사용자에게 명확한 피드백 제공

  // data.img 디버깅 로그 추가
  console.log('Post images:', data.img); // 디버깅 로그
  // 1. data.img 값을 콘솔에 출력
  // 2. 배열인지, 올바른 URL이 포함되어 있는지 확인

  // data.tags 디버깅 로그 추가
  console.log('Post tags:', data.tags); // 1. 디버깅 로그
  // 2. 태그 배열 확인

  return (
    <div className="flex flex-col gap-8">
      {/* 포스트 상세 정보 */}
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-8 lg:w-3/5">
          <h1 className="text-xl font-semibold md:text-3xl xl:text-4xl 2xl:text-5xl">
            {data.title} {/* 포스트 제목 표시 */}
            {/* 1. data.title을 사용해 포스트 제목 렌더링 */}
            {/* 2. 반응형 폰트 크기로 다양한 화면 크기에 대응 */}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>{' '}
            {/* 작성자 표시 */}
            {/* 1. data.user.username으로 작성자 이름 표시 */}
            {/* 2. 링크로 작성자 프로필로 이동 가능 */}
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>{' '}
            {/* 카테고리 표시 */}
            {/* 1. data.category로 포스트 카테고리 표시 */}
            {/* 2. 링크로 카테고리별 포스트 목록으로 이동 가능 */}
            <span>{format(data.createdAt)}</span> {/* 작성 시간 표시 */}
            {/* 1. format 함수로 작성 시간을 상대적 시간으로 표시 */}
            {/* 2. timeago.js를 사용해 사용자 친화적인 시간 표시 */}
          </div>
          <p className="font-medium text-gray-500">{data.desc}</p>{' '}
          {/* 포스트 설명 표시 */}
          {/* 1. data.desc로 포스트 설명 렌더링 */}
          {/* 2. 간단한 설명으로 포스트 요약 제공 */}
        </div>
        {data.img && data.img.length > 0 ? (
          <div className="w-full lg:w-2/5">
            <Swiper
              modules={[Navigation, Pagination]} // Swiper 모듈 설정
              // 1. Navigation과 Pagination 모듈을 활성화
              // 2. 슬라이더에 네비게이션 버튼과 페이지네이션 추가
              navigation // 네비게이션 버튼 활성화
              pagination={{ clickable: true }} // 클릭 가능한 페이지네이션
              spaceBetween={10} // 슬라이드 간 간격
              slidesPerView={1} // 한 번에 보여줄 슬라이드 수
              className="w-full h-64" // Swiper 스타일
              // 1. Swiper의 크기를 명확히 지정
              // 2. 높이를 고정하여 이미지가 잘 보이도록 함
            >
              {data.img.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="object-cover w-full h-full rounded-2xl"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
                      e.target.src = '/fallback-image.jpg'; // 대체 이미지
                    }}
                  />
                  {/* 1. data.img 배열을 순회하며 각 이미지를 슬라이드로 표시 */}
                  {/* 2. img 태그로 ImageKit URL 렌더링 */}
                  {/* 3. onError 핸들러로 이미지 로드 실패 시 대체 이미지 표시 */}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="w-full text-gray-500 lg:w-2/5">
            No images available
            {/* 1. 이미지가 없을 경우 메시지 표시 */}
            {/* 2. 사용자에게 명확한 피드백 제공 */}
          </div>
        )}
      </div>
      {/* 포스트 콘텐츠 */}
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div className="flex flex-col gap-6 text-justify lg:text-lg">
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            // 1. data.content를 HTML로 렌더링
            // 2. ReactQuill에서 생성된 HTML 문자열을 안전하게 표시
          />
          <TagTabComponent tags={data.tags} /> {/* 1. TagTabComponent 추가 */}
          {/* 2. 태그를 탭으로 표시 */}
        </div>
        <div className="sticky px-4 h-max top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <img
                  src={data.user.img}
                  alt={`${data.user.username}'s profile`}
                  className="object-cover w-12 h-12 rounded-full"
                  onError={(e) => {
                    console.error(
                      `Failed to load user image: ${data.user.img}`
                    );
                    e.target.src = '/default-user.jpg'; // 대체 이미지
                  }}
                />
                // 1. 작성자 프로필 이미지 렌더링
                // 2. img 태그로 간단히 표시
                // 3. onError 핸들러로 이미지 로드 실패 시 대체 이미지 표시
              )}
              <Link className="text-blue-800">{data.user.username}</Link>{' '}
              {/* 작성자 이름 */}
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur
            </p>
            <div className="flex gap-2">
              <Link>
                <img src="/facebook.svg" alt="Facebook" className="w-6 h-6" />
                {/* 소셜 링크 */}
              </Link>
              <Link>
                <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
                {/* 소셜 링크 */}
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} /> {/* 포스트 메뉴 액션 */}
          {/* 1. PostMenuActions 컴포넌트로 포스트 관련 액션 제공 */}
          {/* 2. 수정, 삭제 등의 기능 포함 */}
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              Development
            </Link>
            <Link className="underline" to="/">
              Databases
            </Link>
            <Link className="underline" to="/">
              Search Engines
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search /> {/* 검색 컴포넌트 */}
        </div>
      </div>
      <Comments postId={data._id} /> {/* 댓글 컴포넌트 */}
      {/* 1. Comments 컴포넌트로 포스트 댓글 표시 */}
      {/* 2. postId를 전달해 해당 포스트의 댓글 로드 */}
    </div>
  );
}

export default SinglePostPage;
