<template>
    <div class="progressBarNode eventProgressBarNode" id="progressBarNode">
        <div class="progressBar">
            <div class="background"></div>
            <div class="fill" v-bind:style="percentage"></div>
        </div>
        <div class="duration">{{ duration }}</div>
        <span v-if="!isNoInformation" class="minute">{{ $t('min') }}</span>
    </div>
</template>

<script type="text/babel">
export default {
    name: 'progressBarWidget',
    data() {
        return {
            isNoInformation: false,
            duration: 0
        };
    },
    props: {
        program: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        percentage() {
            const currentTime = Date.now();
            let elapsed = -1;
            let duration = -1;
            let percent = 0;

            if (this.program && currentTime >= this.program.start && currentTime <= (this.program.start + this.program.duration)) {
                elapsed = (currentTime - this.program.start) / 60000;
                duration = this.program.duration / 60000;
            }

            if (this.program && !this.program.isEmpty && !this.program.isNoInformation && elapsed >= 0 && duration > 0 && duration > elapsed) {
                percent = (elapsed / duration) * 100;

                const remaining = duration - elapsed > 0 ? Math.ceil(duration - elapsed) : 0;
                this.duration = remaining;
                this.isNoInformation = false;
            } else {
                this.isNoInformation = true;
                this.duration = '';
            }

            return {
                width: `${percent}%`
            };
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
