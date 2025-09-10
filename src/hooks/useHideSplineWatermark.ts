import { useEffect } from 'react';

export const useHideSplineWatermark = () => {
  useEffect(() => {
    const hideWatermark = () => {
      // Wait for Spline to load
      setTimeout(() => {
        // Target all possible watermark elements
        const selectors = [
          'spline-viewer',
          '[aria-label*="spline"]',
          '[aria-label*="Built with Spline"]',
          'a[href*="spline.design"]',
          'a[href*="splinecode.com"]',
          'div[style*="position: absolute"][style*="bottom"][style*="right"]',
        ];

        selectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (selector === 'spline-viewer') {
              // For spline-viewer, look for watermark elements inside
              const observer = new MutationObserver(() => {
                // Check shadow DOM if available
                if (element.shadowRoot) {
                  const watermarks = element.shadowRoot.querySelectorAll('[class*="watermark"], [id*="watermark"], a[href*="spline"]');
                  watermarks.forEach(watermark => {
                    (watermark as HTMLElement).style.display = 'none';
                  });
                }
                
                // Also check regular DOM children
                const children = element.querySelectorAll('*');
                children.forEach(child => {
                  const computedStyle = window.getComputedStyle(child as Element);
                  const rect = child.getBoundingClientRect();
                  
                  // Hide small elements positioned at bottom-right
                  if (
                    computedStyle.position === 'absolute' &&
                    rect.width < 200 &&
                    rect.height < 50 &&
                    rect.bottom > window.innerHeight - 100 &&
                    rect.right > window.innerWidth - 200
                  ) {
                    (child as HTMLElement).style.display = 'none';
                  }
                  
                  // Hide elements containing spline text or links
                  if (
                    child.textContent?.toLowerCase().includes('spline') ||
                    child.textContent?.toLowerCase().includes('built with') ||
                    (child as HTMLAnchorElement).href?.includes('spline')
                  ) {
                    (child as HTMLElement).style.display = 'none';
                  }
                });
              });
              
              observer.observe(element, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class', 'href']
              });
            } else if (
              element.textContent?.toLowerCase().includes('spline') ||
              element.textContent?.toLowerCase().includes('built with') ||
              (element as HTMLAnchorElement).href?.includes('spline')
            ) {
              (element as HTMLElement).style.display = 'none';
            }
          });
        });
      }, 1000);
    };

    // Run initially
    hideWatermark();

    // Run periodically to catch dynamically loaded watermarks
    const interval = setInterval(hideWatermark, 2000);

    return () => clearInterval(interval);
  }, []);
};
