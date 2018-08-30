#!/usr/bin/env node
var program = require('commander');
var buildUtils = require('./buildUtils');

/**
 * main algorithm for this program
 * gets profile value from console and call all build-scripts to create a package
 * @param {String} profile - current profile to package the project
 */
const runnable = (profile) => {
    buildUtils._package(profile);
};

program
    .version('1.0.0')
    .usage('node scripts/package.js <profile>')
    .arguments('<profile>')
    .action(runnable)
    .parse(process.argv);
