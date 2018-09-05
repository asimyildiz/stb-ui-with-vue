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

export default {
    name: 'liveInfoScreen',
    data() {
        return {
            channelNumber: ''
        };
    },
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
        }
    },
    mounted() {
        // TODO extract this code block into another method for code modularity
        const channelNumber = this.$route.params.channelNumber;
        console.log(channelNumber);

        // read timeout value from a config file and go to liveInfoScreen not liveScreen
        setTimeout(() => {
            router.push({ name: 'liveScreen' });
        }, 10 * 60 * 1000);
    }
};
</script>
