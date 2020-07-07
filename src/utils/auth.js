import Cookie from 'js-cookie'

const AuthToken = 'xxx-blog'

function getToken() {
  return Cookie.get(AuthToken)
}

function setToken (token) {
  return Cookie.set(AuthToken, token)
}

function removeToken () {
  return Cookie.remove(AuthToken)
}

export {
  getToken,
  setToken,
  removeToken
}

