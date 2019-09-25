import { createApiStore } from '@/api'
const apiStore = createApiStore([
  {
    action: '_fetchProduct',
    property: 'product',
    path: 'v2/5d8b0fea3500005c00d46ba6',
    method: 'get'
  }
])
export default {
  namespaced: true,
  mixins: [apiStore],
  actions: {
    async  fetchProduct ({ state, dispatch }) {
      const productNo = 101916429
      await dispatch('_fetchProduct', { params: { productNo } })
    }
  },
  getters: {

  },
  mutations: {

  }
}
