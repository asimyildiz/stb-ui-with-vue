export default {
    state: {
        currentVolume: 0,
        volumeStep: 0,
        showVolume: false
    },
    mutations: {
        SET_VOLUMESTEP(state, step) {
            state.volumeStep = Math.ceil(100 / step);
        },
        SET_CURRENTVOLUME(state, volume) {
            state.currentVolume = volume;
        },
        INCREASE_VOLUME(state) {
            state.currentVolume = Math.min(100, state.currentVolume + state.volumeStep);
            state.showVolume = true;
        },
        DECREASE_VOLUME(state) {
            state.currentVolume = Math.max(0, state.currentVolume - state.volumeStep);
            state.showVolume = true;
        },
        HIDE_VOLUME(state) {
            state.showVolume = false;
        }
    },
    actions: {
        INCREASE_VOLUME({ commit }) {
            commit('INCREASE_VOLUME');
            setTimeout(() => {
                commit('HIDE_VOLUME');
            }, 3000);
        },
        DECREASE_VOLUME({ commit }) {
            commit('DECREASE_VOLUME');
            setTimeout(() => {
                commit('HIDE_VOLUME');
            }, 3000);
        }
    },
    getters: {
        volume(state) {
            return state.currentVolume;
        },
        isVolumeVisible(state) {
            return state.showVolume;
        }
    }
};
