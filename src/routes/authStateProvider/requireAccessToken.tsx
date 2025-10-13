import { ReactNode, useContext, useEffect } from 'react'
import { authService } from '../../common/authService'

export function RequireAccessToken({
  children,
}: {
  children: ReactNode,
}) {

  // @ts-ignore
  const [
    token,
  ] = useContext(authService.AuthContext)

  useEffect(() => {
    if (!token) {
      window.location.href = `/auth`
    }
  }, [
    token,
  ])

  if (!token) {
    return null
  }

  return <>
    {children}
  </>
}