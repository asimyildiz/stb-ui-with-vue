<template>
    <video controls>
        <source :src="url" type="video/mp4">
    </video>
</template>

<script type="text/babel">
import AbstractWidget from '@/components/AbstractWidget';

export default {
    /**
     * watch live tv on screen (for desktop play a fake video content)
     * @class LivePlayerWidget
     */
    name: 'livePlayerWidget',
    extends: AbstractWidget,
    props: {
        url: {
            type: String,
            default: () => '/videos/broadcast1.mp4'
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../../assets/css/1920x1080/positions.less';

    /**************************************************************
     * LivePlayerWidget (inline)
     **************************************************************/
    video {
        position: absolute;
        left: auto;
        top: 0;
        width: @WIDTH_FULL;
        height: @HEIGHT_FULL;
    }
</style>
