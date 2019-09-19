import "@babel/polyfill";

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Modal from './components/modal/Modal.vue';
import Drawer from './components/Drawer.vue';

Vue.component('modal', Modal);
Vue.component(Drawer.name, Drawer);

import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';


Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faEllipsisVAlt } from '@fortawesome/pro-regular-svg-icons';

library.add(faTimes);
library.add(faEllipsisVAlt);





new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app');