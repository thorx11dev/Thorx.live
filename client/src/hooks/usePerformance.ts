import { useEffect, useRef, useCallback } from 'react';
import { debounce, throttle } from '../utils/performance';

// Performance hook for optimized event handlers
export const usePerformanceHandlers = () => {
  const debouncedHandler = useCallback(
    debounce((callback: () => void) => callback(), 300),
    []
  );

  const throttledHandler = useCallback(
    throttle((callback: () => void) => callback(), 100),
    []
  );

  return { debouncedHandler, throttledHandler };
};

// Hook for optimized scroll handling
export const useOptimizedScroll = (callback: (scrollY: number) => void) => {
  const lastKnownScrollPosition = useRef(0);
  const ticking = useRef(false);

  const updateScrollPosition = useCallback(() => {
    callback(lastKnownScrollPosition.current);
    ticking.current = false;
  }, [callback]);

  const handleScroll = useCallback(() => {
    lastKnownScrollPosition.current = window.scrollY;
    if (!ticking.current) {
      requestAnimationFrame(updateScrollPosition);
      ticking.current = true;
    }
  }, [updateScrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};

// Hook for intersection observer
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [callback, options]);

  return targetRef;
};

// Memory leak prevention
export const useMemoryOptimization = () => {
  const cleanupFunctions = useRef<(() => void)[]>([]);

  const addCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctions.current.push(cleanup);
  }, []);

  useEffect(() => {
    return () => {
      cleanupFunctions.current.forEach(cleanup => cleanup());
      cleanupFunctions.current = [];
    };
  }, []);

  return { addCleanup };
};