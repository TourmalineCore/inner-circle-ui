import { useRef, useEffect, MutableRefObject } from 'react'

export function useSidebarSwipe({
  sidebarContainerRef,
  isMobileOpened = false,
  onClose,
}: {
  sidebarContainerRef: MutableRefObject<HTMLElement | null>,
  isMobileOpened: boolean,
  onClose: () => unknown,
}) {
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  useEffect(() => {
    touchStartX.current = null
    touchEndX.current = null

    if (isMobileOpened) {
      addOrRemoveEventListeners(true)
    }
    else {
      addOrRemoveEventListeners(false)
    }

    return () => {
      addOrRemoveEventListeners(false)
    }
  }, [
    isMobileOpened,
  ])

  function addOrRemoveEventListeners(shouldAdd: boolean) {
    const eventsData = [
      {
        eventName: `touchstart`,
        onEventAction: handleTouchStart,
      },
      {
        eventName: `touchmove`,
        onEventAction: handleTouchMove,
      },
      {
        eventName: `touchend`,
        onEventAction: handleTouchEnd,
      },
    ]

    if (!shouldAdd) {
      if (sidebarContainerRef.current !== null) {
        eventsData.forEach(
          (eventData) => sidebarContainerRef.current!.removeEventListener(
            eventData.eventName,
            eventData.onEventAction,
          ),
        )
      }
    }
    else {
      eventsData.forEach((eventData) => sidebarContainerRef.current!.addEventListener(
        eventData.eventName,
        eventData.onEventAction,
        {
          passive: true, 
        },
      ))
    }
  }

  function handleTouchStart(event: TouchEventInit) {
    if (event.targetTouches) {
      touchStartX.current = event.targetTouches[0].clientX
    }
  }

  function handleTouchMove(event: TouchEventInit) {
    if (event.targetTouches) {
      touchEndX.current = event.targetTouches[0].clientX
    }
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) {
      return
    }

    if (touchStartX.current - touchEndX.current > 100) {
      onClose()
    }
  }
}
