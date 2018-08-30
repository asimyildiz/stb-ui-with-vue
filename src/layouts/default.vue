<template>
    <div class="app">
        <div class="layer background" id="backgroundLayer"></div>
        <div class="layer live" id="liveLayer">
            <LivePlayerWidget id="livePlayer" />
        </div>
        <div class="layer video" id="videoLayer"></div>
        <div class="layer osd" id="osdLayer"></div>
        <div class="layer spy" id="spyLayer"></div>
        <div class="layer main" id="mainLayer">
            <router-view></router-view>
        </div>
        <div class="layer volume" id="volumeLayer">
            <VolumeWidget ref="volumeWidget" id="volumeWidget" :numberOfSteps=16 />
        </div>
        <div class="layer popup" id="popupLayer"></div>
    </div>
</template>

<script>
import LivePlayerWidget from '@/components/LivePlayerWidget.vue';
import VolumeWidget from '@/components/VolumeWidget.vue';

export default {
  name: 'default',
  components: {
    LivePlayerWidget,
    VolumeWidget
  }
};
</script>
