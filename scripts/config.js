#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');

/**
 * write to file callback
 * @param {String} err - null|String if there is an error while writing to file
 */
const writeToFileCallback = (err) => {
    if (err) {
        console.error('Error while creating translation files : %s', err);
    }
};

/**
 * main algorithm for this program
 * gets path of i18n folder and profile value from console and create translation json files for vue
 * @param {String} path - path of i18n translations folder
 * @param {String} profile - current profile to package the project
 */
const runnable = (path, profile) => {
    const configFilePath = `${path}/config.json`;
    if (fs.existsSync(configFilePath)) {
        console.log('using config file : %s', configFilePath);
        const config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
        config.isServedFromPC = (profile === 'desktop');
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 4), 'utf8', writeToFileCallback);
    }
};

program
    .version('1.0.0')
    .usage('node scripts/config.js <pathToConfigFolder> <profile>')
    .arguments('<path> <profile>')
    .action(runnable)
    .parse(process.argv);

