import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(): string {
  // Cookies.set(TokenKey, 'Admin-Token') || ''
  return Cookies.get(TokenKey) || ''
}

export function setToken(token: string): string {
  return Cookies.set(TokenKey, token) || ''
}

export function removeToken(): void {
  return Cookies.remove(TokenKey)
}
