export default {
    state: {
        screen: 'liveScreen',
        widget: 'livePlayerWidget'
    },
    mutations: {
        SET_SCREEN(state, screen) {
            state.screen = screen;
        },
        SET_WIDGET(state, widget) {
            state.widget = widget;
        }
    },
    getters: {
        screen(state) {
            return state.screen;
        },
        widget(state) {
            return state.widget;
        }
    }
};
