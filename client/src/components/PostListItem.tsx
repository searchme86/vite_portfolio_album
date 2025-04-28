// import { memo } from 'react'; // @type {Function} - React.memo
// // @description React.memo 가져오기
// // @reason 불필요한 리렌더링 방지
// // @analogy 도서관에서 동일한 책 카드를 매번 새로 만들지 않도록

// import LikeButton from '../components/Like/LikeButton/LikeButton'; // @type {Function} - 좋아요 버튼 컴포넌트
// // @description 좋아요 버튼 컴포넌트 가져오기
// // @reason 포스트에 좋아요 기능 추가
// // @analogy 도서관에서 책에 좋아요 버튼 추가

// import LikeCount from '../components/Like/LikeCount/LikeCount'; // @type {Function} - 좋아요 수 표시 컴포넌트
// // @description 좋아요 수 표시 컴포넌트 가져오기
// // @reason 포스트의 좋아요 수 표시
// // @analogy 도서관에서 책의 좋아요 수 표시

// import { useInvalidateCache } from '../api/like/utils/useInvalidateCache'; // @type {Function} - 캐시 무효화 훅
// // @description 캐시 무효화 훅 가져오기
// // @reason 좋아요 토글 후 캐시 갱신
// // @analogy 도서관 창고에서 게시판 갱신 도구 가져오기

// /**
//  * @file PostListItem.jsx
//  * @description 포스트 아이템 컴포넌트
//  * @reason 개별 포스트 정보를 렌더링하고 좋아요 기능 포함
//  * @analogy 도서관에서 책 정보를 표시하는 카드
//  * @param {Object} props - 컴포넌트 props
//  * @param {Object} props.post - 포스트 데이터
//  * @param {boolean} props.isLoaded - 로딩 상태
//  */
// function PostListItem({ post, isLoaded }) {
//   console.log('PostListItem - Component mounted, post:', post); // @description 포스트 데이터 로깅
//   // @reason 디버깅, 데이터 구조 확인
//   // @analogy 도서관에서 책 정보 확인 기록

//   const postId = post?._doc?._id || post?._id || 'unknown-post-id'; // @type {string} - 포스트 ID
//   // @description 포스트 ID를 Mongoose Document 구조를 고려하여 추출
//   // @reason post._id가 아닌 post._doc._id에 실제 ID가 있을 수 있음, Mongoose Document의 특성 반영
//   // @analogy 도서관에서 책 번호가 책 표지가 아닌 책 안쪽 페이지에 있을 때 안쪽 페이지를 확인

//   console.log('PostListItem - Extracted postId:', postId); // @description 추출된 postId 로깅
//   // @reason 디버깅
//   // @analogy 도서관에서 책 번호 확인 기록

//   const invalidate = useInvalidateCache(postId); // @type {Function} - 캐시 무효화 함수
//   // @description 캐시 무효화 함수 호출
//   // @reason 컴포넌트 최상단에서 호출하여 React 훅 규칙 준수
//   // @analogy 도서관 문을 열자마자 게시판 갱신 도구 준비

//   // <!---여기추가
//   console.log(
//     'PostListItem - postId:',
//     postId,
//     'invalidate function:',
//     invalidate
//   ); // @description postId와 invalidate 함수 로깅
//   // @reason 디버깅, 값 전달 확인
//   // @analogy 도서관에서 책 번호와 갱신 도구 확인 기록

//   // @description post._doc.img를 확인하여 이미지 URL 추출
//   // @reason Mongoose 문서에서 데이터는 _doc 안에 있음, img 필드가 _doc 안에 있을 가능성 반영
//   // @analogy 도서관에서 책 표지가 책 겉면이 아니라 안쪽 페이지(_doc)에 있을 때 확인
//   console.log('PostListItem - post._doc:', post?._doc); // @description post._doc 데이터 로깅
//   // @reason 디버깅, 데이터 구조 확인
//   // @analogy 도서관에서 책 안쪽 페이지 정보 확인 기록

//   const imageUrl = post?._doc?.img?.length > 0 ? post._doc.img[0] : null; // @type {string | null} - 이미지 URL
//   // @description _doc 안의 img 필드에서 URL 추출
//   // @reason Mongoose 문서 구조에 맞게 img 접근, 없으면 null로 설정해 대체 UI 표시
//   // @analogy 도서관에서 책 안쪽 페이지에서 표지 사진 확인, 없으면 대체 표지 표시

//   console.log('PostListItem - Image URL:', imageUrl); // @description 이미지 URL 로깅
//   // @reason 디버깅
//   // @analogy 도서관에서 책 표지 URL 확인 기록

