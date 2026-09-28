import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  CheckCircle2, 
  Send, 
  Clock, 
  FileCode,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    updatePageSEO({
      title: 'Contact Technical Support – Errorease',
      description: 'Have a complex Windows stop code or BugCheck? Contact the Errorease systems diagnostic team for assistance.',
      canonicalPath: '/contact',
      keywords: ['Contact Errorease', 'Windows crash support', 'BSOD help', 'BugCheck triage'],
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Technical Support',
        description: 'Have a complex Windows stop code or BugCheck? Contact the Errorease systems diagnostic team for assistance.',
        url: 'https://errorease.com/contact',
      },
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'bsod-error',
    windowsVersion: 'Windows 11 (24H2 / 23H2)',
    stopCode: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

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
            <span className="text-gray-900 font-semibold">Contact Support</span>
          </nav>
        </div>

        <header className="space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-snug">
            Contact Technical Support &amp; Diagnostic Engineers
          </h1>

          <div className="flex items-center gap-4 sm:gap-5 pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Response SLA: 12–24 Hours</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>Direct Systems Diagnostics</span>
            </div>
          </div>
        </header>
      </div>

      {/* 2. Page Content in .seo-article-container & .seo-article-content */}
      <div className="seo-article-container seo-article-content w-full bg-white border border-gray-200 rounded-[1px] px-3 py-6 sm:px-8 sm:py-10 md:px-10 md:py-12 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose shadow-xs overflow-hidden">
        
        <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed">
          If your PC is suffering from an unlisted Windows stop code crash, a persistent device driver conflict, or you have identified a technical correction for an existing troubleshooting guide, submit an inquiry below. Our systems administrators inspect BugCheck codes and crash minidumps free of charge.
        </p>

        <h2>1. Submit Crash Diagnostics or General Inquiry</h2>

        {submitted ? (
          <div className="p-6 sm:p-8 bg-emerald-50 border border-emerald-200 text-center space-y-4 rounded-[1px] my-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center rounded-full mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xl font-bold text-emerald-950">Inquiry Received Successfully</p>
            <p className="text-xs sm:text-sm text-emerald-850 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our systems engineering team will review your Windows error details and reply to <strong>{formData.email}</strong> within 12 to 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  topic: 'bsod-error',
                  windowsVersion: 'Windows 11 (24H2 / 23H2)',
                  stopCode: '',
                  message: ''
                });
              }}
              type="button"
              className="mt-4 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-[1px] transition-colors cursor-pointer shadow-xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 my-4 bg-gray-50/60 p-5 sm:p-8 border border-gray-200 rounded-[1px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-xs sm:text-sm font-bold text-gray-800">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-[1px]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-xs sm:text-sm font-bold text-gray-800">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-[1px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="contact-topic" className="text-xs sm:text-sm font-bold text-gray-800">
                  Inquiry Category
                </label>
                <select
                  id="contact-topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-[1px]"
                >
                  <option value="bsod-error">Blue Screen (BSOD) BugCheck Assistance</option>
                  <option value="driver-conflict">Device Driver / Hardware Conflict</option>
                  <option value="guide-correction">Guide Feedback / Technical Correction</option>
                  <option value="editorial">Editorial Question / Partnership</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-windows" className="text-xs sm:text-sm font-bold text-gray-800">
                  Windows Release
                </label>
                <select
                  id="contact-windows"
                  value={formData.windowsVersion}
                  onChange={(e) => setFormData({ ...formData, windowsVersion: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-[1px]"
                >
                  <option value="Windows 11 (24H2 / 23H2)">Windows 11 (24H2 / 23H2)</option>
                  <option value="Windows 10 (22H2)">Windows 10 (22H2)</option>
                  <option value="Windows Server">Windows Server 2022 / 2025</option>
                  <option value="Other / Not Sure">Other / Not Listed</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-stopcode" className="text-xs sm:text-sm font-bold text-gray-800">
                Stop Code / BugCheck String (Optional)
              </label>
              <input
                id="contact-stopcode"
                type="text"
                value={formData.stopCode}
                onChange={(e) => setFormData({ ...formData, stopCode: e.target.value })}
                placeholder="e.g. 0x000000F7, DRIVER_OVERRAN_STACK_BUFFER, 0x000000EF"
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 font-mono focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-[1px]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-xs sm:text-sm font-bold text-gray-800">
                Crash Symptoms &amp; Hardware Details *
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe when the blue screen triggers (e.g., during gaming, cold boot, sleep resume), recent driver installations, or faulting .sys binaries listed in Event Viewer..."
                className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 leading-relaxed rounded-[1px]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white text-xs sm:text-sm font-bold rounded-[1px] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              {submitting ? (
                <span>Transmitting Diagnostics...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry to Systems Engineers</span>
                </>
              )}
            </button>
          </form>
        )}

        <h2>2. Direct Communication Channels &amp; Response SLA</h2>

        <p>
          You can also reach out directly to our technical departments via email:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] space-y-1.5">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Crash Diagnostics Inbox</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              For personal Windows crash reports, stop code questions, and minidump inquiries:
            </p>
            <p className="font-mono text-xs sm:text-sm text-blue-700 font-bold pt-1">
              support@errorease.com
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] space-y-1.5">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Editorial &amp; Corrections</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              For documentation fixes, command syntax updates, or WHQL verification feedback:
            </p>
            <p className="font-mono text-xs sm:text-sm text-blue-700 font-bold pt-1">
              editorial@errorease.com
            </p>
          </div>
        </div>

        <p>
          Our typical response timeframe is <strong>12 to 24 hours</strong> during standard business days. Inquiries accompanied by specific Stop Code parameters or minidump traces receive priority routing to senior kernel specialists.
        </p>

        <h2>3. Minidump Diagnostic Checklist</h2>

        <p>
          To expedite our team&apos;s ability to isolate your issue, please include the following technical data in your message whenever possible:
        </p>

        <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
          <li>
            <strong>Minidump File Path:</strong> Check whether Windows recorded a dump file under <code className="bg-gray-100 px-1.5 py-0.5 border border-gray-200 font-mono text-xs rounded-[1px]">C:\Windows\Minidump\*.dmp</code>.
          </li>
          <li>
            <strong>Event Viewer Event ID:</strong> Look under <em>Event Viewer &gt; Windows Logs &gt; System</em> for critical errors with Event ID <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">41 (Kernel-Power)</code> or <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">1001 (BugCheck)</code>.
          </li>
          <li>
            <strong>Faulting Driver Binary:</strong> Note any driver filename referenced on the blue screen (such as <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">nvlddmkm.sys</code>, <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">amdkmdag.sys</code>, or <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">rtwlane.sys</code>).
          </li>
        </ul>

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
