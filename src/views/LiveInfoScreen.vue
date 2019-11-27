<template>
    <div class="liveInfoScreen">
        <LiveInfoChannelWidget ref="liveInfoChannelWidget" id="liveInfoChannelWidget"/>
        <LiveInfoProgramWidget ref="liveInfoProgramWidget" id="liveInfoProgramWidget"/>
        <DateWidget ref="dateWidget" id="dateWidget"/>
    </div>
</template>

<script type="text/babel">
import AbstractScreen from '@/views/AbstractScreen';
import LiveInfoChannelWidget from '@/components/liveInfo/LiveInfoChannelWidget.vue';
import LiveInfoProgramWidget from '@/components/liveInfo/LiveInfoProgramWidget.vue';
import DateWidget from '@/components/commons/DateWidget.vue';

export default {
    /**
     * liveInfoScreen 
     * display channel and program information
     */
    name: 'liveInfoScreen',
    extends: AbstractScreen,
    components: {
        LiveInfoChannelWidget,
        LiveInfoProgramWidget,
        DateWidget
    },
    methods: {
        /**
         * custom observes method to listen key events from widgets
         * keys are first handled inside focused widgets then screens change focus between widgets which is registered for a screen
         * handle right key press from liveInfoChannelWidget - set focus to liveInfoProgramWidget
         * handle left key press from liveInfoChannelWidget - go back to liveScreen
         * handle left key press from liveInfoProgramWidget - set focus to liveInfoChannelWidget
         * handle exit key press - go back to liveScreen
         */
        observes() {
            return {
                rightKeyEventFromLiveInfoChannelWidget(event) {
                    this.$refs.liveInfoProgramWidget.setFocus();
                },
                leftKeyEventFromLiveInfoChannelWidget(event) {
                    this.goToLiveScreen();
                },
                leftKeyEventFromLiveInfoProgramWidget(event) {
                    this.$refs.liveInfoChannelWidget.setFocus();
                },
                exit(event) {
                    this.goToLiveScreen();
                }
            };
        },
        /**
         * when a channel number is entered on liveTuneScreen 
         * find nearest channel to that channel number
         * get channel information 
         * then get now and next program information
         * if no channel number is entered go back to live
         */
        fetchData() {
            // TODO extract this code block into another method for code modularity
            const channelNumber = this.$route.params.channelNumber;
            if (channelNumber) {
                beINFW.channelService.getNearestChannel(channelNumber)
                    .then((channel) => {
                        this.$store.commit('SET_CHANNEL', channel);
                        return beINFW.programService.getProgramsByChannel(channel.id, { number: 2 });
                    })
                    .then((programs) => {
                        this.$store.commit('SET_PROGRAMS', programs);
                    });
            } else {
                this.goToLiveScreen();
            }
        }
    },
    /**
     * fetch the data when the view is created 
     */
    created() {
        this.fetchData();
    },
    /**
     * watch route change and then fetch data if route changes
     */
    watch: {
        $route: 'fetchData'
    },
    /**
     * after liveInfoScreen is displayed with channel and program information
     * go back to live screen after 10 minutes and hide liveInfoScreen
     */
    mounted() {
        setTimeout(() => {
            this.goToLiveScreen();
        }, 10 * 60 * 1000);
    }
};
</script>
