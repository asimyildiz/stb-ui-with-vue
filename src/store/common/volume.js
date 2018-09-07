let currentTimeout = null;
function setAndshowVolume(commit, state) {
    bein.volumeService.setVolume(state.currentVolume);
    clearTimeout(currentTimeout);
    currentTimeout = setTimeout(() => {
        commit('HIDE_VOLUME');
    }, 3000);
}

export default {
    state: {
        lastVolume: 0,
        currentVolume: 0,
        volumeStep: 0,
        muteState: false,
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
        MUTE_VOLUME(state) {
            state.lastVolume = state.currentVolume;
            state.currentVolume = 0;
            state.muteState = true;
            state.showVolume = true;
        },
        UNMUTE_VOLUME(state) {
            state.currentVolume = state.lastVolume;
            state.muteState = false;
            state.showVolume = true;
        },
        HIDE_VOLUME(state) {
            state.showVolume = false;
        }
    },
    actions: {
        INCREASE_VOLUME({ commit, state }) {
            commit('INCREASE_VOLUME');
            setAndshowVolume(commit, state);
        },
        DECREASE_VOLUME({ commit, state }) {
            commit('DECREASE_VOLUME');
            setAndshowVolume(commit, state);
        },
        MUTE_VOLUME({ commit, state }) {
            commit('MUTE_VOLUME');
            setAndshowVolume(commit, state);
        },
        UNMUTE_VOLUME({ commit, state }) {
            commit('UNMUTE_VOLUME');
            setAndshowVolume(commit, state);
        },
        TOGGLE_MUTE({ commit, state }) {
            if (state.muteState) {
                commit('UNMUTE_VOLUME');
            } else {
                commit('MUTE_VOLUME');
            }
            setAndshowVolume(commit, state);
        }
    },
    getters: {
        volume(state) {
            return state.currentVolume;
        },
        isVolumeVisible(state) {
            return state.showVolume;
        },
        isMuted(state) {
            return state.muteState;
        }
    }
};
