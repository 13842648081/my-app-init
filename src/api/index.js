import createApiStoreCreator from './createApiStoreCreator'
import ncpApi from './ncpApi'

const createNcpApiStore = createApiStoreCreator(ncpApi, true)
const createNcpApiStoreHttps = createApiStoreCreator(ncpApi, false)

export {
  ncpApi as default,
  ncpApi,
  createNcpApiStore,
  createNcpApiStoreHttps
}
