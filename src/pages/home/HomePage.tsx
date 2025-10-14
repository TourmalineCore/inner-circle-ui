import { useEffect } from 'react'

export function HomePage() {

  useEffect(() => {
    window.location.href =`/employees`
  }, [])
  
  return (
    <div />
  )
}