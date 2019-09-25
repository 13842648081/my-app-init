import cookies from 'js-cookie'
import axios from 'axios'
import applyUrlTemplate from './applyUrlTemplate'
import applyDefaultParams from './applyDefaultParams'
import {
  applyCacheResuest,
  applyCacheResponse
} from './cache'
import {
  applyResetElm
} from './applyResetElm'
import {
  logoutProcess,
  logoutRemoveCookie,
  isPC
} from '@/utils/utils'
import normalizeAxiosError, {
  SERVER_ERROR,
  TIMEOUT_ERROR,
  NETWORK_ERROR,
  CLIENT_ERROR,
  TOKEN_ERROR
} from './normalizeAxiosError'

import router from '@/router'
const API_TIMEOUT = 30000 // 30s

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'accessToken': cookies.get('ACCESS_TOKEN') || '',
    'Version': '1.0',
    'platform': isPC() ? 'PC' : 'MOBILE_WEB',
    'guestToken': cookies.get('guestToken') || ''
  }
})
const codeSwitch = (err) => {
  switch (err.data.code) {
    case 'M0013':
      logoutProcess()
      break
    case 'CL013':
      router.go(-1)
      break
    default:
      break
  }
  return Promise.reject(err)
}
api.interceptors.request.use(applyCacheResuest)
api.interceptors.request.use(applyUrlTemplate)
api.interceptors.request.use(applyDefaultParams)

api.interceptors.response.use(applyResetElm)
api.interceptors.response.use(applyCacheResponse)
api.interceptors.response.use(null, normalizeAxiosError)
api.interceptors.response.use(null, function (err) {
  if (err.code === TOKEN_ERROR) {
    logoutRemoveCookie()
    window.location.href = '/member/login'
  }
  if (err.code === TIMEOUT_ERROR || err.code === NETWORK_ERROR) {
    // store.commit('page/timeout')
  }
  if (err.code === SERVER_ERROR) {
    // store.commit('error...', err)
    if (router.app._route.query.isDebug !== 'true') {
      window.location.href = '/etc/dataerror'
    }
  }
  if (err.code === CLIENT_ERROR) {
    const noalert = ['']
    if (err.data.message && !noalert.some((item) => item === err.data.code)) {
      alert(err.data.message)
      codeSwitch(err)
    } else {
      return codeSwitch(err)
    }
  }
  return Promise.reject(err)
})
export default api
