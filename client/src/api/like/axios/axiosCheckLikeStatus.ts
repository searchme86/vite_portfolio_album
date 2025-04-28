// src/api/like/axios/axiosCheckLikeStatus.js

import { axiosBase } from '../../base/axiosBase'; // 의미: 기본 Axios 인스턴스 가져오기
// 이유: API 요청을 위한 설정된 Axios 사용
// 비유: 도서관에서 기본 요청서를 준비
import { likeApiPaths } from './likeApiPaths'; // 의미: 경로 매핑 객체 가져오기
// 이유: 요청 경로를 중앙에서 관리
// 비유: 도서관에서 주소록 가져오기

// 의미: postId와 token을 받아 특정 유저의 좋아요 상태 조회
// 이유: 백엔드에서 특정 유저의 좋아요 여부 반환
// 비유: 도서관에서 손님이 특정 책에 좋아요를 눌렀는지 확인
export const axiosCheckLikeStatus = async (postId, token) => {
  const response = await axiosBase.get(
    likeApiPaths.checkLikeStatus(postId), // 의미: 매핑 객체에서 경로 가져오기
    // 이유: /like/${postId}/status 경로로 요청
    // 비유: 도서관에서 주소록에서 특정 책의 좋아요 상태 확인 주소 가져오기
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {}, // 의미: 토큰이 있으면 헤더에 추가
      // 이유: 백엔드에서 인증 확인
      // 비유: 도서관 요청서에 손님의 회원증 번호 추가
    }
  ); // 의미: GET 요청 전송
  // 이유: 백엔드의 /like/{postId}/status 엔드포인트 호출
  // 비유: 도서관에서 손님의 요청서를 제출

  return response.data; // 의미: 응답 데이터 반환
  // 이유: 요청 결과를 상위 로직에서 사용 (좋아요 상태)
  // 비유: 도서관에서 좋아요 상태 확인서를 반환
};
