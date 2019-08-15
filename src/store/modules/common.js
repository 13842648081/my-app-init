import { createNcpApiStore } from '@/api'

const apiStore = createNcpApiStore([
  {
    action: '_malls',
    property: 'malls',
    path: 'malls',
    onSuccess (state, payload) {
      state.malls = {
        ...payload.data,
        productInquiryType: payload.data.productInquiryType.filter(item => item.label === '상품')
      }
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
