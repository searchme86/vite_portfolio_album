import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/Homepage';
import PostListPage from './routes/PostListPage';
import Write from './Pages/Post/Write';
import PostWriteForm from './Pages/Post/PostWrite/parts/PostWriteForm';
import EditPostPage from './Pages/Post/EditPostPage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import SinglePostPage from './routes/SinglePostPage';
import MainLayout from './layouts/MainLayout';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TagPostsPage from './components/tags/TagPostsPage.js';
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
        // element: <Write />,
        element: <PostWriteForm />,
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
