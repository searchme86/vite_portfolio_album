// src/api/like/axios/axiosGetLikeCount.js

import { axiosBase } from '../../base/axiosBase'; // 의미: 기본 Axios 인스턴스 가져오기
// 이유: API 요청을 위한 설정된 Axios 사용
// 비유: 도서관에서 기본 요청서를 준비
import { likeApiPaths } from './likeApiPaths'; // 의미: 경로 매핑 객체 가져오기
// 이유: 요청 경로를 중앙에서 관리
// 비유: 도서관에서 주소록 가져오기

// 의미: token을 인자로 받아 헤더에 추가, 특정 포스트의 좋아요 수 조회
// 이유: 인증 토큰을 직접 헤더에 추가, 백엔드에서 좋아요 수 반환
// 비유: 도서관에서 요청서에 회원증 번호 추가, 책의 좋아요 수 확인
export const axiosGetLikeCount = async (postId, token) => {
  const response = await axiosBase.get(
    likeApiPaths.getLikeCount(postId), // 의미: 매핑 객체에서 경로 가져오기
    // 이유: /like/${postId}/count 경로로 요청
    // 비유: 도서관에서 주소록에서 특정 책의 좋아요 수 확인 주소 가져오기
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {}, // 의미: 토큰이 있으면 헤더에 추가
      // 이유: 백엔드에서 인증 확인
      // 비유: 도서관 요청서에 손님의 회원증 번호 추가
    }
  ); // 의미: GET 요청 전송
  // 이유: 백엔드의 /like/{postId}/count 엔드포인트 호출
  // 비유: 도서관에서 손님의 요청서를 제출

  return response.data; // 의미: 응답 데이터 반환
  // 이유: 요청 결과를 상위 로직에서 사용 (좋아요 수)
  // 비유: 도서관에서 좋아요 수 확인서를 반환
};
