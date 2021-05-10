import Vue from 'vue'
import './setting/reset.css'
import router from './router/router' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

window.vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
