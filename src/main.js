import App from '@/App.vue';
import KeyHelper from '@/helpers/KeyHelper';
import VueHelper from '@/helpers/VueHelper';
import StoreHelper from '@/helpers/StoreHelper';
import LanguageHelper from '@/helpers/LanguageHelper';
import routes from '@/router';
import config from '@/config.json';
import DateUtils from '@/utils/DateUtils';
import aliases from '@/middleware/aliases';

const stores = StoreHelper.createStore();
const translations = LanguageHelper.createTranslations();
const helper = VueHelper.init(config, routes, stores, translations);
const i18n = helper.i18n;
const router = helper.router;
const store = helper.store;

new helper.Vue({
    i18n,
    router,
    store,
    render: h => h(App),
    mounted() {
        window.addEventListener('keyup', KeyHelper.globalKeyUpHandler.bind(this, store));
        window.addEventListener('keydown', KeyHelper.globalKeyDownHandler.bind(this, store));
        window.addEventListener('keypress', KeyHelper.globalKeyPressHandler.bind(this, store));

        this.$store.watch((state, getters) => getters.volume, (volume) => {
            beINFW.volumeService.setVolume(volume);
        });
    }
}).$mount('#app');
