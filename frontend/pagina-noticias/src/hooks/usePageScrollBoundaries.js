import { useCallback, useEffect, useState } from 'react';

export default function usePageScrollBoundaries(containerRef) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const updateBoundaries = useCallback(() => {
    const documentElement = document.documentElement;
    const body = document.body;

    const scrollTop = window.scrollY ?? documentElement.scrollTop ?? 0;
    const scrollHeight = Math.max(
      documentElement.scrollHeight,
      documentElement.offsetHeight,
      body?.scrollHeight ?? 0,
      body?.offsetHeight ?? 0
    );
    const maxScroll = Math.max(0, scrollHeight - window.innerHeight);

    setIsAtTop(scrollTop <= 2);
    setIsAtBottom(maxScroll <= 2 || scrollTop >= maxScroll - 2);
  }, []);

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(updateBoundaries);

    window.addEventListener('scroll', updateBoundaries, { passive: true });
    window.addEventListener('resize', updateBoundaries);

    let resizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateBoundaries);
      resizeObserver.observe(document.documentElement);

      if (document.body) {
        resizeObserver.observe(document.body);
      }

      if (containerRef?.current) {
        resizeObserver.observe(containerRef.current);
      }
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateBoundaries);
      window.removeEventListener('resize', updateBoundaries);
      resizeObserver?.disconnect();
    };
  }, [containerRef, updateBoundaries]);

  return { isAtTop, isAtBottom };
}
