// useHandleFileUpload 훅: 파일 업로드 처리
// 의미: 이 훅은 사용자가 파일을 선택하고 업로드하는 전체 로직을 관리
// 이유: 사용자 파일 업로드 경험을 중앙화하고 상태를 효율적으로 관리하기 위함
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore'; // useImageManagementStore: Zustand 스토어에서 이미지 관리 상태와 함수를 가져옴, 이유: 전역 상태 관리
import { useAuth } from '@clerk/clerk-react'; // useAuth: Clerk에서 인증 정보를 제공하는 훅, 이유: 사용자 인증 토큰 필요
import axios, { AxiosProgressEvent } from 'axios'; // axios: HTTP 요청 라이브러리, AxiosProgressEvent: 업로드 진행 이벤트를 위한 타입, 이유: 서버와의 통신 및 진행률 추적
import { toast } from 'react-toastify'; // toast: 사용자 알림을 위한 라이브러리, 이유: 업로드 상태 피드백 제공
import useHandleFilesChange from './useHandleFilesChange'; // useHandleFilesChange: 파일 변경 처리 훅, 이유: 이미지 URL 업데이트 로직 재사용
import type { ImageFileName } from '../../utils/ImageFileType';

// ImageKitAuthParams: ImageKit 인증 파라미터 타입
// 의미: ImageKit API가 업로드를 인증하기 위한 데이터 구조를 정의
// 이유: 타입 안정성을 보장하고, API 요청에 필요한 필드를 명확히 지정
interface ImageKitAuthParams {
  token: string; // token: ImageKit 인증 토큰, 이유: 서버 인증에 사용, 의미: 사용자 인증 정보
  signature: string; // signature: ImageKit 서명, 이유: 보안 강화, 의미: 데이터 무결성 확인
  expire: string; // expire: 인증 만료 시간, 이유: 보안 제한, 의미: 인증 유효 기간
}

// fetchAuthParams: ImageKit 인증 파라미터 요청
// 의미: 서버에서 ImageKit 기본 인증 정보를 가져오는 비동기 함수
// 이유: 업로드 요청에 필요한 초기 인증 데이터를 동적으로 획득
const fetchAuthParams = async (
  getToken: () => Promise<string | null> // getToken: Clerk에서 제공하는 토큰 가져오기 함수, 이유: 사용자 인증 토큰 획득, 의미: 인증 정보
): Promise<ImageKitAuthParams> => {
  // Promise<ImageKitAuthParams>: 반환 타입, 이유: 비동기 작업 결과 타입 명시
  try {
    // try: 에러 처리 블록 시작, 이유: 네트워크 요청 실패 가능성 대비
    const token = await getToken(); // token: 인증 토큰, 이유: await로 비동기 호출 대기, 의미: 사용자 인증 정보
    const safeApiUrl = // safeApiUrl: API 엔드포인트 URL, 이유: 환경 변수 안전 처리
      typeof import.meta.env.VITE_API_URL === 'string' // import.meta.env.VITE_API_URL: Vite 환경 변수, 이유: 동적 URL 설정
        ? import.meta.env.VITE_API_URL // 환경 변수가 문자열이면 사용
        : 'http://localhost:3000'; // fallback: 기본 로컬 URL, 이유: 개발 환경 지원
    const res = await axios.get(`${safeApiUrl}/posts/upload-auth`, {
      // res: 서버 응답, 이유: 인증 파라미터 요청
      headers: { Authorization: `Bearer ${token || 'default-token'}` }, // headers: 인증 헤더, 이유: 서버에 토큰 전달, fallback: token이 없으면 'default-token' 사용, 이유: 인증 실패 방지
    });
    return res.data; // res.data: 인증 파라미터 객체, 이유: 서버 응답 반환
  } catch (error) {
    // catch: 에러 처리, 이유: 네트워크 오류나 인증 실패 대응
    console.error('Failed to fetch ImageKit auth params:', error); // 에러 로그, 이유: 디버깅 용이성
    toast.error('Failed to fetch ImageKit authentication parameters'); // 사용자 알림, 이유: UI 피드백
    throw error; // 에러 throw, 이유: 상위 호출자에게 에러 전달
  }
};

