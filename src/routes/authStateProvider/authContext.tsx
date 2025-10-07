import {createContext, useState, useMemo, Dispatch, SetStateAction, ReactNode} from 'react'

  type AuthProviderProps = {
    isAuthenticated: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
  };

const AuthContext = createContext<AuthProviderProps>({
  isAuthenticated: true,
  setIsAuthenticated: () => false,
})

function AuthProvider({
  children,
}: {
  children: ReactNode,
}) {
  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(true)

  const value = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
  }), [
    isAuthenticated,
    setIsAuthenticated,
  ])

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider,
  AuthContext,
}
