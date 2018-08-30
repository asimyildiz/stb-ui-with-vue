#!/usr/bin/env node
var program = require('commander');
var fs = require('fs');
var parse = require('csv-parse');
var glob = require("glob");

/**
 * write to file callback
 * @param {String} err - null|String if there is an error while writing to file
 */
const writeToFileCallback = (err) => {
    if (err) {
        console.error("Error while creating translation files : %s", err);
    }
};

/**
 * main algorithm for this program
 * gets path of i18n folder and profile value from console and create translation json files for vue
 * @param {String} path - path of i18n translations folder
 * @param {String} profile - current profile to package the project
 */
const runnable = (path, profile) => {
    let bundlesFilePath = path + "/" + "bundles-" + profile + ".csv";
    if (!fs.existsSync(bundlesFilePath)) {
        bundlesFilePath = path + "/" + "bundles.csv";
    }

    console.log('using bundles file : %s', bundlesFilePath);
    let _obj = {}, _keys = [], numberOfColumns = 0, currentLine = 0, isFirstLine = false;
    fs.createReadStream(bundlesFilePath)
        .pipe(parse({comment: '#', delimiter: ';', skip_empty_lines: true}))
        .on('data', function(csvrow) {
            currentLine++;
            if (!isFirstLine) {
                numberOfColumns = csvrow.length;
                for (let i = 2; i < csvrow.length; i++) {
                    _obj[csvrow[i]] = {};
                    _keys.push(csvrow[i]);
                }
                isFirstLine = true;
            }else if (csvrow.length == numberOfColumns) {
                _keys.forEach((lang, i) => {
                    _obj[lang][csvrow[0]] = csvrow[i + 2];
                });
            }else {
                console.log("line not correct inside bundles : %s", currentLine);
            }
        })
        .on('end',function() {
            _keys.forEach((lang, i) => {
                let translation = JSON.stringify(_obj[lang]);
                fs.writeFile('src/assets/i18n/' + lang + '.json', translation, 'utf8', writeToFileCallback);
            });
        });
};

program
  .version('1.0.0')
  .usage('node scripts/i18nGenerator.js <pathToi18nFolder> <profile>')
  .arguments('<path>', '<profile>')
  .action(runnable)
 .parse(process.argv);


