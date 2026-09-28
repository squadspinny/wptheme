import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
  onNavigatePrivacy,
  onNavigateTerms
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 text-sm w-full max-w-full mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Brand Column - Text-based branding as specified */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-5 lg:pr-8">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="flex items-center text-left cursor-pointer group no-underline"
              aria-label="Errorease - Home"
            >
              <span className="text-2xl sm:text-3xl font-bold tracking-normal text-gray-900">
                Error<span className="text-blue-600">ease</span>
              </span>
            </a>

            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Errorease provides clear, tested step-by-step guides for troubleshooting Windows Blue Screen (BSOD) stop codes, driver stack overruns, and kernel crashes with verified administrative terminal commands.
            </p>

            <div className="pt-2">
              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateHome();
                }}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[1px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold tracking-normal transition-all cursor-pointer shadow-xs no-underline"
              >
                <span>Browse All Error Guides</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-1 border-b border-gray-100">
              Pages
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome();
                  }} 
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer py-0.5 no-underline block"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateAbout();
                  }} 
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer py-0.5 no-underline block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateContact();
                  }} 
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer py-0.5 no-underline block"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a 
                  href="/privacy-policy" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePrivacy();
                  }} 
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer py-0.5 no-underline block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTerms();
                  }} 
                  className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer py-0.5 no-underline block"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Disclaimer Column */}
          <div className="sm:col-span-1 lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-1 border-b border-gray-100">
              Disclaimer &amp; Support
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Errorease is an independent technical troubleshooting resource. Windows is a registered trademark of Microsoft Corporation. Always backup important data before executing disk or memory modifications.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer py-1"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-gray-200 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Errorease. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a 
              href="/privacy-policy" 
              onClick={(e) => {
                e.preventDefault();
                onNavigatePrivacy();
              }} 
              className="hover:text-blue-600 cursor-pointer no-underline text-inherit"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="/terms" 
              onClick={(e) => {
                e.preventDefault();
                onNavigateTerms();
              }} 
              className="hover:text-blue-600 cursor-pointer no-underline text-inherit"
            >
              Terms of Use
            </a>
            <span>•</span>
            <a 
              href="/contact" 
              onClick={(e) => {
                e.preventDefault();
                onNavigateContact();
              }} 
              className="hover:text-blue-600 cursor-pointer no-underline text-inherit"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
