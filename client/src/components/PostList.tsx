// import { useEffect, useMemo } from 'react'; // @type {Object} - React 훅
// // @description React 훅 가져오기
// // @reason 메모이제이션과 사이드 이펙트 처리
// // @analogy 도서관에서 책 관리 도구 가져오기

// import { Swiper, SwiperSlide } from 'swiper/react'; // @type {Object} - Swiper 컴포넌트
// // @description Swiper 컴포넌트 가져오기
// // @reason 포스트를 슬라이드 형태로 표시
// // @analogy 도서관에서 책을 슬라이드로展示하는 선반 가져오기

// import 'swiper/css'; // @description Swiper 기본 스타일 가져오기
// // @reason 슬라이드 레이아웃과 스타일 적용
// // @analogy 도서관에서 선반 디자인 스타일 가져오기

// import 'swiper/css/pagination'; // @description Swiper 페이지네이션 스타일 가져오기
// // @reason 슬라이드 페이지네이션 UI 적용
// // @analogy 도서관에서 선반 페이지 표시 스타일 가져오기

// import { Pagination } from 'swiper/modules'; // @type {Object} - Swiper 페이지네이션 모듈
// // @description Swiper 페이지네이션 모듈 가져오기
// // @reason 슬라이드 간 이동을 위한 페이지네이션 기능 추가
// // @analogy 도서관에서 선반 페이지 이동 기능 추가

// import { useUser, useAuth } from '@clerk/clerk-react'; // @type {Object} - Clerk 훅
// // @description Clerk 훅 가져오기
// // @reason 사용자 정보와 인증 토큰 관리
// // @analogy 도서관에서 사서 정보와 인증 관리 도구 가져오기

// import PostListItem from './PostListItem'; // @type {Function} - 포스트 아이템 컴포넌트
// // @description 포스트 아이템 컴포넌트 가져오기
// // @reason 개별 포스트 렌더링
// // @analogy 도서관에서 책 카드 컴포넌트 가져오기

// import { axiosGetPosts } from '../api/like/axios/axiosGetPosts'; // @type {Function} - 포스트 데이터 페칭 함수
// // @description 포스트 데이터 페칭 함수 가져오기
// // @reason 백엔드에서 포스트 데이터를 가져오기
// // @analogy 도서관에서 책 목록 요청 함수 가져오기

// import { usePostStore } from '../stores/post/postStore'; // @type {Object} - Zustand 스토어
// // @description Zustand 스토어 가져오기
// // @reason 상태 관리와 상태 업데이트
// // @analogy 도서관에서 장부 관리 시스템 가져오기

// // <!---여기추가
// import { useLikeStore } from '../stores/like/likeStore'; // @type {Object} - 좋아요 Zustand 스토어
// // @description 좋아요 Zustand 스토어 가져오기
// // @reason 좋아요 상태 관리와 초기화
// // @analogy 도서관에서 대여 장부 관리 시스템 가져오기

// /**
//  * @file PostList.jsx
//  * @description 포스트 리스트 컴포넌트
//  * @reason 포스트 데이터를 가져와 슬라이드 형태로 렌더링
//  * @analogy 도서관에서 책 목록을 슬라이드 선반에 표시
//  */
// function PostList() {
//   const { isLoaded, isSignedIn, user } = useUser(); // @type {{ isLoaded: boolean, isSignedIn: boolean, user: Object }} - Clerk 사용자 상태
//   // @description Clerk 사용자 상태 가져오기
//   // @reason 인증 상태에 따라 데이터 페칭 제어
//   // @analogy 도서관에서 사서가 로그인했는지 확인

//   const { getToken } = useAuth(); // @type {{ getToken: Function }} - Clerk의 useAuth 훅
//   // @description Clerk의 useAuth 훅에서 getToken 메서드 가져오기
//   // @reason 세션 토큰을 가져오기 위해 사용
//   // @analogy 도서관에서 인증 관리자를 통해 인증 키 가져오기

