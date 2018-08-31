export default {
    state: {
        layout: 'default'
    },
    mutations: {
        SET_LAYOUT(state, payload) {
            state.layout = payload;
        }
    },
    getters: {
        layout(state) {
            return state.layout;
        }
    }
};
