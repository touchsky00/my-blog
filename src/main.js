import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import { Upload, Message ,Dialog ,Input, Button, Form,FormItem } from 'element-ui';
import { MyDialog } from './components/index'
import 'mavon-editor/dist/css/index.css'
import './assets/public.css'


Vue.prototype.$ELEMENT = { size: 'mini' }
Vue.component(Upload.name, Upload)
Vue.component(Dialog.name, Dialog)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.prototype.$message = Message
Vue.use(mavonEditor)
Vue.use(MyDialog)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
