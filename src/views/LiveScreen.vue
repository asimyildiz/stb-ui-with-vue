<template>
  <div class="liveScreen"></div>
</template>

<script type="text/babel">
import router from '@/router';

export default {
    name: 'liveScreen',
    methods: {
        observes() {
            return {
                numKey(event) {
                    router.push({ name: 'liveTuneScreen', params: { key: event.keyCode } });
                }
            };
        }
    }
};
</script>
