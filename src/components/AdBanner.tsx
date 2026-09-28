import React, { useState, useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
}

declare global {
  interface Window {
    affilistStart?: () => void;
    randaffilistX45?: string;
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({ className = '' }) => {
  // Determine if viewport is desktop (>= 768px) or mobile (< 768px)
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });

  const adContainerRef = useRef<HTMLDivElement>(null);

  // Track viewport changes accurately across window resize, orientation change, or device emulation
  useEffect(() => {
    const handleResize = () => {
      const desktopNow = window.innerWidth >= 768;
      setIsDesktop((prev) => (prev !== desktopNow ? desktopNow : prev));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Conditionally load ONLY the desktop ad on desktop, and ONLY the mobile ad on mobile
  useEffect(() => {
    const container = adContainerRef.current;
    if (!container) return;

    // Reset container contents
    container.innerHTML = '';

    // Create the exact <ins> element based on active viewport
    const ins = document.createElement('ins');
    ins.style.display = 'inline-block';

    if (isDesktop) {
      // Desktop Ad — 728×90
      // Exact code requested:
      // <ins style="width: 728px;height:90px" data-width="728" data-height="90" class="g1503dd7b76" data-domain="//data527.click" data-affquery="/48fda33221c2910181f1/1503dd7b76/?placementName=default"><script src="//data527.click/js/responsive.js" async></script></ins>
      ins.style.width = '728px';
      ins.style.height = '90px';
      ins.setAttribute('data-width', '728');
      ins.setAttribute('data-height', '90');
      ins.className = 'g1503dd7b76';
      ins.setAttribute('data-domain', '//data527.click');
      ins.setAttribute('data-affquery', '/48fda33221c2910181f1/1503dd7b76/?placementName=default');
    } else {
      // Mobile Ad — 300×250
      // Exact code requested:
      // <ins style="width: 300px;height:250px" data-width="300" data-height="250" class="wda8425e93c" data-domain="//data527.click" data-affquery="/0cc8b967b679db7519e8/da8425e93c/?placementName=default"><script src="//data527.click/js/responsive.js" async></script></ins>
      ins.style.width = '300px';
      ins.style.height = '250px';
      ins.setAttribute('data-width', '300');
      ins.setAttribute('data-height', '250');
      ins.className = 'wda8425e93c';
      ins.setAttribute('data-domain', '//data527.click');
      ins.setAttribute('data-affquery', '/0cc8b967b679db7519e8/da8425e93c/?placementName=default');
    }

    // Append <ins> to the container in the DOM
    container.appendChild(ins);

    // Runner function to trigger the ad auction and replacement
    const triggerAd = () => {
      if (typeof window.affilistStart === 'function') {
        try {
          window.affilistStart();
        } catch {
          // Ignore auction catch
        }
      }
    };

    // Create the exact <script src="//data527.click/js/responsive.js" async></script>
    const script = document.createElement('script');
    script.src = '//data527.click/js/responsive.js';
    script.async = true;

    script.onload = () => {
      triggerAd();
    };

    ins.appendChild(script);

    // In a React Single Page Application (SPA), the window 'load' event has already fired.
    // responsive.js attaches `window.addEventListener('load', affilistStart)`.
    // We invoke affilistStart() directly so newly rendered article ads execute immediately.
    let interval: NodeJS.Timeout | null = null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    if (typeof window.affilistStart === 'function') {
      const immediateTimer = setTimeout(triggerAd, 50);
      return () => {
        clearTimeout(immediateTimer);
        container.innerHTML = '';
      };
    } else {
      interval = setInterval(() => {
        if (typeof window.affilistStart === 'function') {
          triggerAd();
          if (interval) clearInterval(interval);
        }
      }, 100);

      fallbackTimer = setTimeout(() => {
        if (interval) clearInterval(interval);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      container.innerHTML = '';
    };
  }, [isDesktop]);

  return (
    <aside
      aria-label="Sponsored Advertisement"
      className={`w-full max-w-full flex flex-col items-center justify-center text-center my-6 sm:my-8 not-prose ${className}`}
    >
      <div className="flex flex-col items-center max-w-full">
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1 select-none">
          Advertisement
        </span>
        <div
          ref={adContainerRef}
          className={`flex items-center justify-center max-w-full transition-all ${
            isDesktop
              ? 'w-[728px] min-h-[90px] overflow-x-auto'
              : 'w-[300px] min-h-[250px]'
          }`}
        />
      </div>
    </aside>
  );
};
