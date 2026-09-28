import React, { useEffect } from 'react';
import { ArrowLeft, ShieldAlert, Calendar, FileText, Mail } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

interface TermsPageProps {
  onNavigateHome: () => void;
  onContactClick: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigateHome, onContactClick }) => {
  useEffect(() => {
    updatePageSEO({
      title: 'Terms of Use – Errorease',
      description: 'Review the terms and conditions for accessing technical troubleshooting guides and administrative command references on Errorease.',
      canonicalPath: '/terms',
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms of Use',
        description: 'Review the terms and conditions for accessing technical troubleshooting guides and administrative command references on Errorease.',
        url: 'https://errorease.com/terms',
      },
    });
  }, []);

  return (
    <article className="w-full max-w-4xl mx-auto px-2 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 space-y-10 sm:space-y-12 animate-in fade-in duration-150 overflow-x-hidden">
      {/* 1. Page Header matching ArticleHeader design */}
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-200">
          <nav className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-500">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="inline-flex items-center gap-1.5 font-bold text-gray-700 hover:text-blue-600 transition-colors cursor-pointer no-underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </a>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Terms of Use</span>
          </nav>
        </div>

        <header className="space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-snug">
            Terms of Use
          </h1>

          <div className="flex items-center gap-4 sm:gap-5 pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Effective: September 18, 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Technical Diagnostic &amp; Educational Disclaimers</span>
            </div>
          </div>
        </header>
      </div>

      {/* 2. Page Content in .seo-article-container & .seo-article-content */}
      <div className="seo-article-container seo-article-content w-full bg-white border border-gray-200 rounded-[1px] px-3 py-6 sm:px-8 sm:py-10 md:px-10 md:py-12 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose shadow-xs overflow-hidden">
        
        <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed">
          Welcome to <strong>Errorease</strong>. By accessing, browsing, or executing any technical procedures and terminal commands outlined on this website, you agree to comply with and be bound by the following Terms of Use.
        </p>

        <h2>1. Acceptance of Terms &amp; Scope of Educational Service</h2>

        <p>
          Errorease is an independent technical publishing and diagnostics platform provided free of charge for informational, educational, and troubleshooting purposes. If you do not agree with any provision of these Terms of Use, your sole recourse is to discontinue using this website.
        </p>

        <p>
          We reserve the right to amend, augment, or replace these terms at our discretion to align with changes in operating system architecture, security standards, or applicable regulations.
        </p>

        <h2>2. Administrative Commands &amp; Technical Disclaimers</h2>

        <p>
          Troubleshooting complex Windows kernel stop codes (such as BugCheck <code className="bg-gray-100 px-1.5 py-0.5 font-mono text-xs border border-gray-200 rounded-[1px]">0x000000F7</code> or <code className="bg-gray-100 px-1.5 py-0.5 font-mono text-xs border border-gray-200 rounded-[1px]">0x000000EF</code>) frequently necessitates executing elevated administrative commands in Windows PowerShell or Command Prompt.
        </p>

        <div className="p-4 sm:p-5 bg-amber-50/80 border border-amber-200 text-amber-900 rounded-[1px] space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Essential System Precautions Prior to Diagnostic Actions</span>
          </div>
          <p className="leading-relaxed">
            Executing command-line interventions—including <strong>Deployment Image Servicing and Management (DISM)</strong>, <strong>System File Checker (SFC)</strong>, <strong>Driver Verifier</strong>, or manual registry edits—modifies critical operating system files. We strongly advise creating a <strong>Windows System Restore Point</strong> and verifying reliable data backups prior to modifying low-level system drivers or firmware.
          </p>
        </div>

        <p>
          All commands, scripts, registry keys, and troubleshooting protocols published on Errorease are provided &ldquo;as is&rdquo; without warranty of any kind, whether express or implied.
        </p>

        <h2>3. Intellectual Property &amp; Microsoft Trademark Notice</h2>

        <p>
          All original diagnostic analyses, architectural diagrams, editorial content, and website interface design are the proprietary intellectual property of Errorease and are protected by applicable copyright laws.
        </p>

        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
          <li>
            <strong>Independent Status:</strong> Errorease is an independent technical engineering publication. We are not affiliated with, sponsored by, or endorsed by Microsoft Corporation.
          </li>
          <li>
            <strong>Trademarks:</strong> Microsoft, Windows, Windows 11, Windows 10, PowerShell, and WinDbg are registered trademarks or trademarks of Microsoft Corporation in the United States and other countries.
          </li>
          <li>
            <strong>Hardware Vendors:</strong> Intel, AMD, NVIDIA, Realtek, and other brand names referenced in our diagnostic guides are the property of their respective trademark holders.
          </li>
        </ul>

        <h2>4. Limitation of Liability</h2>

        <p>
          Under no circumstances shall Errorease, its authors, editors, or systems administrators be held liable for any direct, indirect, incidental, consequential, or punitive damages—including data loss, hardware component failure, software incompatibilities, or system downtime—arising from your use of or reliance on any technical guides or commands published on this platform.
        </p>

        <p>
          You assume complete responsibility and risk for any modifications made to your computer systems, operating system configurations, device drivers, or UEFI/BIOS settings.
        </p>

        <h2>5. Inquiries &amp; Legal Notices</h2>

        <p>
          If you have questions regarding these Terms of Use, require permission for syndication, or wish to submit an editorial inquiry, please reach out to our team:
        </p>

        <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Need Direct Clarification on Our Terms?</span>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Contact our engineering and editorial desk directly.
            </p>
          </div>
          <button
            onClick={onContactClick}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[1px] transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Contact Support
          </button>
        </div>

      </div>

      {/* 3. Return to All Guides Footer Button matching ArticleRenderer */}
      <div className="pt-6 text-center">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold tracking-normal transition-colors cursor-pointer rounded-[1px] shadow-xs no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Error Guides</span>
        </a>
      </div>
    </article>
  );
};
