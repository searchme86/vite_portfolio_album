// // useUpdateImageUrlsAndState 훅: 이미지 URL 및 상태 업데이트
// // 단일 책임: 상태 업데이트 및 콜백 실행 로직 제공
// import useImageUploadContextValues from './useImageUploadContextValues';

// function useUpdateImageUrlsAndState() {
//   const contextValues = useImageUploadContextValues();
//   // contextValues가 객체인지 확인
//   const safeContextValues =
//     typeof contextValues === 'object' && contextValues !== null
//       ? contextValues
//       : {};
//   // 디버깅: safeContextValues 확인
//   // contextValues가 올바르게 처리되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - safeContextValues:',
//   //   safeContextValues
//   // );

//   const {
//     safeImageUrls,
//     safeSetImageUrls,
//     safeSetTempFiles,
//     safeSetButtonText,
//     safeSetProgress,
//     safeSetIsUploading,
//     safeOnImageUrlsChange,
//   } = safeContextValues;

//   // safeImageUrls가 배열인지 확인
//   const validatedSafeImageUrls = Array.isArray(safeImageUrls)
//     ? safeImageUrls
//     : [];
//   // 디버깅: validatedSafeImageUrls 확인
//   // 배열이 올바르게 처리되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeImageUrls:',
//   //   validatedSafeImageUrls
//   // );

//   // safeSetImageUrls가 함수인지 확인
//   const validatedSafeSetImageUrls =
//     typeof safeSetImageUrls === 'function' ? safeSetImageUrls : () => {};
//   // 디버깅: validatedSafeSetImageUrls 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeSetImageUrls:',
//   //   validatedSafeSetImageUrls
//   // );

//   // safeSetTempFiles가 함수인지 확인
//   const validatedSafeSetTempFiles =
//     typeof safeSetTempFiles === 'function' ? safeSetTempFiles : () => {};
//   // 디버깅: validatedSafeSetTempFiles 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeSetTempFiles:',
//   //   validatedSafeSetTempFiles
//   // );

//   // safeSetButtonText가 함수인지 확인
//   const validatedSafeSetButtonText =
//     typeof safeSetButtonText === 'function' ? safeSetButtonText : () => {};
//   // 디버깅: validatedSafeSetButtonText 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeSetButtonText:',
//   //   validatedSafeSetButtonText
//   // );

//   // safeSetProgress가 함수인지 확인
//   const validatedSafeSetProgress =
//     typeof safeSetProgress === 'function' ? safeSetProgress : () => {};
//   // 디버깅: validatedSafeSetProgress 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeSetProgress:',
//   //   validatedSafeSetProgress
//   // );

//   // safeSetIsUploading가 함수인지 확인
//   const validatedSafeSetIsUploading =
//     typeof safeSetIsUploading === 'function' ? safeSetIsUploading : () => {};
//   // 디버깅: validatedSafeSetIsUploading 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeSetIsUploading:',
//   //   validatedSafeSetIsUploading
//   // );

//   // safeOnImageUrlsChange가 함수인지 확인
//   const validatedSafeOnImageUrlsChange =
//     typeof safeOnImageUrlsChange === 'function'
//       ? safeOnImageUrlsChange
//       : () => {};
//   // 디버깅: validatedSafeOnImageUrlsChange 확인
//   // 함수가 올바르게 설정되었는지 확인
//   // console.log(
//   //   'useUpdateImageUrlsAndState - validatedSafeOnImageUrlsChange:',
//   //   validatedSafeOnImageUrlsChange
//   // );

//   // updateImageUrlsAndState 함수: 이미지 URL과 상태 업데이트
//   // newUrls, safeUploadProgress, safeUploadStatus를 받아 상태 업데이트
//   const updateImageUrlsAndState = (
//     newUrls,
//     safeUploadProgress,
//     safeUploadStatus
//   ) => {
//     // newUrls가 배열인지 확인
//     const validatedNewUrls = Array.isArray(newUrls) ? newUrls : [];
//     // 디버깅: validatedNewUrls 확인
//     // 배열이 올바르게 처리되었는지 확인
//     // console.log(
//     //   'useUpdateImageUrlsAndState - validatedNewUrls:',
//     //   validatedNewUrls
//     // );

//     // safeUploadProgress가 숫자인지 확인
//     const validatedSafeUploadProgress = Number.isFinite(safeUploadProgress)
//       ? safeUploadProgress
//       : 0;
//     // 디버깅: validatedSafeUploadProgress 확인
//     // 값이 올바르게 설정되었는지 확인
//     // console.log(
//     //   'useUpdateImageUrlsAndState - validatedSafeUploadProgress:',
//     //   validatedSafeUploadProgress
//     // );

//     // safeUploadStatus가 불리언인지 확인
//     const validatedSafeUploadStatus =
//       typeof safeUploadStatus === 'boolean' ? safeUploadStatus : false;
//     // 디버깅: validatedSafeUploadStatus 확인
//     // 값이 올바르게 설정되었는지 확인
//     // console.log(
//     //   'useUpdateImageUrlsAndState - validatedSafeUploadStatus:',
//     //   validatedSafeUploadStatus
//     // );

//     // 이미지 URL 업데이트
//     // 새로운 URL 추가
//     const updatedImageUrls = [...validatedSafeImageUrls, ...validatedNewUrls];
//     // updatedImageUrls가 배열인지 확인
//     const safeUpdatedImageUrls = Array.isArray(updatedImageUrls)
//       ? updatedImageUrls
//       : [];
//     // 디버깅: safeUpdatedImageUrls 확인
//     // 업데이트된 URL 목록 확인
//     console.log(
//       'useUpdateImageUrlsAndState - Updated imageUrls after deduplication and filtering:',
//       safeUpdatedImageUrls
//     );

//     validatedSafeSetImageUrls(safeUpdatedImageUrls);
//     validatedSafeSetTempFiles([]);

//     // 버튼 텍스트 업데이트
//     // 이미지 유무에 따라 텍스트 변경
//     validatedSafeSetButtonText(
//       safeUpdatedImageUrls.length > 0 ? 'Update' : 'Add a Cover Image'
//     );
//     validatedSafeSetProgress(validatedSafeUploadProgress);
//     validatedSafeSetIsUploading(validatedSafeUploadStatus);

//     // 업로드 완료 시 isNew 플래그 업데이트
//     // 업로드 완료 처리
//     if (validatedSafeUploadProgress >= 100) {
//       validatedSafeSetImageUrls((prev) => {
//         // prev가 배열인지 확인
//         const safePrev = Array.isArray(prev) ? prev : [];
//         // 디버깅: safePrev 확인
//         // 배열이 올바르게 처리되었는지 확인
//         console.log('useUpdateImageUrlsAndState - safePrev:', safePrev);

//         return safePrev.map((item) => {
//           // item이 객체인지 확인
//           const safeItem =
//             typeof item === 'object' && item !== null ? item : {};
//           return safeItem.isNew ? { ...safeItem, isNew: false } : safeItem;
//         });
//       });
//       // 디버깅: isNew 플래그 업데이트 로그
//       // 업데이트 결과 확인
//       console.log(
//         'useUpdateImageUrlsAndState - Upload complete, isNew flags updated'
//       );
//     }

//     // 이미지 URL 변경 콜백 호출
//     // 외부 핸들러 실행
//     validatedSafeOnImageUrlsChange(safeUpdatedImageUrls);
//   };

//   // updateImageUrlsAndState 함수 반환
//   // 객체 형태로 반환
//   return { updateImageUrlsAndState };
// }

// export default useUpdateImageUrlsAndState;
