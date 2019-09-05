import { createNcpApiStore } from '@/api'
const apiStore = createNcpApiStore([
  {
    action: '_fetchProduct',
    property: 'product',
    path: 'products/{productNo}',
    pathParams: ['productNo'],
    method: 'get'
  }
])
export default {
  namespaced: true,
  mixins: [apiStore],
  actions: {
    async  fetchProduct ({ state, dispatch }, product) {
      state.product = null
      const productNo = product.productNo
      const preview = product.preview === 'true'
      state.preview = preview
      await dispatch('_fetchProduct', { params: { productNo, preview } })
    }
  },
  getters: {

  },
  mutations: {

  }
}