import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from '@/router/index.js'
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue();
new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
