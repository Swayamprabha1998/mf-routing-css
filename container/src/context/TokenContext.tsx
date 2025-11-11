import React, { createContext, useContext } from 'react'
import { useAppSelector } from '../store/hooks'
import { selectToken } from '../store/selectors/authSelectors'

const TokenContext = createContext<string | null>(null)

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAppSelector(selectToken)
  return <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
}

export const useToken = () => {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider')
  }
  return context
}
