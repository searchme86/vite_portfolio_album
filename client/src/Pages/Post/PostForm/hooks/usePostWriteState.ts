/**
 * @file usePostWriteState.ts
 * @description 폼 데이터 타입 및 초기값 정의
 * @location src/Pages/Post/PostForm/hooks/usePostWriteState.ts
 */

/**
 * 폼 데이터 타입 정의
 * 역할: React Hook Form에서 사용할 폼 데이터의 타입을 정의
 * 왜 사용: TypeScript로 타입 안전성 보장
 */
export interface PostWriteFormData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 태그 목록
  imageUrls: string[]; // @type {string[]} - 이미지 URL 목록 (추가)
  // @description 이미지 URL을 폼 데이터에 포함
  // @reason form 상태로 관리하여 watch()로 감지 가능
}

/**
 * 초기값 정의
 * 역할: 폼의 초기값 설정
 * 왜 사용: React Hook Form의 defaultValues로 사용
 * 폴백: 모든 필드를 빈 값으로 초기화하여 undefined 방지
 */
export const postWriteFormDefaultValues: PostWriteFormData = {
  postTitle: '', // @type {string} - 초기 제목
  postDesc: '', // @type {string} - 초기 설명
  postContent: '', // @type {string} - 초기 본문
  tags: [], // @type {string[]} - 초기 태그
  imageUrls: [], // @type {string[]} - 초기 이미지 URL (추가)
  // @description imageUrls 초기값 설정
  // @reason 폼 초기화 시 빈 배열로 시작
};
