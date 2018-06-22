import Vue from 'vue'

import axios from 'axios'
Vue.prototype.$http = axios

var Bus = new Vue();

import App from './components/App.vue'
import router from './router'

// Vue.config.productionTip = false

new Vue({
	el: '#app',
	template: '<App/>',
	router,
	components: {
		App
	}
})