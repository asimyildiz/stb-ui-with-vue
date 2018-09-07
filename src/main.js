import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store/index';
import LanguageHelper from './helpers/LanguageHelper';
import KeyHelper from './helpers/KeyHelper';
import config from './config.json';
import DateUtils from './utils/DateUtils';
import aliases from './middleware/aliases';

Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$isFocused = false;

const translations = LanguageHelper.createTranslations();
const i18n = new VueI18n({
    locale: config.defaultLocale, // TODO set current language from a manager or something
    silentTranslationWarn: true,
    messages: translations
});

// extend Vue mounted and beforeDestroy methods to enable component based listeners
Vue.mixin({
    mounted() {
        if (this.observes) {
            const observes = this.observes();
            Object.keys(observes).forEach((key) => {
                this.$root.$on(key, observes[key].bind(this));
            });
        }

        const widget = this.$store.getters.widget;
        if (widget && this.$options && this.$options.name) {
            this.$isFocused = this.$options.name.toLowerCase() === widget.toLowerCase();
        } else {
            this.$isFocused = false;
        }
    },
    beforeDestroy() {
        if (this.observes) {
            const observes = this.observes();
            Object.keys(observes).forEach((key) => {
                this.$root.$off(key);
            });
        }

        this.$isFocused = false;
    }
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
