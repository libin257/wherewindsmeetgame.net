'use client';

import { useEffect, useRef } from 'react';

interface AdBannerInvokeProps {
  className?: string;
}

export function AdBannerInvoke({ className = '' }: AdBannerInvokeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const container = containerRef.current;

    // Create the container div for the ad
    const adDiv = document.createElement('div');
    adDiv.id = 'container-403646c65d80b691a3a543bbfb5f26dc';
    container.appendChild(adDiv);

    // Load the invoke script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl28123603.effectivegatecpm.com/403646c65d80b691a3a543bbfb5f26dc/invoke.js';
    container.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (container) {
        container.innerHTML = '';
      }
      loadedRef.current = false;
    };
  }, []);

  return (
    <div ref={containerRef} className={className} />
  );
}
