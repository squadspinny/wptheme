import React, { useMemo } from 'react';
import { Article } from '../types';
import { ArticleSectionRenderer } from './ArticleSection';
import { ArticleFAQ } from './ArticleFAQ';
import { AdBanner } from './AdBanner';

interface ArticleContentProps {
  article: Article;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const hasFaqSection = article.sections.some((s) => s.type === 'faq');

  // Place the ad inside the article content between relevant sections:
  // Preference: After the first major section (right before the 2nd H2 heading) or after the introduction
  const adInsertionIndex = useMemo(() => {
    const h2Indices: number[] = [];
    article.sections.forEach((s, idx) => {
      if (s.type === 'heading' && s.level === 2) {
        h2Indices.push(idx);
      }
    });

    if (h2Indices.length >= 2) {
      return h2Indices[1];
    }
    if (h2Indices.length === 1 && h2Indices[0] > 0) {
      return h2Indices[0];
    }
    return Math.min(2, article.sections.length);
  }, [article.sections]);

  return (
    <section className="seo-article-container seo-article-content w-full bg-white border border-gray-200 rounded-[1px] px-3 py-6 sm:px-8 sm:py-10 md:px-10 md:py-12 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose shadow-xs overflow-hidden">
      {article.sections.map((section, idx) => (
        <React.Fragment key={idx}>
          {idx === adInsertionIndex && (
            <AdBanner className="my-8 sm:my-10" />
          )}
          <ArticleSectionRenderer section={section} />
        </React.Fragment>
      ))}

      {/* Render top-level FAQs if defined and not already inserted as an explicit section */}
      {!hasFaqSection && article.faq && article.faq.length > 0 && (
        <>
          <h2>Frequently Asked Questions</h2>
          <ArticleFAQ items={article.faq} />
        </>
      )}
    </section>
  );
};
