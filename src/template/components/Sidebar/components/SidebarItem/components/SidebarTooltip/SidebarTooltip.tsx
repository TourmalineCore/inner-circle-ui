import {MutableRefObject,
  ReactNode} from 'react'

export function SidebarTooltip({
  sidebarItemRef,
  sidebarContainerRef,
  content,
}: {
  sidebarItemRef: MutableRefObject<HTMLElement | null>,
  sidebarContainerRef: MutableRefObject<HTMLElement | null>,
  content: ReactNode,
}) {
  const sidebarRect = sidebarContainerRef.current!.getBoundingClientRect()
  const itemRect = sidebarItemRef.current!.getBoundingClientRect()

  const top = itemRect.top - sidebarRect.top + 10

  return (
    <div className="sidebar-tooltip"
      style={{
        top,
        height: `40px`, 
      }}>{content}</div>
  )
}
