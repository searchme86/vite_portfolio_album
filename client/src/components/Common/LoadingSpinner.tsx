// src/components/common/LoadingSpinner.jsx

// 의미: 로딩 스피너 컴포넌트
// 이유: 로딩 상태를 시각적으로 표시
// 비유: 도서관에서 손님에게 요청 처리 중임을 시각적으로 알림
function LoadingSpinner() {
  return (
    <>
      {/* 여기부터 시작=== <!---여기추가 */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        {/* 의미: 스핀 애니메이션 정의 */}
        {/* 이유: 로딩 스피너의 회전 효과 제공 */}
        {/* 비유: 도서관에서 로딩 표시 동작 규칙 정의 */}
      </style>
      {/* 여기부터 끝=== */}
      <div
        style={{
          display: 'inline-block', // 의미: 인라인 블록 표시
          // 이유: 버튼 내부에 포함 가능
          // 비유: 도서관에서 작은 공간에 로딩 표시
          width: '16px', // 의미: 스피너 크기 설정
          // 이유: 적절한 크기 유지
          // 비유: 도서관에서 로딩 표시 크기 조정
          height: '16px', // 의미: 스피너 크기 설정
          // 이유: 적절한 크기 유지
          // 비유: 도서관에서 로딩 표시 크기 조정
          border: '2px solid #ccc', // 의미: 스피너 테두리 설정
          // 이유: 시각적 표시
          // 비유: 도서관에서 로딩 표시 테두리 디자인
          borderTop: '2px solid #000', // 의미: 스피너 회전 부분 설정
          // 이유: 회전 애니메이션 표시
          // 비유: 도서관에서 로딩 표시 회전 부분 디자인
          borderRadius: '50%', // 의미: 원형 스피너
          // 이유: 부드러운 UI 제공
          // 비유: 도서관에서 로딩 표시 모양 디자인
          animation: 'spin 1s linear infinite', // 의미: 회전 애니메이션 적용
          // 이유: 로딩 상태 시각적 피드백
          // 비유: 도서관에서 로딩 표시 동작
        }}
      />
    </>
  );
}

// 여기부터 시작=== <!---여기수정
// 의미: styleSheet 관련 코드 제거
// 이유: SecurityError 방지 및 React 스타일링 권장 방식 사용
// 비유: 도서관에서 보안 문제로 접근 불가한 책 대신 내부적으로 스타일 정의
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(
//   `
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
//   `,
//   styleSheet.cssRules.length
// );
// 여기부터 끝===

export default LoadingSpinner; // 의미: 컴포넌트 내보내기
// 이유: 다른 컴포넌트에서 사용 가능
// 비유: 도서관에서 로딩 표시를 다른 부서에 전달
