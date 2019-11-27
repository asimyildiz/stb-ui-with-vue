/** TODO : later move this into npm script and generate this code before build command * */
import Utils from '@/helpers/Utils';

/**
 * merge store objects into a single object
 * @param {Object} storeObjects
 * @param {Object} storeObject
 */
const mergeStoreObject = (storeObjects, storeObject) => {
    Object.keys(storeObject).forEach((key) => {
        storeObjects[key] = Object.assign(storeObjects[key], storeObject[key]);
    });
};

export default {
    /**
     * create stores dynamically from store folder programmatically
     */
    createStore() {
        // get all files under store
        const files = require.context('@/store', true, /^\.\/(?!-)[^.]+\.(js)$/);
        const filenames = files.keys();

        const storeObjects = {
            state: {},
            mutations: {},
            actions: {},
            getters: {}
        };

        filenames.forEach((filename) => {
            const name = filename.replace(/^\.\//, '').replace(/\.(js)$/, '');
            if (name !== 'index') {
                const storeObject = Utils.getModule(files, filename);
                mergeStoreObject(storeObjects, storeObject);
            }
        });

        return storeObjects;
    }
};
