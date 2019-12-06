<template>
    <div class="liveTuneScreen">
        <TuneWidget ref="tuneWidget" id="tuneWidget" :channelNumber="channelNumber" />
        <DateWidget ref="dateWidget" id="dateWidget" />
    </div>
</template>

<script type="text/babel">
import KeyHelper from '@/helpers/KeyHelper';
import AbstractScreen from '@/views/AbstractScreen';
import TuneWidget from '@/components/commons/TuneWidget.vue';
import DateWidget from '@/components/commons/DateWidget.vue';

export default {
    /**
     * display numeric keys entered then navigate to channel number entered
     * @class LiveTuneScreen
     */
    name: 'liveTuneScreen',
    extends: AbstractScreen,
    data() {
        return {
            channelNumber: ''
        };
    },
    components: {
        TuneWidget,
        DateWidget
    },
    methods: {
        /**
         * custom observes method to listen key events from widgets
         * keys are first handled inside focused widgets then screens change focus between widgets which is registered for a screen
         * handle numeric key press on liveTuneScreen - and numeric keys pressed to the first numeric key pressed passed to this screen
         * click key press on liveTuneScreen - navigate to channel number entered and show liveInfoScreen
         * handle exit key press - go back to liveScreen
         */
        observes() {
            return {
                numKey(event) {
                    const numericValue = KeyHelper.getNumericValueFromKey(event.keyCode);
                    if (numericValue != null) {
                        this.channelNumber += numericValue;
                    }
                },
                click(event) {
                    if (this.channelNumber) {
                        this.goToLiveInfoScreen({ channelNumber: this.channelNumber });
                    }
                },
                exit(event) {
                    this.goToLiveScreen();
                }
            };
        }
    },
    /**
     * after liveTuneScreen is displayed with numeric key entered
     * navigate automatically to liveInfoScreen if click key is not pressed for 3 seconds
     */
    mounted() {
        // TODO extract this code block into another method for code modularity
        const currentKey = this.$route.params.key;
        const numericValue = KeyHelper.getNumericValueFromKey(currentKey);
        if (numericValue != null) {
            this.channelNumber += numericValue;
        }

        // read timeout value from a config file and go to liveInfoScreen not liveScreen
        setTimeout(() => {
            this.goToLiveInfoScreen({ channelNumber: this.channelNumber });
        }, 3000);
    }
};
</script>
