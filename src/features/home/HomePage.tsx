import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const navigation = useNavigate()

  useEffect(() => {
    navigation(`/analytics`)
  }, [])
  return (
    <div />
  )
}