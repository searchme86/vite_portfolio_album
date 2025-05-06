// UploadStatus 컴포넌트: 업로드 상태 메시지 UI 제공
// 단일 책임: 상태 메시지 렌더링만 담당
function UploadStatus({ status }) {
  // status 값 확인을 위한 디버깃 로그
  // 디버깅: status가 올바르게 전달되었는지 확인
  console.log('UploadStatus - status:', status);

  // 상태 메시지 렌더링, 조건부 스타일링
  // 웹접근성: role="status" 추가하여 스크린 리더가 상태로 인식
  return (
    <p
      className={`text-sm ${
        status === '서버에 올려진 동일한 이미지를 업데이트 할 수 없습니다'
          ? 'text-red-500'
          : 'text-gray-600'
      }`}
      role="status"
    >
      {status}
    </p>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default UploadStatus;