// fetchUniqueAuthParams: 각 요청마다 고유한 인증 정보 생성
// 의미: 각 파일 업로드에 대해 새로운 인증 정보를 요청
// 이유: ImageKit에서 동일한 토큰 재사용 시 400 Bad Request를 방지
// 비유: "친구에게 매번 새로운 편지 봉투를 만들어주는 거야!"
const fetchUniqueAuthParams = async (
  getToken: () => Promise<string | null>
): Promise<ImageKitAuthParams> => {
  // 캐시 방지 및 고유성 보장
  // 의미: 서버 요청이 캐싱되지 않도록 하고, 새로운 인증 정보 획득
  // 이유: iOS Safari 캐싱 문제와 토큰 중복 방지
  const token = await getToken();
  const safeApiUrl =
    typeof import.meta.env.VITE_API_URL === 'string'
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:3000';
  const res = await axios.get(`${safeApiUrl}/posts/upload-auth`, {
    headers: {
      Authorization: `Bearer ${token || 'default-token'}`,
      'Cache-Control': 'no-cache', // 캐시 방지 헤더 추가
      'X-Unique-Request': Date.now().toString(), // 고유성 보장
    },
  });
  return res.data;
};

// filterNewFiles: 새 파일 필터링
// 의미: 기존 파일명과 중복되지 않은 새 파일을 추출
// 이유: 동일한 파일 재업로드를 방지
const filterNewFiles = (
  files: File[], // files: 업로드된 파일 배열, 이유: 사용자가 선택한 파일
  existingBaseFileNames: string[] // existingBaseFileNames: 기존 파일명 배열, 이유: 중복 체크
): File[] => {
  // File[]: 반환 타입, 이유: 필터링된 파일 배열
  const safeFiles = Array.isArray(files) ? files : []; // safeFiles: 안전한 파일 배열, 이유: null/undefined 방지, 의미: 입력 유효성, fallback: 빈 배열 처리, 이유: 빈 배열일 경우 동작 없음 알림 추가
  if (safeFiles.length === 0) {
    toast.warn('선택된 파일이 없습니다. 업로드할 파일을 선택해주세요.'); // 알림, 이유: 사용자가 빈 배열 문제 인지 가능
    return [];
  }
  const safeExistingFileNames = Array.isArray(existingBaseFileNames) // safeExistingFileNames: 안전한 파일명 배열, 이유: null/undefined 방지, 의미: 안전한 배열로서 null/undefined 방지, 자세한 설명: existingBaseFileNames가 배열이 아니면 빈 배열로 초기화, 이는 중복 체크 실패 시에도 앱이 crash되지 않도록 보호
    ? existingBaseFileNames
    : [];
  if (safeExistingFileNames.length === 0) {
    console.warn(
      '기존 파일 목록이 비어 있습니다. 모든 파일이 새 파일로 처리됩니다.'
    ); // 경고 로그, 이유: 디버깅 및 사용자 인지
  }
  return safeFiles.filter((file) => !safeExistingFileNames.includes(file.name)); // filter: 중복 제거, 이유: file.name으로 비교, 의미: 새로운 파일만 추출
};

