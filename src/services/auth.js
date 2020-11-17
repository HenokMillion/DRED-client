import { post } from './http'
import jwt_decode from "jwt-decode";
import * as memoryStorage from 'localstorage-memory'

const windowGlobal = typeof window !== 'undefined' && window;
const localAdapter = windowGlobal ?
  windowGlobal.localStorage :
  memoryStorage

const AUTH_URL = 'http://localhost:3000/api/v1/auth'
let authUser = {}

const setAuthUser = user =>
  localAdapter.setItem('AUTH_USER', JSON.stringify(user))

const saveToken = token =>
  localAdapter.setItem('AUTH_TOKEN', token)

export const isBrowser = () => typeof window !== "undefined"

// export const getUser = () =>
//   isBrowser() && localAdapter.getItem("gatsbyUser")
//     ? JSON.parse(localAdapter.getItem("gatsbyUser"))
//     : {}

export const getAuthUser = () => {
  const _authUser = JSON.parse(localAdapter.getItem('AUTH_USER'))
  console.log('_authUser: ', _authUser)
  if (_authUser.iat) { return _authUser }
  else { return false }
}

export const isAuthenticated = () => getAuthUser()

export const handleLogin = async (user) => {
  const { username, password } = user
  const authResponse = await post(AUTH_URL, { username: username, password: password })
  if (authResponse.status === 200) {
    const token = authResponse.data.data
    saveToken(token)
    setAuthUser(jwt_decode(token))
    return true
  }
  return false
}

export const isLoggedIn = () => {
  const user = getAuthUser()
  return !!user.username
}

export const logout = callback => {
  localStorage.removeItem('AUTH_TOKEN')
  setAuthUser({})
  callback()
}