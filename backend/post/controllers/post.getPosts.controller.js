import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 포스트 데이터 조회
// 비유: 도서관에서 책 정보 가져오기

import User from '../../models/user.model.js'; // 의미: User 모델 가져오기
// 이유: 작성자 정보 조회
// 비유: 도서관에서 저자 정보 가져오기

import { fetchPostsWithQuery } from '../services/post.getPosts.service.js'; // 의미: 포스트 조회 서비스 가져오기
// 이유: 비즈니스 로직 분리
// 비유: 도서관에서 책 조회 로직 가져오기

import { getLikeCount } from '../../like/services/like.getLikeCount.service.js'; // 의미: 좋아요 수 조회 함수 가져오기 <!---여기추가
// 이유: 각 포스트의 좋아요 수 계산
// 비유: 도서관에서 책의 대출 횟수 확인

import { CACHE_TTL } from '../utils/post.cache.constants.util.js'; // 의미: 캐시 TTL 상수 가져오기
// 이유: 캐시 유효 기간 관리
// 비유: 도서관에서 캐시 유지 시간 설정

const postCache = new Map(); // 의미: 캐시 저장용 Map 생성
// 이유: 동일 요청에 대해 DB 조회 최소화
// 비유: 도서관에서 자주 요청되는 책 목록 저장

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 의미: 페이지 번호 추출
  // 이유: 페이지네이션 처리
  // 비유: 도서관에서 요청한 책 페이지 번호 확인
  const limit = parseInt(req.query.limit) || 2; // 의미: 제한 수 추출
  // 이유: 페이지당 포스트 수 제한
  // 비유: 도서관에서 한 번에 보여줄 책 개수 설정

  const cacheKey = JSON.stringify({ ...req.query, page, limit }); // 의미: 캐시 키 생성
  // 이유: 동일 요청 캐싱
  // 비유: 도서관에서 요청 패턴 기록
  console.log('getPosts - Cache key:', cacheKey);

  const cachedResult = postCache.get(cacheKey); // 의미: 캐시에서 결과 조회
  // 이유: 캐시 히트 시 DB 조회 생략
  // 비유: 도서관에서 이미 준비된 책 목록 확인
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    console.log('getPosts - Returning cached result for:', cacheKey);
    return res.status(200).json(cachedResult.data);
  }

  try {
    const { posts, totalPosts } = await fetchPostsWithQuery(
      req.query,
      page,
      limit
    ); // 의미: 포스트 조회
    // 이유: 서비스 로직으로 데이터 가져오기
    // 비유: 도서관에서 책 목록 가져오기
    console.log('getPosts - Fetched posts from service:', posts);

    // 여기부터 시작===
    // <!---여기추가
    // 의미: 각 포스트에 대해 좋아요 수 추가
    // 이유: 클라이언트에 좋아요 수 표시
    // 비유: 각 책에 대출 횟수 추가
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        console.log(
          'getPosts - Calling getLikeCount for postId:',
          post._id.toString()
        ); // 의미: getLikeCount 호출 디버깅
        // 이유: 호출 여부 확인
        // 비유: 대출 횟수 확인 시작 로그
        const likeCount = await getLikeCount(post._id.toString());
        return { ...post, likesCount: likeCount }; // 의미: 포스트에 좋아요 수 추가
        // 이유: 응답 데이터에 포함
        // 비유: 책에 대출 횟수 기록 추가
      })
    );
    console.log('getPosts - Posts with likes:', postsWithLikes); // 의미: 좋아요 수가 추가된 포스트 디버깅
    // 이유: 결과 확인
    // 비유: 대출 횟수가 추가된 책 목록 확인
    // 여기부터 끝===

    const hasMore = page * limit < totalPosts; // 의미: 더 많은 포스트 여부 확인
    // 이유: 페이지네이션 정보 제공
    // 비유: 도서관에서 더 볼 책이 있는지 확인
    console.log(
      'getPosts - Total posts (filtered):',
      totalPosts,
      'Has more:',
      hasMore
    );

    const response = { posts: postsWithLikes, hasMore }; // 의미: 응답 객체 생성
    // 이유: 클라이언트에 반환 데이터 준비
    // 비유: 손님에게 책 목록과 더보기 정보 전달

    postCache.set(cacheKey, { data: response, timestamp: Date.now() }); // 의미: 캐시에 결과 저장
    // 이유: 이후 동일 요청 캐싱
    // 비유: 도서관에서 자주 요청되는 책 목록 저장
    console.log('getPosts - Cached result for:', cacheKey);

    res.status(200).json(response); // 의미: 클라이언트에 응답 전송
    // 이유: 성공적으로 조회된 데이터 반환
    // 비유: 손님에게 책 목록 전달
  } catch (error) {
    console.error('getPosts - Error fetching posts:', error); // 의미: 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 책 목록 조회 실패 시 문제 기록
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
