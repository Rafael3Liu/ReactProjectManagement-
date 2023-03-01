const key = 'pc-key'
const getToken = () => {
  return window.localStorage.getItem(key)
}
const auth = () => {
  const token = window.localStorage.getItem(key)
  if (token) {
    return true
  } else {
    return false
  }
}
export { getToken, auth }
