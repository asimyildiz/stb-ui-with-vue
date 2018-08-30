import Vue from 'vue';
import Vuex from 'vuex';
import StoreHelper from '../helpers/StoreHelper';

Vue.use(Vuex);

const storeObjects = StoreHelper.createStore();
export default new Vuex.Store(storeObjects);
