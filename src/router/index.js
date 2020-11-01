import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Participant from '@/views/Participant';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Home,
		name: 'Home',
	},
	{
		path: '/participants/:participantID',
		component: Participant,
		name: 'Participant',
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
});

export default router;
