import { useApolloClient } from '@apollo/client'
import React from 'react'
import { MeQueryDocument, MeQueryQuery, MeQueryQueryVariables, User } from '../generated/graphql'
import { clearAuthToken, getAuthToken, saveAuthToken } from '../services/localStorage'
import create from 'zustand'

export type CurrentUserType = Pick<User, 'id' | 'name' | 'email' | 'active'>

type AuthStateType = {
  loading: boolean
  currentUser?: CurrentUserType | null
  setLoading: (loading: boolean) => void
  authFlowLogin: (accessToken: string, user: CurrentUserType) => void
  authFlowClearUser: () => void
  setCurrentUser: (user?: CurrentUserType | null) => void
}

export const useZustAuth = create<AuthStateType>(set => ({
  loading: true,
  currentUser: null,
  authFlowLogin: (accessToken: string, user: CurrentUserType) => {
    saveAuthToken(accessToken)
    set({ currentUser: user, loading: false })
  },
  authFlowClearUser: () => {
    clearAuthToken()
    set({ currentUser: null, loading: false })
  },
  setLoading: (loading: boolean) => set({ loading }),
  setCurrentUser: (user?: CurrentUserType | null) => {
    set({ currentUser: user })
  }
}))

type Props = {
  children: React.ReactNode
}
export function AuthProvider ({ children }: Props) {
  const setLoading = useZustAuth(state => state.setLoading)
  const setCurrentUser = useZustAuth(state => state.setCurrentUser)
  const authFlowClearUser = useZustAuth(state => state.authFlowClearUser)

  const apollo = useApolloClient()

  React.useEffect(() => {
    async function f () {
      setLoading(true)
      const accesToken = getAuthToken()

      if (!accesToken) return setLoading(false)

      await apollo.query<MeQueryQuery, MeQueryQueryVariables>({
        query: MeQueryDocument
      }).then(({ data }) => {
        if (data?.me?.id) {
          setCurrentUser(data.me)
        }
        setLoading(false)
      }).catch(() => {
        authFlowClearUser()
      })
    }
    f()
  }, [])

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}
