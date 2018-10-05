const keyHelper = {
    // TODO add isLong to all emits
    // TODO check if it is possible and wise to use Vuex for keys
    /**
     * fires a key event for a specific widget
     * @param {Object} store - vuex store
     * @param {String} methodName
     */
    fireKeyEventForWidget(store, methodName) {
        if (store.getters.widget) {
            const widget = store.getters.widget.charAt(0).toUpperCase() + store.getters.widget.substr(1);
            this.$root.$emit(`${methodName}EventFrom${widget}`);
        }
    },

    /**
     * global key down handler
     * @param {Object} store - vuex store
     * @param {Object} event - keyDown event
     */
    globalKeyDownHandler(store, event) {
        this.$root.$emit('keyDown', event);
        switch (event.keyCode) {
        case 37:
            this.$root.$emit('leftKey', event);
            keyHelper.fireKeyEventForWidget.call(this, store, 'leftKey');
            break;
        case 38:
            this.$root.$emit('upKey', event);
            keyHelper.fireKeyEventForWidget.call(this, store, 'upKey');
            break;
        case 39:
            this.$root.$emit('rightKey', event);
            keyHelper.fireKeyEventForWidget.call(this, store, 'rightKey');
            break;
        case 40:
            this.$root.$emit('downKey', event);
            keyHelper.fireKeyEventForWidget.call(this, store, 'downKey');
            break;
        case 86:
            this.$root.$emit('volUp', event);
            break;
        case 66:
            this.$root.$emit('volDown', event);
            break;
        case 80:
            this.$root.$emit('portal', event);
            break;
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            this.$root.$emit('numKey', event);
            break;
        case 13:
            this.$root.$emit('click', event);
            break;
        case 81:
            this.$root.$emit('exit', event);
            break;
        }
    },

    /**
     * global key up handler
     * @param {Object} store - vuex store
     * @param {Object} event - keyUp event
     */
    globalKeyUpHandler(store, event) {
        this.$root.$emit('keyUp', event);
    },

    /**
     * global key press handler
     * @param {Object} store - vuex store
     * @param {Object} event - keyPress event
     */
    globalKeyPressHandler(store, event) {
        this.$root.$emit('keyPress', event);
    },

    /**
     * get numeric key value number from a key event
     * @param {Number} event
     * @returns {Number}
     */
    getNumericValueFromKey(keyCode) {
        switch (keyCode) {
        case 48:
            return 0;
        case 49:
            return 1;
        case 50:
            return 2;
        case 51:
            return 3;
        case 52:
            return 4;
        case 53:
            return 5;
        case 54:
            return 6;
        case 55:
            return 7;
        case 56:
            return 8;
        case 57:
            return 9;
        default:
            return null;
        }
    }
};

export default keyHelper;
