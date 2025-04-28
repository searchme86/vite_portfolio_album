import React from 'react';
import TagList from './TagList';

function TagHomepage() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. 태그 리스트 표시 */}
      {/* 2. 중복 없는 태그 리스트 렌더링 */}
      <TagList />
      {/* 나머지 홈페이지 콘텐츠 */}
      <div>
        <h1 className="text-xl font-semibold md:text-3xl xl:text-4xl 2xl:text-5xl">
          Welcome to the Blog
        </h1>
        {/* 포스트 리스트 등 추가 콘텐츠 */}
      </div>
    </div>
  );
}

export default TagHomepage;
