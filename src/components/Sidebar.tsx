import React from 'react';
import { PopularPost } from '../types';
import { Search, Calculator } from 'lucide-react';

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCategory?: (categoryName: string | null) => void;
  popularPosts: PopularPost[];
  onSelectPopularPost: (post: PopularPost) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  popularPosts,
  onSelectPopularPost
}) => {
  return (
    <aside className="space-y-8">
      
      {/* 1. SEARCH ARTICLES Widget */}
      <div className="bg-white border border-gray-200 p-6 sm:p-7 rounded-[1px] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-900 uppercase">
          <Search className="w-4 h-4 text-blue-600" />
          <span>Search Articles</span>
        </div>

        <div className="relative mt-4">
          <input
            id="sidebar-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, stop codes..."
            className="w-full pl-3.5 pr-10 py-2.5 sm:py-3 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder-gray-400 rounded-[1px]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3 sm:top-3.5 pointer-events-none" />
        </div>
      </div>

      {/* 2. POPULAR GUIDES Widget */}
      <div className="bg-white border border-gray-200 p-6 sm:p-7 space-y-5 rounded-[1px] shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-900 uppercase">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Popular Guides</span>
          </div>
          <button
            onClick={() => onSelectCategory?.(null)}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="space-y-3.5 pt-1">
          {popularPosts.map((post) => (
            <div
              key={post.id}
              className="py-0.5"
            >
              <a
                href={`/${post.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectPopularPost(post);
                }}
                className="flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer group no-underline text-inherit"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                <span className="text-xs sm:text-sm text-gray-800 group-hover:text-blue-600 font-medium transition-colors leading-relaxed">
                  {post.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
