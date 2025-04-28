export const sortAndPaginatePosts = (
  postsToSort,
  pageNumber,
  limitNumber,
  totalPostsCount
) => {
  // 의미: 포스트를 정렬하고 페이지네이션하는 유틸리티 함수
  // 이유: 정렬/페이지네이션 로직을 분리해 단일 책임 준수
  // 비유: 책을 정리하고 몇 권만 나눠주는 작업
  if (!Array.isArray(postsToSort)) {
    // 의미: 입력값이 배열인지 확인
    // 이유: 예상치 못한 입력 방어
    // 비유: 책 목록이 아닌 엉뚱한 걸 받았는지 확인
    return { posts: [], hasMore: false };
  }

  const sortedPosts = [...postsToSort]; // 의미: 포스트를 복사해 정렬 준비
  // 이유: 원본 수정 방지 및 TypeScript 대비 불변성 유지
  // 비유: 책을 복사해서 원본은 그대로 두고 정리
  sortedPosts.sort((a, b) => {
    // 의미: 최신순 정렬
    // 이유: 최신 포스트를 먼저 보여주기 위해
    // 비유: 새 책부터 앞으로 놓기
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0); // 의미: 생성 날짜 확인, 없으면 기본값
    // 이유: undefined 방어
    // 비유: 날짜 없는 책은 맨 뒤로
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0); // 의미: 생성 날짜 확인, 없으면 기본값
    // 이유: undefined 방어
    // 비유: 날짜 없는 책은 맨 뒤로
    return dateB - dateA; // 의미: 최신순으로 정렬 (내림차순)
    // 이유: 최신 날짜가 앞에 오도록
    // 비유: 새 책이 위로 오게 정리
  });

  const paginatedPosts = []; // 의미: 페이지네이션 적용된 포스트 배열 초기화
  // 이유: 필요한 만큼만 추출하기 위해
  // 비유: 한 번에 빌릴 책만 골라내기
  const startIndex = (pageNumber - 1) * limitNumber; // 의미: 시작 인덱스 계산
  // 이유: 페이지에 맞는 포스트를 건너뛰기 위해
  // 비유: 책 더미에서 몇 번째부터 볼지 정하기
  const endIndex = startIndex + limitNumber; // 의미: 끝 인덱스 계산
  // 이유: 페이지당 포스트 수 제한
  // 비유: 몇 권까지 볼지 정하기
  for (let i = startIndex; i < endIndex && i < sortedPosts.length; i++) {
    // 의미: 범위 내 포스트 추출
    // 이유: 인덱스 초과 방지 및 필요한 데이터만 선택
    // 비유: 정한 범위 내에서만 책 꺼내기
    paginatedPosts.push(sortedPosts[i]); // 의미: 페이지네이션된 포스트 추가
    // 이유: 클라이언트에 반환할 데이터 준비
    // 비유: 빌릴 책을 상자에 담기
  }

  const hasMorePosts = pageNumber * limitNumber < totalPostsCount; // 의미: 더 많은 포스트가 있는지 확인
  // 이유: 클라이언트에 페이지네이션 상태 전달
  // 비유: 책이 더 남았는지 확인해서 "다음 페이지 있음" 표시

  return { posts: paginatedPosts, hasMore: hasMorePosts }; // 의미: 정렬 및 페이지네이션 결과 반환
  // 이유: 상위 함수에서 사용
  // 비유: 정리된 책과 다음 페이지 여부 넘겨줌
};
