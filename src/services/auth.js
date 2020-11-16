import { post } from './http'
const AUTH_URL = 'http://localhost:3000/api/v1/auth'
export const isBrowser = () => typeof window !== "undefined"
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}
const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = async (user) => {
  console.log(user)
  const { username, password } = user
  const authResponse = await post(AUTH_URL, { username: username, password: password })
  console.log(authResponse)
  // if (email === `john` && password === `pass`) {
  //   return setUser({
  //     username: `john`,
  //     name: `Johnny`,
  //     email: `johnny@example.org`,
  //   })
  // }
  return false
}
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}
export const logout = callback => {
  setUser({})
  callback()
}