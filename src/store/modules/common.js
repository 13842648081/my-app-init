import { createApiStore } from '@/api'

const apiStore = createApiStore([
  {
    action: 'getProduct',
    property: 'products',
    path: 'example/products',
    onSuccess (payload) {
      console.info(payload)
    }
  }
])

export default {
  namespaced: true,
  state: {
    useDeviceMode: false,
    fetchListParams: {},
    totalCount: null,
    loading: true,
    terms: []
  },
  mixins: [apiStore],
  actions: {
  },
  getters: {
  },
  mutations: {
  }
}
