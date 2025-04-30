import { useAuth } from '@clerk/clerk-react';
import { GetToken } from '@clerk/types';
import { useEffect, useState } from 'react';

type userAuthType = {
  isSignedIn: boolean | undefined;
  isAuthFetchingLoadingStatus: boolean | undefined;
  token: string | null;
  getToken: GetToken;
  authStatusMessage: string | null;
};

export function useCheckAuthToken() {
  const [authState, setAuthState] = useState<userAuthType>({
    isSignedIn: undefined,
    token: null,
    isAuthFetchingLoadingStatus: false,
    getToken: () => Promise.resolve(null),
    authStatusMessage: null,
  });
  const { getToken, isSignedIn } = useAuth();

  const fetchToken = async () => {
    let authStatusMessage = '';
    let token = null;

    switch (isSignedIn) {
      case true:
        try {
          token = await getToken();
          authStatusMessage = '현재 유저가 로그인된 상태입니다.';
        } catch (error) {
          if (error instanceof Error) {
            console.error('getToken 오류:', error);
            authStatusMessage = error.message;
          }
        }
        break;

      case false:
        authStatusMessage =
          '현재 로그인에 실패한 상태입니다. 로그인 상태를 체크해주세요.';
        break;

      default:
        authStatusMessage = '유저의 로그인 상태를 알 수 없습니다.';
        break;
    }

    return {
      isSignedIn,
      token,
      getToken,
      authStatusMessage,
    };
  };

  useEffect(() => {
    if (isSignedIn === undefined) {
      return;
    }

    const processAuth = async () => {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthFetchingLoadingStatus: true,
      }));
      const { isSignedIn, token, getToken, authStatusMessage } =
        await fetchToken();
      setAuthState({
        isSignedIn,
        token,
        getToken,
        authStatusMessage,
        isAuthFetchingLoadingStatus: false,
      });
    };

    processAuth();
  }, [isSignedIn]);

  return authState;
}
