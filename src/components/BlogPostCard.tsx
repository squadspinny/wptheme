import React from 'react';
import { Article } from '../types';
import { Calendar, ArrowRight } from 'lucide-react';

interface BlogPostCardProps {
  post: Article;
  onReadFull: (post: Article) => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadFull }) => {
  return (
    <article
      id={`post-${post.id || post.slug}`}
      className="bg-white border border-gray-200 hover:border-gray-300 px-3.5 py-6 sm:px-9 sm:py-9 md:px-10 md:py-10 transition-all duration-150 rounded-[1px] shadow-xs hover:shadow-md"
    >
      {/* 1. Title */}
      <h3 className="text-2xl sm:text-2xl md:text-[26px] font-bold text-gray-900 leading-snug sm:leading-normal">
        <a
          href={`/${post.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onReadFull(post);
          }}
          className="hover:text-blue-600 cursor-pointer transition-colors no-underline text-inherit"
        >
          {post.title}
        </a>
      </h3>

      {/* 2. Description */}
      <p className="mt-3.5 text-gray-600 text-sm sm:text-base leading-relaxed sm:leading-loose">
        {post.description}
      </p>

      {/* 3. Updated Date & 4. Read Full Guide Button */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{post.publishedAt}</span>
        </div>

        <a
          href={`/${post.slug}`}
          onClick={(e) => {
            e.preventDefault();
            onReadFull(post);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-[1px] transition-colors cursor-pointer shrink-0 shadow-xs no-underline"
        >
          <span>Read Full Guide</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};
