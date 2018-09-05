<template>
    <div id="liveInfoChannelWidget" class="LiveInfoChannelWidget Widget">
        <div class="insideWidget bgTemplate size0">
            <div class="background"></div>
            <div class="templateShadows">
                <div class="rightShadow"></div>
                <div class="leftShadow"></div>
            </div>
        </div>
        <div class="liveInfoChannelContainer">
            <div class="lcn">1</div>
            <div class="logo" style="">TF1</div>
            <div class="lockedIcon"></div>
            <div class="activeListName"></div>
            <div class="actionItem">İZLE</div>
            <div class="underscore">_</div>
            <div class="upArrowIcon arrowIcon"></div>
            <div class="downArrowIcon arrowIcon"></div>
            <div class="leftArrowIcon arrowIcon"></div>
            <div class="rightArrowIcon arrowIcon"></div>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'liveInfoChannelWidget'
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/css/1920x1080/positions.less';
    @import '../assets/css/1920x1080/color.less';
    @import '../assets/css/1920x1080/images.less';
    @import '../assets/css/1920x1080/font.less';

    /**************************************************************
    * LiveInfoChannelWidget (inline)
    **************************************************************/
    #liveInfoChannelWidget {
        overflow: visible;
        position: absolute;
        top: @SIMPLE_TOP;
        left: @MENU_MARGIN_LEFT;
        width: @MENU_SIMPLE_WIDTH;
        height: 312px;

        .liveInfoChannelContainer.hide {
            display: none;
        }

        .liveInfoChannelContainer {
            float: left;
            position: absolute;
            top: 0px;
            left: 0px;
            width: @MENU_SIMPLE_WIDTH;
            height: 312px;
            display: block;

            .activeListName {
                position: absolute;
                top: 5px;
                left: 39px;
                width: 540px;
                height: 36px;
                color: @DGK_GREY_160;
                .smallBold();
            }

            .lcn {
                position: absolute;
                left: 39px;
                top: 112px;
                width: 75px;
                height: 42px;
                color: @DGK_WHITE;
                .largeBold();
            }

            .logo {
                position: absolute;
                left: 155px;
                top: 90px;
                width: 334px;
                height: 42px;

                padding-top: 30px;
                padding-bottom: 30px;

                text-align: center;
                color: @DGK_WHITE;
                .largeBold();

                .channelLogo();
            }

            .actionItem {
                display: none;
            }

            .actionItem.displayed {
                position: absolute;
                left: 39px;
                top: 210px;
                width: 270px;
                height: 42px;
                color: @DGK_RED;
                .normalBold();
            }

            .underscore {
                display: none;
            }

            .underscore.displayed {
                position: absolute;
                left: 39px;
                top: 225px;
                color: @DGK_RED;
                .normalBold();
            }

            .lockedIcon {
                display: none;
            }

            .lockedIcon.displayed {
                position: absolute;
                left: 39px;
                top: 55px;
                width: 61px;
                height: 46px;
                background: @ICON_PARENTAL_LOCK no-repeat;
                background-size: contain;
                display: block;
            }

            .arrowIcon {
                position: absolute;
                width: 28px;
                height: 24px;
            }

            .upArrowIcon {
                top: 42px;
                left: 310px;
                background: @ICON_ARROW_UP no-repeat;
                background-size: contain;
            }

            .downArrowIcon {
                top: 220px;
                left: 310px;
                background: @ICON_ARROW_DOWN no-repeat;
                background-size: contain;
            }

            .leftArrowIcon {
                top: 131px;
                left: 103px;
                background: @ICON_ARROW_LEFT no-repeat;
                background-size: contain;
            }

            .rightArrowIcon {
                top: 131px;
                left: 526px;
                background: @ICON_ARROW_RIGHT no-repeat;
                background-size: contain;
            }
        }

        &.focus .actionItem.displayed {
            display: block;
        }

        &.focus .underscore.displayed {
            display: block;
        }

    }

    #liveInfoChannelWidget.beforeVirtualZap {
        .bgTemplate .background {
            opacity: 0.4;
        }
    }

    #liveInfoChannelWidget.virtualZap {
        .bgTemplate .background {
            display: none;
        }
    }
</style>
