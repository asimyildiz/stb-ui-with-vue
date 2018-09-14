import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import VueI18n from 'vue-i18n';

/* istanbul ignore */
const VueHelper = {
    /**
     * instantiate all Vue plugins being used for the project
     */
    initVuePlugins() {
        Vue.use(Vuex);
        Vue.use(VueI18n);
        Vue.use(Router);
    },

    /**
     * create translations for language set inside config file
     * @param {Object} translations
     * @param {Object} updatedConfig
     * @returns {VueI18n} translation object
     */
    createTranslations(translations, updatedConfig) {
        return new VueI18n({
            locale: updatedConfig.defaultLocale, // TODO set current language from a manager or something
            silentTranslationWarn: true,
            messages: translations
        });
    },

    /**
     * create Vuex Store for our app
     * @param {Object} stores
     * @returns {Vuex.Store}
     */
    createStore(stores) {
        return new Vuex.Store(stores);
    },

    /**
     * create Vue Router for our app
     * @param {Object} routes
     */
    createRouter(activeRoutes) {
        return new Router(activeRoutes);
    },

    /**
     * create an appropriate config object based on profile
     */
    createConfig(currentConfig) {
        const profile = currentConfig[currentConfig.profile];
        let updatedConfig = currentConfig;
        if (profile) {
            updatedConfig = Object.assign(currentConfig, profile);
        }
        return updatedConfig;
    },

    /**
     * extend Vue object and add some global instance variables into it
     * @param {Object} updatedConfig - current application config file (updated for vendor)
     */
    extendVue(updatedConfig) {
        Vue.config.productionTip = false;
        Vue.prototype.$config = updatedConfig;
        Vue.prototype.$TYPES = {
            SCREEN: 'screen',
            WIDGET: 'widget'
        };

        Vue.prototype.setFocus = function setFocus() {
            this.$store.commit('SET_WIDGET', this.$options.name);
        };
    },

    /**
     * extend Vue, add automatic observes feature, which calls the methods defined inside observes property,
     * when there is an event emitted with that method name, it also manages the active screen and widget states
     * it will fire the events for active screen as well as active widget, other screens and widgets listeners
     * will not work in this case
     */
    addObservesFeatureVue() {
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
    },

    /**
     * extends router to set active screen and active widget
     * while changing screens using Vue router
     * All screens will be changed using routers
     * @param {Object} router
     * @param {Object} store
     */
    extendRouter(router, store) {
        router.beforeEach((to, from, next) => {
            store.commit('SET_SCREEN', to.name);
            store.commit('SET_WIDGET', to.meta && to.meta.widget);
            next();
        });
    },

    /**
     * init Vue with all plugins used for this UI, this method accepts all config, routes, stores and translations
     * objects from where it is called, so that while running tests, they can be mocked up
     * @param {Object} config
     * @param {Object} routes
     * @param {Object} stores
     * @param {Object} translations
     * @returns {Object} VueI18n instance
     */
    init(config, routes, stores, translations) {
        // init plugins
        VueHelper.initVuePlugins();

        // create a config file, and instantiate all plugins, extend Vue
        const updatedConfig = VueHelper.createConfig(config);
        const i18n = VueHelper.createTranslations(translations, updatedConfig);
        const store = VueHelper.createStore(stores);
        const router = VueHelper.createRouter(routes);
        VueHelper.extendVue(updatedConfig);
        VueHelper.addObservesFeatureVue();
        VueHelper.extendRouter(router, store);

        return {
            Vue,
            i18n,
            router,
            store
        };
    }
};

export default VueHelper;
