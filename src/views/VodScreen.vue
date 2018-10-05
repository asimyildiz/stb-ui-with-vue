<template>
    <div class="vodScreen">
        <VodCategoryListWidget ref="vodCategoryListWidget" id="vodCategoryListWidget"></VodCategoryListWidget>
    </div>
</template>

<script type="text/babel">
import AbstractScreen from '@/views/AbstractScreen';
import VodCategoryListWidget from '@/components/vod/VodCategoryListWidget.vue';

export default {
    name: 'vodScreen',
    extends: AbstractScreen,
    components: {
        VodCategoryListWidget
    },
    methods: {
        observes() {
            return {
                exit(event) {
                    this.goToLiveScreen();
                }
            };
        },
        setAccessKeys() {
            // get access keys from elsewhere if there is no
            // or do not set access keys from here, instead add a method to fetch access keys into vodService
            // and return a fake code for DesktopVendor, and get it from STB or elsewhere for another vendor
            if (this.$config.dbsCode && this.$config.portalCode) {
                beINFW.vodManager.setAccessKeys({
                    applicationId: this.$config.applicationId,
                    clientId: this.$config.clientId,
                    dbsCode: this.$config.dbsCode,
                    portalCode: this.$config.portalCode
                });
            }
        },
        fetchData() {
            beINFW.vodService.getClassificationTree(true)
                .then((categories) => {
                    this.$store.commit('SET_CATEGORIES', categories);
                });
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.setAccessKeys();
        this.fetchData();
    }
};
</script>