//   return (
//     <article
//       aria-labelledby={`post-title-${postId}`} // @type {string} - 접근성을 위한 포스트 제목 연결
//       // @description 접근성을 위한 포스트 제목 연결
//       // @reason 스크린 리더가 포스트 제목을 인식하도록
//       // @analogy 도서관에서 책 제목을 손님에게 명확히 알림
//       style={{
//         border: '1px solid #ddd', // @description 포스트 카드 테두리 설정
//         // @reason 시각적 구분
//         // @analogy 도서관에서 책 카드 테두리 표시
//         padding: '10px', // @description 내부 여백 설정
//         // @reason 깔끔한 레이아웃
//         // @analogy 도서관에서 책 카드 내부 여백 조정
//         margin: '10px 0', // @description 외부 여백 설정
//         // @reason 카드 간 간격 확보
//         // @analogy 도서관에서 책 카드 간 간격 조정
//       }}
//     >
//       {imageUrl ? (
//         <img
//           src={imageUrl} // @description 백엔드에서 제공된 이미지 URL로 이미지 표시
//           // @reason 포스트에 실제 이미지를 렌더링
//           // @analogy 도서관에서 책의 실제 표지 표시
//           alt={post?.title || '포스트 이미지'} // @description 접근성을 위한 대체 텍스트
//           // @reason 이미지가 로드되지 않을 경우 설명 제공
//           // @analogy 도서관에서 책 표지가 없으면 설명 제공
//           style={{
//             maxWidth: '100%', // @description 이미지 최대 너비 설정
//             // @reason 레이아웃 깨짐 방지
//             // @analogy 도서관에서 책 표지 크기 조정
//             height: 'auto', // @description 이미지 비율 유지
//             // @reason 이미지 왜곡 방지
//             // @analogy 도서관에서 책 표지 비율 유지
//             marginBottom: '10px', // @description 하단 여백 설정
//             // @reason 깔끔한 레이아웃
//             // @analogy 도서관에서 책 표지와 내용 간 간격 조정
//           }}
//           onError={(e) => {
//             console.error('PostListItem - Image load failed:', imageUrl); // @description 이미지 로드 실패 로깅
//             // @reason 디버깅
//             // @analogy 도서관에서 책 표지 로드 실패 기록
//             e.target.style.display = 'none'; // @description 이미지 로드 실패 시 숨김
//             // @reason 깨진 이미지 표시 방지
//             // @analogy 도서관에서 깨진 표지 숨김
//           }}
//         />
//       ) : (
//         <div
//           style={{
//             width: '100%', // @description 대체 UI 너비 설정
//             // @reason 레이아웃 일관성 유지
//             // @analogy 도서관에서 대체 표지 크기 설정
//             height: '150px', // @description 대체 UI 높이 설정
//             // @reason 시각적 일관성
//             // @analogy 도서관에서 대체 표지 높이 설정
//             backgroundColor: '#f0f0f0', // @description 대체 UI 배경색 설정
//             // @reason 이미지 없음을 시각적으로 표시
//             // @analogy 도서관에서 대체 표지 색상 설정
//             display: 'flex', // @description 플렉스 박스 레이아웃
//             // @reason 텍스트 중앙 정렬
//             // @analogy 도서관에서 대체 텍스트 중앙 배치
//             alignItems: 'center', // @description 세로 중앙 정렬
//             // @reason 깔끔한 정렬
//             // @analogy 도서관에서 대체 텍스트 세로 정렬
//             justifyContent: 'center', // @description 가로 중앙 정렬
//             // @reason 깔끔한 정렬
//             // @analogy 도서관에서 대체 텍스트 가로 정렬
//             marginBottom: '10px', // @description 하단 여백 설정
//             // @reason 깔끔한 레이아웃
//             // @analogy 도서관에서 대체 표지와 내용 간 간격 조정
//           }}
//         >
//           이미지가 없습니다. {/* @description 이미지 없음 메시지 표시 */}
//           {/* @reason 사용자에게 이미지 부재 알림 */}
//           {/* @analogy 도서관에서 손님에게 표지 없음 알림 */}
//         </div>
//       )}
//       <h2 id={`post-title-${postId}`}>
//         {post?._doc?.title || post?.title || '제목 없음'}{' '}
//         {/* @description 제목을 _doc에서 추출 */}
//         {/* @reason Mongoose 문서 구조에 맞게 title 접근 */}
//         {/* @analogy 도서관에서 책 제목을 안쪽 페이지에서 확인 */}
//       </h2>
//       <p>
//         {post?._doc?.content || post?.content || '내용 없음'}{' '}
//         {/* @description 내용을 _doc에서 추출 */}
//         {/* @reason Mongoose 문서 구조에 맞게 content 접근 */}
//         {/* @analogy 도서관에서 책 내용을 안쪽 페이지에서 확인 */}
//       </p>
//       <div
//         style={{
//           display: 'flex', // @description 플렉스 박스 레이아웃
//           // @reason 좋아요 버튼과 수를 가로로 정렬
//           // @analogy 도서관에서 버튼과 숫자를 나란히 배치
//           gap: '10px', // @description 요소 간 간격 설정
//           // @reason 시각적 여백 확보
//           // @analogy 도서관에서 버튼과 숫자 간 간격 조정
//           alignItems: 'center', // @description 세로 중앙 정렬
//           // @reason 깔끔한 정렬
//           // @analogy 도서관에서 버튼과 숫자 세로 정렬
//         }}
//       >
//         <LikeButton
//           postId={postId}
//           invalidate={invalidate} // @description 캐시 무효화 함수 전달
//           // @reason 좋아요 토글 후 캐시 갱신, useLikeStore에서 처리하도록 전달
//           // @analogy 도서관에서 대여 상태 변경 후 게시판 갱신
//         />
//         <LikeCount postId={postId} />
//       </div>
//     </article>
//   );
// }

// export default memo(PostListItem); // @description React.memo로 컴포넌트 래핑
// // @description 불필요한 리렌더링 방지
// // @analogy 도서관에서 책 카드를 효율적으로 관리
