import router from '@/router'
import store from '@/store'
router.beforeEach((to, from, next) => {
  store.commit('page/init')
  next()
})
router.afterEach((to, from) => {
  store
    .dispatch('page/initLoader', { to, from }, { root: true })
    .then(() => {
      store.commit('page/done')
    })
    .catch(() => {
      store.commit('page/done')
    })
})

const pageStore = {
  namespaced: true,
  state: {
    loading: false
  },
  mutations: {
    done (state) {
      state.loading = false
    },
    init (state) {
      state.loading = true
    }
  },
  actions: {
    initLoader ({ dispatch }, { to, from }) {
      dispatch(`page/${to.name}`, { to, from }, { root: true })
    },
    Home ({ dispatch }, { to }) {
      dispatch('product/fetchProduct', { to }, { root: true })
    }
  }
}

export default pageStore
