<template>
  <div class="liveScreen"></div>
</template>

<script type="text/babel">
import router from '@/router';

export default {
    name: 'liveScreen',
    methods: {
        numKey(event) {
            router.push({ name: 'liveTuneScreen', params: { key: event.keyCode } });
        }
    },
    mounted() {
        this.$root.$on('NumKey', this.numKey.bind(this));
    },
    beforeRouteLeave(to, from, next) {
        // TODO check if we need to do this everytime
        this.$root.$off('NumKey');
        next();
    }
};
</script>
