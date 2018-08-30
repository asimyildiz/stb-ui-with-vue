<template>
    <div id="volumeWidget" class="VolumeWidget Node link">
        <div class="backgroundContainer"></div>
        <div class="volumeContainer">
            <div class="steps">
                <div v-for="(step, stepId) in numberOfSteps" :class="classObject(stepId)"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
  name: 'volumeWidget',
  props: {
    numberOfSteps: {
      type: Number,
      default: () => 16
    }
  },
  methods: {
    classObject(stepId) {
      const volume = this.$store.getters.volume;
      return {
        step: true,
        highLight: Math.ceil((stepId * 100) / this.numberOfSteps) >= (100 - volume)
      };
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/css/1920x1080/positions.less';
    @import '../assets/css/1920x1080/color.less';
    @import '../assets/css/1920x1080/images.less';

    /**************************************************************
    * volumeWidget (inline)
    **************************************************************/
    #volumeWidget {
        position: absolute;
        top: 0px;
        left: 1638px;
        height: @HEIGHT_FULL;
        width: 192px;

        .backgroundContainer {
            position: absolute;
            top: 0px;
            left: 0px;
            height: @HEIGHT_AUTO_FULL;
            width: @WIDTH_AUTO_FULL;
            background-image: @BACKGROUND_UNSELECTED_CONTAINER;
            background-size: 10px 10px;
            background-repeat: repeat;
            .setOpacity();
        }

        .volumeContainer {
            position: absolute;
            top: 0px;
            left: 0px;
            height: @HEIGHT_AUTO_FULL;
        }

        .steps {
            margin-top: 144px;

            .step {
                margin-left: 70px;
                width: 51px;
                height: 44px;
                background: @VOLUME_LINE_NORMAL no-repeat;
                background-position: center;

                &.highLight {
                    margin-left: 54px;
                    width: 82px;
                    height: 44px;
                    background: @VOLUME_LINE_HEIGHT no-repeat;
                }
            }
        }

        .volume-icon {
            position: absolute;
            width: 108px;
            height: 109px;

            top: 840px;
            left: 54px;
            background: @ICON_VOLUME no-repeat;
        }

        &.muted {
            .steps {
                display: none;
            }

            .volume-icon {
                background: @ICON_MUTE no-repeat;
            }

            .backgroundContainer {
                background: none;
            }
        }
    }
</style>
