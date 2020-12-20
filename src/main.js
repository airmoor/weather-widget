//https://itnext.io/vuidget-how-to-create-an-embeddable-vue-js-widget-with-vue-custom-element-674bdcb96b97
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'document-register-element/build/document-register-element'
import './plugins/svgicon';
import './plugins/bootstrap-vue';
import './scss/index.scss';

Vue.config.productionTip = false;

//for npm run build -> widget
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);
App.store = store;
App.router = router;
Vue.customElement('weather-widget', App);

// for npm run serve
// new Vue({
// 	store,
// 	router,
// 	render: h => h(App)
// }).$mount('#app');
