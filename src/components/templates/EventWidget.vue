<template>
    <div class="normalRegular" v-bind:class="eventNodeClass">
        <div class="poster"></div>
        <div class="eventDataWrapper">
            <div class="title">{{ program.name }}</div>
            <div class="genre">{{ $t('SEARCH_GENRE_VALUE_DVBGENRE_' + program.genre) }}</div>
            <div class="ratingIconList">
                <div class="IconListNode" id="ratingIconListItems"></div>
            </div>
            <ProgressBarWidget v-show="isNowEvent" ref="progressBarWidget" id="progressBarWidget" :program="program"/>
            <div class="time">
                <span class="startTime">{{ startTime }}</span>
                <span class="seperator">-</span>
                <span class="endTime">{{ endTime }}</span>
            </div>
            <div class="iconList">
                <div class="IconListNode" id="iconListItems"></div>
            </div>
            <div class="tagTitle" v-bind:class="{ hideBorder: isNowEvent }">
                {{ $t('EVENTOPTION_WATCH_ACTION_TAG') }}
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
import AbstractWidget from '@/components/AbstractWidget';
import ProgressBarWidget from '@/components/templates/ProgressBarWidget';

export default {
    /**
     * display event data
     * @class EventWidget
     */
    name: 'eventWidget',
    extends: AbstractWidget,
    props: {
        program: {
            type: Object,
            default: () => {}
        },
        isNowEvent: {
            type: Boolean,
            default: () => false
        }
    },
    components: {
        ProgressBarWidget
    },
    computed: {
        /**
         * compute start time information of a program by formatting
         * @returns {String}
         */
        startTime() {
            if (this.program && this.program.start) {
                const startDate = new Date(this.program.start);
                return startDate.format(this.$t.bind(this), this.$t('HH:MM'));
            }
            return '';
        },
        /**
         * compute end time information of a program by formatting
         * @returns {String}
         */
        endTime() {
            if (this.program && this.program.start && this.program.duration) {
                const startDate = new Date(this.program.start);
                const endDate = new Date(startDate.getTime() + this.program.duration);
                return endDate.format(this.$t.bind(this), this.$t('HH:MM'));
            }
            return '';
        },
        /**
         * compute and return current and next program data
         * @returns {Object}
         */
        eventNodeClass() {
            return {
                nowLiveEventNode: this.isNowEvent,
                liveEventNode: !this.isNowEvent
            };
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../../assets/css/1920x1080/positions.less';
    @import '../../assets/css/1920x1080/color.less';
    @import '../../assets/css/1920x1080/images.less';
    @import '../../assets/css/1920x1080/font.less';

    /**************************************************************
     * EventWidget (inline)
     **************************************************************/

    /*
     ** Variables
     */
    @DEFAULT_PADDING: 24px;

    /*
    ** Unfocus styles of now event in info banner
    */

    .liveEventNode, .nowLiveEventNode, .vodEventNode, .recommendationEventNode {
        color: @DGK_GREY_160;
        width: @MENU_SIMPLE_SUBMENU_LEFT - 2*@DEFAULT_PADDING;
        height: 312px - 2*@DEFAULT_PADDING;
        padding: 37px 36px 36px 36px;
        .poster {
            float: left;
            margin-right: 24px;
            background-repeat: no-repeat;
            background-size: cover;
            display: none;
        }

        .eventDataWrapper {
            float: left;
            width: 90%;

            .title {
                height: 45px;
                .largeBold();
                text-overflow: ellipsis;
                white-space: pre;
                overflow: hidden;
                width: @WIDTH_AUTO_FULL;
                margin-top: -6px;
                float: left;
            }

            .genre {
                height: 45px;
                float: left;
                margin-top: 12px;
                width: 100%;
            }
            .ratingIconList {
                display: none;
            }

            .iconList {
                width: 305px;
                height: 44px;
                float: left;
                margin-top: -37px;
            }
            .IconListNode {
                width: @WIDTH_AUTO_FULL;
                height: @HEIGHT_AUTO_FULL;
            }
            .IconItem {
                float: left;
                margin-left: 6px;
                display: none;

                &.visible {
                    display: block;
                }

                &:nth-of-type(1) {
                    margin-left: 0;
                }
            }
            .addTag.visible {
                background: @ICON_TAG_OK no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
            }
            .icon3d.visible {
                background: @ICON_VIDEO_FORMAT_3D no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconSd169.visible {
                background: @ICON_VIDEO_FORMAT_16_9 no-repeat;
                width: 60px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconSd43.visible {
                background: @ICON_VIDEO_FORMAT_4_3 no-repeat;
                width: 60px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconHd.visible {
                background: @ICON_VIDEO_FORMAT_HD no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
            }
            .icon4K.visible {
                background: @ICON_VIDEO_FORMAT_4K no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconSubtitleLang.visible {
                background: @ICON_SUBTITLE_LANGUAGE no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }
            .iconAudioLang.visible {
                background: @ICON_AUDIO_LANGUAGE no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }
            .iconParentalControl.visible {
                background: @ICON_PARENTAL_CONTROL_PG18 no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconDolbyDigital.visible {
                background: @ICON_SOUND_DOLBY_DIGITAL no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
                background-size: 47px 32px;
            }
            .iconContentRating_10.visible {
                background: @ICON_CONTENT_RATING_10 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_9.visible {
                background: @ICON_CONTENT_RATING_9 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_8.visible {
                background: @ICON_CONTENT_RATING_8 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_7.visible {
                background: @ICON_CONTENT_RATING_7 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_6.visible {
                background: @ICON_CONTENT_RATING_6 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_5.visible {
                background: @ICON_CONTENT_RATING_5 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_4.visible {
                background: @ICON_CONTENT_RATING_4 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_3.visible {
                background: @ICON_CONTENT_RATING_3 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_2.visible {
                background: @ICON_CONTENT_RATING_2 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_1.visible {
                background: @ICON_CONTENT_RATING_1 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }
            .iconContentRating_0.visible {
                background: @ICON_CONTENT_RATING_0 no-repeat;
                width: 30px;
                height: @HEIGHT_AUTO_FULL;
            }

            /*@keyframes addRecord {
                0% {
                    width: 400px;
                    height: 400px;
                    opacity: 0.1;

                }

                90% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 1;
                }
            }

            .animated {
                animation: addRecord 0.4s ease-out;
            }*/

            .recordingError.visible {
                background: @ICON_RECORDING_STATUS_FAILED no-repeat;
                width: 42px;
                height: @HEIGHT_AUTO_FULL;
            }
            .recordingPartial.visible {
                background: @ICON_RECORDING_STATUS_INCOMPLETE no-repeat;
                width: 40px;
                height: @HEIGHT_AUTO_FULL;
            }
            .recordStarted.visible {
                background: @ICON_SCHEDULING_STATUS_INPROGRESS no-repeat;
                width: 41px;
                height: @HEIGHT_AUTO_FULL;
            }
            .recordAdded.visible {
                background: @ICON_SCHEDULING_STATUS_SCHEDULED no-repeat;
                width: 41px;
                height: @HEIGHT_AUTO_FULL;
            }
            .recordAddedSeries.visible {
                background: @ICON_SCHEDULING_STATUS_SERIESRECORDING no-repeat;
                width: 63px;
                height: @HEIGHT_AUTO_FULL;
            }
            .recordSeriesImage.visible {
                background: @ICON_SCHEDULING_STATUS_SERIES no-repeat;
                width: 63px;
                height: @HEIGHT_AUTO_FULL;
            }

            .iconIP.visible {
                background: @ICON_VOD_STATUS_ON_IP no-repeat;
                width: 59px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconHdd.visible {
                background: @ICON_VOD_STATUS_ON_HDD no-repeat;
                width: 59px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .icon169.visible {
                background: @ICON_VIDEO_FORMAT_16_9 no-repeat;
                width: 56px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconEye.visible {
                background: @ICON_VOD_STATUS_TBD no-repeat;
                width: 62px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControlFamily.visible {
                //TODO SKASAPOGLU Icon değişirse güncellenecek.
                background: @ICON_PARENTAL_CONTROL_FAMILY no-repeat;
                width: 60px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControlViolence.visible {
                background: @ICON_PARENTAL_CONTROL_VIOLENCE no-repeat;
                width: 60px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControlSex.visible {
                background: @ICON_PARENTAL_CONTROL_SEXE no-repeat;
                width: 60px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControlDangerous.visible {
                background: @ICON_PARENTAL_CONTROL_DANGEROUS no-repeat;
                width: 60px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControl7Plus.visible {
                background: @ICON_PARENTAL_CONTROL_PG7 no-repeat;
                width: 38px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControl13Plus.visible {
                background: @ICON_PARENTAL_CONTROL_PG13 no-repeat;
                width: 38px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconParentalControl18Plus.visible {
                background: @ICON_PARENTAL_CONTROL_PG18 no-repeat;
                width: 38px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .iconSeries.visible {
                background: @ICON_VOD_STATUS_SERIE no-repeat;
                width: 48px;
                height: @HEIGHT_AUTO_FULL;
                margin-top: -6px;
            }

            .time {
                height: 45px;
                width: 245px;
                font-family: @FONT_FAMILY_BOLD;
                float: left;

                span {
                    float: left;
                }
            }

            .tagTitle {
                .smallBold();
                color: @DGK_RED;
                width: 15px;
                border-bottom: 2px solid @DGK_RED;
                display: none;
                white-space: nowrap;
                float: left;
            }

            .hideBorder {
                border: none;
            }
        }

        span.seperator {
            padding: 0 0.5em;
        }
    }

    .nowLiveEventNode {

        .progressBar {
            height: 45px;
        }
    }

    .liveEventNode {
        .eventDataWrapper {
            .tagTitle {
                margin-top: 110px;
            }
            .iconList {
                margin-top: 51px;
            }
            .time {
                margin-top: 45px;
            }
        }
    }

    .nowLiveEventNode.narrowWidth {
        .eventDataWrapper {
            width: 65%;
        }
        .poster {
            display: block;
        }
    }

    .vodEventNode {
        .eventDataWrapper {
            .title {
                color: @DGK_WHITE;
                .normalRegular();
            }
            .genre {
                width: auto;
                color: @DGK_WHITE;
            }
            .ratingIconList {
                display: block;
                height: 40px;
                float: left;
                width: 35%;
                margin-top: 18px;
                margin-left: 35px;
                .IconListNode {
                    .IconItem {
                        margin-left: 4px;
                    }
                }
            }
        }
        .favStrip.visible {
            position: absolute;
            float: left;
            width: 64px;
            height: 107px;
            padding-right: 24px;
            background: @STRIP_ADD_FAVOURITE no-repeat;
            height: @HEIGHT_AUTO_FULL;
            display: block;
        }
        .favStrip {
            display: none;
        }
        .favStrip.noStrip {
            display: none;
        }
        .favAddedStrip {
            width: 64px;
            height: 107px;
            position: absolute;
            float: left;
            padding-right: 24px;
            background: @STRIP_ADDED_FAVOURITE no-repeat;
            height: @HEIGHT_AUTO_FULL;
            display: none;
        }
        .favAddedStrip.visible {
            display: block;
        }
        .favAddedStrip.noStrip {
            display: none;
        }

        .expirationInfo {
            display: none;
        }
    }

    .liveEventNode, .nowLiveEventNode {
        .focus {
            color: @DGK_WHITE;

            .tagTitle {
                display: block;
            }
        }

    }
</style>
