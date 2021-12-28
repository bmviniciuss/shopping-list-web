import { useApolloClient } from '@apollo/client'
import React, { useContext } from 'react'
import { MeQueryDocument, MeQueryQuery, MeQueryQueryVariables, User } from '../generated/graphql'
import { clearAuthToken, getAuthToken, saveAuthToken } from '../services/localStorage'

export type CurrentUserType = Pick<User, 'id' | 'name' | 'email' | 'active'>

export type AuthStateType = {
  loading: boolean,
  token?: string | null
  currentUser?: CurrentUserType | null
}

type AuthContextType = {
  currentUser?: CurrentUserType
  loading: boolean
  localLogin: (accessToken: string, currentUser: CurrentUserType) => void
}

type Props = {
  children: React.ReactNode
}

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider ({ children }: Props) {
  const [loading, setLoading] = React.useState(true)
  const [currentUser, setCurrentUser] = React.useState<CurrentUserType | undefined>(undefined)
  const apollo = useApolloClient()

  React.useEffect(() => {
    async function f () {
      setLoading(true)
      const accesToken = getAuthToken()
      if (!accesToken) return setLoading(false)

      try {
        console.log('Executando query me: ', accesToken)
        const { data } = await apollo.query<MeQueryQuery, MeQueryQueryVariables>({
          query: MeQueryDocument
        })

        if (data?.me?.id) {
          console.log('USER: ', data.me)
          setCurrentUser(data.me)
        }

        setLoading(false)
      } catch (e) {
        clearAuthToken()
        setCurrentUser(undefined)
        setLoading(false)
      }
    }
    f()
  }, [])

  const localLogin = (accessToken: string, currentUser: CurrentUserType) => {
    saveAuthToken(accessToken)
    setCurrentUser(currentUser)
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      localLogin
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error('Must be a child of AuthContext')
  return authContext
}
