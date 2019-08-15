import Vapi from 'vuex-rest-api'

export default function createApiStoreCreator (axiosInstance, isHttp) {
  return function createApiStore (storeDefines) {
    let baseURL = isHttp ? axiosInstance.defaults.baseURL : process.env.VUE_APP_NCP_API_BASE_URL_HTTPS
    const vapi = new Vapi({
      baseURL: baseURL,
      axios: axiosInstance
    })
    storeDefines.forEach(options => {
      options.requestConfig = {
        ...options.requestConfig,
        defaultData: options.defaultData,
        defaultParams: options.defaultParams,
        pathParams: options.pathParams,
        cacheable: options.cacheable,
        cacheMaxAge: options.cacheMaxAge,
        action: options.action
      }
      options.queryParams = true
      vapi.add(options)
    })
    return vapi.getStore()
  }
}
