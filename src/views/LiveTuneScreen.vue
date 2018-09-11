<template>
    <div class="liveTuneScreen">
        <TuneWidget ref="tuneWidget" id="tuneWidget" :channelNumber="channelNumber" />
        <DateWidget ref="dateWidget" id="dateWidget" />
    </div>
</template>

<script type="text/babel">
import router from '@/router';
import KeyHelper from '@/helpers/KeyHelper';
import AbstractScreen from '@/views/AbstractScreen';
import TuneWidget from '@/components/TuneWidget.vue';
import DateWidget from '@/components/DateWidget.vue';

export default {
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
