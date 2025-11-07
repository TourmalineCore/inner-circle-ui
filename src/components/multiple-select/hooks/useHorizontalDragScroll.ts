import { useState, useCallback, useRef } from "react"

export function useHorizontalDragScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [
    isDragging,
    setIsDragging,
  ] = useState(false)
  const [
    scrollLeft,
    setScrollLeft,
  ] = useState(0)
  const [
    startX,
    setStartX,
  ] = useState(0)

  const scrollingSpeed = 1

  // when the mouse button is clicked, it sets the initial coordinates
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    
    e.preventDefault()
  }, [])

  // when the scroll is moving, we change the scroll container
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // it is activated when the cursor is pressed down
    if (!isDragging || !containerRef.current) return
    
    const x = e.pageX - containerRef.current.offsetLeft
    containerRef.current.scrollLeft = scrollLeft - (x - startX) * scrollingSpeed
  }, [
    isDragging,
    startX,
    scrollLeft,
    scrollingSpeed,
  ])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  return {
    containerRef,
    handleMouseUp,
    handleMouseDown,
    handleMouseMove,
    handleMouseLeave,
  }
}