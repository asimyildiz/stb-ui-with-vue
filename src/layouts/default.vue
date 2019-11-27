<template>
    <div class="app">
        <div class="layer background" id="backgroundLayer"></div>
        <div class="layer live" id="liveLayer">
            <LivePlayerWidget id="livePlayer"/>
        </div>
        <div class="layer video" id="videoLayer"></div>
        <div class="layer osd" id="osdLayer"></div>
        <div class="layer spy" id="spyLayer"></div>
        <div class="layer main" id="mainLayer">
            <transition v-bind:name="getTransition" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </div>
        <div class="layer volume" id="volumeLayer">
            <VolumeWidget v-show="isVolumeVisible" ref="volumeWidget" id="volumeWidget" :numberOfSteps="16" />
        </div>
        <div class="layer popup" id="popupLayer"></div>
    </div>
</template>

<script type="text/babel">
import LivePlayerWidget from '@/components/players/LivePlayerWidget.vue';
import VolumeWidget from '@/components/commons/VolumeWidget.vue';

export default {
    /**
     * this is a layer manager and initial entry point for this application
     * using this layer management system, we display the player on bottom layer always
     * all other screens are opened over the player
     */
    name: 'default',
    data() {
        return {
            activeScreen: '',
            transitionName: '',
            isAnimated: false
        };
    },
    components: {
        LivePlayerWidget,
        VolumeWidget
    },
    computed: {
        /**
         * if there is an animation to display a screen, run the animation
         * @returns {String}
         */
        getTransition() {
            if (this.isAnimated) {
                return this.transitionName;
            }
        },
        /**
         * check if volume is visible
         * volume can be displayed regardless of which screen is displayed
         */
        isVolumeVisible() {
            return this.$store.getters.isVolumeVisible;
        }
    },
    watch: {
        /**
         * routing to a new screen from another screen
         * @param {Object} to
         * @param {Object} from
         */
        $route(to, from) {
            // TODO find a way for each component transitions to not affect each other while navigating
            this.activeScreen = to.name;
            if (to.meta && to.meta.isAnimated) {
                this.transitionName = to.meta.animation && 'fade';
                this.isAnimated = to.meta.isAnimated;
            } else {
                this.transitionName = '';
                this.isAnimated = false;
            }
        }
    }
};
</script>
