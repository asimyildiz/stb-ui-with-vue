<template>
    <div class="liveInfoScreen">
        <LiveInfoChannelWidget ref="liveInfoChannelWidget" id="liveInfoChannelWidget"/>
        <LiveInfoProgramWidget ref="liveInfoProgramWidget" id="liveInfoProgramWidget"/>
        <DateWidget ref="dateWidget" id="dateWidget"/>
    </div>
</template>

<script type="text/babel">
import router from '@/router';
import KeyHelper from '@/helpers/KeyHelper';
import LiveInfoChannelWidget from '@/components/LiveInfoChannelWidget.vue';
import LiveInfoProgramWidget from '@/components/LiveInfoProgramWidget.vue';
import DateWidget from '@/components/DateWidget.vue';

export default {
    name: 'liveInfoScreen',
    components: {
        LiveInfoChannelWidget,
        LiveInfoProgramWidget,
        DateWidget
    },
    methods: {
        observes() {
            return {
                numKey(event) {
                    console.log(event);
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
        },
        goToLiveScreen() {
            router.push({ name: 'liveScreen' });
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

<style src="@/assets/css/1920x1080/templates/eventNode.less" lang="less"></style>
