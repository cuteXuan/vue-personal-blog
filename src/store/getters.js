const getters = {
  toggleStatus: state => state.app.toggleStatus,
  token: state => state.user.token,
  nickname: state => state.user.nickname,
  roles: state => state.user.roles,
  addRoute: state => state.permission.addRoutes
}

export default getters
