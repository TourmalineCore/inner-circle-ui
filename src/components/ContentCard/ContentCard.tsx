import { CSSProperties, ReactNode, useRef } from 'react';
import clsx from 'clsx';

import { useStickyHeader } from './hooks/useStickyHeader';

const isIE = window.MSInputMethodContext && document.DOCUMENT_NODE;

function ContentCard({
  style = {},
  className = '',
  isStickyHead,
  headerContent,
  children,
}: {
  style?: CSSProperties;
  className?: string;
  isStickyHead?: boolean;
  headerContent?: ReactNode;
  children?: ReactNode;
}) {
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  const isHeaderStuck = isStickyHead && !isIE ? useStickyHeader(topSentinelRef) : false;

  return (
    <div
      style={style}
      className={`content-card ${className}`}
    >
      {isStickyHead && (
        <div ref={topSentinelRef} className="content-card__sentinel content-card__sentinel--top" />
      )}

      {headerContent && (
        <div
          className={clsx('content-card__header', {
            'content-card__header--sticky': isStickyHead,
            'content-card__header--sticky-stuck': isHeaderStuck,
          })}
        >
          {headerContent}
        </div>
      )}

      <div className="content-card__body">
        {children}
      </div>

      {isStickyHead && (
        <div ref={bottomSentinelRef} className="content-card__sentinel content-card__sentinel--bottom" />
      )}
    </div>
  );
}

export default ContentCard;
