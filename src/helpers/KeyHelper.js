export default {
    // TODO add isLong to all emits
    // TODO check if it is possible and wise to use Vuex for keys
    /**
     * global key down handler
     * @param {Object} event - keyDown event
     */
    globalKeyDownHandler(event) {
        this.$root.$emit('keyDown', event);
        switch (event.keyCode) {
        case 86:
            this.$root.$emit('VolUp', event);
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
            this.$root.$emit('NumKey', event);
            break;
        }
    },

    /**
     * global key up handler
     * @param {Object} event - keyUp event
     */
    globalKeyUpHandler(event) {
        this.$root.$emit('keyUp', event);
    },

    /**
     * global key press handler
     * @param {Object} event - keyPress event
     */
    globalKeyPressHandler(event) {
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
