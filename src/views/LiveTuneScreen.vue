<template>
    <div class="liveTuneScreen">
        <TuneWidget ref="tuneWidget" id="tuneWidget" :channelNumber="channelNumber" />
    </div>
</template>

<script type="text/babel">
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
        numKey(event) {
            const numericValue = KeyHelper.getNumericValueFromKey(event.keyCode);
            if (numericValue != null) {
                this.channelNumber += numericValue;
            }
        }
    },
    mounted() {
        this.$root.$on('NumKey', this.numKey.bind(this));
        const currentKey = this.$route.params.key;
        const numericValue = KeyHelper.getNumericValueFromKey(currentKey);
        if (numericValue != null) {
            this.channelNumber += numericValue;
        }
    }
};
</script>
