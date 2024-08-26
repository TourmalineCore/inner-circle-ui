import {
  MutableRefObject,
  useEffect, useState,
} from 'react';

export const useStickyHeader = (topSentinelRef: MutableRefObject<HTMLElement | null>) => {
  const [isHeaderStuck, setIsHeaderStuck] = useState(false);

  useEffect(() => {
    const topObserver = new IntersectionObserver((records) => {
      for (const record of records) {
        const targetInfo = record.boundingClientRect;
        const rootBoundsInfo = record.rootBounds;

        if (!rootBoundsInfo || !targetInfo) {
          return;
        }

        // Started sticking.
        if (targetInfo.bottom < rootBoundsInfo.top) {
          setIsHeaderStuck(true);
        }

        // Stopped sticking.
        if (targetInfo.bottom >= rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
          setIsHeaderStuck(false);
        }
      }
    }, { threshold: [0], root: null });

    topObserver.observe(topSentinelRef.current!);

    return () => {
      topObserver.disconnect();
    };
  }, []);

  return isHeaderStuck;
};
