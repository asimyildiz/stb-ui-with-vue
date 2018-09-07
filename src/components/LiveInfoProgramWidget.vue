<template>
    <div id="liveInfoProgramWidget" class="LiveInfoProgramWidget Widget link">
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
        <div class="programContainer">
            <div class="arrow"></div>
            <div class="posterArea" style="background-image: none;"></div>
            <div class="nowLiveEventNode normalRegular" id="nowProgram">
                <div class="poster"></div>
                <div class="eventDataWrapper">
                    <div class="title">{{ currentProgram.name }}</div>
                    <div class="genre">{{ $t('SEARCH_GENRE_VALUE_DVBGENRE_' + currentProgram.genre) }}</div>
                    <div class="ratingIconList">
                        <div class="IconListNode" id="ratingIconListItems"></div>
                    </div>
                    <ProgressBarWidget ref="progressBarWidget" id="progressBarWidget" :program="currentProgram"  />
                    <div class="time">
                        <span class="startTime">{{ cProgram.startTime }}</span>
                        <span class="seperator">-</span>
                        <span class="endTime">{{ cProgram.endTime }}</span>
                    </div>
                    <div class="iconList">
                        <div class="IconListNode" id="iconListItems"></div>
                    </div>
                    <div class="tagTitle hideBorder"></div>
                </div>
            </div>
            <div class="border"></div>
            <div class="liveEventNode normalRegular" id="nextProgram">
                <div class="poster"></div>
                <div class="eventDataWrapper">
                    <div class="title">{{ nextProgram.name }}</div>
                    <div class="genre">{{ $t('SEARCH_GENRE_VALUE_DVBGENRE_' + nextProgram.genre) }}</div>
                    <div class="ratingIconList">
                        <div class="IconListNode" id="ratingIconListItems"></div>
                    </div>
                    <div class="time">
                        <span class="startTime">{{ nProgram.startTime }}</span>
                        <span class="seperator">-</span>
                        <span class="endTime">{{ nProgram.endTime }}</span>
                    </div>
                    <div class="iconList">
                        <div class="IconListNode" id="iconListItems"></div>
                    </div>
                    <div class="tagTitle">{{ $t('EVENTOPTION_WATCH_ACTION_TAG') }}</div>
                </div>
            </div>
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
import ProgressBarWidget from './ProgressBarWidget';

export default {
    name: 'liveInfoProgramWidget',
    data() {
        return {
            cProgram: {
                startTime: '',
                endTime: ''
            },
            nProgram: {
                startTime: '',
                endTime: ''
            }
        }
    },
    components: {
        ProgressBarWidget
    },
    methods: {
        getTimeInformation(program) {
            if (program) {
                var startDate = new Date(program.start);
                var endDate = new Date(startDate.getTime() + program.duration);

                return {
                    startTime: startDate.format(this.$t.bind(this), this.$t('HH:MM')),
                    endTime: endDate.format(this.$t.bind(this), this.$t('HH:MM'))
                };
            }
        }
    },
    computed: {
        currentProgram() {
            const programs = this.$store.getters.programs;
            if (programs && programs.length > 0) {
                const program = programs[0];
                const timeInformation = this.getTimeInformation(program);
                this.cProgram.startTime = timeInformation.startTime;
                this.cProgram.endTime = timeInformation.endTime;
                return program;
            }
            return {};
        },
        nextProgram() {
            const programs = this.$store.getters.programs;
            if (programs && programs.length > 1) {
                const program = programs[1];
                const timeInformation = this.getTimeInformation(program);
                this.nProgram.startTime = timeInformation.startTime;
                this.nProgram.endTime = timeInformation.endTime;
                return program;
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
