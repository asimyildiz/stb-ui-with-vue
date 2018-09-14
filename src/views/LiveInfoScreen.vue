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
    name: 'liveInfoScreen',
    extends: AbstractScreen,
    components: {
        LiveInfoChannelWidget,
        LiveInfoProgramWidget,
        DateWidget
    },
    methods: {
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
        fetchData() {
            // TODO extract this code block into another method for code modularity
            const channelNumber = this.$route.params.channelNumber;
            if (channelNumber) {
                bein.channelService.getNearestChannel(channelNumber)
                    .then((channel) => {
                        this.$store.commit('SET_CHANNEL', channel);
                        return bein.programService.getProgramsByChannel(channel.id, { number: 2 });
                    })
                    .then((programs) => {
                        this.$store.commit('SET_PROGRAMS', programs);
                    });
            } else {
                this.goToLiveScreen();
            }
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },
    watch: {
        // call again the method if the route changes
        $route: 'fetchData'
    },
    mounted() {
        // read timeout value from a config file and go to liveInfoScreen not liveScreen
        setTimeout(() => {
            this.goToLiveScreen();
        }, 10 * 60 * 1000);
    }
};
</script>
