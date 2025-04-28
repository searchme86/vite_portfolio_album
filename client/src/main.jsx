import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import Write from './Pages/Post/Write.jsx';
import EditPostPage from './Pages/Post/EditPostPage.jsx';

import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setupAxiosInterceptors } from './api/axios/axiosInterceptor'; // 1. 인터셉터 설정 함수 임포트 <--여기추가
// 2. Axios 인터셉터 설정에 사용
import { useAuthToken } from './hooks/useAuthToken.js'; // 1. 토큰 훅 임포트 <--여기추가
import TagPostsPage from './components/tags/TagPostsPage.jsx';
// 2. Clerk 토큰을 가져오기 위해 사용

const queryClient = new QueryClient();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/posts',
        element: <PostListPage />,
      },
      {
        path: '/:slug',
        element: <SinglePostPage />,
      },
      {
        path: '/write',
        element: <Write />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/edit/:postId',
        element: <EditPostPage />,
      },
      {
        path: '/tags/:tagName',
        element: <TagPostsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
