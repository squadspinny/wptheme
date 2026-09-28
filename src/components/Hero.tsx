import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="bg-white border-b border-gray-200 py-14 sm:py-18 md:py-22">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        
        {/* Headline with Literata natural proportions */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug sm:leading-normal">
          Free Windows{' '}
          <span className="text-blue-600">Error &amp; BSOD Guides</span>
        </h1>

        {/* Short paragraph with spacious line height */}
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed sm:leading-loose">
          Diagnose and fix Windows stop codes, Blue Screen (BSOD) crashes, driver overruns, and system conflicts with verified terminal commands and step-by-step walkthroughs.
        </p>

        {/* Live Search Bar with generous sizing */}
        <div className="max-w-2xl mx-auto relative pt-2 sm:pt-4">
          <div className="relative flex items-center shadow-xs">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              ref={inputRef}
              id="hero-live-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search error guides (e.g., 0xF7, Driver Overran, BSOD, sfc)..."
              className="w-full pl-12 pr-22 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all rounded-[1px]"
              autoComplete="off"
            />
            {searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  inputRef.current?.focus();
                }}
                className="absolute right-3.5 px-2.5 py-1 text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 cursor-pointer flex items-center gap-1 transition-colors rounded-[1px]"
                title="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            ) : (
              <div className="hidden sm:flex absolute right-4 items-center pointer-events-none">
                <kbd className="inline-flex items-center px-2 py-1 text-[11px] font-mono font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-[1px]">
                  /
                </kbd>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
