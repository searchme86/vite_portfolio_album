import { Link } from 'react-router-dom';
// import MainCategories from '../components/MainCategories';
import MainCategories from '@/components/MainCategories';
// import FeaturedPosts from '../components/FeaturedPosts';
import FeaturedPosts from '@/components/FeaturedPosts';
// import PostList from '../components/PostList';
// import PostList from '../components/post/PostList/PostList';
import PostList from '@/components/post/PostList/PostList';
// import TagHomepage from '../components/tags/TagHomepage';
import TagHomepage from '@/components/tags/TagHomepage';
// import TopLikedPosts from '../components/Like/TopLikedPosts/TopLikedPosts';
import TopLikedPosts from '@/components/Like/TopLikedPosts/TopLikedPosts';

const Homepage = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/*  */}
      <TopLikedPosts />
      {/*  */}
      {/* INTRODUCTION */}
      {/* 새로추가 */}
      <TagHomepage />
      {/* 새로추가 */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="">
          <h1 className="text-2xl font-bold text-gray-800 md:text-5xl lg:text-6xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h1>
          <p className="mt-8 text-md md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
            rerum accusantium.
          </p>
        </div>
        {/* animated button */}
        <Link to="write" className="relative hidden md:block">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            // className="text-lg tracking-widest animate-spin animatedButton"
            className="text-lg tracking-widest"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center w-20 h-20 m-auto bg-blue-800 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* CATEGORIES */}
      <MainCategories />
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;
