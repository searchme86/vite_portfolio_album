import {
  getCachedData,
  setCachedData,
} from '../utils/tag.cacheManager.util.js'; // 의미: 캐시 관리 함수 가져오기
// 이유: 캐시 로직을 재사용하기 위해
// 비유: 도서관 대출 기록 관리 도구 가져오기
import {
  getDefaultPageNumber,
  getDefaultLimitNumber,
  getDefaultTagValue,
} from '../utils/tag.fallbackValues.util.js'; // 의미: 기본값 함수 가져오기
// 이유: 쿼리 파라미터 누락 시 대비
// 비유: 기본 규칙 가져오기
import { fetchPostsByTagCondition } from '../services/tag.getPostByTag.service.js'; // 의미: 포스트 조회 서비스 가져오기
// 이유: 데이터 조회 로직 분리
// 비유: 책 찾기 전문가 호출

export const getPostsByTagName = async (request, response) => {
  // 의미: 태그로 포스트를 조회하는 컨트롤러 함수
  // 이유: 클라이언트 요청 처리 및 응답 제공
  // 비유: 도서관 데스크에서 손님 요청 처리
  let queryParameters = null; // 의미: 쿼리 파라미터를 저장할 변수 초기화
  // 이유: try 밖에서 선언해 catch에서도 접근 가능
  // 비유: 손님 요청을 적을 빈 종이 준비

  try {
    queryParameters = request.query || {}; // 의미: 쿼리 파라미터 가져오기, 없으면 빈 객체
    // 이유: request.query가 undefined일 수 있어 안전하게 처리
    // 비유: 손님이 요청을 안 적어줘도 빈 종이로 시작

    const pageNumberFromQuery = parseInt(queryParameters.page); // 의미: 페이지 번호 파싱
    // 이유: 문자열을 숫자로 변환해 계산에 사용
    // 비유: 손님이 "몇 페이지"라고 말한 걸 숫자로 이해
    const limitNumberFromQuery = parseInt(queryParameters.limit); // 의미: 제한 수 파싱
    // 이유: 문자열을 숫자로 변환해 계산에 사용
    // 비유: "몇 권"인지 숫자로 이해
    const tagFromQuery = queryParameters.tag || getDefaultTagValue(); // 의미: 태그 값 가져오기, 없으면 기본값
    // 이유: 태그 누락 시 빈 문자열로 대체
    // 비유: 주제를 안 말하면 "아무 주제"로 시작

    const isPageNumberValid =
      !isNaN(pageNumberFromQuery) && pageNumberFromQuery > 0; // 의미: 페이지 번호 유효성 확인
    // 이유: 잘못된 값을 걸러내기 위해
    // 비유: "0페이지" 같은 이상한 요청 거르기
    const isLimitNumberValid =
      !isNaN(limitNumberFromQuery) && limitNumberFromQuery > 0; // 의미: 제한 수 유효성 확인
    // 이유: 잘못된 값을 걸러내기 위해
    // 비유: "-1권" 같은 이상한 요청 거르기
    const pageNumber = isPageNumberValid
      ? pageNumberFromQuery
      : getDefaultPageNumber(); // 의미: 유효하면 쿼리 값, 아니면 기본값
    // 이유: 안전한 페이지 번호 제공
    // 비유: 제대로 말하면 그 페이지, 아니면 1페이지
    const limitNumber = isLimitNumberValid
      ? limitNumberFromQuery
      : getDefaultLimitNumber(); // 의미: 유효하면 쿼리 값, 아니면 기본값
    // 이유: 안전한 제한 수 제공
    // 비유: 제대로 말하면 그 권수, 아니면 2권

    console.log('getPostsByTagName - Requested tag:', tagFromQuery); // 의미: 요청된 태그 로그
    // 이유: 디버깅 시 어떤 태그로 요청됐는지 확인
    // 비유: 손님이 원하는 주제를 기록

    const isTagValid = tagFromQuery && tagFromQuery.trim() !== ''; // 의미: 태그 유효성 검사
    // 이유: 빈 태그나 공백 태그 방어
    // 비유: 주제가 제대로 적혔는지 확인
    if (!isTagValid) {
      // 의미: 태그가 유효하지 않으면 에러 응답
      // 이유: 잘못된 요청을 조기에 차단
      // 비유: 주제를 안 말하면 "다시 말해줘"라고 함
      console.log('getPostsByTagName - Invalid tag:', tagFromQuery); // 의미: 유효하지 않은 태그 로그
      // 이유: 디버깅 용이성
      // 비유: 문제 기록
      response.status(400).json({ message: 'Tag is required' }); // 의미: 클라이언트에 에러 전달
      // 이유: 사용자에게 문제 알림
      // 비유: "주제를 말해야 책을 줄게"라고 답변
      return;
    }

    const cacheKey = JSON.stringify({
      tag: tagFromQuery,
      page: pageNumber,
      limit: limitNumber,
    }); // 의미: 캐시 키 생성
    // 이유: 고유한 요청 식별자로 캐시 관리
    // 비유: 손님 이름과 요청을 묶어서 기록
    const cachedData = getCachedData(cacheKey); // 의미: 캐시에서 데이터 조회
    // 이유: DB 호출 대신 캐시 사용 가능성 확인
    // 비유: 전에 빌린 책이 있는지 확인
    if (cachedData) {
      // 의미: 캐시가 있으면 바로 반환
      // 이유: 성능 최적화
      // 비유: 이미 있는 책을 바로 줌
      console.log('getPostsByTagName - Returning cached result for:', cacheKey); // 의미: 캐시 히트 로그
      // 이유: 디버깅 용이성
      // 비유: "이전에 정리한 책 준다" 기록
      response.status(200).json(cachedData); // 의미: 캐시된 데이터 반환
      // 이유: 빠른 응답 제공
      // 비유: 손님에게 책 바로 전달
      return;
    }

    const fetchResult = await fetchPostsByTagCondition(
      tagFromQuery,
      pageNumber,
      limitNumber
    ); // 의미: 포스트 조회
    // 이유: 서비스 함수로 데이터 가져오기
    // 비유: 전문가에게 책 찾기 부탁
    if (!fetchResult || !Array.isArray(fetchResult.posts)) {
      // 의미: 조회 결과 유효성 확인
      // 이유: 예상치 못한 결과 방어
      // 비유: 책 목록이 아닌 엉뚱한 걸 받았는지 확인
      throw new Error('Invalid fetch result');
    }

    console.log(
      'getPostsByTagName - Fetched posts from DB:',
      fetchResult.posts
    ); // 의미: 조회된 포스트 로그
    // 이유: 디버깅 용이성
    // 비유: 가져온 책 목록 확인
    console.log(
      'getPostsByTagName - Total posts:',
      fetchResult.total,
      'Has more:',
      fetchResult.hasMore
    ); // 의미: 페이지네이션 정보 로그
    // 이유: 디버깅 용이성
    // 비유: 책 수와 다음 페이지 여부 기록

    const responseData = {
      posts: fetchResult.posts,
      hasMore: fetchResult.hasMore,
    }; // 의미: 응답 데이터 생성
    // 이유: 클라이언트에 필요한 정보만 제공
    // 비유: 손님에게 줄 책과 정보 정리
    setCachedData(cacheKey, responseData); // 의미: 캐시에 데이터 저장
    // 이유: 다음 요청 시 재사용
    // 비유: 다음 손님을 위해 책 기록 보관

    response.status(200).json(responseData); // 의미: 클라이언트에 응답
    // 이유: 성공적인 요청 처리 완료
    // 비유: 손님에게 책과 정보 전달
  } catch (error) {
    console.error('getPostsByTagName - Error:', error.message); // 의미: 에러 로그
    // 이유: 문제 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    const errorMessage = error.message || 'Unknown server error'; // 의미: 에러 메시지 설정
    // 이유: 메시지 없으면 기본값 제공
    // 비유: 원인을 모르면 "알 수 없음" 적기
    response.status(500).json({
      // 의미: 에러 응답
      message: 'Server error occurred', // 의미: 사용자 친화적 메시지
      // 이유: 클라이언트가 이해하기 쉽게
      // 비유: "문제 생겼어요"라고 말해줌
      error: errorMessage, // 의미: 개발자용 상세 메시지
      // 이유: 디버깅 용이성
      // 비유: 전문가에게 문제 설명
    });
  }
};
