<template>
  <div id="app">
    <component ref="main" v-bind:is="layout"></component>
  </div>
</template>

<script type="text/babel">
import router from './router';
import DefaultLayout from './layouts/default.vue';

export default {
    methods: {
        volUp(event) {
            this.$store.dispatch('INCREASE_VOLUME');
        },
        numKey(event) {
            router.push({ name: 'liveTuneScreen', params: { key: event.keyCode } });
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
        this.$root.$on('VolUp', this.volUp.bind(this));
        this.$root.$on('NumKey', this.numKey.bind(this));
    },
    beforeMount() {
        this.$store.commit('SET_CURRENTVOLUME', 20);
        this.$store.commit('SET_VOLUMESTEP', 16);
    },
    beforeRouteUpdate(to, from, next) {
        this.$root.$off('NumKey');
        next();
    }
};
</script>

<style src="@/assets/css/1920x1080/theme.less" lang="less"></style>
