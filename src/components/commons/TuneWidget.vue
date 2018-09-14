<template>
    <div id="tuneWidget" class="TuneWidget Widget link" v-bind:class="{ focus: isFocused }">
        <div class="insideWidget bgTemplate size0">
            <div class="background"></div>
            <div class="templateShadows">
                <div class="rightShadow"></div>
                <div class="leftShadow"></div>
            </div>
        </div>
        <div class="numericInputValue">{{channelNumber}}</div>
        <div class="underscore">_</div>
        <div class="tuneContainer">
            <div class="tuneText">{{ $t("POPUP_ACTIONNOTIFICATION_ACTION_TUNENOW") }}</div>
        </div>
    </div>
</template>

<script type="text/babel">
import AbstractWidget from '@/components/AbstractWidget';

export default {
    name: 'tuneWidget',
    extends: AbstractWidget,
    props: {
        channelNumber: {
            type: String,
            default: () => ''
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../../assets/css/1920x1080/positions.less';
    @import '../../assets/css/1920x1080/color.less';
    @import '../../assets/css/1920x1080/font.less';

    /**************************************************************
     * TuneWidget (inline)
     **************************************************************/
    #tuneWidget {
        overflow: visible;
        position: absolute;
        left: @MENU_MARGIN_LEFT;
        top: @SIMPLE_TOP;
        width: @MENU_SIMPLE_WIDTH;
        height: 312px;

        .tuneContainer {
            float: left;
            position: absolute;
            top: 0px;
            left: 0px;
            width: @MENU_SIMPLE_WIDTH;
            height: 312px;

            .tuneText {
                position: absolute;
                left: 24px;
                top: 208px;
                color: @DGK_RED;
                .normalBold();
            }
        }

        /* NUMERIC INPUT VALUE STYLES */
        .numericInputValue {
            position: absolute;
            left: 32px;
            top: 70px;
            color: @DGK_WHITE;
            .xLargeBold();
        }
    }
</style>
