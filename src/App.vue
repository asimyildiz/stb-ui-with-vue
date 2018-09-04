<template>
  <div id="app">
    <component ref="main" v-bind:is="layout"></component>
  </div>
</template>

<script type="text/babel">
import DefaultLayout from './layouts/default.vue';
import aliases from './middleware/aliases';

export default {
    methods: {
        volUp(event) {
            this.$store.dispatch('INCREASE_VOLUME');
        },
        volDown(event) {
            this.$store.dispatch('DECREASE_VOLUME');
        }
    },
    computed: {
        layout() {
            return this.$route.params.layout || this.$store.getters.layout;
        }
    },
    components: {
        default: DefaultLayout
    },
    mounted() {
        this.$root.$on('volUp', this.volUp.bind(this));
        this.$root.$on('volDown', this.volDown.bind(this));
    },
    beforeMount() {
        const volumeService = aliases.volumeService;
        volumeService.getVolume({})
            .then((volume) => {
                this.$store.commit('SET_CURRENTVOLUME', volume);
                this.$store.commit('SET_VOLUMESTEP', 16);
            });
    }
};
</script>

<style src="@/assets/css/1920x1080/theme.less" lang="less"></style>
