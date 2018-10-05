<template>
    <div id="vodCategoryListWidget"
         class="VodCategoryListWidget AbstractCategoryListWidget List vertical noAnimation" v-bind:class="{ focus: isFocused }">
        <div class="insideWidget bgTemplate size0">
            <div class="background"></div>
            <div class="templateShadows">
                <div class="rightShadow"></div>
                <div class="leftShadow"></div>
            </div>
        </div>
        <div class="shadows"></div>
        <div class="menus"></div>
        <div class="overflow">
            <div class="position">
                <div class="container">
                    <div class="wrapper">
                        <div v-for="category in categories" class="item">
                            <div class="key">{{ category.classificationName }}</div>
                            <div class="value"></div>
                            <div class="underscore">_</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import AbstractWidget from '@/components/AbstractWidget';

    export default {
        name: 'vodCategoryListWidget',
        extends: AbstractWidget,
        computed: {
            categories() {
                const categories = this.$store.getters.categories;
                if (categories) {
                    return categories.defaultCategories;
                }
                return [];
            }
        }
    };
</script>


<style lang="less" rel="stylesheet/less">
    @import '../../assets/css/1920x1080/positions.less';
    @import '../../assets/css/1920x1080/color.less';
    @import '../../assets/css/1920x1080/images.less';
    @import '../../assets/css/1920x1080/font.less';
    @import '../../assets/css/1920x1080/theme.less';
    @import '../../assets/css/1920x1080/abstract-list.less';
    @import '../../assets/css/1920x1080/list.less';

    /**************************************************************
     * VodCategoryListWidget (inline)
     **************************************************************/
    .VodCategoryListWidget {

        width: @MENU_SIMPLE_WIDTH;
        left: @MENU_MARGIN_LEFT;
        /**
            by default, double entry list is in overflow hidden
        */
        overflow: visible;

        &.indent {
            .overflow {
                left: 30px;
            }
        }

        .normalRegular();
        .item {
            width: 526px;
            float: left;
            height: 45px;
            line-height: normal;
            margin-left: 24px;
            margin-bottom: 7px;
            &.focus {
                height: 51px;
                line-height: 51px;
                .value {
                    visibility: hidden;
                }
            }
            &.selected {
                .value {
                    visibility: hidden;
                }
            }
            .key {
                width: auto;
                height: 100%;
                .ellipsis();
            }
        }

        .container {
            margin-left: 0px;
        }

        .shadows {
            position: absolute;
            top: 0;
            left: -192px;
            width: 168px;
        }

        .shadow {
            float: right;
            height: @HEIGHT_FULL;
            width: 24px;
            background-size: 24px 9px;
            background-repeat: repeat-y;
            background-image: @BACKGROUND_LEFT_SHADOW;
        }

        .menus {
            margin-left: 0;
            position: absolute;
            top: 20px;
            width: @WIDTH_AUTO_FULL;

            .item {
                text-align: left;
                float: left;
                clear: left;
                height: 50px;

                .underscore {
                    display: block;
                    color: @DGK_RED;
                    margin-top: -20px;
                }

                &.DESC .filter .icon {
                    background: @ICON_SORT_DESC no-repeat transparent;
                }
                &.ASC .filter .icon {
                    background: @ICON_SORT_ASC no-repeat transparent;
                }
                &.hidden {
                    .filter {
                        display: none;
                    }
                }
                .filter {
                    float: left;
                    div {
                        float: left;
                    }
                    .icon {
                        width: 19px;
                        height: 19px;
                        margin-top: 15px;
                    }
                }
            }
        }
    }

    .VodCategoryListWidget .overflow {
        visibility: inherit;
        .position {
            position: absolute;
            top: 17px;
            left: 2px;
            height: @HEIGHT_FULL - 11px;
            width: 575px - 4px;
            .container {
                height: @HEIGHT_AUTO_FULL;
                width: @WIDTH_AUTO_FULL;
                .wrapper {
                    height: @HEIGHT_AUTO_FULL;
                    width: @WIDTH_AUTO_FULL;
                }
            }
        }
    }

    .VodCategoryListWidget .overflow{
        position: absolute;
        top: 285px;
        height: @HEIGHT_FULL;
        overflow: hidden;
        width: 568px;
        .position {
            left: 90px;
        }
    }

    #vodCategoryListWidget {
        .normalRegular();
        width: 576px;
        left: 192px;
        overflow: visible;
    }

    #vodCategoryListWidget.alwaysFocused {
        .bgTemplate .templateShadows .rightShadow,
        .bgTemplate .templateShadows .leftShadow {
            display: block;
        }
    }
</style>
