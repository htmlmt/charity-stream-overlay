import { fetchFromDonorDrive } from '@/api';

import store from '../index.js';

let incentives;
let offset;

const actions = {
	getIncentives: ({ commit }, data) => {
		fetchIncentivesFunction(
			offset,
			`participants/${data.participantID}/incentives`,
		);
	}
}

function fetchIncentivesFunction(offset, endpoint, params) {
	fetchFromDonorDrive(offset, endpoint, params)
	.then((response) => {
		incentives = response;
		
		store.commit('saveIncentives', incentives);
	})
	.catch((error) => {
		// eslint-disable-next-line
		console.error(error)
	});
}

const mutations = {
	saveIncentives(state, incentives) {
		state.incentives = incentives
	}
};

const getters = {
	incentives: state => state.incentives,
};

export default {
	state: () => ({
		incentives: [],
	}),
	getters,
	actions,
	mutations,
};
