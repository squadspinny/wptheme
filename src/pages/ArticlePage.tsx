import React from 'react';
import { Article } from '../types';
import { ArticleRenderer } from '../components/ArticleRenderer';
import { defaultArticle } from '../articles';

interface ArticlePageProps {
  article?: Article;
  onBack: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onBack,
}) => {
  const currentArticle = article || defaultArticle;

  return <ArticleRenderer article={currentArticle} onBack={onBack} />;
};
