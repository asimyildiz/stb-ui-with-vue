<template></template>

<script type="text/babel">
export default {
    name: 'abstractScreen',
    data() {
        return {
            $type: this.$TYPES.SCREEN
        };
    },
    methods: {
        goToLiveScreen() {
            this.$router.push({ name: 'liveScreen' });
        },
        goToLiveTuneScreen(params) {
            this.$router.push({ name: 'liveTuneScreen', params });
        },
        goToLiveInfoScreen(params) {
            this.$router.push({ name: 'liveInfoScreen', params });
        },
        goToVodScreen(params) {
            this.$router.push({ name: 'vodScreen', params });
        }
    }
};
</script>
