import Vue from 'vue';
import Vuex from 'vuex';

import incentivesModule from './modules/incentives';
import recentDonationsModule from './modules/recent-donations';
import participantModule from './modules/participant';
import teamModule from './modules/team';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
    mutations: {},
    getters: {},
    modules: {
		incentives: incentivesModule,
		recentDonations: recentDonationsModule,
		participant: participantModule,
		team: teamModule,
    },
});
