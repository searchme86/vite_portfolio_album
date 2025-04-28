// src/services/post.getPostsByTag.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조회하기 위해 필요
import Post from '../../models/post.model.js';

// 태그로 포스트 조회 비즈니스 로직
// 태그를 기준으로 포스트 목록을 조회
export const getPostsByTagService = async (tag, page, limit) => {
  // 태그를 기준으로 쿼리 조건 설정
  // MongoDB에서 태그가 포함된 포스트 조회
  const query = { tags: tag };
  console.log('getPostsByTagService - Query conditions:', query);
  // 1. MongoDB 쿼리 조건 출력
  // 2. 쿼리 조건 확인

  // 포스트 조회
  // 태그에 해당하는 포스트를 페이지네이션 적용하여 조회
  const posts = await Post.find(query)
    .populate('user', 'username clerkUserId') // 1. 작성자 정보 포함
    // 2. user 필드를 populate
    .sort({ createdAt: -1 }) // 1. 최신순으로 정렬
    // 2. 기본 정렬 기준
    .limit(limit) // 1. 페이지당 포스트 수 제한
    // 2. 페이지네이션 적용
    .skip((page - 1) * limit); // 1. 페이지에 맞는 포스트 건너뛰기
  // 2. 페이지네이션 적용

  console.log('getPostsByTagService - Fetched posts from DB:', posts);
  // 1. 디버깅 로그
  // 2. 조회된 포스트 확인

  // 태그에 해당하는 총 포스트 수 계산
  // 페이지네이션 정보 제공
  const totalPosts = await Post.countDocuments(query);
  console.log('getPostsByTagService - Total posts (filtered):', totalPosts);
  // 1. 필터링된 총 포스트 수 출력
  // 2. 페이지네이션 정보 확인

  // 더 많은 포스트가 있는지 확인
  // 페이지네이션 정보 제공
  const hasMore = page * limit < totalPosts;
  console.log('getPostsByTagService - Has more:', hasMore);
  // 1. 더보기 여부 출력
  // 2. 페이지네이션 정보 확인

  // 응답 객체 생성
  // 포스트 리스트와 페이지네이션 정보 포함
  const response = { posts, hasMore };
  console.log('getPostsByTagService - Response:', response);
  // 1. 응답 객체 출력
  // 2. 응답 데이터 확인

  // 조회 성공
  // 조회 결과 반환
  return {
    success: true,
    status: 200,
    response,
  };
};
