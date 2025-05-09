// import { useImageUploadContext } from '../../context/ImageUploadContext';

// // 훅 정의
// // 컨텍스트 값을 안전하게 반환
// function useImageUploadContextValues() {
//   // useImageUploadContext 훅으로 Context 값 가져오기
//   // ImageUploadManager에서 제공된 값 사용
//   const context = useImageUploadContext();
//   // context가 객체인지 확인, 아니면 빈 객체로 대체
//   const safeContext =
//     typeof context === 'object' && context !== null ? context : {};
//   // 디버깅: safeContext 확인
//   // context가 올바르게 처리되었는지 확인
//   console.log('useImageUploadContextValues - safeContext:', safeContext);

//   // context에서 값 추출
//   const {
//     imageUrls,
//     setImageUrls,
//     setTempFiles,
//     setButtonText,
//     setProgress,
//     setIsUploading,
//     onImageUrlsChange,
//   } = safeContext;

//   // imageUrls가 배열이 아닌 경우 빈 배열로 초기화
//   // map 및 필터링 오류 방지
//   const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
//   // 디버깅: safeImageUrls 확인
//   // 배열이 올바르게 처리되었는지 확인
//   console.log('useImageUploadContextValues - safeImageUrls:', safeImageUrls);

//   // setImageUrls가 함수가 아닌 경우 빈 함수로 대체
//   // 호출 시 에러 방지
//   const safeSetImageUrls =
//     typeof setImageUrls === 'function' ? setImageUrls : () => {};
//   // 디버깅: safeSetImageUrls 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useImageUploadContextValues - safeSetImageUrls:',
//   //   safeSetImageUrls
//   // );

//   // setTempFiles가 함수가 아닌 경우 빈 함수로 대체
//   // 호출 시 에러 방지
//   const safeSetTempFiles =
//     typeof setTempFiles === 'function' ? setTempFiles : () => {};
//   // 디버깅: safeSetTempFiles 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useImageUploadContextValues - safeSetTempFiles:',
//   //   safeSetTempFiles
//   // );

//   // setButtonText가 함수가 아닌 경우 빈 함수로 대체
//   // 호출 시 에러 방지
//   const safeSetButtonText =
//     typeof setButtonText === 'function' ? setButtonText : () => {};
//   // 디버깅: safeSetButtonText 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useImageUploadContextValues - safeSetButtonText:',
//   //   safeSetButtonText
//   // );

//   // setProgress가 함수가 아닌 경우 빈 함수로 대체
//   // 호출 시 에러 방지
//   const safeSetProgress =
//     typeof setProgress === 'function' ? setProgress : () => {};
//   // 디버깅: safeSetProgress 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useImageUploadContextValues - safeSetProgress:',
//   //   safeSetProgress
//   // );

//   // setIsUploading이 함수가 아닌 경우 빈 함수로 대체
//   // 호출 시 에러 방지
//   const safeSetIsUploading =
//     typeof setIsUploading === 'function' ? setIsUploading : () => {};
//   // 디버깅: safeSetIsUploading 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useImageUploadContextValues - safeSetIsUploading:',
//   //   safeSetIsUploading
//   // );

//   // onImageUrlsChange가 함수가 아닌 경우 빈 함수로 대체
//   // 호출 시 에러 방지
//   const safeOnImageUrlsChange =
//     typeof onImageUrlsChange === 'function' ? onImageUrlsChange : () => {};
//   // 디버깅: safeOnImageUrlsChange 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useImageUploadContextValues - safeOnImageUrlsChange:',
//   //   safeOnImageUrlsChange
//   // );

//   // 컨텍스트 값과 안전 처리된 값 반환
//   // 객체 형태로 반환
//   return {
//     safeImageUrls,
//     safeSetImageUrls,
//     safeSetTempFiles,
//     safeSetButtonText,
//     safeSetProgress,
//     safeSetIsUploading,
//     safeOnImageUrlsChange,
//   };
// }

// // 훅 내보내기
// // 다른 파일에서 import하여 사용할 수 있도록 모듈화
// export default useImageUploadContextValues;
// //====여기까지 수정됨====
