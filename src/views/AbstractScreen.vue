<template></template>

<script type="text/babel">
import router from '@/router';

export default {
    name: 'abstractScreen',
    data() {
        return {
            $type: this.$TYPES.SCREEN
        };
    },
    methods: {
        goToLiveScreen() {
            router.push({ name: 'liveScreen' });
        },
        goToLiveTuneScreen(params) {
            router.push({ name: 'liveTuneScreen', params });
        },
        goToLiveInfoScreen(params) {
            router.push({ name: 'liveInfoScreen', params });
        }
    }
};
</script>
