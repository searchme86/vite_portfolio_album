// backend/like/services/like.getPopularPosts.service.js

// 의미: 데이터베이스에서 포스트를 가져오는 모델 (가정)
// 이유: 데이터베이스와의 상호작용을 추상화
// 비유: 도서관 데이터베이스에서 책 목록을 가져오는 사서
import PostModel from '../../models/post.model.js';

// 의미: 좋아요 데이터를 가져오는 모델 (가정)
// 이유: 좋아요 수를 기준으로 정렬하기 위해
// 비유: 도서관에서 책의 인기 점수를 확인하는 사서
import LikeModel from '../model/like.model.js';

// 의미: 인기 포스트를 조회하는 서비스 함수
// 이유: 좋아요 수 기준으로 상위 포스트를 가져오기 위해
// 비유: 도서관에서 가장 인기 있는 책 목록을 가져오는 작업
export const getPopularPosts = async (page, limit) => {
  console.log('getPopularPosts - Fetching posts'); // 의미: 포스트 조회 시작 로그
  // 이유: 디버깅을 위해 조회 시작 확인
  // 비유: 도서관에서 책 목록 조회 시작 로그

  try {
    // 의미: 페이지네이션 계산을 위한 스킵 값
    // 이유: 요청된 페이지에 맞는 데이터만 가져오기 위해
    // 비유: 책 목록에서 몇 번째 책부터 가져올지 계산
    const skip = (page - 1) * limit;

    // 의미: 모든 포스트를 조회 (가정된 쿼리)
    // 이유: 좋아요 수를 기준으로 정렬하기 위해 모든 포스트 필요
    // 비유: 도서관에서 모든 책 목록 가져오기
    const posts = await PostModel.find()
      .populate('user') // 의미: 유저 정보 포함
      // 이유: 포스트와 연결된 유저 데이터를 함께 가져오기
      // 비유: 책의 저자 정보 함께 가져오기
      .skip(skip) // 의미: 페이지네이션 스킵 적용
      // 이유: 지정된 페이지의 데이터만 가져오기
      // 비유: 책 목록에서 몇 번째 책부터 시작할지 설정
      .limit(limit) // 의미: 페이지당 항목 수 제한
      // 이유: 한 페이지에 보여줄 데이터 수 제한
      // 비유: 한 페이지에 몇 권의 책만 보여줄지 설정
      .exec();

    console.log('getPopularPosts - Fetched posts:', posts); // 의미: 조회된 포스트 디버깅
    // 이유: 가져온 데이터 확인
    // 비유: 가져온 책 목록 확인 로그

    // 의미: 포스트를 좋아요 수 기준으로 정렬 (가정된 로직)
    // 이유: 인기 있는 포스트를 상위에 노출하기 위해
    // 비유: 책을 인기 순으로 정렬
    const sortedPosts = posts.sort((a, b) => b.visit - a.visit); // 방문 수 기준으로 정렬 (로그 기반)

    console.log('getPopularPosts - Sorted posts:', sortedPosts); // 의미: 정렬된 포스트 디버깅
    // 이유: 정렬 결과 확인
    // 비유: 정렬된 책 목록 확인 로그

    // 의미: 좋아요 수를 추가 (가정된 로직)
    // 이유: 클라이언트에서 좋아요 수를 표시하기 위해
    // 비유: 각 책의 인기 점수 추가
    const popularPosts = await Promise.all(
      sortedPosts.map(async (post) => {
        const likeCount = await LikeModel.countDocuments({ postId: post._id }); // 의미: 포스트별 좋아요 수 계산
        // 이유: 각 포스트의 좋아요 수를 추가
        // 비유: 책마다 인기 점수 계산
        return { ...post.toObject(), likeCount }; // 의미: 포스트 객체에 좋아요 수 추가
        // 이유: 클라이언트에서 사용할 데이터 준비
        // 비유: 책 정보에 인기 점수 추가
      })
    );

    console.log('getPopularPosts - Mapped popular posts:', popularPosts); // 의미: 매핑된 포스트 디버깅
    // 이유: 좋아요 수가 추가된 데이터 확인
    // 비유: 인기 점수가 추가된 책 목록 확인 로그

    // 의미: 전체 포스트 수 계산
    // 이유: 페이지네이션 정보를 제공하기 위해
    // 비유: 도서관에 있는 전체 책 수 확인
    const totalPopularPosts = await PostModel.countDocuments();

    console.log('getPopularPosts - Total popular posts:', totalPopularPosts); // 의미: 전체 포스트 수 디버깅
    // 이유: 전체 데이터 수 확인
    // 비유: 전체 책 수 확인 로그

    // 의미: 더 가져올 데이터 존재 여부 계산
    // 이유: 클라이언트에서 추가 데이터 요청 여부 결정
    // 비유: 더 가져올 책이 있는지 확인
    const hasMore = skip + popularPosts.length < totalPopularPosts;

    console.log('getPopularPosts - Has more:', hasMore); // 의미: 더 가져올 데이터 여부 디버깅
    // 이유: 페이지네이션 상태 확인
    // 비유: 더 가져올 책 여부 확인 로그

    // 여기부터 시작===
    // <!---여기수정
    // 의미: 최종 결과 반환
    // 이유: 컨트롤러에서 사용할 데이터 제공, 기존에는 popularPosts가 undefined로 반환되었을 가능성 있음
    // 비유: 손님에게 최종 책 목록 전달
    return {
      popularPosts: popularPosts || [], // 의미: 포스트 목록 반환, undefined 방지
      // 이유: 데이터 누락 방지
      // 비유: 책 목록이 없어도 빈 목록 반환
      totalPopularPosts, // 의미: 전체 포스트 수
      // 이유: 페이지네이션 정보 제공
      // 비유: 전체 책 수 알려주기
      hasMore, // 의미: 더 가져올 데이터 여부
      // 이유: 클라이언트에서 추가 요청 여부 결정
      // 비유: 더 가져올 책이 있는지 알려주기
    };
    // 여기부터 끝===
  } catch (error) {
    console.error('getPopularPosts - Error:', error.message); // 의미: 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 책 목록 가져오기 실패 로그
    throw new Error('Failed to fetch popular posts');
  }
};
