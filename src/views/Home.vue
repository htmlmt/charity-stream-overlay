<template>
    <div class="u-max-w-1000 u-p-20 dd-u-bg-white dd-u-min-h-screen dd-u-mx-auto">
        <h1>Stream Overlay Settings</h1>

        <form
            class="u-mb-32"
            @submit="getParticipant"
        >
            <label for="participant-id">
                What is your participant ID?
            </label>

            <div class="dd-u-flex">
                <input
                    id="participant-id"
                    v-model="participantID"
                    name="participantID"
                    type="number"
                    value=""
                    @blur="blurParticipantID"
                    @focus="focusParticipantID"
                >
                
                <input
                    :disabled="participantID === ''"
                    name=""
                    type="submit"
                    :value="loadingParticipant ? 'Loading...' : participant.displayName ? 'Update' : 'Save'"
                >
            </div>
        </form>
        
        <div
            class="u-fade"
            :class="participantIDFocused ? 'dd-u-opacity-0' : 'dd-u-opacity-100'"
        >
            <div
                v-if="participant.displayName && !teamID && !participantIDFocused"
                class="u-bg-blue-700 u-p-20 u-rounded"
            >
                <p>
                    Hi {{ participant.displayName }}! Here's a link to your streaming overlay:<br>
                    <a :href="`/participants/${participantID}`">
                        https://extralifeoverlay.netlify.app/participants/{{ participantID }}
                    </a>
                </p>
            </div>
            
            <form
                v-if="teamID && !participantIDFocused"
                class="u-mb-32"
                @submit="saveSettings"
            >
                <fieldset>
                    <legend>
                        Thermometer Display
                    </legend>
                    
                    <div class="dd-u-flex">
                        <input
                            id="participant-thermo"
                            v-model="thermoResource"
                            name="thermoResource"
                            type="radio"
                            value="participant"
                        >

                        <label for="participant-thermo">
                            Show my progress in my thermo
                        </label>
                    </div>
                    
                    <div class="dd-u-flex">
                        <input
                            id="team-thermo"
                            v-model="thermoResource"
                            name="thermoResource"
                            type="radio"
                            value="team"
                        >

                        <label for="team-thermo">
                            Show my team's progress in my thermo
                        </label>
                    </div>
                    
                    <div class="dd-u-flex">
                        <input
                            id="hide-thermo"
                            v-model="thermoResource"
                            name="thermoResource"
                            type="radio"
                            value="hide"
                        >

                        <label for="hide-thermo">
                            Hide the thermo
                        </label>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        Your Info Display
                    </legend>
                    
                    <div class="u-mr-16 dd-u-flex">
                        <input
                            id="show-name"
                            v-model="nameSetting"
                            name="nameSetting"
                            type="radio"
                            value="show"
                        >

                        <label for="show-name">
                            Show my avatar, my name, and my team name
                        </label>
                    </div>
                    
                    <div class="u-mr-16 dd-u-flex">
                        <input
                            id="hide-name"
                            v-model="nameSetting"
                            name="nameSetting"
                            type="radio"
                            value="hide"
                        >

                        <label for="hide-name">
                            Hide my avatar, my name, and my team name
                        </label>
                    </div>
                </fieldset>
                
                <fieldset>
                    <legend>
                        Recent Donations Display
                    </legend>
                    
                    <div class="u-mr-16 dd-u-flex">
                        <input
                            id="participant-donations"
                            v-model="recentDonationsResource"
                            name="recentDonationsResource"
                            type="radio"
                            value="participant"
                        >

                        <label for="participant-donations">
                            Show my recent donations only
                        </label>
                    </div>
                    
                    <div class="dd-u-flex">
                        <input
                            id="team-donations"
                            v-model="recentDonationsResource"
                            name="recentDonationsResource"
                            type="radio"
                            value="team"
                        >

                        <label for="team-donations">
                            Show all of my team's recent donations
                        </label>
                    </div>
                    
                    <div class="dd-u-flex">
                        <input
                            id="hide-donations"
                            v-model="recentDonationsResource"
                            name="recentDonationsResource"
                            type="radio"
                            value="hide"
                        >

                        <label for="hide-donations">
                            Hide recent donations
                        </label>
                    </div>
                </fieldset>
                
                <input
                    v-if="!settingsSaved"
                    type="submit"
                    value="Save Settings"
                >
            </form>
            
            <div
                v-if="settingsSaved && !participantIDFocused && teamID"
                class="u-bg-blue-700 u-p-20 u-rounded"
            >
                <p>
                    Thank you, {{ participant.displayName }}! Here's a link to your streaming overlay:<br>
                    <a :href="`/participants/${participantID}/?thermo=${thermoResource}&recentDonations=${recentDonationsResource}&name=${nameSetting}`">
                        https://extralifeoverlay.netlify.app/participants/{{ participantID }}/?thermo={{ thermoResource }}&amp;recentDonations={{ recentDonationsResource }}&amp;name={{ nameSetting }}
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Home',
    data() {
        return {
            loadingParticipant: false,
            nameSetting: '',
            participantID: '',
            participantIDFocused: false,
            recentDonationsResource: '',
            settingsSaved: false,
            teamID: '',
            thermoResource: '',
        }
    },
    computed: {
        ...mapGetters([
            'participant',
        ]),
    },
    watch: {
        participant() {
            if (this.participant.teamID) {
                this.teamID = this.participant.teamID;
            } else {
                this.teamID = '';
            }
        },
    },
    methods: {
        blurParticipantID: function(e){
            e.preventDefault();
            
            this.participantIDFocused = false;
        },
        focusParticipantID: function(e){
            e.preventDefault();
            
            this.participantIDFocused = true;
        },
        getParticipant: function(e){
            e.preventDefault();

            this.$store.dispatch('getParticipant', {
                participantID: this.participantID,
            });
            
            const data = this;
            
            data.loadingParticipant = true;
            
            setTimeout(function() {
                data.loadingParticipant = false;
            }, 1000);
        },
        saveSettings: function(e){
            e.preventDefault();

            this.settingsSaved = true;
        },
    },
}
</script>

