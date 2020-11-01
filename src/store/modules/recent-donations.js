import { fetchFromDonorDrive } from '@/api';

import store from '../index.js';

let recentDonations;
let recentDonationsUrl;
let offset;

const actions = {
	getRecentDonations: ({ commit }, data) => {
		if (data.teamID) {
			recentDonationsUrl = `teams/${data.teamID}/donations`;
		} else {
			recentDonationsUrl = `participants/${data.participantID}/donations`;
		}
		
		fetchRecentDonationsFunction(
			offset,
			recentDonationsUrl,
			{
				limit: 1,
				orderBy: 'createdDateUTC DESC'
			},
		);
	}
}

function fetchRecentDonationsFunction(offset, endpoint, params) {
	fetchFromDonorDrive(offset, endpoint, params)
	.then((response) => {
		recentDonations = response;
		
		store.commit('saveRecentDonations', recentDonations);
	})
	.catch((error) => {
		// eslint-disable-next-line
		console.error(error)
	});
}

const mutations = {
	saveRecentDonations(state, recentDonations) {
		state.recentDonations = recentDonations
	}
};

const getters = {
	recentDonations: state => state.recentDonations,
};

export default {
	state: () => ({
		recentDonations: [],
	}),
	getters,
	actions,
	mutations,
};
