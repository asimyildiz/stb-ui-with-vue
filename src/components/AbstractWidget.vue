<template></template>

<script type="text/babel">
export default {
    /**
     * all widgets need to be extended from AbstractWidget
     */
    name: 'abstractWidget',
    data() {
        return {
            $type: this.$TYPES.WIDGET
        };
    }
};
</script>
