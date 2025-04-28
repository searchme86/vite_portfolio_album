import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 데이터베이스와 상호작용하기 위해 필요
// 비유: 도서관에서 책을 찾기 위해 사서 호출
import { getFallbackTags } from '../utils/tag.fallbackTags.util.js'; // 의미: 기본 태그 제공 함수 가져오기
// 이유: 태그가 없을 때 기본값 제공
// 비유: 비상용 우산 가져오기
import { extractUniqueTags } from '../utils/tag.uniqueTagsExtractor.util.js'; // 의미: 고유 태그 추출 함수 가져오기
// 이유: 태그 중복 제거 로직 분리
// 비유: 책갈피 중복 제거 도구 가져오기

export const fetchAllUniqueTags = async () => {
  // 의미: 모든 포스트에서 고유 태그를 조회하는 서비스 함수
  // 이유: 데이터 조회 및 가공 로직을 컨트롤러에서 분리
  // 비유: 도서관에서 책 주제 목록을 정리하는 전문가
  let posts = []; // 의미: 조회된 포스트를 저장할 변수 초기화
  // 이유: try 밖에서 선언해 catch에서도 접근 가능
  // 비유: 빈 바구니를 준비해서 물건을 담을 준비

  try {
    posts = await Post.find({}, 'tags'); // 의미: 모든 포스트에서 tags 필드만 가져옴
    // 이유: 불필요한 데이터를 제외해 성능 최적화
    // 비유: 책에서 필요한 페이지만 복사해서 가져오는 것

    if (!Array.isArray(posts)) {
      // 의미: posts가 배열인지 확인
      // 이유: 예상치 못한 결과 방어
      // 비유: 받은 상자가 과일 상자가 맞는지 확인
      throw new Error('Fetched posts is not an array');
    }

    console.log('fetchAllUniqueTags - Fetched posts for tags:', posts); // 의미: 조회된 데이터 로그
    // 이유: 디버깅 용이성
    // 비유: 물건을 받고 나서 상자 안을 확인

    const allTags = []; // 의미: 모든 태그를 담을 빈 배열 초기화
    // 이유: 태그를 수집하기 위해
    // 비유: 빈 종이에 태그를 하나씩 적어가는 것

    for (const post of posts) {
      // 의미: 각 포스트를 순회하며 태그 수집
      // 이유: posts가 비어있어도 안전하게 동작
      // 비유: 책마다 책갈피를 꺼내서 한 곳에 모으는 것
      if (post && Array.isArray(post.tags)) {
        // 의미: post와 tags가 유효한지 확인
        // 이유: post가 null이거나 tags가 배열이 아닐 수 있음
        // 비유: 책이 있고 책갈피가 제대로 있는지 확인
        allTags.push(...post.tags); // 의미: 태그를 allTags에 추가
        // 이유: spread 연산자로 배열 병합
        // 비유: 책갈피를 모아놓은 상자에 넣는 것
      }
    }

    if (allTags.length === 0) {
      // 의미: 태그가 하나도 없을 경우 확인
      // 이유: 빈 결과를 반환하지 않고 기본값 제공
      // 비유: 물건이 없으면 비상용 물건을 꺼내는 것
      const fallbackTags = getFallbackTags(); // 의미: 기본 태그 가져오기
      // 이유: 클라이언트에 유효한 데이터 제공
      // 비유: 비상용 우산을 꺼내 쓰는 것
      allTags.push(...fallbackTags); // 의미: 기본 태그 추가
      // 이유: 빈 배열 대신 최소한의 데이터 보장
      // 비유: 빈 상자에 기본 물건을 채워넣는 것
    }

    const uniqueTags = extractUniqueTags(allTags); // 의미: 고유 태그 추출
    // 이유: 중복 제거 로직을 유틸리티로 분리
    // 비유: 책갈피 중복 제거 도구 사용

    if (!Array.isArray(uniqueTags)) {
      // 의미: 결과가 배열인지 확인
      // 이유: 예상치 못한 결과 방어
      // 비유: 정리된 책갈피 목록이 제대로 왔는지 확인
      throw new Error('Extracted unique tags is not an array');
    }

    console.log('fetchAllUniqueTags - Extracted unique tags:', uniqueTags); // 의미: 추출된 태그 로그
    // 이유: 디버깅 용이성
    // 비유: 정리된 책갈피 목록 확인

    return uniqueTags; // 의미: 고유 태그 반환
    // 이유: 컨트롤러에서 사용
    // 비유: 정리된 책갈피 목록 넘겨줌
  } catch (error) {
    throw new Error(`Failed to fetch unique tags: ${error.message}`); // 의미: 에러 발생 시 상위로 전달
    // 이유: 컨트롤러에서 에러 처리 위임
    // 비유: 책을 못 찾으면 "문제 있다"고 상사에게 말하기
  }
};
