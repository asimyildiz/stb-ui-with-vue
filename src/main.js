import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store/index';
import LanguageHelper from './helpers/LanguageHelper';
import KeyHelper from './helpers/KeyHelper';

Vue.use(VueI18n);
Vue.config.productionTip = false;

const translations = LanguageHelper.createTranslations();
const i18n = new VueI18n({
    locale: 'tr', // TODO set current language from a manager or something
    messages: translations
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
    mounted() {
        window.addEventListener('keyup', KeyHelper.globalKeyUpHandler.bind(this));
        window.addEventListener('keydown', KeyHelper.globalKeyDownHandler.bind(this));
        window.addEventListener('keypress', KeyHelper.globalKeyPressHandler.bind(this));
    }
}).$mount('#app');
