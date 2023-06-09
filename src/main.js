import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:5265/'

axios.defaults.baseURL = 'http://10.10.0.16:82'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
