#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var glob = require('glob');
var parser = require('jsdoc3-parser');
var os = require("os");

/**
 * write to file callback
 * @param {String} err - null|String if there is an error while writing to file
 */
const writeToFileCallback = (err) => {
    if (err) {
        console.error("Error while creating translation files : %s", err);
    }
};

let aliasesCreated = 0;
/**
 * clear previously created aliases
 */
const clearAliases = () => {
    fs.writeFile('src/middleware/aliases.js', '', 'utf8', writeToFileCallback);
    aliasesCreated = 0;
};

/**
 * write aliases import and export statements into aliases.js file
 * @param {Array<String>} _imports
 * @param {Array<String>} _exports
 */
const writeAliases = (_imports, _exports) => {
    for (let i = 0; i < _imports.length; i++) {
        fs.appendFile('src/middleware/aliases.js', _imports[i], 'utf8', writeToFileCallback);
    }

    fs.appendFile('src/middleware/aliases.js', 'export default {' + os.EOL, 'utf8', writeToFileCallback);
    for (let i = 0; i < _exports.length; i++) {
        fs.appendFile('src/middleware/aliases.js', _exports[i], 'utf8', writeToFileCallback);
    }

    fs.appendFile('src/middleware/aliases.js', '};' + os.EOL, 'utf8', writeToFileCallback);
};

/**
 * create alias import and export statements
 * @param {String} profile - current profile to create aliases for
 * @param {String} alias - alias name for current service
 * @param {String} name - service name
 * @param {String} file - service path
 * @param {Array<String>} _imports - import statements
 * @param {Array<String>} _exports - export statements
 * @param {Number} length - length of vendor services
 */
const createAlias = (profile, alias, name, file, _imports, _exports, length) => {
    if (alias && name) {
        const fileRelativePath = file.replace("src", "..");
        const filePathWithoutJs = fileRelativePath.replace(".js", "");
        _imports.push("import " + name + " from '" + filePathWithoutJs + "';" + os.EOL);

        let currentExport = alias + ": new " + name + "()";
        currentExport = length > 0 ? currentExport + "," : currentExport;
        _exports.push(currentExport + os.EOL);

        aliasesCreated++;
    }
};

/**
 * find vendor implementations for services
 * @param {String} profile - current profile to create aliases for
 * @param {String} alias - alias name for current service
 * @param {Array<String>} _imports - import statements
 * @param {Array<String>} _exports - export statements
 */
const findVendorFilesFor = (profile, alias, _imports, _exports) => {
    if (alias) {
        glob("src/vendors/" + profile + "/services/**/*" + alias + ".js", {nocase: true}, function (er, files) {
            if (!er && files && files.length > 0) {
                let filesLength = files.length;
                for (let i = 0; i < filesLength; i++) {
                    parser(files[i], function(profile, file, error, ast) {
                        createAlias(profile, alias, ast[0].name, file, _imports, _exports, filesLength);
                        if (filesLength + 1 === aliasesCreated) {
                            writeAliases(_imports, _exports);
                        }
                    }.bind(this, profile, files[i]));
                }
            }
        });
    }
};

/**
 * main algorithm for this program
 * gets profile and create aliases for services for that profile
 * @param {String} profile - current profile to create aliases for
 */
const runnable = (profile) => {
    clearAliases();
    glob("src/services/**/*.js", {}, function (er, files) {
        if (!er && files && files.length > 0) {
            const _imports = [], _exports = [];
            files.forEach((file, i) => {
                parser(file, function(error, ast) {
                    findVendorFilesFor(profile, ast[0].alias, _imports, _exports);
                });
            });
        }
    });
};

program
    .version('1.0.0')
    .usage('node scripts/aliases.js <profile>')
    .arguments('<profile>')
    .action(runnable)
    .parse(process.argv);


