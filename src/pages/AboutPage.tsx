import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  ArrowLeft, 
  Layers, 
  Users,
  Calendar,
  ShieldAlert,
  Mail
} from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

interface AboutPageProps {
  onNavigateHome: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onContactClick }) => {
  useEffect(() => {
    updatePageSEO({
      title: 'About Us – Errorease Windows Diagnostic Lab',
      description: 'Learn about Errorease, our editorial standards, our hardware testing lab, and our mission to provide verified Windows crash troubleshooting.',
      canonicalPath: '/about',
      keywords: ['About Errorease', 'Windows crash troubleshooting', 'Kernel diagnostics', 'Editorial standards', 'WHQL'],
      type: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Errorease',
        description: 'Learn about Errorease, our editorial standards, our hardware testing lab, and our mission to provide verified Windows crash troubleshooting.',
        url: 'https://errorease.com/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'Errorease',
          url: 'https://errorease.com',
          description: 'Independent technical resource for troubleshooting Windows Blue Screen of Death crashes and driver overruns.',
        },
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
            <span className="text-gray-900 font-semibold">About Errorease</span>
          </nav>
        </div>

        <header className="space-y-4 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-snug">
            About Errorease: Systems Diagnostics &amp; Editorial Lab
          </h1>

          <div className="flex items-center gap-4 sm:gap-5 pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Updated September 2026</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>WHQL Verified Editorial Standards</span>
            </div>
          </div>
        </header>
      </div>

      {/* 2. Page Content in .seo-article-container & .seo-article-content */}
      <div className="seo-article-container seo-article-content w-full bg-white border border-gray-200 rounded-[1px] px-3 py-6 sm:px-8 sm:py-10 md:px-10 md:py-12 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose shadow-xs overflow-hidden">
        
        <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed">
          <strong>Errorease</strong> is an independent technical engineering publication established to help computer users, IT administrators, and software developers diagnose, understand, and permanently resolve critical Microsoft Windows stop codes, Blue Screen of Death (BSOD) kernel traps, and driver stack conflicts.
        </p>

        <h2>1. The Problem with Modern Error Troubleshooting</h2>
        
        <p>
          When Windows halts with a BugCheck like <code className="bg-gray-100 text-gray-900 px-2 py-0.5 font-mono text-xs border border-gray-200 rounded-[1px]">0x000000F7 (DRIVER_OVERRAN_STACK_BUFFER)</code> or <code className="bg-gray-100 text-gray-900 px-2 py-0.5 font-mono text-xs border border-gray-200 rounded-[1px]">0x000000EF (CRITICAL_PROCESS_DIED)</code>, conventional search engine results are routinely dominated by low-quality content, misleading automated advice, and deceptive advertisements pushing paid &ldquo;registry cleaners&rdquo; or commercial driver downloaders.
        </p>

        <div className="p-4 sm:p-5 bg-amber-50/80 border border-amber-200 text-amber-900 rounded-[1px] space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Why Dubious &ldquo;PC Cleaners&rdquo; Worsen Kernel Instability</span>
          </div>
          <p className="leading-relaxed">
            Automated registry scanners and third-party driver updaters frequently delete vital COM registrations or replace WHQL-certified kernel drivers with generic, unverified packages. This often escalates a minor software bug into severe boot-looping or unrecoverable disk corruption.
          </p>
        </div>

        <p>
          At Errorease, we reject clickbait and software affiliate schemes. Every troubleshooting protocol on this platform is constructed around official, native Microsoft Windows administrative utilities and verified vendor firmware.
        </p>

        <h2>2. The Errorease Diagnostic Standard</h2>

        <p>
          Our guides adhere to rigorous technical guidelines to guarantee your PC&apos;s data integrity and long-term operating system health:
        </p>

        <ul className="list-disc list-outside ml-5 space-y-2.5 text-gray-700">
          <li>
            <strong>Zero Bloatware or Paid Optimizers:</strong> We never recommend commercial registry utilities, paid driver tools, or unnecessary third-party tune-up software.
          </li>
          <li>
            <strong>Verified Command-Line Syntax:</strong> All administrative commands (<code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">DISM /Online /Cleanup-Image /RestoreHealth</code>, <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">sfc /scannow</code>, and <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 border border-gray-200 rounded-[1px]">verifier.exe</code>) are rigorously tested across both Windows 11 (23H2 / 24H2) and Windows 10 (22H2).
          </li>
          <li>
            <strong>Kernel-Level Root Cause Explanation:</strong> We do not simply tell you which buttons to click; we explain the exact mechanism behind the crash—such as how security stack cookie canaries identify buffer overflow attempts before memory corruption spreads.
          </li>
          <li>
            <strong>Reversible, Safe Interventions:</strong> Every walkthrough emphasizes creating a Windows System Restore Point or full registry backup prior to editing device parameters or removing system services.
          </li>
        </ul>

        <h2>3. Hardware Lab &amp; Crash Reproduction Methodology</h2>

        <p>
          Unlike generic content aggregators, the Errorease engineering team operates dedicated hardware test benches and virtualized debug targets to systematically trigger and analyze kernel faults:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>Multi-Platform Test Benches</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We benchmark crash scenarios across Intel Core and AMD Ryzen CPU architectures paired with modern NVIDIA GeForce RTX, AMD Radeon, Realtek HD Audio, and Intel Wi-Fi 6E/7 controller chipsets.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-[1px] space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <Terminal className="w-4 h-4" />
              <span>WinDbg Minidump Triage</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We deconstruct crash minidumps (<code className="font-mono text-gray-800">C:\Windows\Minidump</code>) using the Windows Debugger (WinDbg) and Microsoft public symbol servers to isolate the exact faulting driver binary and stack frame.
            </p>
          </div>
        </div>

        <p>
          All recommended driver rollbacks, driver clean installations (via Display Driver Uninstaller or Device Manager), and clean-boot triage methods conform with Microsoft Windows Hardware Quality Labs (WHQL) specifications.
        </p>

        <h2>4. Engineering &amp; Editorial Team</h2>

        <p>
          Our diagnostic articles are written and peer-reviewed by systems engineers with hands-on enterprise infrastructure and hardware diagnostic experience:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
          <div className="p-5 sm:p-6 bg-gray-50/70 border border-gray-200 rounded-[1px] flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
              alt="Marcus Vance"
              className="w-14 h-14 rounded-full object-cover border border-gray-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900 !m-0 !p-0 !bg-transparent !border-0">Marcus Vance</h3>
              <p className="text-xs font-semibold text-blue-600">Lead Systems Engineer &amp; Kernel Specialist</p>
              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                Over 12 years analyzing Windows kernel memory dumps, device driver architectures, and enterprise OS stability.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 bg-gray-50/70 border border-gray-200 rounded-[1px] flex items-start gap-4">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
              alt="David Chen"
              className="w-14 h-14 rounded-full object-cover border border-gray-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900 !m-0 !p-0 !bg-transparent !border-0">David Chen</h3>
              <p className="text-xs font-semibold text-blue-600">Hardware Diagnostics &amp; I/O Researcher</p>
              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                Specializes in RAM timing faults, NVMe controller integrity, PCIe lane conflicts, and Driver Verifier stress testing.
              </p>
            </div>
          </div>
        </div>

        <h2>5. Diagnostic Inquiries &amp; Corrections</h2>

        <p>
          We continually update our library to reflect new Windows 11 feature updates and cumulative monthly patches. If you identify a bug in our documentation or are grappling with a complex stop code not yet covered in our catalog, we encourage you to contact our team.
        </p>

        <div className="p-4 sm:p-5 bg-blue-50/80 border border-blue-200 text-blue-900 rounded-[1px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="space-y-1">
            <p className="font-bold text-blue-950 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-700" />
              <span>Need Direct Troubleshooting Assistance?</span>
            </p>
            <p className="text-blue-800 leading-relaxed">
              Submit your BugCheck details, minidump summary, or guide feedback to our engineers.
            </p>
          </div>
          <button
            onClick={onContactClick}
            type="button"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[1px] transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            Contact Technical Support
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
