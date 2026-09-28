import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onNavigateHome: () => void;
  onCategorySelect: (categoryName: string) => void;
  activeNav: string;
}

interface MenuItem {
  name: string;
  id: string;
}

const MENU_ITEMS: MenuItem[] = [
  { name: 'Home', id: 'home' },
  { name: 'Windows', id: 'Windows' },
  { name: 'Browser', id: 'Browser' },
  { name: 'Network & DNS', id: 'Network & DNS' },
  { name: 'Programming', id: 'Programming' },
  { name: 'Software', id: 'Software' },
  { name: 'Guides', id: 'Guides' },
];

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onNavigateHome,
  onCategorySelect,
  activeNav
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Logo / Brand: Errorease */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              id="brand-logo-btn"
              className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-[1px] py-1 cursor-pointer select-none no-underline"
              aria-label="Errorease - Home"
            >
              <span className="text-2xl sm:text-3xl font-bold tracking-normal text-gray-900">
                Error<span className="text-blue-600">ease</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation: Home | Windows | Browser | Network & DNS | Programming | Software | Guides */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {MENU_ITEMS.map((item) => {
              const isActive =
                item.id === 'home'
                  ? activeNav === 'home'
                  : activeNav === item.name;

              const href = item.id === 'home' ? '/' : item.id === 'Guides' ? '/blog' : `/${item.id.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`;

              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(() => {
                      if (item.id === 'home') {
                        onNavigateHome();
                      } else {
                        onCategorySelect(item.name);
                      }
                    });
                  }}
                  className={`transition-colors py-2 flex items-center text-sm font-semibold cursor-pointer whitespace-nowrap no-underline ${
                    isActive
                      ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 font-medium'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onSearchClick}
              id="header-search-trigger"
              className="p-2.5 min-w-[42px] min-h-[42px] flex items-center justify-center rounded-[1px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors cursor-pointer border border-transparent sm:border-gray-200"
              aria-label="Search error articles"
              title="Search error guides"
            >
              <Search className="w-5 h-5 text-gray-700 hover:text-blue-600" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-[1px] text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {MENU_ITEMS.map((item) => {
            const isActive =
              item.id === 'home'
                ? activeNav === 'home'
                : activeNav === item.name;

            const href = item.id === 'home' ? '/' : item.id === 'Guides' ? '/blog' : `/${item.id.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`;

            return (
              <a
                key={item.id}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(() => {
                    if (item.id === 'home') {
                      onNavigateHome();
                    } else {
                      onCategorySelect(item.name);
                    }
                  });
                }}
                className={`w-full text-left px-3 py-2.5 rounded-[1px] text-base font-semibold min-h-[44px] flex items-center justify-between no-underline ${
                  isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
