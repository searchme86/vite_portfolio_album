// src/services/post.getPosts.service.js

// Post 모델을 가져옴
// 1. MongoDB에서 포스트 데이터를 조회하기 위해 Post 모델 필요
// 2. 데이터베이스와의 상호작용을 위해 사용
// import Post from '../../models/post.model.js';
import Post from '../../models/post.model.js';

// User 모델을 가져옴
// 1. 작성자 정보를 조회하기 위해 User 모델 필요
// 2. author 쿼리 파라미터를 처리하기 위해 사용
import User from '../../models/user.model.js';

// 쿼리 조건을 생성하는 함수
// 1. 클라이언트 요청에 따라 MongoDB 쿼리 조건 생성
// 2. 다양한 필터링 조건을 동적으로 처리
const buildQueryConditions = (queryParams) => {
  const { cat, author, searchQuery, featured } = queryParams;
  const query = {};
  console.log('buildQueryConditions - Input query params:', queryParams);
  // 1. 디버깅 로그: 입력된 쿼리 파라미터 확인
  // 2. 쿼리 파라미터가 올바르게 전달되었는지 확인

  // 카테고리 필터링
  // 1. cat 쿼리 파라미터가 있으면 쿼리에 추가
  // 2. 특정 카테고리의 포스트만 조회
  if (cat) {
    query.category = cat;
  }

  // 검색어 필터링
  // 1. searchQuery가 있으면 제목에서 검색
  // 2. 대소문자 구분 없이 검색 가능하도록 설정
  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: 'i' };
  }

  // 작성자 필터링 (비동기 처리)
  // 1. author 쿼리 파라미터가 있으면 해당 작성자의 포스트만 조회
  // 2. User 모델에서 작성자 ID를 조회하여 사용
  const addAuthorToQuery = async () => {
    if (author) {
      const user = await User.findOne({ username: author }).select('_id');
      console.log('buildQueryConditions - Fetched user for author:', user);
      // 1. 디버깅 로그: 작성자 조회 결과 확인
      // 2. 작성자가 존재하는지 확인
      if (!user) {
        throw new Error('No post found for this author!');
      }
      query.user = user._id;
    }
  };

  // 추천 포스트 필터링
  // 1. featured 쿼리 파라미터가 있으면 추천 포스트만 조회
  // 2. isFeatured 필드를 true로 설정
  if (featured) {
    query.isFeatured = true;
  }

  return { query, addAuthorToQuery };
};

// 정렬 조건을 생성하는 함수
// 1. 클라이언트 요청에 따라 정렬 조건 생성
// 2. 다양한 정렬 기준을 동적으로 처리
const buildSortConditions = (sortQuery) => {
  let sortObj = { createdAt: -1 }; // 기본값: 최신순
  console.log('buildSortConditions - Input sort query:', sortQuery);
  // 1. 디버깅 로그: 입력된 정렬 쿼리 확인
  // 2. 정렬 쿼리가 올바르게 전달되었는지 확인

  // 정렬 조건 설정
  // 1. sortQuery에 따라 정렬 기준 변경
  // 2. 다양한 정렬 옵션 지원
  if (sortQuery) {
    switch (sortQuery) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'popular':
        sortObj = { visit: -1 };
        break;
      case 'trending':
        sortObj = { visit: -1 };
        // 최근 7일 이내의 포스트만 조회
        return {
          sortObj,
          dateFilter: {
            createdAt: {
              $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            },
          },
        };
      default:
        break;
    }
  }

  return { sortObj, dateFilter: null };
};

// 포스트를 조회하는 메인 서비스 함수
// 1. 쿼리 조건과 정렬 조건을 기반으로 포스트 조회
// 2. 비즈니스 로직을 처리하고 결과를 반환
export const fetchPostsWithQuery = async (queryParams, page, limit) => {
  const { cat, author, searchQuery, sortQuery, featured } = queryParams;

  // 쿼리 조건 생성
  // 1. 클라이언트 요청에 따라 쿼리 조건 생성
  // 2. 필터링 조건을 동적으로 처리
  const { query, addAuthorToQuery } = buildQueryConditions({
    cat,
    author,
    searchQuery,
    featured,
  });

  // 작성자 쿼리 추가 (비동기 처리)
  // 1. author 쿼리 파라미터가 있으면 쿼리에 추가
  // 2. 비동기적으로 작성자 ID를 조회하여 쿼리 업데이트
  await addAuthorToQuery();

  // 정렬 조건 생성
  // 1. 클라이언트 요청에 따라 정렬 조건 생성
  // 2. 정렬 기준을 동적으로 처리
  const { sortObj, dateFilter } = buildSortConditions(sortQuery);
  if (dateFilter) {
    Object.assign(query, dateFilter);
  }
  console.log('fetchPostsWithQuery - Query conditions:', query);
  // 1. 디버깅 로그: MongoDB 쿼리 조건 확인
  // 2. 쿼리 조건이 올바르게 생성되었는지 확인
  console.log('fetchPostsWithQuery - Sort conditions:', sortObj);
  // 1. 디버깅 로그: 정렬 조건 확인
  // 2. 정렬 조건이 올바르게 생성되었는지 확인

  // 포스트 조회
  // 1. MongoDB에서 조건에 맞는 포스트 조회
  // 2. 페이지네이션과 정렬 적용
  const posts = await Post.find(query)
    .populate('user', 'username clerkUserId')
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);
  console.log('fetchPostsWithQuery - Fetched posts from DB:', posts);
  // 1. 디버깅 로그: 조회된 포스트 확인
  // 2. 데이터베이스에서 반환된 데이터 확인

  // 총 포스트 수 계산
  // 1. 조건에 맞는 총 포스트 수 조회
  // 2. 페이지네이션 정보를 제공하기 위해 사용
  const totalPosts = await Post.countDocuments(query);
  console.log('fetchPostsWithQuery - Total posts (filtered):', totalPosts);
  // 1. 디버깅 로그: 총 포스트 수 확인
  // 2. 필터링된 포스트 수 확인

  return { posts, totalPosts };
};
