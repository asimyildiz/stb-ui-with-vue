<template></template>

<script type="text/babel">
export default {
    /**
     * all screens need to be extended from AbstractScreen
     * for navigation to work correctly using router
     */
    name: 'abstractScreen',
    data() {
        return {
            $type: this.$TYPES.SCREEN
        };
    },
    methods: {
        /**
         * navigate to livescreen
         */
        goToLiveScreen() {
            this.$router.push({ name: 'liveScreen' });
        },
        /**
         * navigate to tunescreen
         */
        goToLiveTuneScreen(params) {
            this.$router.push({ name: 'liveTuneScreen', params });
        },
        /**
         * navigate to live info screen
         */
        goToLiveInfoScreen(params) {
            this.$router.push({ name: 'liveInfoScreen', params });
        },
        /**
         * navigate to vod screen
         */
        goToVodScreen(params) {
            this.$router.push({ name: 'vodScreen', params });
        }
    }
};
</script>
