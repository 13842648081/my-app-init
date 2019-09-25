import Header from '../views/layout/Header.vue'
import Footer from '../views/layout/Footer.vue'

export default [
  {
    path: '/',
    name: 'Home',
    components: {
      default: (resolve) => require(['../views/main/Home.vue'], resolve),
      header: Header,
      footer: Footer
    }
  }
]
