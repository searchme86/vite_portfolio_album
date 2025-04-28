import { Swiper, SwiperSlide } from 'swiper/react'; // @type {Object} - Swiper 컴포넌트
// @description Swiper 컴포넌트 가져오기
// @reason 포스트를 슬라이드 형태로 표시
// @analogy 도서관에서 책을 슬라이드로展示하는 선반 가져오기

import 'swiper/css'; // @description Swiper 기본 스타일 가져오기
// @reason 슬라이드 레이아웃과 스타일 적용
// @analogy 도서관에서 선반 디자인 스타일 가져오기

import 'swiper/css/pagination'; // @description Swiper 페이지네이션 스타일 가져오기
// @reason 슬라이드 페이지네이션 UI 적용
// @analogy 도서관에서 선반 페이지 표시 스타일 가져오기

import { Pagination } from 'swiper/modules'; // @type {Object} - Swiper 페이지네이션 모듈
// @description Swiper 페이지네이션 모듈 가져오기
// @reason 슬라이드 간 이동을 위한 페이지네이션 기능 추가
// @analogy 도서관에서 선반 페이지 이동 기능 추가

import PostListItem from '../../PostListItem/PostListItem'; // @type {Function} - 포스트 아이템 컴포넌트
// @description 포스트 아이템 컴포넌트 가져오기
// @reason 개별 포스트 렌더링
// @analogy 도서관에서 책 카드 컴포넌트 가져오기

/**
 * @file PostListSwiper.jsx
 * @description PostList의 슬라이더 컴포넌트
 * @reason 포스트 목록을 슬라이드 형태로 렌더링
 * @analogy 도서관에서 책 목록을 슬라이드 선반에 표시
 * @param {Object} props - 컴포넌트 props
 * @param {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} props.flattenedPosts - 병합된 포스트 배열
 * @param {boolean} props.isLoaded - Clerk 로딩 상태
 * @returns {JSX.Element | null} - 슬라이더 컴포넌트
 */
function PostListSwiper({ flattenedPosts, isLoaded }) {
  console.log('Posts in PostListSwiper:', flattenedPosts);
  if (flattenedPosts.length === 0) {
    return null; // @description 포스트가 없으면 null 반환
    // @reason 불필요한 렌더링 방지
    // @analogy 도서관에서 책이 없으면 선반 표시 안 함
  }

  return (
    <Swiper
      modules={[Pagination]} // @description Swiper 페이지네이션 모듈 설정
      // @reason 슬라이드 간 이동 기능 활성화
      // @analogy 도서관에서 선반 페이지 이동 기능 설정
      spaceBetween={30} // @type {number} - 슬라이드 간 간격
      // @description 슬라이드 간 간격 설정
      // @reason 시각적 여백 확보
      // @analogy 도서관에서 책 카드 간 간격 조정
      slidesPerView={3} // @type {number} - 한 번에 표시할 슬라이드 수
      // @description 한 번에 표시할 슬라이드 수
      // @reason 한 화면에 3개 포스트 표시
      // @analogy 도서관에서 한 선반에 3개 책 표시
      pagination={{ clickable: true }} // @type {Object} - 페이지네이션 설정
      // @description 페이지네이션 설정
      // @reason 클릭 가능한 페이지네이션 활성화
      // @analogy 도서관에서 페이지 이동 버튼 활성화
    >
      {flattenedPosts.map((post) => (
        <SwiperSlide key={post._doc?._id || post._id}>
          <PostListItem post={post} isLoaded={isLoaded} />{' '}
          {/* @description PostListItem에 필요한 props만 전달 */}
          {/* @reason Zustand를 사용하므로 likeStatuses, likeCounts, handleLikeToggle 전달 제거 */}
          {/* @analogy 도서관에서 책 카드에 불필요한 정보 전달 제거 */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default PostListSwiper; // @description PostListSwiper 컴포넌트 내보내기
// @reason PostList에서 사용 가능하도록
// @analogy 도서관에서 슬라이드 선반 컴포넌트 공유
