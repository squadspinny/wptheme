import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowLeft, Calendar, Clock, Share2, Check } from 'lucide-react';

interface ArticleHeaderProps {
  article: Article;
  onBack?: () => void;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onBack }) => {
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = () => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://errorease.com';
    const shareUrl = `${origin}/${article.slug}`;
    navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const displayDate = article.publishedAt || 'Recently Updated';
  const displayReadTime = article.readTime || '6 min read';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Navigation & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-200">
        <nav className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-500">
          {onBack && (
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="inline-flex items-center gap-1.5 font-bold text-gray-700 hover:text-blue-600 transition-colors cursor-pointer no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </a>
          )}
          <span>/</span>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onBack?.();
            }}
            className="text-gray-500 hover:text-blue-600 transition-colors cursor-pointer no-underline"
          >
            Guides
          </a>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs">
            {article.stopCode || article.category}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-xs font-semibold text-gray-700 rounded-[1px] transition-colors cursor-pointer shadow-xs"
            title="Copy link to this guide"
          >
            {shareCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-gray-500" />
                <span>Share Guide</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Heading & Metadata */}
      <header className="space-y-4 sm:space-y-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-snug">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 sm:gap-5 pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{displayDate}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{displayReadTime}</span>
          </div>
        </div>
      </header>
    </div>
  );
};
