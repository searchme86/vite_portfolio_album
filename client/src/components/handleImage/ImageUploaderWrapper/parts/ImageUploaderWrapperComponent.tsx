// ImageUploaderWrapperComponent 컴포넌트: 래퍼 컴포넌트
// 의미: 상위 상태를 조정해 하위 컴포넌트에 전달
// 이유: 상태 안전성 확보
import ImageUploaderMain from '../ImageUploaderMain';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

function ImageUploaderWrapperComponent() {
  const { postId, buttonText, existingBaseFileNames } = useImageManagementStore(
    (state) => ({
      postId: state.postId || 'default-post-id',
      buttonText: state.buttonText || 'Add a Cover Image',
      existingBaseFileNames: state.existingBaseFileNames || [],
    })
  );

  return (
    <ImageUploaderMain
      postId={postId}
      buttonText={buttonText}
      existingBaseFileNames={existingBaseFileNames}
    />
  );
  // 의미: 하위 컴포넌트에 상태 전달
  // 이유: 상태 동기화 및 UI 렌더링
}

export default ImageUploaderWrapperComponent;
//====여기까지 수정됨====
