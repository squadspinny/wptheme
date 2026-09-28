import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Calendar, 
  CheckCircle2,
  Mail
} from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
  onContactClick: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ 
  onNavigateHome, 
  onContactClick 
}) => {
  useEffect(() => {
    updatePageSEO({
      title: 'Privacy Policy – Errorease',
      description: 'Read the Errorease privacy policy regarding data collection, cookie usage, analytics, and advertising compliance.',
      canonicalPath: '/privacy-policy',
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy',
        description: 'Read the Errorease privacy policy regarding data collection, cookie usage, analytics, and advertising compliance.',
        url: 'https://errorease.com/privacy-policy',
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
            <span className="text-gray-900 font-semibold">Privacy Policy</span>
          </nav>
        </div>

        <header className="space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-snug">
            Privacy Policy
          </h1>

          <div className="flex items-center gap-4 sm:gap-5 pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Effective: September 18, 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>GDPR &amp; CCPA Compliant</span>
            </div>
          </div>
        </header>
      </div>

      {/* 2. Page Content in .seo-article-container & .seo-article-content */}
      <div className="seo-article-container seo-article-content w-full bg-white border border-gray-200 rounded-[1px] px-3 py-6 sm:px-8 sm:py-10 md:px-10 md:py-12 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose shadow-xs overflow-hidden">
        
        <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed">
          At <strong>Errorease</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we believe in transparent, privacy-first technical publishing. This Privacy Policy details our operational data practices when you visit our website, read our technical troubleshooting guides, or submit inquiries to our systems engineering diagnostic team.
        </p>

        <h2>1. Our Privacy Commitment &amp; Core Principles</h2>

        <p>
          We operate under strict privacy principles designed to protect your personal information:
        </p>

        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
          <li>
            <strong>No User Registration Required:</strong> All technical walkthroughs, command-line references, and stop code diagnostics are freely accessible without requiring you to create an account, register, or disclose your identity.
          </li>
          <li>
            <strong>We Never Sell or Rent Personal Data:</strong> We do not broker, trade, or monetize visitor data or technical inquiries with third-party data brokers or marketing affiliates.
          </li>
          <li>
            <strong>Zero Invasive Telemetry:</strong> We do not deploy invasive keystroke monitors, screen recording trackers, or background telemetry miners.
          </li>
        </ul>

        <h2>2. Information We Collect (and What We Never Collect)</h2>

        <p>
          We strictly restrict our data collection to the minimum technical information required to serve error guides and address troubleshooting inquiries:
        </p>

        <div className="space-y-4 my-4">
          <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] space-y-2">
            <h3 className="text-base font-bold text-gray-900 !m-0 !p-0 !bg-transparent !border-0 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>A. Voluntarily Submitted Information</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              When you submit a message through our Contact form, you provide your name, email address, operating system release, and crash details (such as a Windows BugCheck stop code or Event Viewer log excerpt). This data is utilized solely by our systems engineers to investigate your crash scenario and draft a technical reply.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] space-y-2">
            <h3 className="text-base font-bold text-gray-900 !m-0 !p-0 !bg-transparent !border-0 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>B. Server Log Infrastructure Data</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our cloud web servers automatically log non-identifying technical data, including browser user-agent strings, operating system family, referring URLs, search queries entered into our live guide filter, and generalized geographic location (country or state level). This data is retained briefly for load balancing and DDoS mitigation.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-200 text-blue-950 rounded-[1px] space-y-2">
            <h3 className="text-base font-bold text-blue-950 !m-0 !p-0 !bg-transparent !border-0 flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-700" />
              <span>C. What Errorease Strictly NEVER Collects</span>
            </h3>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              We never access, collect, or store private personal files, passwords, credit card numbers, system registry keys, or unredacted kernel memory dumps from your personal computer.
            </p>
          </div>
        </div>

        <h2>3. Cookies and Local Storage Usage</h2>

        <p>
          Errorease employs lightweight browser cookies and standard client-side local storage (<code className="bg-gray-100 px-1.5 py-0.5 font-mono text-xs border border-gray-200 rounded-[1px]">localStorage</code>) exclusively for essential functional purposes:
        </p>

        <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-700">
          <li>Remembering your active guide search queries and category filter selections.</li>
          <li>Saving whether you submitted guide feedback (&ldquo;Did this troubleshooting guide resolve your error?&rdquo;) to prevent duplicate prompts.</li>
          <li>Ensuring high-speed page caching and minimal server load.</li>
        </ul>

        <p>
          You are free to disable cookies and wipe local storage via your web browser settings at any time without degrading your ability to read our diagnostic articles.
        </p>

        <h2>4. Third-Party Hardware &amp; Driver Vendor Links</h2>

        <p>
          Our technical guides regularly reference and link to official hardware vendor websites (such as Microsoft Support, Intel Download Center, AMD Drivers &amp; Support, and NVIDIA Driver Downloads) to help you retrieve official, WHQL-certified device drivers.
        </p>

        <p>
          Errorease has no control over the privacy policies, tracking mechanisms, or data collection practices of external vendor websites. We encourage you to consult the privacy policies of any third-party portal you access through our outbound links.
        </p>

        <h2>5. Statutory Data Protection Rights (GDPR &amp; CCPA)</h2>

        <p>
          Depending on your jurisdiction—including residents of the European Economic Area (EEA), the United Kingdom, and the State of California—you hold specific legal rights regarding your personal information:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-[1px] space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-gray-900">Right to Access &amp; Portability</p>
            <p className="text-gray-600 leading-relaxed">You may request a copy of any personal email correspondence or crash reports you have submitted to our team.</p>
          </div>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-[1px] space-y-1 text-xs sm:text-sm">
            <p className="font-bold text-gray-900">Right to Erasure (&ldquo;To Be Forgotten&rdquo;)</p>
            <p className="text-gray-600 leading-relaxed">You may request the permanent deletion of your contact records and email exchanges from our support inbox.</p>
          </div>
        </div>

        <p>
          To exercise any of these statutory rights, please send an email to <span className="font-mono font-bold text-blue-700">privacy@errorease.com</span>. We process and confirm all verified requests within 30 days.
        </p>

        <h2>6. Policy Revisions &amp; Inquiries</h2>

        <p>
          We may update this Privacy Policy periodically to reflect enhancements in our diagnostic infrastructure or changes in international data privacy standards. Any revisions will be published immediately on this page with an updated effective date.
        </p>

        <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Questions Regarding Our Privacy Practices?</span>
            </p>
            <p className="text-gray-600 leading-relaxed">
              Reach out directly to our privacy officer or contact technical support.
            </p>
          </div>
          <button
            onClick={onContactClick}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[1px] transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Contact Privacy Team
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
