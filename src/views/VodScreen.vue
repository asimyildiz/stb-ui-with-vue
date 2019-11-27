<template>
    <div class="vodScreen">
        <VodCategoryListWidget ref="vodCategoryListWidget" id="vodCategoryListWidget"></VodCategoryListWidget>
    </div>
</template>

<script type="text/babel">
import AbstractScreen from '@/views/AbstractScreen';
import VodCategoryListWidget from '@/components/vod/VodCategoryListWidget.vue';

export default {
    /**
     * vodScreen 
     * display vod screen to show vod contents
     */
    name: 'vodScreen',
    extends: AbstractScreen,
    components: {
        VodCategoryListWidget
    },
    methods: {
        /**
         * custom observes method to listen key events from widgets
         * keys are first handled inside focused widgets then screens change focus between widgets which is registered for a screen
         * handle exit key press - go back to liveScreen
         */
        observes() {
            return {
                exit(event) {
                    this.goToLiveScreen();
                }
            };
        },
        /**
         * get access keys from config 
         * then connect to vod service
         * return a fake code for DesktopVendor
         * for other vendors get the code from STB
         */
        setAccessKeys() {
            if (this.$config.dbsCode && this.$config.portalCode) {
                beINFW.vodManager.setAccessKeys({
                    applicationId: this.$config.applicationId,
                    clientId: this.$config.clientId,
                    dbsCode: this.$config.dbsCode,
                    portalCode: this.$config.portalCode
                });
            }
        },
        /**
         * fetch vod categories from service and set them to store
         */
        fetchData() {
            beINFW.vodService.getClassificationTree(true)
                .then((categories) => {
                    this.$store.commit('SET_CATEGORIES', categories);
                });
        }
    },
    /**
     * after vodScreen is created set access keys then fetch categories
     */
    created() {
        this.setAccessKeys();
        this.fetchData();
    }
};
</script>
