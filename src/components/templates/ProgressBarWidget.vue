<template>
    <div class="progressBarNode eventProgressBarNode" id="progressBarNode">
        <div class="progressBar">
            <div class="background"></div>
            <div class="fill" v-bind:style="percentage"></div>
        </div>
        <div class="duration">{{ duration }}</div>
        <span v-if="!hasNoInformation" class="minute">{{ $t('min') }}</span>
    </div>
</template>

<script type="text/babel">
import AbstractWidget from '@/components/AbstractWidget';

export default {
    /**
     * display progress bar for current program based on current time information and program start time with duration information
     * @class ProgressBarWidget
     */
    name: 'progressBarWidget',
    extends: AbstractWidget,
    data() {
        return {
            hasNoInformation: false,
            duration: 0
        };
    },
    props: {
        program: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        /**
         * calculate elapsed time and current program duration in minutes
         * @returns {Object}
         */
        getElapsedTimeAndDuration() {
            const currentTime = Date.now();
            let elapsed = -1;
            let duration = -1;
            if (this.program && currentTime >= this.program.start && currentTime <= (this.program.start + this.program.duration)) {
                elapsed = (currentTime - this.program.start) / 60000;
                duration = this.program.duration / 60000;
            }

            return {
                elapsed,
                duration
            };
        },
        /**
         * check if this is a valid program data
         * @param {Number} elapsed
         * @param {Number} duration
         * @returns {Boolean}
         */
        isValidProgramData(elapsed, duration) {
            return (this.program && !this.program.isEmpty && !this.program.isNoInformation && elapsed >= 0 && duration > 0 && duration > elapsed);
        }
    },
    computed: {
        /**
         * calculate how much time passed for current event
         * then display a progress bar based on current time js value
         * @returns {Object}
         */
        percentage() {
            let percent = 0;
            const { elapsed, duration } = this.getElapsedTimeAndDuration();
            if (this.isValidProgramData(elapsed, duration)) {
                percent = (elapsed / duration) * 100;
            }

            return {
                width: `${percent}%`
            };
        }
    },
    /**
     * after progressBarWidget is displayed
     * check if there is a program information to display on screen
     */
    mounted() {
        const { elapsed, duration } = this.getElapsedTimeAndDuration();
        if (this.isValidProgramData(elapsed, duration)) {
            const remaining = duration - elapsed > 0 ? Math.ceil(duration - elapsed) : 0;
            this.duration = remaining;
            this.hasNoInformation = false;
        } else {
            this.hasNoInformation = true;
            this.duration = '';
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
     * ProgressBarWidget (inline)
     **************************************************************/
    .progressBarNode {
        color: @DGK_GREY_160;
        height: 45px;
        float: left;
        width: @WIDTH_AUTO_FULL;

        .progressBar {
            position: relative;
            top: 15px;
            float: left;
            width: 200px;
            padding-right: 24px;

            .background {
                width: @WIDTH_AUTO_FULL;
                height: 3px;
                background-color: @DGK_GREY_140;
                border-radius: 90px 0px 0px 90px;
            }

            .fill {
                width: 0;
                position: relative;
                top: -5px;
                height: 6px;
                background-color: @DGK_GREY_140;
                box-shadow: 0px 0px 8px 5px @DGK_GREY_140;
                border-radius: 90px 0px 0px 90px;
            }

            &.hide {
                display: none;
            }
        }
    }

    .focus {
        .progressBarNode {
            color: @DGK_WHITE;

            .progressBar {
                .background {
                    background-color: @DGK_WHITE;
                }

                .fill {
                    background-color: @DGK_WHITE;
                    box-shadow: 0px 0px 8px 5px @DGK_WHITE;
                }
            }
        }
    }

    .basicProgressBarNode {
        .percentage {
            float: left;
            margin-top: -5px;
        }
    }

    .eventProgressBarNode, .vodProgressBarNode {
        .duration {
            float: left;
            margin-top: -5px;
            font-family: @FONT_FAMILY_BOLD;
        }
        .minute {
            float: left;
            margin-top: -5px;
            font-family: @FONT_FAMILY_BOLD;
        }
    }

    .eventProgressBarNode {
        &.noInformation {
            .duration, .minute, .progressBar {
                display: none;
            }
        }
    }

    .vodProgressBarNode {
        color: @DGK_WHITE;
        &.noInformation {
            .duration, .minute {
                display: none;
            }
        }
    }
</style>
