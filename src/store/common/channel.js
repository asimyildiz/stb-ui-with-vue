export default {
    state: {
        channel: null
    },
    mutations: {
        SET_CHANNEL(state, channel) {
            state.channel = channel;
        }
    },
    getters: {
        channel(state) {
            return state.channel;
        }
    }
};
