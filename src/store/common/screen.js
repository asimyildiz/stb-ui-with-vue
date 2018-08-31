export default {
    state: {
        screen: 'liveScreen'
    },
    mutations: {
        SET_SCREEN(state, payload) {
            state.screen = payload;
        }
    },
    getters: {
        screen(state) {
            return state.screen;
        }
    }
};