// calculateProgress: 업로드 진행률 계산
// 의미: 파일 업로드 진행률을 퍼센트로 계산
// 이유: 사용자에게 실시간 피드백 제공 (훅 재사용 가능)
const calculateProgress = (
  progressEvent: AxiosProgressEvent, // progressEvent: axios 업로드 이벤트, 이유: 진행률 데이터
  alreadyUploadedFilesCount: number, // alreadyUploadedFilesCount: 이미 업로드된 파일 수, 이유: 다중 파일 진행률 계산, 명확성: 'uploadedFiles' 대신 'alreadyUploadedFilesCount'로 변경, 이유: 업로드 완료된 파일 수를 명확히 표현
  totalUploadedFileCount: number // totalUploadedFileCount: 전체 파일 수, 이유: 진행률 비율 계산, 명확성: 'totalFiles' 대신 'totalUploadedFileCount'로 변경, 이유: 전체 업로드 대상 파일 수를 명확히
): number => {
  // number: 반환 타입, 이유: 퍼센트 값
  const uploadedFileSize = Number.isFinite(progressEvent?.loaded) // uploadedFileSize: 업로드된 데이터 크기, 이유: 유효성 체크, 명확성: 'loaded' 대신 'uploadedFileSize'로 변경, 이유: 데이터 크기를 직관적으로 표현
    ? progressEvent.loaded
    : 0;
  const totalFileSize = progressEvent?.total ?? 1; // totalFileSize: 전체 데이터 크기, 이유: 0 방지, 의미: 진행률 분모, 명확성: 'total' 대신 'totalFileSize'로 변경, 이유: 전체 크기를 명확히
  const progressRate =
    totalFileSize > 0
      ? Math.round((uploadedFileSize * 100) / totalFileSize)
      : 0; // progressRate: 파일 진행률, 이유: 퍼센트 계산, 의미: 현재 진행 상태, 명확성: 'progress' 대신 'progressRate'로 변경, 이유: 진행 속도율을 표현
  const overallProgressRate = // overallProgressRate: 전체 진행률, 이유: 다중 파일 평균, 명확성: 'overallProgress' 대신 'overallProgressRate'로 변경, 이유: 전체 진행 상태를 직관적으로
    totalUploadedFileCount > 1
      ? Math.round(
          ((alreadyUploadedFilesCount + progressRate / 100) /
            totalUploadedFileCount) *
            100
        )
      : progressRate;
  return overallProgressRate; // 반환, 이유: 상위 함수에 진행률 전달
};

// updateProgress: 진행률 상태 업데이트
// 의미: 계산된 진행률을 상태에 반영
// 이유: 진행률 전용 로직 분리 및 재사용성
const updateProgress = (
  progressEvent: AxiosProgressEvent, // progressEvent: 업로드 이벤트, 이유: 진행률 데이터
  alreadyUploadedFilesCount: number, // alreadyUploadedFilesCount: 업로드된 파일 수, 이유: 누적 계산
  totalUploadedFileCount: number, // totalUploadedFileCount: 전체 파일 수, 이유: 비율 계산
  setProgress: (progress: number) => void // setProgress: Zustand 상태 업데이트 함수, 이유: UI 반영
) => {
  const progressRate = calculateProgress(
    progressEvent,
    alreadyUploadedFilesCount,
    totalUploadedFileCount
  ); // progressRate: 계산된 진행률, 이유: calculateProgress 호출
  setProgress(progressRate); // 상태 업데이트, 이유: UI에 진행률 표시
};

