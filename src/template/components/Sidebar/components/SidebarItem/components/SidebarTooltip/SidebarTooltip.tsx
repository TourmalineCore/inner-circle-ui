import {
  MutableRefObject,
  ReactNode,
} from 'react';

function SidebarTooltip({
  sidebarItemRef,
  sidebarContainerRef,
  content,
}: {
  sidebarItemRef: MutableRefObject<HTMLElement | null>;
  sidebarContainerRef: MutableRefObject<HTMLElement | null>;
  content: ReactNode;
}) {
  const sidebarRect = sidebarContainerRef.current!.getBoundingClientRect();
  const itemRect = sidebarItemRef.current!.getBoundingClientRect();

  const top = itemRect.top - sidebarRect.top;
  const { height } = itemRect;

  return (
    <div className="sidebar-tooltip" style={{ top, height }}>{content}</div>
  );
}

export default SidebarTooltip;
