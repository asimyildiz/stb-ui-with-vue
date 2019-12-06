<template>
  <div id="app">
    <component ref="main" v-bind:is="layout"></component>
  </div>
</template>

<script type="text/babel">
import DefaultLayout from '@/layouts/default.vue';

export default {
    methods: {
        /**
         * listen event that is emitted on volume up key is pressed
         * dispatch store method to increase volume globally on all app over the store
         * we need to listen volume events emitted here because these events need to be handled globally
         * @param {Object} event
         */
        volUp(event) {
            this.$store.dispatch('INCREASE_VOLUME');
        },
        /**
         * listen event that is emitted on volume down key is pressed
         * dispatch store method to decrease volume globally on all app over the store
         * we need to listen volume events emitted here because these events need to be handled globally
         * @param {Object} event
         */
        volDown(event) {
            this.$store.dispatch('DECREASE_VOLUME');
        },
        /**
         * listen event that is emitted on portal key is pressed
         * navigate to vodScreen
         * we need to listen vod navigate event emitted here because this event needs to be handled globally
         * @param {Object} event
         */
        portal(event) {
            this.$router.push({ name: 'vodScreen', params: {} });
        }
    },
    computed: {
        /**
         * select which layout to use to display a screen
         * this way we can switch between different layouts inside the UI app
         * this is a good way for theming
         */
        layout() {
            return this.$route.params.layout || this.$store.getters.layout;
        }
    },
    components: {
        default: DefaultLayout
    },
    mounted() {
        // listen global events such as volup, voldown, portal
        // these events are independent from a screen or widget, they need to be handled globally
        this.$root.$on('volUp', this.volUp.bind(this));
        this.$root.$on('volDown', this.volDown.bind(this));
        this.$root.$on('portal', this.portal.bind(this));
    },
    beforeMount() {
        // before the application is started, fetch latest volume values of the STB from service
        beINFW.volumeService.getVolume({})
            .then((volume) => {
                this.$store.commit('SET_CURRENTVOLUME', volume);
                this.$store.commit('SET_VOLUMESTEP', this.$config.volumeStep);
            });
    }
};
</script>

<style src="@/assets/css/1920x1080/theme.less" lang="less"></style>
<style src="@/assets/css/1920x1080/background.less" lang="less"></style>
