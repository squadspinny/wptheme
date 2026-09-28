export type ArticleSectionType =
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'code'
  | 'table'
  | 'callout'
  | 'label'
  | 'faq';

export interface ArticleSEO {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ArticleFAQItem {
  question: string;
  answer: string;
}

export type ListItem = string | { text: string; command?: string };

export interface HeadingSection {
  type: 'heading';
  level?: 2 | 3 | 4;
  title: string;
  id?: string;
}

export interface ParagraphSection {
  type: 'paragraph';
  content: string;
}

export interface ListSection {
  type: 'list';
  ordered?: boolean;
  items: ListItem[];
}

export interface CodeSection {
  type: 'code';
  code: string;
  language?: string;
  label?: string;
}

export interface TableSection {
  type: 'table';
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface CalloutSection {
  type: 'callout';
  variant?: 'info' | 'warning' | 'tip' | 'note';
  title?: string;
  content: string;
}

export interface LabelSection {
  type: 'label';
  text: string;
}

export interface FAQSection {
  type: 'faq';
  title?: string;
  items: ArticleFAQItem[];
}

export type ArticleSection =
  | HeadingSection
  | ParagraphSection
  | ListSection
  | CodeSection
  | TableSection
  | CalloutSection
  | LabelSection
  | FAQSection;

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  seo: ArticleSEO;
  sections: ArticleSection[];
  faq?: ArticleFAQItem[];

  // Optional article metadata
  id?: string;
  stopCode?: string;
  readTime?: string;
  views?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface PopularPost {
  id: string;
  title: string;
  stopCode?: string;
  views: string;
  category: string;
  badge?: string;
  isMainPost?: boolean;
}