<style lang="scss" scoped>
    body {
        background-color: #F0F1F2;
    }

    h1 {
        color: #214559;
        font-size: 2.625rem;
        line-height: 1.3;
    }
    
    label {
        color: #214559;
        display: block;
        font-size: 1rem;
        font-weight: bold;
        line-height: 1.375;
        margin-bottom: 12px;
    }
    
    input[type="radio"] + label {
        color: #161D25;
        font-size: .875rem;
        font-weight: normal;
        margin-left: 10px;
    }
    
    input {
        border: 1px solid #B5B9BC;
        border-radius: 4px;
        font-size: .875rem;
        padding: 14px;

        &:hover {
            border-color: #00A0D6;
        }

        &:focus {
            border-color: #214559;
            outline: none;
        }
    }

    input[type="submit"] {
        background-color: #007AA3;
        border: none;
        color: #FFFFFF;
        cursor: pointer;
        letter-spacing: 0.05rem;
        font-weight: bold;
        text-transform: uppercase;
        transition-duration: 0.25s;
        transition-property: background-color;
        
        &:hover,
        &:focus {
            background-color: #214559;
        }
        
        &:disabled {
            background-color: #B5B9BC;
        }
    }

    fieldset {
        border: none;
        padding: 0;
        margin: 0 0 32px;
        
        input {
            margin-left: 30px;
        }
    }

    legend {
        border-bottom: 4px solid #F0F1F2;
        color: #214559;
        display: block;
        font-size: 1.625rem;
        font-weight: bold;
        margin-bottom: 16px;
        padding: 0;
        width: 100%;
    }

    p {
        color: #161D25;
        font-size: .875rem;
    }
    
    a {
        color: #00A0D6;
    }
    
    .u-bg-blue-700 {
        background-color: #214559;
        
        a,
        p {
            color: #FFFFFF;
        }
    }
    
    .dd-u-flex input[type="submit"] {
        margin-left: 20px;
    }
    
    .u-fade {
        transition-delay: 1s;
        transition-duration: 1s;
        transition-property: opacity;

        &.active {
            opacity: 1;
        }
    }

    .u-max-w-1000 {
        max-width: 1000px;
    }

    .u-mb-4 {
        margin-bottom: 4px;
    }

    .u-mb-16 {
        margin-bottom: 16px;
    }

    .u-mb-32 {
        margin-bottom: 32px;
    }

    .u-mr-8 {
        margin-right: 8px;
    }

    .u-mr-16 {
        margin-right: 16px;
    }

    .u-p-20 {
        padding: 20px;
    }
    
    .u-rounded {
        border-radius: 4px;
    }
</style>
