import StoreHelper from '@/helpers/StoreHelper';
import LanguageHelper from '@/helpers/LanguageHelper';
import routes from '@/router';
import config from '@/config.json';
import VueHelper from '@/helpers/VueHelper';
import stores from './helpers/stores';
import translations from './helpers/translations';

let run = false;
before(() => {
    if (run === true) {
        return;
    }
    run = true;

    // const stores = StoreHelper.createStore(); // -> original stores that is used in-app
    // const translations = LanguageHelper.createTranslations(); // -> original translations that is used in-app

    // create vue instance for all tests using mocked data
    const helper = VueHelper.init(config, routes, stores, translations);
    if (global.bein === undefined) {
        global.bein = {};
    }
    global.bein.vue = helper.Vue;
    global.bein.store = helper.store;
    global.bein.i18n = helper.i18n;
    global.bein.router = helper.router;
});
