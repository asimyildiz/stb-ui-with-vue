<template>
  <div id="app">
    <component ref="main" v-bind:is="layout"></component>
  </div>
</template>

<script type="text/babel">
import DefaultLayout from './layouts/default.vue';

export default {
    methods: {
        volUp(event) {
            this.$store.dispatch('INCREASE_VOLUME');
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
    },
    beforeMount() {
        this.$store.commit('SET_CURRENTVOLUME', 20);
        this.$store.commit('SET_VOLUMESTEP', 16);
    }
};
</script>

<style src="@/assets/css/1920x1080/theme.less" lang="less"></style>
