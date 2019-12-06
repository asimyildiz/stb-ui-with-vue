<template></template>

<script type="text/babel">
export default {
    /**
     * all screens need to be extended from AbstractScreen
     * for navigation to work correctly using router
     * @class AbstractScreen
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
         * @param {Object} params
         */
        goToLiveTuneScreen(params) {
            this.$router.push({ name: 'liveTuneScreen', params });
        },
        /**
         * navigate to live info screen
         * @param {Object} params
         */
        goToLiveInfoScreen(params) {
            this.$router.push({ name: 'liveInfoScreen', params });
        },
        /**
         * navigate to vod screen
         * @param {OBject} params
         */
        goToVodScreen(params) {
            this.$router.push({ name: 'vodScreen', params });
        }
    }
};
</script>
