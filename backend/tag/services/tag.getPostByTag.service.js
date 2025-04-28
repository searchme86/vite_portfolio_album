import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 데이터베이스와 상호작용하기 위해 필요
// 비유: 도서관에서 책을 찾기 위해 사서 호출
import { buildQueryCondition } from '../utils/tag.postQueryBuilder.util.js'; // 의미: 쿼리 조건 생성 함수 가져오기
// 이유: 쿼리 로직 분리
// 비유: 책 찾기 조건을 적는 노트 가져오기
import { populateUserDataForPosts } from '../utils/tag.postUserPopulator.util.js'; // 의미: 사용자 정보 추가 함수 가져오기
// 이유: populate 로직 분리
// 비유: 책에 저자 이름 붙이는 도구 가져오기
import { sortAndPaginatePosts } from '../utils/tag.postSorterAndPaginator.util.js'; // 의미: 정렬 및 페이지네이션 함수 가져오기
// 이유: 정렬/페이지네이션 로직 분리
// 비유: 책을 정리하고 나눠주는 도구 가져오기

export const fetchPostsByTagCondition = async (
  tagValue,
  pageNumber,
  limitNumber
) => {
  // 의미: 태그 조건으로 포스트를 조회하는 메인 서비스 함수
  // 이유: 데이터 조회 로직을 통합하고 컨트롤러에서 호출 가능하게 함
  // 비유: 도서관에서 특정 주제의 책을 찾는 전체 과정 관리
  let fetchedPosts = []; // 의미: 조회된 포스트를 저장할 변수 초기화
  // 이유: try 밖에서 선언해 catch에서도 접근 가능
  // 비유: 빈 상자를 준비해서 책을 담을 준비
  let totalPostsCount = 0; // 의미: 총 포스트 수를 저장할 변수 초기화
  // 이유: 페이지네이션 정보를 계산하기 위해 필요
  // 비유: 책이 몇 권인지 세기 위한 빈 노트

  try {
    const queryCondition = buildQueryCondition(tagValue); // 의미: 태그 기반 쿼리 조건 생성
    // 이유: 쿼리 로직을 별도 함수로 분리해 재사용성 높임
    // 비유: "이 주제의 책만 찾아줘"라는 조건을 노트에 적음
    if (!queryCondition) {
      // 의미: 쿼리 조건이 유효한지 확인
      // 이유: 잘못된 조건 방어
      // 비유: 노트에 아무것도 안 적혔는지 확인
      throw new Error('Invalid query condition');
    }

    fetchedPosts = await Post.find(queryCondition); // 의미: 태그로 포스트 조회
    // 이유: DB에서 필요한 데이터만 가져오기
    // 비유: 사서가 주제에 맞는 책을 찾아줌
    if (!Array.isArray(fetchedPosts)) {
      // 의미: 반환값이 배열인지 확인
      // 이유: 예상치 못한 데이터 형식 방어
      // 비유: 받은 게 책 목록인지, 엉뚱한 종이인지 확인
      throw new Error('Fetched posts is not an array');
    }

    totalPostsCount = await Post.countDocuments(queryCondition); // 의미: 총 포스트 수 계산
    // 이유: 페이지네이션 정보를 제공하기 위해 필요
    // 비유: 주제에 맞는 책이 몇 권인지 세기

    const postsWithUserData = await populateUserDataForPosts(fetchedPosts); // 의미: 사용자 정보 추가
    // 이유: populate 로직을 별도 함수로 분리해 단일 책임 준수
    // 비유: 책에 저자 이름 스티커를 붙이는 작업 부탁
    if (!Array.isArray(postsWithUserData)) {
      // 의미: 결과가 배열인지 확인
      // 이유: populate 실패 시 방어
      // 비유: 스티커 붙인 책 목록이 제대로 왔는지 확인
      throw new Error('Populated posts is not an array');
    }

    const sortedAndPaginatedResult = sortAndPaginatePosts(
      postsWithUserData,
      pageNumber,
      limitNumber,
      totalPostsCount
    ); // 의미: 정렬 및 페이지네이션 적용
    // 이유: 정렬/페이지네이션 로직 분리
    // 비유: 책을 최신순으로 정리하고 몇 권만 나눠줌
    if (
      !sortedAndPaginatedResult ||
      !Array.isArray(sortedAndPaginatedResult.posts)
    ) {
      // 의미: 결과 유효성 확인
      // 이유: 예상치 못한 결과 방어
      // 비유: 정리된 책 목록이 제대로 왔는지 확인
      throw new Error('Sorted and paginated result is invalid');
    }

    return {
      // 의미: 최종 결과 객체 반환
      posts: sortedAndPaginatedResult.posts, // 페이지네이션된 포스트
      hasMore: sortedAndPaginatedResult.hasMore, // 더 많은 포스트 여부
      total: totalPostsCount, // 총 포스트 수
    }; // 이유: 컨트롤러에서 사용할 데이터 제공
    // 비유: 정리된 책과 정보를 손님에게 줄 준비
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`); // 의미: 에러 발생 시 상위로 전달
    // 이유: 컨트롤러에서 에러 처리 위임
    // 비유: 책을 못 찾으면 "문제 있다"고 상사에게 말하기
  }
};
