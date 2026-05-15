import { useEffect, useRef, useState } from 'react';

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver;

    const observe = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { threshold },
      );
      observer.observe(el);
    };

    observe();

    // bfcache restore is now handled by a full reload in Navbar — no-op here.
    const handlePageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setInView(false);
      observe();
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      observer?.disconnect();
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [threshold]);

  return [ref, inView] as const;
}
