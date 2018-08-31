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
    }
};
