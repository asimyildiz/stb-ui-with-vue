<template>
  <div id="app">
    <component ref="main" v-bind:is="layout"></component>
  </div>
</template>

<script>
import DefaultLayout from './layouts/default.vue';

export default {
  _mainApp: null,
  methods: {
    volUp() {
      this._mainApp.$refs.volumeWidget.increaseVolume();
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
    this._mainApp = this.$refs.main;
    this.$root.$on('VolUp', this.volUp.bind(this));
  }
};
</script>

<style src="@/assets/css/1920x1080/theme.less" lang="less"></style>
