<template>
    <div id="dateNode" class="DateNode Widget link hide">
        <div class="insideWidget" id="dateTemplate">
            <div>{{ time }}</div>
            <div class="date">{{ date }}</div>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'dateWidget',
    computed: {
        time() {
            const date = new Date();
            return date.format(this.$t.bind(this), this.$t('HH:MM'));
        },
        date() {
            const date = new Date();
            return date.format(this.$t.bind(this), this.$t('ddd d'));
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/css/1920x1080/color.less';
    @import '../assets/css/1920x1080/font.less';

    /**************************************************************
     * DateWidget (inline)
     **************************************************************/
    #dateTemplate {
        color: @DGK_WHITE;
        position: absolute;
        top: 45px;
        left: 60px;
        text-shadow: 3px 3px @DGK_GREY_100;
        text-align: left;
        .normalBold();

        .popup &,
        .vodScreen &,
        .vodSubScreen &,
        .vodErrorScreen &,
        .vodPinScreen &,
        .vodMenuMessageScreen & {
            .date {
                display: none;
            }
        }
    }
</style>
