<template>
    <div id="liveInfoProgramWidget" class="LiveInfoProgramWidget Widget link" v-bind:class="{ focus: isFocused }">
        <div class="insideWidget bgTemplate size0">
            <div class="background"></div>
            <div class="templateShadows">
                <div class="rightShadow"></div>
                <div class="leftShadow"></div>
            </div>
        </div>
        <div class="tunerMessageContainer">
            <div class="insideWidget bgTemplate size0">
                <div class="background"></div>
                <div class="templateShadows">
                    <div class="rightShadow"></div>
                    <div class="leftShadow"></div>
                </div>
            </div>
            <div class="tunerMessage">
                {{ $t('SIGNAL_TUNER_MESSAGE_SIGNALLOSS') }}
            </div>
        </div>
        <div class="programContainer" v-bind:class="{ showNextProgram: isShowNextProgram }">
            <div class="arrow"></div>
            <div class="posterArea" style="background-image: none;"></div>
            <EventWidget ref="nowProgram" id="nowProgram" :program="currentProgram" :isNowEvent="true" />
            <div class="border"></div>
            <EventWidget ref="nextProgram" id="nextProgram" :program="nextProgram" :isNowEvent="false" />
        </div>
        <div class="moreInfoButton">
            <div class="insideWidget bgTemplate size0">
                <div class="background"></div>
                <div class="templateShadows">
                    <div class="rightShadow"></div>
                    <div class="leftShadow"></div>
                </div>
            </div>
            <div class="moreInfoButtonText">{{ $t('EVENTOPTION_MORE_ACTION_MOREINFO') }}</div>
        </div>
    </div>
</template>

<script type="text/babel">
import AbstractWidget from '@/components/AbstractWidget';
import ProgressBarWidget from './ProgressBarWidget';
import EventWidget from './EventWidget';

export default {
    name: 'liveInfoProgramWidget',
    extends: AbstractWidget,
    components: {
        ProgressBarWidget,
        EventWidget
    },
    data() {
        return {
            isShowNextProgram: false
        };
    },
    methods: {
        observes() {
            return {
                downKey(event) {
                    this.isShowNextProgram = true;
                },
                upKey(event) {
                    this.isShowNextProgram = false;
                }
            };
        }
    },
    computed: {
        currentProgram() {
            const programs = this.$store.getters.programs;
            if (programs && programs.length > 0) {
                return programs[0];
            }
            return {};
        },
        nextProgram() {
            const programs = this.$store.getters.programs;
            if (programs && programs.length > 1) {
                return programs[1];
            }
            return {};
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/css/1920x1080/positions.less';
    @import '../assets/css/1920x1080/color.less';
    @import '../assets/css/1920x1080/images.less';
    @import '../assets/css/1920x1080/font.less';

    /**************************************************************
     * LiveInfoProgramWidget (inline)
     **************************************************************/
    #liveInfoProgramWidget {
        overflow: visible;
        position: absolute;
        top: @SIMPLE_TOP;
        left: @MENU_SIMPLE_SUBMENU_LEFT;
        width: @MENU_LARGE_WIDTH;
        height: 312px;

        .tunerMessageContainer {
            position: absolute;
            top: -350px;
            left: -576px;
            width: @MENU_SIMPLE_WIDTH;
            height: 312px;
            display: none;

            .tunerMessage {
                position: absolute;
                color: @DGK_WHITE;
                .smallRegular();
                left: 39px;
                top: 39px;
                width: 498px;
            }
        }

        .programContainer {
            float: left;
            position: absolute;
            top: 0px;
            left: 0px;
            width: @MENU_LARGE_WIDTH;
            height: @HEIGHT_AUTO_FULL;

            .arrow {
                position: absolute;
                left: 711px;
                top: 232px;
                background-image: @ICON_ARROW_DOWN;
                background-repeat: no-repeat;
                width: 30px;
                height: 30px;
            }

            #nowProgram {
                display: block;
                color: @DGK_WHITE;
                .tagTitle {
                    visibility: inherit;
                    margin: 58px 0px 0px -546px;
                }
            }

            .border {
                position: absolute;
                left: 10px;
                top: 226px;
                background-image: @BACKGROUND_UNSELECTED_LINE_VERTICAL_SEPARATOR;
                background-repeat: repeat-x;
                height: 3px;
                width: 677px;
                .setOpacity();
            }

            #nextProgram {
                display: block;

                .tagTitle {
                    visibility: inherit;
                    margin: 103px 0px 0px -241px;
                }

                .eventDataWrapper * {
                    display: none;
                }

                .title {
                    display: block;
                    position: relative;
                    top: -126px;
                    left: 112px;
                    .normalRegular();
                    width: 450px;
                }

                .time {
                    display: block;
                    position: relative;
                    top: -216px;
                    .normalRegular();

                    .startTime {
                        display: block;
                    }
                }

                .iconList {
                    display: block;
                    position: relative;
                    top: -222px;
                    left: 160px;
                    width: 250px;
                    overflow-x: hidden;
                    overflow-y: hidden;
                    float: right;

                    * {
                        display: inherit;
                    }

                    .iconSubtitleLang, .iconAudioLang {
                        display: none;
                    }

                }
            }
        }

        .moreInfoButton {
            float: left;
            position: absolute;
            top: 0px;
            left: @MENU_SIMPLE_SUBMENU_LEFT;
            height: @HEIGHT_AUTO_FULL;
            width: @MORE_INFO_WIDTH_SMALL;
            display: none;

            .moreInfoButtonText {
                .normalBold();
                color: @DGK_WHITE;
                text-align: center;
                position: absolute;
                top: 110px;
                left: 0px;
                width: @WIDTH_AUTO_FULL;
            }
        }

        .addPoster {
            .posterArea {
                position: absolute;
                float: left;
                left: 545px;
                margin-top: 37px;
                background-size: cover;
                background-repeat: no-repeat;
                width: 140px;
                height: 183px;
                object-fit: contain;
            }
        }

        .nowLiveEventNode.moveNowLiveEvent {
            .eventDataWrapper {
                width: 80%;
                .title {
                    width: 500px;
                }
            }
        }
    }

    /***

    FOCUSED EVENT

    ****/

    #liveInfoProgramWidget.focus {
        .programContainer {
            #nowProgram {
                display: block;
            }

            .border {
                visibility: hidden;
            }

            #nextProgram {
                display: none;
            }
        }

        .programContainer.showNextProgram {
            #nowProgram {
                display: none;
            }
            #nextProgram {
                display: block;
                color: @DGK_WHITE;

                .eventDataWrapper * {
                    display: block;
                }

                .genre {
                    width: 100%;
                }

                .title {
                    position: static;
                    .largeBold();
                }

                .time {
                    position: static;
                    .normalBold();
                }

                .iconList {
                    position: static;
                }
            }
            .arrow {
                background-image: @ICON_ARROW_UP;
            }
        }

        .moreInfoButton {
            display: block;
        }

    }
</style>
