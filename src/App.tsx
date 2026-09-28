import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BlogPostCard } from './components/BlogPostCard';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';

// Individual Pages
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

import {
  articles,
  defaultArticle,
  findArticleBySlug,
} from './articles';
import { POPULAR_POSTS } from './data/articles';
import { Article, PopularPost } from './types';
import { Search, Filter } from 'lucide-react';
import { updatePageSEO } from './utils/seo';

type PageView = 'home' | 'article' | 'about' | 'contact' | 'privacy' | 'terms';

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [activeArticle, setActiveArticle] = useState<Article>(defaultArticle);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('home');

  // Parse clean browser URL pathname to support clean root-level URLs & History API
  const handleLocationChange = useCallback(() => {
    // 1. Backward compatibility: smoothly migrate any legacy hash URL to clean path
    if (window.location.hash && window.location.hash.startsWith('#/')) {
      const legacyPath = window.location.hash.replace(/^#\/?(article|blog)\//, '/').replace(/^#/, '');
      const targetCleanPath = legacyPath.startsWith('/') ? legacyPath : `/${legacyPath}`;
      window.history.replaceState({}, '', targetCleanPath);
    }

    const rawPath = window.location.pathname.toLowerCase().trim();
    const cleanSlug = rawPath.replace(/^\/+/, '').replace(/\/+$/, '');

    // 2. Route matching
    if (cleanSlug === '' || cleanSlug === 'index.html') {
      setCurrentView('home');
      setActiveNav('home');
    } else if (cleanSlug === 'about') {
      setCurrentView('about');
      setActiveNav('about');
    } else if (cleanSlug === 'contact') {
      setCurrentView('contact');
      setActiveNav('contact');
    } else if (cleanSlug === 'privacy-policy' || cleanSlug === 'privacy') {
      setCurrentView('privacy');
      setActiveNav('privacy');
    } else if (cleanSlug === 'terms' || cleanSlug === 'terms-of-use') {
      setCurrentView('terms');
      setActiveNav('home');
    } else if (cleanSlug === 'blog' || cleanSlug === 'guides') {
      setCurrentView('home');
      setSelectedCategory(null);
      setActiveNav('Guides');
    } else if (cleanSlug === 'windows') {
      setCurrentView('home');
      setSelectedCategory('Windows');
      setActiveNav('Windows');
    } else if (cleanSlug === 'browser') {
      setCurrentView('home');
      setSelectedCategory('Browser');
      setActiveNav('Browser');
    } else if (cleanSlug === 'network-dns') {
      setCurrentView('home');
      setSelectedCategory('Network & DNS');
      setActiveNav('Network & DNS');
    } else if (cleanSlug === 'programming') {
      setCurrentView('home');
      setSelectedCategory('Programming');
      setActiveNav('Programming');
    } else if (cleanSlug === 'software') {
      setCurrentView('home');
      setSelectedCategory('Software');
      setActiveNav('Software');
    } else {
      // Direct root-level article slug matching (e.g. /driver-overran-stack-buffer)
      const found = findArticleBySlug(cleanSlug);
      if (found) {
        // If arrived via old /article/slug or /blog/slug, replaceState to clean root slug
        if (rawPath.startsWith('/article/') || rawPath.startsWith('/blog/')) {
          window.history.replaceState({}, '', `/${found.slug}`);
        }
        setActiveArticle(found);
        setCurrentView('article');
        setActiveNav(found.category);
      } else {
        // Unrecognized route fallback
        setCurrentView('home');
        setActiveNav('home');
      }
    }
  }, []);

  useEffect(() => {
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [handleLocationChange]);

  // Sync homepage SEO when on home view
  useEffect(() => {
    if (currentView === 'home') {
      if (window.location.pathname === '/blog') {
        updatePageSEO({
          title: 'Troubleshooting Guides & Stop Code Index – Errorease',
          description: 'Browse all verified technical troubleshooting guides for Windows 11 and 10 stop codes, kernel crashes, and device driver conflicts.',
          canonicalPath: '/blog',
          type: 'website',
        });
      } else {
        updatePageSEO({
          title: 'Errorease – Windows Error Codes & Tech Troubleshooting Guides',
          description: 'Clear, step-by-step guides for fixing Windows stop codes, Blue Screen (BSOD) crashes, driver conflicts, and system bugs with ease.',
          canonicalPath: '/',
          keywords: ['Windows errors', 'BSOD fix', 'Driver Overran Stack Buffer', '0xF7 error', 'stop code', 'Windows 11 troubleshooting', 'Windows 10 BSOD'],
          type: 'website',
        });
      }
    }
  }, [currentView]);

  // Clean Navigation helpers using History API pushState
  const navigateTo = (view: PageView, pathStr: string = '/') => {
    setCurrentView(view);
    if (window.location.pathname !== pathStr) {
      window.history.pushState({}, '', pathStr);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (art: Article) => {
    setActiveArticle(art);
    setCurrentView('article');
    setActiveNav(art.category);
    const cleanPath = `/${art.slug}`;
    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', cleanPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setActiveNav('home');
    navigateTo('home', '/');
  };

  const handleNavigateAbout = () => {
    setActiveNav('about');
    navigateTo('about', '/about');
  };

  const handleNavigateContact = () => {
    setActiveNav('contact');
    navigateTo('contact', '/contact');
  };

  const handleNavigatePrivacy = () => {
    setActiveNav('privacy');
    navigateTo('privacy', '/privacy-policy');
  };

  const handleNavigateTerms = () => {
    setActiveNav('terms');
    navigateTo('terms', '/terms');
  };

  // Filter logic for live search & category selection across modular articles
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'Guides') {
        const matchesCategoryTag = art.tags.some(
          (t) => t.toLowerCase() === selectedCategory.toLowerCase()
        );
        const matchesCatName =
          art.category.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === 'Windows' &&
            (art.tags.some(
              (t) => t.toLowerCase().includes('windows') || t.toLowerCase().includes('bsod')
            ) ||
              art.category === 'BSOD Stop Codes' ||
              art.title.toLowerCase().includes('windows'))) ||
          (selectedCategory === 'Browser' &&
            art.tags.some((t) =>
              ['browser', 'chrome', 'edge', 'firefox'].includes(t.toLowerCase())
            )) ||
          (selectedCategory === 'Network & DNS' &&
            art.tags.some((t) =>
              ['network', 'dns', 'wi-fi', 'ethernet'].includes(t.toLowerCase())
            )) ||
          (selectedCategory === 'Programming' &&
            art.tags.some((t) =>
              ['code', 'developer', 'programming'].includes(t.toLowerCase())
            )) ||
          (selectedCategory === 'Software' &&
            art.tags.some((t) =>
              ['software', 'app', 'crash'].includes(t.toLowerCase())
            )) ||
          (selectedCategory === 'Device Drivers' && art.tags.includes('Driver Error'));

        if (!matchesCategoryTag && !matchesCatName) {
          return false;
        }
      }

      // Search filter across title, stop code, excerpt, tags, sections, and FAQs
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = art.title.toLowerCase().includes(query);
        const matchesStopCode = art.stopCode?.toLowerCase().includes(query) ?? false;
        const matchesDesc = art.description.toLowerCase().includes(query);
        const matchesTags = art.tags.some((tag) => tag.toLowerCase().includes(query));

        const matchesSections = art.sections.some((s) => {
          if (s.type === 'heading') return s.title.toLowerCase().includes(query);
          if (s.type === 'paragraph') return s.content.toLowerCase().includes(query);
          if (s.type === 'label') return s.text.toLowerCase().includes(query);
          if (s.type === 'code') return s.code.toLowerCase().includes(query);
          if (s.type === 'callout')
            return (
              (s.title?.toLowerCase().includes(query) ?? false) ||
              s.content.toLowerCase().includes(query)
            );
          if (s.type === 'list') {
            return s.items.some((item) =>
              typeof item === 'string'
                ? item.toLowerCase().includes(query)
                : item.text.toLowerCase().includes(query) ||
                  (item.command?.toLowerCase().includes(query) ?? false)
            );
          }
          return false;
        });

        const matchesFaq =
          art.faq?.some(
            (f) =>
              f.question.toLowerCase().includes(query) ||
              f.answer.toLowerCase().includes(query)
          ) ?? false;

        return (
          matchesTitle ||
          matchesStopCode ||
          matchesDesc ||
          matchesTags ||
          matchesSections ||
          matchesFaq
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    setActiveNav(categoryName || 'home');
    const path = categoryName
      ? categoryName === 'Guides'
        ? '/blog'
        : `/${categoryName.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`
      : '/';
    if (currentView !== 'home') {
      navigateTo('home', path);
    } else if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    const mainSection = document.getElementById('main-content-section');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPopularPost = (popular: PopularPost) => {
    const matched =
      findArticleBySlug(popular.id) ||
      (popular.stopCode ? findArticleBySlug(popular.stopCode) : undefined);
    if (matched) {
      navigateToArticle(matched);
    } else {
      setSearchQuery(popular.stopCode || popular.title);
      if (currentView !== 'home') {
        navigateTo('home', '/');
      }
      const mainSection = document.getElementById('main-content-section');
      if (mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearchClick = () => {
    if (currentView !== 'home') {
      navigateTo('home', '/');
      setTimeout(() => {
        const heroInput = document.getElementById('hero-live-search');
        heroInput?.focus();
      }, 150);
    } else {
      const heroInput = document.getElementById('hero-live-search');
      if (heroInput) {
        heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        heroInput.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-blue-600 selection:text-white font-sans">
      {/* Header */}
      <Header
        onSearchClick={handleSearchClick}
        onNavigateHome={handleNavigateHome}
        onCategorySelect={handleCategorySelect}
        activeNav={activeNav}
      />

      {/* RENDER INDIVIDUAL PAGES */}

      {/* 1. INDIVIDUAL ARTICLE PAGE */}
      {currentView === 'article' && (
        <main className="flex-1 w-full">
          <ArticlePage
            article={activeArticle}
            onBack={handleNavigateHome}
          />
        </main>
      )}

      {/* 2. INDIVIDUAL ABOUT PAGE */}
      {currentView === 'about' && (
        <main className="flex-1 w-full">
          <AboutPage
            onNavigateHome={handleNavigateHome}
            onContactClick={handleNavigateContact}
          />
        </main>
      )}

      {/* 3. INDIVIDUAL CONTACT PAGE */}
      {currentView === 'contact' && (
        <main className="flex-1 w-full">
          <ContactPage onNavigateHome={handleNavigateHome} />
        </main>
      )}

      {/* 4. INDIVIDUAL PRIVACY POLICY PAGE */}
      {currentView === 'privacy' && (
        <main className="flex-1 w-full">
          <PrivacyPolicyPage
            onNavigateHome={handleNavigateHome}
            onContactClick={handleNavigateContact}
          />
        </main>
      )}

      {/* 5. INDIVIDUAL TERMS OF USE PAGE */}
      {currentView === 'terms' && (
        <main className="flex-1 w-full">
          <TermsPage
            onNavigateHome={handleNavigateHome}
            onContactClick={handleNavigateContact}
          />
        </main>
      )}

      {/* 6. HOME PAGE (Hero + Guides List + Sidebar) */}
      {currentView === 'home' && (
        <>
          <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <main
            id="main-content-section"
            className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16"
          >
            {/* Homepage High-Visibility Ad Banner (Desktop: 728x90, Mobile: 300x250) */}
            <AdBanner className="mb-8 sm:mb-10" />

            {/* Active filter status badge */}
            {(selectedCategory || searchQuery) && (
              <div className="mb-8 w-full bg-white border border-gray-200 border-l-4 border-l-blue-600 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm rounded-[1px] shadow-xs">
                <div className="flex items-center gap-2.5 text-gray-700 font-medium">
                  <Filter className="w-4 h-4 text-blue-600" />
                  <span>
                    Active Filter:{' '}
                    {selectedCategory && (
                      <strong className="text-blue-700 mr-2">
                        Category: &ldquo;{selectedCategory}&rdquo;
                      </strong>
                    )}
                    {searchQuery && (
                      <span className="text-gray-900">
                        Search: &ldquo;<strong>{searchQuery}</strong>&rdquo;
                      </span>
                    )}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                    setActiveNav('home');
                  }}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
                >
                  Clear Filters ×
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
              {/* Left Column: Guides list */}
              <section className="lg:col-span-8 space-y-8 sm:space-y-10">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Troubleshooting Guides
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-500 font-medium">
                    Showing {filteredArticles.length} of {articles.length} guides
                  </span>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="space-y-8 sm:space-y-10">
                    {filteredArticles.map((art) => (
                      <BlogPostCard
                        key={art.slug}
                        post={art}
                        onReadFull={navigateToArticle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full bg-white border border-gray-200 py-16 px-6 text-center rounded-[1px] shadow-xs">
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center mx-auto mb-4 rounded-full">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      No error guides found
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                      We couldn&apos;t find any error guides matching &ldquo;{searchQuery}&rdquo;.
                      Try searching for &ldquo;0xF7&rdquo;, &ldquo;BSOD&rdquo;, or &ldquo;driver&rdquo;.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                      }}
                      className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer rounded-[1px] shadow-xs"
                    >
                      Clear Search &amp; View All Guides
                    </button>
                  </div>
                )}
              </section>

              {/* Right Sidebar */}
              <section className="lg:col-span-4">
                <div className="sticky top-26">
                  <Sidebar
                    searchQuery={searchQuery}
                    setSearchQuery={(q) => setSearchQuery(q)}
                    onSelectCategory={handleCategorySelect}
                    popularPosts={POPULAR_POSTS}
                    onSelectPopularPost={handleSelectPopularPost}
                  />
                </div>
              </section>
            </div>
          </main>
        </>
      )}

      {/* Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
        onNavigatePrivacy={handleNavigatePrivacy}
        onNavigateTerms={handleNavigateTerms}
      />
    </div>
  );
}
