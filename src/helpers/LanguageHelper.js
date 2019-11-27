/** TODO : later move this into npm script and generate this code before build command * */
import Utils from '@/helpers/Utils';

export default {
    /**
     * create translations from a file
     * @returns {Object}
     */
    createTranslations() {
        // get all files under store
        const files = require.context('@/assets/i18n', true, /^\.\/(?!-)[^.]+\.(json)$/);
        const filenames = files.keys();

        const translations = {};
        filenames.forEach((filename) => {
            const name = filename.replace(/^\.\//, '').replace(/\.(json)$/, '');
            const language = name.substr(0, name.indexOf('_'));
            const languageObject = Utils.getModule(files, filename);
            translations[language] = languageObject;
        });

        return translations;
    }
};
