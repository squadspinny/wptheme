import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { ArticleHeader } from './ArticleHeader';
import { ArticleContent } from './ArticleContent';
import { ArrowLeft, CheckCircle2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { updatePageSEO, getCanonicalUrl } from '../utils/seo';

interface ArticleRendererProps {
  article: Article;
  onBack?: () => void;
}

export const ArticleRenderer: React.FC<ArticleRendererProps> = ({ article, onBack }) => {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);

  // Sync document title, meta description, canonical URL, and JSON-LD schema dynamically
  useEffect(() => {
    const seoTitle = article.seo?.title || `${article.title} – Errorease`;
    const seoDesc = article.seo?.description || article.description;
    const cleanCanonicalPath = `/${article.slug}`;

    updatePageSEO({
      title: seoTitle,
      description: seoDesc,
      canonicalPath: cleanCanonicalPath,
      keywords: article.seo?.keywords || article.tags,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      structuredData: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${getCanonicalUrl(cleanCanonicalPath)}#webpage`,
            url: getCanonicalUrl(cleanCanonicalPath),
            name: seoTitle,
            description: seoDesc,
            isPartOf: {
              '@type': 'WebSite',
              '@id': 'https://errorease.com/#website',
              name: 'Errorease',
              url: 'https://errorease.com',
            },
          },
          {
            '@type': 'TechArticle',
            '@id': `${getCanonicalUrl(cleanCanonicalPath)}#article`,
            headline: article.title,
            description: seoDesc,
            articleSection: article.category,
            keywords: (article.seo?.keywords || article.tags || []).join(', '),
            mainEntityOfPage: getCanonicalUrl(cleanCanonicalPath),
            author: {
              '@type': 'Organization',
              name: 'Errorease Engineering Team',
              url: 'https://errorease.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Errorease',
              url: 'https://errorease.com',
            },
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
          },
          ...(article.faq && article.faq.length > 0
            ? [
                {
                  '@type': 'FAQPage',
                  '@id': `${getCanonicalUrl(cleanCanonicalPath)}#faq`,
                  mainEntity: article.faq.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: item.answer,
                    },
                  })),
                },
              ]
            : []),
        ],
      },
    });

    // Reset feedback state on article change
    setFeedback(null);
  }, [article]);

  return (
    <article className="w-full max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 space-y-10 sm:space-y-12 animate-in fade-in duration-150 overflow-x-hidden">
      {/* 1. Article Header with navigation, title, date, reading time & share */}
      <ArticleHeader article={article} onBack={onBack} />

      {/* 2. Structured Article Content rendering all modular sections, in-article ad & FAQs */}
      <ArticleContent article={article} />

      {/* 3. Reader Feedback Section */}
      <section className="bg-white border border-gray-200 p-8 sm:p-10 text-center space-y-5 rounded-[1px] shadow-xs">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          Did this troubleshooting guide resolve your error?
        </h3>
        {feedback ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-800 font-bold inline-flex items-center gap-2.5 rounded-[1px]">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Thank you for your feedback! It helps improve our diagnostic steps.</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
            <button
              onClick={() => setFeedback('yes')}
              className="px-5 py-2.5 bg-white hover:bg-emerald-50 border border-gray-300 hover:border-emerald-500 text-xs sm:text-sm font-bold text-gray-800 hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-2 rounded-[1px] shadow-xs"
            >
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <span>Yes, my PC is stable</span>
            </button>
            <button
              onClick={() => setFeedback('no')}
              className="px-5 py-2.5 bg-white hover:bg-red-50 border border-gray-300 hover:border-red-500 text-xs sm:text-sm font-bold text-gray-800 hover:text-red-700 transition-colors cursor-pointer flex items-center gap-2 rounded-[1px] shadow-xs"
            >
              <ThumbsDown className="w-4 h-4 text-red-600" />
              <span>No, error still persists</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. Return to All Guides Footer Button */}
      {onBack && (
        <div className="pt-6 text-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold tracking-normal transition-colors cursor-pointer rounded-[1px] shadow-xs no-underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Error Guides</span>
          </a>
        </div>
      )}
    </article>
  );
};
