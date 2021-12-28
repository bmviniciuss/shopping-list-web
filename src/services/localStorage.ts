import { LOCAL_STORAGE_TOKEN_KEY } from '../config'

export function saveAuthToken (token: string) {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
}

export function clearAuthToken () {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
}

export function getAuthToken () {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  return token || null
}