// checkUploadConditionsAndSetState: 업로드 시작 전 조건 체크와 상태 설정
// 의미: 파일 처리 및 초기 설정 수행
// 이유: 업로드 시작 전 조건 체크와 상태 설정
const checkUploadConditionsAndSetState = (
  e: React.ChangeEvent<HTMLInputElement>, // e: 파일 입력 이벤트, 이유: 사용자 파일 선택
  existingBaseFileNames: string[], // existingBaseFileNames: 기존 파일명, 이유: 중복 체크
  tempFiles: File[], // tempFiles: 현재 임시 파일, 이유: 상태 유지, 설명: 사용자가 업로드 중인 파일을 UI에 보여주기 위한 용도로 사용, 예: "요리 중인 재료를 보여주는 창"
  setTempFiles: (files: File[]) => void, // setTempFiles: 임시 파일 상태 업데이트, 이유: UI 반영
  setIsUploading: (isUploading: boolean) => void, // setIsUploading: 업로드 상태 설정, 이유: 진행 상태 표시
  setProgress: (progress: number) => void, // setProgress: 진행률 상태 설정, 이유: 실시간 피드백
  handleFilesChange: (
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void,
  // handleFilesChange: 파일 변경 핸들러, 이유: 상위 컴포넌트와 동기화
  setImageTitle: (name: ImageFileName[]) => void
): { success: boolean; newFiles: File[] } => {
  // 반환 타입: 성공 여부와 새 파일, 이유: 후속 로직 전달
  const files = Array.from(e.target.files || []); // files: 선택된 파일 배열, 이유: input에서 파일 추출, 의미: 사용자 입력
  if (files.length === 0) {
    toast.warn('선택된 파일이 없습니다. 업로드할 파일을 선택해주세요.'); // 알림: 사용자에게 경고
    return { success: false, newFiles: [] }; // 실패 반환, 이유: 더 이상 진행할 필요 없음
  }
  console.log('테스트중files', files);
  const firstFileName = files.map((file) => ({ name: file.name })); // firstFileName: 첫 번째 파일 이름, 이유: 제목으로 사용
  setImageTitle(firstFileName); // setImageTitle 호출, 이유: 상태에 제목 저장
  console.log('테스트: 첫 번째 파일명 설정됨 -', firstFileName); // 디버깅: 확인용 로그

  const newFiles = filterNewFiles(files, existingBaseFileNames); // newFiles: 중복 제거된 파일, 이유: filterNewFiles 호출
  if (newFiles.length === 0) {
    // 조건: 파일 없음 체크, 이유: 불필요한 처리 방지
    toast.error('서버에 있는 같은 사진은 바꿀 수 없어요'); // 사용자 알림, 이유: 피드백 제공
    setIsUploading(false); // 상태 초기화, 이유: 업로드 취소
    handleFilesChange([], 0, false); // 상위 동기화, 이유: UI 갱신
    return { success: false, newFiles: [] }; // 실패 반환, 이유: 후속 로직 중단
  }
  setTempFiles([...tempFiles, ...newFiles]); // tempFiles 업데이트, 이유: 업로드 중 이미지 표시
  setIsUploading(true); // 업로드 시작, 이유: 상태 전환
  toast.info('파일을 올리는 중이에요'); // 알림, 이유: 사용자 피드백
  setProgress(0); // 진행률 초기화, 이유: 새 업로드 시작
  return { success: true, newFiles }; // 성공 반환, 이유: 업로드 진행
};

// performUpload: 파일 업로드 실행
// 의미: 실제 파일 업로드 요청 처리
// 이유: 서버로 파일 전송 및 응답 처리
async function performUpload(
  newFiles: File[], // newFiles: 업로드할 파일, 이유: checkUploadConditionsAndSetState에서 전달
  getAuthParams: () => Promise<ImageKitAuthParams>, // 인증 정보 동적 생성 함수, 이유: 각 요청마다 새 토큰 필요
  setProgress: (progress: number) => void // setProgress: 진행률 업데이트, 이유: UI 반영
): Promise<{ url: string; isNew: boolean }[]> {
  // 반환 타입: 업로드된 URL 배열, 이유: 비동기 결과
  let alreadyUploadedFilesCount = 0; // alreadyUploadedFilesCount: 업로드된 파일 수, 이유: 진행률 계산, 초기값 0
  const newUploadedUrls: { url: string; isNew: boolean }[] = []; // newUploadedUrls: 업로드된 URL 배열, 이유: 결과 저장
  for (const file of newFiles) {
    // 루프: 각 파일 처리, 이유: 다중 파일 업로드
    const uploadData = new FormData(); // uploadData: 폼 데이터 객체, 이유: 파일 업로드 형식, 동적 처리: 객체로 데이터 준비
    const authParams = await getAuthParams(); // 각 파일마다 새로운 인증 정보 요청
    // 의미: 동일한 토큰 재사용 방지
    // 이유: ImageKit 400 Bad Request 에러 해결
    // 비유: "매번 새로운 편지 봉투를 만들어서 보내는 거야!"
    const uploadParams = {
      file,
      fileName: file.name,
      publicKey: import.meta.env.VITE_IK_PUBLIC_KEY || '',
      folder: '/posts',
      token: authParams.token || '',
      signature: authParams.signature || '',
      expire: authParams.expire || '',
    }; // uploadParams: 업로드 파라미터 객체, 이유: 동적 데이터 관리
    Object.entries(uploadParams).forEach(([key, value]) => {
      // 루프: 각 파라미터 추가, 이유: 동적 append
      uploadData.append(key, value);
    });
    try {
      const res = await axios.post(
        // res: 서버 응답, 이유: 업로드 요청
        'https://upload.imagekit.io/api/v1/files/upload',
        uploadData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }, // 헤더: 파일 업로드 형식, 이유: 서버 요구
          onUploadProgress: (
            progressEvent: AxiosProgressEvent // onUploadProgress: 진행 이벤트, 이유: 실시간 추적, 설명: 이 부분은 axios가 업로드 중 발생시키는 이벤트로, progressEvent는 업로드 상태(loaded, total)를 포함, updateProgress로 진행률 업데이트
          ) =>
            updateProgress(
              progressEvent,
              alreadyUploadedFilesCount,
              newFiles.length,
              setProgress
            ),
        }
      );
      alreadyUploadedFilesCount++; // 카운트 증가, 이유: 다음 파일 진행률
      newUploadedUrls.push({ url: res.data.url, isNew: true }); // URL 저장, 이유: 결과 기록
    } catch (uploadError) {
      // 에러 처리, 이유: 업로드 실패 대응
      console.error('파일 업로드 실패:', uploadError); // 에러 로그, 이유: 디버깅
      throw uploadError; // 에러 throw, 이유: 상위 try-catch로 전달
    }
  }
  return newUploadedUrls; // 반환, 이유: 상위 함수에 결과 전달
}

