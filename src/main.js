import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import './common/sass/index.scss';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
	path: '/',
	component: goods
}, {
	path: '/goods',
	component: goods
}, {
	path: '/ratings',
	component: ratings
}, {
	path: '/seller',
	component: seller
}];

let router = new VueRouter({
	linkActiveClass: 'active',
	routes
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App),
	components: {App}
});
