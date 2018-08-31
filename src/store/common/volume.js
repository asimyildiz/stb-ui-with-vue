export default {
    state: {
        currentVolume: 0,
        volumeStep: 0
    },
    mutations: {
        SET_CURRENTVOLUME(state, volume) {
            state.currentVolume = volume;
        },
        SET_VOLUMESTEP(state, step) {
            state.volumeStep = Math.ceil(100 / step);
        },
        INCREASE_VOLUME(state) {
            state.currentVolume = Math.min(100, state.currentVolume + state.volumeStep);
        },
        DECREASE_VOLUME(state) {
            state.currentVolume = Math.max(0, state.currentVolume - state.volumeStep);
        }
    },
    getters: {
        volume(state) {
            return state.currentVolume;
        }
    }
};