// handleUploadSuccess: 업로드 성공 처리
// 의미: 업로드 성공 후 상태 및 UI 업데이트
// 이유: 사용자에게 완료 알림과 상태 초기화
const handleUploadSuccess = (
  newUploadedUrls: { url: string; isNew: boolean }[], // newUploadedUrls: 업로드된 URL 배열, 이유: 결과 처리
  setTempFiles: (files: File[]) => void, // setTempFiles: 임시 파일 초기화, 이유: 상태 정리
  setIsUploading: (isUploading: boolean) => void, // setIsUploading: 업로드 상태 종료, 이유: UI 갱신
  handleFilesChange: (
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void // handleFilesChange: 상위 동기화, 이유: UI 반영
) => {
  setTempFiles([]); // 임시 파일 초기화, 이유: 업로드 완료 후 정리
  setIsUploading(false); // 업로드 종료, 이유: 상태 전환
  handleFilesChange(
    // 상위 컴포넌트에 알림, 이유: UI 갱신
    newUploadedUrls.map((img) => img.url), // URL 배열 추출, 이유: 이미지 표시
    100, // progress: 100%, 이유: 완료 표시
    false // isUploading: false, 이유: 업로드 종료
  );
  toast.success('파일 업로드가 완료되었습니다!'); // 성공 알림, 이유: 사용자 피드백
};

// handleUploadError: 업로드 실패 처리
// 의미: 업로드 실패 시 상태 복구와 사용자 알림
// 이유: 오류 상황에서 사용자 경험 유지 및 상태 일관성
const handleUploadError = (
  error: Error, // error: 발생한 에러, 이유: 디버깅 및 처리, 설명: 'unknown' 대신 'Error'로 변경, 이유: instanceof Error로 처리 가능, 더 구체적
  tempFiles: File[], // tempFiles: 현재 임시 파일, 이유: 실패 시 복구
  setIsUploading: (isUploading: boolean) => void, // setIsUploading: 상태 초기화, 이유: UI 갱신
  setProgress: (progress: number) => void, // setProgress: 진행률 초기화, 이유: 상태 정리
  handleFilesChange: (
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void // handleFilesChange: 상위 동기화, 이유: UI 반영
) => {
  console.error('사진 업로드 실패:', error); // 에러 로그, 이유: 디버깅
  const errorMessage = // errorMessage: 에러 메시지, 이유: 사용자 알림
    error instanceof Error ? error.message : '알 수 없는 오류';
  toast.error('사진 업로드 중 에러가 발생했습니다: ' + errorMessage); // 실패 알림, 이유: 피드백
  setIsUploading(false); // 상태 초기화, 이유: 업로드 중단
  setProgress(0); // 진행률 초기화, 이유: 상태 정리
  handleFilesChange(
    // 상위 컴포넌트에 알림, 이유: UI 복구
    tempFiles.map((file) => URL.createObjectURL(file)), // 임시 URL 생성, 이유: 실패 시 원래 이미지 표시
    0, // progress: 0%, 이유: 실패 표시
    false // isUploading: false, 이유: 업로드 종료
  );
};

// handleFileUpload: 파일 업로드 처리 (통합 로직)
// 의미: 업로드 전체 프로세스 관리
// 이유: 각 단계(준비, 실행, 성공/실패)를 조정
async function handleFileUpload(
  e: React.ChangeEvent<HTMLInputElement>, // e: 파일 입력 이벤트, 이유: 사용자 입력
  existingBaseFileNames: string[], // existingBaseFileNames: 기존 파일명, 이유: 중복 체크
  tempFiles: File[], // tempFiles: 현재 임시 파일, 이유: 상태 유지
  setTempFiles: (files: File[]) => void, // setTempFiles: 상태 업데이트, 이유: UI 반영
  setIsUploading: (isUploading: boolean) => void, // setIsUploading: 상태 전환, 이유: 진행 상태
  setProgress: (progress: number) => void, // setProgress: 진행률 업데이트, 이유: 피드백
  handleFilesChange: (
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void, // handleFilesChange: 상위 동기화, 이유: UI 갱신
  safeGetToken: () => Promise<string | null>, // safeGetToken: 인증 토큰, 이유: 인증 처리
  setImageTitle: (name: ImageFileName[]) => void
) {
  // 초기 인증 정보 가져오기
  // 의미: 업로드 시작 전 기본 인증 정보 설정
  // 이유: fetchAuthParams를 활용해 초기 인증 데이터 확보
  const initialAuthParams = await fetchAuthParams(safeGetToken);
  console.log('초기 인증 정보:', initialAuthParams); // 디버깅용 로그

  const { success, newFiles } = checkUploadConditionsAndSetState(
    // 준비 단계 호출, 이유: 조건 체크 및 파일 준비
    e,
    existingBaseFileNames,
    tempFiles,
    setTempFiles,
    setIsUploading,
    setProgress,
    handleFilesChange,
    setImageTitle
  );
  if (!success) {
    // 조건: 준비 실패, 이유: 불필요한 처리 방지
    return; // 조기 반환, 이유: 중단
  }
  try {
    // try: 비동기 처리 블록, 이유: 에러 처리
    const newUploadedUrls = await performUpload(
      // newUploadedUrls: 업로드 결과, 이유: 파일 업로드
      newFiles,
      () => fetchUniqueAuthParams(safeGetToken), // 각 요청마다 새로운 인증 정보 생성
      // 의미: fetchUniqueAuthParams 호출로 토큰 중복 방지
      // 이유: ImageKit 400 에러 해결
      setProgress
    );
    handleUploadSuccess(
      // 성공 처리, 이유: 상태 및 UI 업데이트
      newUploadedUrls,
      setTempFiles,
      setIsUploading,
      handleFilesChange
    );
  } catch (error) {
    // catch: 에러 처리, 이유: 실패 대응
    handleUploadError(
      // 실패 처리, 이유: 상태 복구 및 알림
      error as Error,
      tempFiles,
      setIsUploading,
      setProgress,
      handleFilesChange
    );
  }
}

function useHandleFileUpload() {
  // useHandleFileUpload: React 훅 정의, 이유: 파일 업로드 기능 제공
  const {
    tempFiles,
    setTempFiles,
    setIsUploading,
    setProgress,
    setImageTitle,
  } = useImageManagementStore(); // 상태 및 함수 추출, 이유: Zustand 스토어 사용
  const { handleFilesChange } = useHandleFilesChange(); // 파일 변경 핸들러, 이유: 재사용
  const auth = useAuth(); // auth: 인증 객체, 이유: Clerk 인증
  const safeGetToken = // safeGetToken: 안전한 토큰 함수, 이유: null 방지
    typeof auth.getToken === 'function' ? auth.getToken : async () => null;

  return {
    // 반환 객체, 이유: 훅 사용 편의성
    handleFileUpload: (
      // handleFileUpload: 업로드 함수, 이유: 외부 호출
      e: React.ChangeEvent<HTMLInputElement>, // e: 이벤트, 이유: 파일 입력
      existingBaseFileNames: string[] // existingBaseFileNames: 기존 파일명, 이유: 중복 체크
    ) =>
      handleFileUpload(
        // 호출, 이유: 로직 실행
        e,
        existingBaseFileNames,
        tempFiles,
        setTempFiles,
        setIsUploading,
        setProgress,
        handleFilesChange,
        safeGetToken,
        setImageTitle
      ),
  };
}

export default useHandleFileUpload; // export: 모듈 내보내기, 이유: 다른 파일에서 사용 가능
