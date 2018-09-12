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

let currentConfig = config;
if (config[config.profile]) {
    currentConfig = Object.assign(config, config[config.profile]);
}
Vue.prototype.$config = currentConfig;
Vue.prototype.$TYPES = {
    SCREEN: 'screen',
    WIDGET: 'widget'
};

Vue.prototype.setFocus = function () {
    this.$store.commit('SET_WIDGET', this.$options.name);
};

const translations = LanguageHelper.createTranslations();
const i18n = new VueI18n({
    locale: config.defaultLocale, // TODO set current language from a manager or something
    silentTranslationWarn: true,
    messages: translations
});

// extend Vue mounted and beforeDestroy methods to enable component based listeners
Vue.mixin({
    created() {
        this.$observed = [];
    },
    mounted() {
        // connect to all SCREENs observes
        if (this.$data.$type === this.$TYPES.SCREEN) {
            this.connectToObserves();
        }
    },
    beforeDestroy() {
        // disconnect from all observes without checking the TYPE, because the component is being destroyed
        this.disconnectFromObserves();
    },
    methods: {
        connectToObserves() {
            // connect to observes of current component
            if (this.observes) {
                const observes = this.observes();
                Object.keys(observes).forEach((key) => {
                    const methodToObserve = observes[key].bind(this);
                    this.$observed.push({
                        key,
                        methodToObserve
                    });
                    this.$root.$on(key, methodToObserve);
                });
            }
        },
        disconnectFromObserves() {
            // disconnect from current component's observes
            if (this.$observed.length > 0) {
                this.$observed.forEach((observe, index) => {
                    this.$root.$off(observe.key, observe.methodToObserve);
                });
            }
        }
    },
    computed: {
        isFocused: {
            get() {
                // focus is only needs to be handled for WIDGETs, NOT SCREENS
                if (this.$data.$type === this.$TYPES.WIDGET) {
                    const widget = this.$store.getters.widget;
                    const name = this.$options && this.$options.name;
                    if (widget && name && name.toLowerCase() === widget.toLowerCase()) {
                        this.connectToObserves();
                        return true;
                    }

                    // disconnect WIDGETs observes
                    this.disconnectFromObserves();
                }
                // do not disconnect here from observes,
                // because it will also disconnect from SCREENs observes
                return false;
            }
        }
    }
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
    mounted() {
        window.addEventListener('keyup', KeyHelper.globalKeyUpHandler.bind(this, store));
        window.addEventListener('keydown', KeyHelper.globalKeyDownHandler.bind(this, store));
        window.addEventListener('keypress', KeyHelper.globalKeyPressHandler.bind(this, store));

        this.$store.watch((state, getters) => getters.volume, (volume) => {
            bein.volumeService.setVolume(volume);
        });
    }
}).$mount('#app');
