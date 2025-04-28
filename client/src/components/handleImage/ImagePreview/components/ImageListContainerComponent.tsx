// src/components/handleImage/ImagePreview/components/ImageListContainerComponent.jsx

// ===여기부터 수정됨====
// 1. 필요한 컴포넌트 임포트
// 2. 기능별로 분리된 컴포넌트 사용
import ImageDisplayComponent from './ImageDisplayComponent';
import ImageRemoveButtonComponent from './ImageRemoveButtonComponent';

// 1. ImageListContainerComponent 컴포넌트 정의
// 2. 단일 책임: 이미지 리스트를 그리드 형태로 렌더링
function ImageListContainerComponent({
  safeImageUrls,
  safeMinImages,
  handleRemoveImage,
}) {
  // 1. safeImageUrls가 배열인지 확인
  // 2. 배열이 아니면 빈 배열로 폴백
  const safeImageUrlsArray = Array.isArray(safeImageUrls) ? safeImageUrls : [];
  console.log(
    'ImageListContainerComponent - safeImageUrlsArray:',
    safeImageUrlsArray
  );

  // 1. safeMinImages가 유효한 숫자인지 확인
  // 2. 숫자가 아니면 1로 폴백
  const safeMinImagesValue =
    Number.isInteger(safeMinImages) && safeMinImages > 0 ? safeMinImages : 1;
  console.log(
    'ImageListContainerComponent - safeMinImagesValue:',
    safeMinImagesValue
  );

  // 1. handleRemoveImage가 함수인지 확인
  // 2. 함수가 아니면 빈 함수로 폴백
  const safeHandleRemoveImage =
    typeof handleRemoveImage === 'function'
      ? handleRemoveImage
      : () => {
          console.log(
            'ImageListContainerComponent - Fallback handleRemoveImage called'
          );
        };
  console.log(
    'ImageListContainerComponent - safeHandleRemoveImage:',
    safeHandleRemoveImage
  );

  // 1. 이미지 리스트가 비어있는 경우 처리
  // 2. 삼항연산자 대신 if로 가독성 향상
  if (safeImageUrlsArray.length === 0) {
    return (
      <p className="text-gray-500" role="status" aria-live="polite">
        No images available.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-3">
      {safeImageUrlsArray.map((item, index) => {
        // 1. item이 객체인지 확인
        // 2. 객체가 아니면 url을 undefined로 설정
        const safeItemUrl =
          item && typeof item === 'object' && 'url' in item
            ? item.url
            : undefined;
        console.log(
          'ImageListContainerComponent - safeItemUrl for index',
          index,
          ':',
          safeItemUrl
        );

        return (
          // 1. 각 이미지 항목을 그리드 셀에 렌더링
          // 2. key prop으로 고유성 보장
          <div key={index} className="relative">
            <ImageDisplayComponent url={safeItemUrl} index={index} />
            <ImageRemoveButtonComponent
              index={index}
              handleRemoveImage={safeHandleRemoveImage}
              safeImageUrlsLength={safeImageUrlsArray.length}
              safeMinImages={safeMinImagesValue}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ImageListContainerComponent;
// ===여기까지 수정됨====
