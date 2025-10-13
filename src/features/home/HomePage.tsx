import { useEffect } from 'react'

export function HomePage() {

  useEffect(() => {
    window.location.href =`/analytics`
  }, [])
  return (
    <div />
  )
}