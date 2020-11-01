<template>
	<div
		:class="hideThermo ? 'dd-u-justify-end' : 'dd-u-justify-between'"
		class="dd-u-flex dd-u-flex-col dd-u-h-screen"
	>
        <section
			v-if="!hideThermo"
			class="u-p-sm u-shadow dd-u-bg-white dd-u-relative dd-u-z-10"
		>
            <Thermo :resource="thermoResource" />
        </section>

        <div>
			<section
				v-if="!hideName"
				class="u-bg-gray-100 u-p-sm dd-u-flex dd-u-items-center dd-u-justify-between dd-u-overflow-hidden"
			>
				<div
					id="fundraiser"
					class="u-mr-16 dd-u-flex dd-u-items-center"
				>
					<div class="u-mr-16">
						<img
							:alt="name"
							:src="avatarImageURL"
						>
					</div>

					<p class="dd-u-truncate">
						{{ name }}
					</p>
				</div>
			</section>

			<section
				v-if="recentDonations && !hideRecentDonations"
				class="u-bg-blue-700 u-p-sm dd-u-flex dd-u-overflow-hidden"
			>
				<p
					v-for="donation in recentDonations"
					:key="donation.donationID"
					class="dd-u-text-white dd-u-whitespace-no-wrap"
				>
					<span v-if="recentDonationsQuery === 'team' || !donation.incentiveID">{{ donation.displayName }}<span v-if="!donation.displayName">Anonymous</span> donated <span v-if="donation.amount"><strong>{{ donation.amount | formatMoney }}</strong></span> <span v-if="donation.recipientName">to {{ donation.recipientName }}</span> {{ donation.createdDateUTC | moment('from') }}</span>
					
					<span v-if="donation.incentiveID && recentDonationsQuery === 'participant'"><strong>{{ incentives.find(incentive => incentive.incentiveID === donation.incentiveID).description }}</strong> | {{ donation.displayName }}<span v-if="!donation.displayName">Anonymous</span> donated <span v-if="donation.amount"><strong>{{ donation.amount | formatMoney }}</strong></span> for this incentive {{ donation.createdDateUTC | moment('from') }}</span>
				</p>
				
				<p
					v-if="recentDonations.length === 0"
					class="dd-u-text-white dd-u-whitespace-no-wrap"
				>
					No donations yet.
				</p>
			</section>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Thermo from '@/components/Thermo';

export default {
	name: 'Overlay',
	components: {
		Thermo,
	},
	props: {
		avatarImageURL: {
			type: String,
		},
		hideName: {
			type: Boolean,
		},
		hideRecentDonations: {
			type: Boolean,
		},
		hideThermo: {
			type: Boolean,
		},
		name: {
			type: String,
		},
		recentDonations: {
			type: Array,
		},
		recentDonationsQuery: {
			type: String,
		},
		thermoResource: {
			type: Object,
		},
	},
	computed: {
        ...mapGetters([
            'incentives',
        ]),
    },
}
</script>
