export default {
    state: {
        channel: null,
        programs: null
    },
    mutations: {
        SET_CHANNEL(state, channel) {
            state.channel = channel;
        },
        SET_PROGRAMS(state, programs) {
            state.programs = programs;
        }
    },
    getters: {
        channel(state) {
            return state.channel;
        },
        programs(state) {
            return state.programs;
        }
    }
};
