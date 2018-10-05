export default {
    state: {
        categories: null
    },
    mutations: {
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
        }
    },
    getters: {
        categories(state) {
            return state.categories;
        }
    }
};
