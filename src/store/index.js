import Vue from 'vue'
import Vuex from 'vuex'
import { applyMixin } from './storeMixin'
Vue.use(Vuex)

const requireModules = require.context('./modules', false, /\.js$/)
const modules = requireModules.keys().reduce((modules, fileName) => {
  const name = fileName.match(/([^./]+)\.js$/)[1]
  modules[name] = requireModules(fileName).default
  return modules
}, {})

export default new Vuex.Store(applyMixin({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules
}))