//   // Zustand 스토어에서 필요한 상태와 함수 가져오기
//   const token = usePostStore((state) => state.getToken()); // @type {string | null} - 사용자 토큰
//   // @description 사용자 토큰 가져오기
//   // @reason API 요청 시 인증 헤더에 사용
//   // @analogy 도서관에서 인증 키 확인
//   const postsData = usePostStore((state) => state.getPostsData()); // @type {{ pages: Array<Array>, pageParams: Array<number> }} - 포스트 데이터
//   // @description 포스트 데이터 가져오기
//   // @reason 포스트 목록 렌더링
//   // @analogy 도서관에서 책 목록 확인
//   const setToken = usePostStore((state) => state.setToken); // @type {Function} - 토큰 설정 함수
//   // @description 토큰 설정 함수 가져오기
//   // @reason 사용자 토큰 저장
//   // @analogy 도서관에서 인증 키 저장
//   const addPostsData = usePostStore((state) => state.addPostsData); // @type {Function} - 포스트 데이터 추가 함수
//   // @description 포스트 데이터 추가 함수 가져오기
//   // @reason 새 데이터를 기존 데이터에 추가
//   // @analogy 도서관에서 책 목록 추가

//   // <!---여기추가
//   const setInitialLikes = useLikeStore((state) => state.setInitialLikes); // @type {Function} - 초기 좋아요 상태 설정 함수
//   // @description 초기 좋아요 상태와 수 설정 함수 가져오기
//   // @reason 백엔드 데이터로 초기화
//   // @analogy 도서관에서 책 목록에 따라 대여 상태 초기화

//   console.log('PostList - Clerk State:', { isLoaded, isSignedIn }); // @description Clerk 상태 로깅
//   // @reason 디버깅
//   // @analogy 도서관에서 사서 상태 기록

//   useEffect(() => {
//     // @description 사용자 토큰 가져오기
//     // @reason API 요청 시 인증에 필요
//     // @analogy 도서관에서 사서 인증 키 발급
//     const fetchToken = async () => {
//       if (isLoaded && user) {
//         const fetchedToken = await getToken(); // @type {string} - 세션 토큰
//         // @description getToken으로 세션 토큰 가져오기
//         // @reason Clerk SDK의 최신 방식으로 세션 토큰 가져오기
//         // @analogy 도서관에서 인증 관리자를 통해 인증 키 가져오기
//         setToken(fetchedToken);
//         console.log('PostList - Fetching posts with token:', fetchedToken);
//       }
//     };

//     fetchToken();
//   }, [isLoaded, user, getToken, setToken]); // @type {Array} - 의존성 배열
//   // @description 의존성 배열
//   // @reason isLoaded, user, getToken 변경 시 토큰 갱신
//   // @analogy 도서관에서 사서 상태 변경 시 인증 키 갱신

//   useEffect(() => {
//     // @description 포스트 데이터 페칭
//     // @reason 백엔드에서 포스트 데이터 가져오기
//     // @analogy 도서관에서 책 목록 가져오기
//     const fetchPosts = async () => {
//       if (token) {
//         try {
//           const response = await axiosGetPosts({ page: 1, limit: 10, token }); // @type {Object} - 포스트 데이터 응답
//           // @description 포스트 데이터 요청
//           // @reason 백엔드 API 호출
//           // @analogy 도서관 창고에서 책 목록 요청
//           console.log('PostList - response:', response);
//           // <!---여기추가
//           console.log('PostList - Fetched response:', response); // @description 페칭된 응답 데이터 로깅
//           // @reason 디버깅, 데이터 확인
//           // @analogy 도서관에서 책 목록 응답 확인 기록
//           addPostsData({ pages: [response], pageParams: [1] }); // @description 페칭한 데이터 저장
//           // @reason 상태 업데이트
//           // @analogy 도서관에서 책 목록 저장

