<template>
  <div class="liveScreen"></div>
</template>

<script type="text/babel">
import router from '@/router';
import AbstractScreen from '@/views/AbstractScreen';

export default {
    name: 'liveScreen',
    extends: AbstractScreen,
    methods: {
        observes() {
            return {
                numKey(event) {
                    this.goToLiveTuneScreen({ key: event.keyCode });
                }
            };
        }
    }
};
</script>
