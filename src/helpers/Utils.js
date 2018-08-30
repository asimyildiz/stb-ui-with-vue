/**
 * get a file and return it's content
 * @param {Function} files
 * @param {String} filename
 * @returns {*}
 */
export default {
  getModule(files, filename) {
    const file = files(filename);
    return file.default ? file.default : file;
  }
};
