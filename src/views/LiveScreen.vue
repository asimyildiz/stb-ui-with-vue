<template>
  <div class="liveScreen"></div>
</template>

<script type="text/babel">
import AbstractScreen from '@/views/AbstractScreen';

export default {
    /**
     * liveScreen 
     * display video only
     */
    name: 'liveScreen',
    extends: AbstractScreen,
    methods: {
        /**
         * custom observes method to listen key events from widgets
         * keys are first handled inside focused widgets then screens change focus between widgets which is registered for a screen
         * handle numeric key press on liveScreen - navigate to liveTuneScreen and pass the first numeric key pressed to the screen
         */
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
