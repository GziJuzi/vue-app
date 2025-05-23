// src/utils/user.ts

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function setToken(token: string): void {
  localStorage.setItem('token', token)
}

export function removeToken(): void {
  localStorage.removeItem('token')
}

export function getUserId(): string | null {
  return localStorage.getItem('userId')
}

export function setUserId(userId: string): void {
  localStorage.setItem('userId', userId)
}

export function removeUserId(): void {
  localStorage.removeItem('userId')
}

export function getUserName(): string | null {
  return localStorage.getItem('userName')
}

export function setUserName(userName: string): void {
  localStorage.setItem('userName', userName)
}

export function removeUserName(): void {
  localStorage.removeItem('userName')
}

export function clearUserData(): void {
  removeToken()
  removeUserId()
  removeUserName()
}
