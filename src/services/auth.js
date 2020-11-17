import { post } from './http'
import jwt_decode from "jwt-decode";

const AUTH_URL = 'http://localhost:3000/api/v1/auth'
let authUser = {}

const setAuthUser = user =>
  authUser = user

const saveToken = token =>
  window.localStorage.setItem('AUTH_TOKEN', token)

export const isBrowser = () => typeof window !== "undefined"

// export const getUser = () =>
//   isBrowser() && window.localStorage.getItem("gatsbyUser")
//     ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
//     : {}

export const getAuthUser = () => authUser

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