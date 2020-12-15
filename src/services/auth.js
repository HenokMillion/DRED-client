import { post } from './http'
import jwt_decode from "jwt-decode";
import * as memoryStorage from 'localstorage-memory'
import * as ApiService from './api.service'
import { routes } from '../config/api.config'

const windowGlobal = typeof window !== 'undefined' && window;
const localAdapter = windowGlobal ?
  windowGlobal.localStorage :
  memoryStorage

let authUser = {}

const setAuthUser = user =>
  localAdapter.setItem('AUTH_USER', JSON.stringify(user))

const saveToken = token =>
  localAdapter.setItem('AUTH_TOKEN', token)

export const isBrowser = () => typeof window !== "undefined"

export const getAuthUser = () => {
  const _authUser = JSON.parse(localAdapter.getItem('AUTH_USER'))
  if (_authUser && _authUser.iat) { return _authUser }
  else { return false }
}

export const isAuthenticated = () => getAuthUser()

export const handleLogin = async (user) => {
  const { username, password } = user
  const authResponse = await post(routes.LOGIN, { username: username, password: password })
  if (authResponse.status === 200) {
    const token = authResponse.data.data
    saveToken(token)
    setAuthUser(jwt_decode(token))
    ApiService.setHeader('Authorization', 'Bearer '+token)
    return true
  }
  return false
}

export const isLoggedIn = () => {
  const user = getAuthUser()
  const token = localAdapter.setItem('AUTH_TOKEN', token)
  if (token) { ApiService.setHeader('Authorization', 'Bearer '+token) }
  return !!user.username
}

export const logout = callback => {
  localStorage.removeItem('AUTH_TOKEN')
  setAuthUser({})
  callback()
}