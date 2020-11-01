<template>
    <Overlay
        v-if="participant.displayName"
        :avatarImageURL="participant.avatarImageURL"
        :hideName="hideName"
        :hideRecentDonations="hideRecentDonations"
        :hideThermo="hideThermo"
        :recentDonations="recentDonations"
        :recentDonationsQuery="this.$route.query.recentDonations"
        :name="name"
        :thermoResource="thermoResource"
    />
</template>

<script>
let params;
let query;

import { mapGetters } from 'vuex';

import Overlay from '@/components/Overlay';

export default {
    name: 'Participant',
    data() {
        return {
            hideName: false,
            hideRecentDonations: false,
            hideThermo: false,
            name: '',
            thermoResource: {},
        }
    },
    components: {
        Overlay,
    },
    computed: {
        ...mapGetters([
            'participant',
            'recentDonations',
            'team',
        ]),
    },
    watch: {
        participant() {
            if (this.participant.teamID) {
                this.name = this.participant.displayName + ' playing for ' + this.participant.teamName;
                
                if (query.recentDonations === 'team') {
                    this.$store.dispatch('getRecentDonations', {
                        teamID: this.participant.teamID,
                    });
                }

                if (query.thermo === 'team') {
                    this.$store.dispatch('getTeam', {
                        teamID: this.participant.teamID,
                    });
                }
            } else {
                this.name = this.participant.displayName;
            }

            if (query.thermo === 'participant') {
                this.thermoResource = this.participant;
            }
        },
        team() {
            this.thermoResource = this.team;
        },
    },
    created() {
        params = this.$route.params;
        query = this.$route.query;

        this.$store.dispatch('getParticipant', {
            participantID: params.participantID,
        });

        if (query.recentDonations === undefined || query.recentDonations === 'participant') {
            this.$store.dispatch('getRecentDonations', {
                participantID: params.participantID,
            });
        }

        this.$store.dispatch('getIncentives', {
            participantID: params.participantID,
        });

        if (query.recentDonations === 'hide') {
            this.hideRecentDonations = true;
        }

        if (query.thermo === 'hide') {
            this.hideThermo = true;
        }

        if (query.name === 'hide') {
            this.hideName = true;
        }
    },
}
</script>
