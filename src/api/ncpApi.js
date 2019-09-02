// import cookies from 'js-cookie'
import axios from 'axios'
import applyUrlTemplate from './applyUrlTemplate'
import applyDefaultParams from './applyDefaultParams'
import { applyCacheResuest, applyCacheResponse } from './cache'
import { applyResetElm } from './applyResetElm'
import { logoutProcess } from '@/utils/utils'
import normalizeAxiosError, {
  SERVER_ERROR,
  TIMEOUT_ERROR,
  NETWORK_ERROR,
  CLIENT_ERROR
} from './normalizeAxiosError'

import router from '@/router'
const API_TIMEOUT = 30000 // 30s

const ncpApi = axios.create({
  baseURL: process.env.VUE_APP_NCP_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    // 'accessToken': cookies.get('1ST_APPERAL_TOKEN') || '',
    // 'clientId': process.env.VUE_APP_NCP_CLIENTID,
    // 'Version': '1.0',
    // 'platform': isPC() ? 'PC' : 'MOBILE_WEB',
    // 'guestToken': cookies.get('guestToken') || ''
  }
})

ncpApi.interceptors.request.use(applyCacheResuest)
ncpApi.interceptors.request.use(applyUrlTemplate)
ncpApi.interceptors.request.use(applyDefaultParams)

ncpApi.interceptors.response.use(applyResetElm)
ncpApi.interceptors.response.use(applyCacheResponse)
ncpApi.interceptors.response.use(null, normalizeAxiosError)
ncpApi.interceptors.response.use(null, function (err) {
  if (window.works) {
    Object.keys(window.works).forEach(e => {
      window.works[e]()
    })
  }
  if (err.code === TIMEOUT_ERROR || err.code === NETWORK_ERROR) {
    // store.commit('page/timeout')
  }
  if (err.code === SERVER_ERROR) {
    if (router.app._route.query.isDebug !== 'true') {
      window.location.href = '/etc/dataerror'
    }
  }
  if (err.code === CLIENT_ERROR) {
    if (err.data.message) {
      alert(err.data.message)
    }

    switch (err.data.code) {
      case 'M0013':
        logoutProcess()
        break
      case 'PPE0013':
        if (router.app._route.name !== 'Login') {
          alert(err.data.message)
        }
        break
      case 'PNR001':
        window.location.href = '/'
        break
      default:
        break
    }
  }
  return Promise.reject(err)
})

export default ncpApi
