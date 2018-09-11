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
            <transition name="fade" mode="out-in" appear>
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
import LivePlayerWidget from '@/components/LivePlayerWidget.vue';
import VolumeWidget from '@/components/VolumeWidget.vue';

export default {
    name: 'default',
    components: {
        LivePlayerWidget,
        VolumeWidget
    },
    computed: {
        isVolumeVisible() {
            return this.$store.getters.isVolumeVisible;
        }
    }
};
</script>
