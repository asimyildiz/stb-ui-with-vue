<template>
    <div class="liveInfoScreen">
        <LiveInfoChannelWidget ref="liveInfoChannelWidget" id="liveInfoChannelWidget" />
        <DateWidget ref="dateWidget" id="dateWidget" />
    </div>
</template>

<script type="text/babel">
import router from '@/router';
import KeyHelper from '@/helpers/KeyHelper';
import LiveInfoChannelWidget from '@/components/LiveInfoChannelWidget.vue';
import DateWidget from '@/components/DateWidget.vue';
import aliases from '@/middleware/aliases';

export default {
    name: 'liveInfoScreen',
    components: {
        LiveInfoChannelWidget,
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
            aliases.channelService.getNearestChannel(channelNumber)
                    .then((channel) => {
                        this.$store.commit('SET_CHANNEL', channel);
                    });
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    mounted() {

        // read timeout value from a config file and go to liveInfoScreen not liveScreen
        setTimeout(() => {
            router.push({ name: 'liveScreen' });
        }, 10 * 60 * 1000);
    }
};
</script>
