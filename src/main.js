import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import { Upload, Message } from 'element-ui';
import 'mavon-editor/dist/css/index.css'
import './assets/public.css'


Vue.component(Upload.name, Upload)
Vue.prototype.$message = Message
Vue.use(mavonEditor)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