//           // <!---여기수정
//           setInitialLikes(response.posts); // @description 초기 좋아요 상태와 수 설정
//           // @reason 백엔드 데이터로 초기화, useLikeStore로 이동
//           // @analogy 도서관에서 책 목록에 따라 대여 상태 초기화
//         } catch (error) {
//           console.error('PostList - Error fetching posts:', error); // @description 에러 로깅
//           // @reason 디버깅
//           // @analogy 도서관에서 책 목록 가져오기 실패 기록
//         }
//       }
//     };

//     fetchPosts();
//   }, [token, addPostsData, setInitialLikes]); // @type {Array} - 의존성 배열
//   // @description 의존성 배열
//   // @reason token 변경 시 포스트 데이터 갱신
//   // @analogy 도서관에서 인증 키 변경 시 책 목록 갱신

//   const flattenedPosts = useMemo(() => {
//     // @type {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} - 병합된 포스트 배열
//     // @description 페이지별 포스트를 단일 배열로 병합
//     // @reason 렌더링 시 단일 포스트 배열 필요
//     // @analogy 도서관에서 여러 페이지의 책 목록을 하나로 합치기
//     return postsData?.pages?.flatMap((page) => page.posts) || [];
//   }, [postsData]); // @type {Array} - 의존성 배열
//   // @description 의존성 배열
//   // @reason postsData 변경 시 재계산
//   // @analogy 도서관에서 책 목록 변경 시 합본 갱신

//   if (!isLoaded || !postsData) {
//     return <div>로딩 중...</div>; // @description 로딩 상태 표시
//     // @reason 데이터 로드 전 UI 표시
//     // @analogy 도서관에서 책 목록 준비 중임을 알림
//   }

//   return (
//     <div>
//       <h1>포스트 목록</h1> {/* @description 페이지 제목 표시 */}
//       {/* @reason 사용자에게 섹션 알림 */}
//       {/* @analogy 도서관에서 책 목록 섹션 이름 표시 */}
//       {flattenedPosts.length === 0 ? (
//         <div>포스트가 없습니다.</div> // @description 포스트 없음 표시
//       ) : (
//         // @reason 데이터 없음을 사용자에게 알림
//         // @analogy 도서관에서 책이 없음을 손님에게 알림
//         <Swiper
//           modules={[Pagination]} // @description Swiper 페이지네이션 모듈 설정
//           // @reason 슬라이드 간 이동 기능 활성화
//           // @analogy 도서관에서 선반 페이지 이동 기능 설정
//           spaceBetween={30} // @type {number} - 슬라이드 간 간격
//           // @description 슬라이드 간 간격 설정
//           // @reason 시각적 여백 확보
//           // @analogy 도서관에서 책 카드 간 간격 조정
//           slidesPerView={3} // @type {number} - 한 번에 표시할 슬라이드 수
//           // @description 한 번에 표시할 슬라이드 수
//           // @reason 한 화면에 3개 포스트 표시
//           // @analogy 도서관에서 한 선반에 3개 책 표시
//           pagination={{ clickable: true }} // @type {Object} - 페이지네이션 설정
//           // @description 페이지네이션 설정
//           // @reason 클릭 가능한 페이지네이션 활성화
//           // @analogy 도서관에서 페이지 이동 버튼 활성화
//         >
//           {flattenedPosts.map((post) => (
//             <SwiperSlide key={post._doc?._id || post._id}>
//               <PostListItem post={post} isLoaded={isLoaded} />{' '}
//               {/* @description PostListItem에 필요한 props만 전달 */}
//               {/* @reason Zustand를 사용하므로 likeStatuses, likeCounts, handleLikeToggle 전달 제거 */}
//               {/* @analogy 도서관에서 책 카드에 불필요한 정보 전달 제거 */}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </div>
//   );
// }

// export default PostList; // @description PostList 컴포넌트 내보내기
// // @reason 다른 파일에서 사용 가능하도록
// // @analogy 도서관에서 책 목록 컴포넌트 공유
