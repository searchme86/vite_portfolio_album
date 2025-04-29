/**
 * 폼 데이터 타입 정의
 * 역할: React Hook Form에서 사용할 폼 데이터의 타입을 정의
 * 왜 사용: TypeScript로 타입 안전성 보장
 */
export interface PostWriteFormData {
  postTitle: string; // 포스트 제목
  postDesc: string; // 포스트 설명
  postContent: string; // 포스트 본문
  tags: string[]; // 태그 목록
}

/**
 * 초기값 정의
 * 역할: 폼의 초기값 설정
 * 왜 사용: React Hook Form의 defaultValues로 사용
 * 폴백: 모든 필드를 빈 값으로 초기화하여 undefined 방지
 */
export const postWriteFormDefaultValues: PostWriteFormData = {
  postTitle: '',
  postDesc: '',
  postContent: '',
  tags: [],
};
