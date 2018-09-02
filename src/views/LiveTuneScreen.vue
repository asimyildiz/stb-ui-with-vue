<template>
    <div class="liveTuneScreen">
        <TuneWidget ref="tuneWidget" id="tuneWidget" :channelNumber="channelNumber" />
    </div>
</template>

<script type="text/babel">
import router from '@/router';
import KeyHelper from '@/helpers/KeyHelper';
import TuneWidget from '@/components/TuneWidget.vue';

export default {
    name: 'liveTuneScreen',
    data() {
        return {
            channelNumber: ''
        };
    },
    components: {
        TuneWidget
    },
    methods: {
        observes() {
            return {
                numKey(event) {
                    const numericValue = KeyHelper.getNumericValueFromKey(event.keyCode);
                    if (numericValue != null) {
                        this.channelNumber += numericValue;
                    }
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
            router.push({ name: 'liveScreen' });
        }, 3000);
    }
};
</script>
