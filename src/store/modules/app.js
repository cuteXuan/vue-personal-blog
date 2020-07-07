import Cookie from 'js-cookie'
const state = {
  toggleStatus: Cookie.get('toggleStatus') ? !!+Cookie.get('toggleStatus') : true
}

const mutations = {
  TOGGLE_STATUS: state => {
    state.toggleStatus = !state.toggleStatus
    if (state.toggleStatus) {
      Cookie.set('toggleStatus', 1)
    } else {
      Cookie.set('toggleStatus', 0)
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_STATUS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
