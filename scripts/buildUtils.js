#!/usr/bin/env node
const npmRun = require('npm-run');

/**
 * check if command successfully ran
 * @type {Boolean}
 */
let isCommandSuccessful = true;

/**
 * common commands for application
 * @type {{preBuildCommand: String, buildCommand: String, serveCommand: String}}
 */
const commands = {
    preBuildCommand: 'npm run-script generator i18n ',
    aliasesCommand: 'npm run-script aliases ',
    configCommand: 'npm run-script config src ',
    buildCommand: 'npm run-script build',
    serveCommand: 'npm run-script serve'
};

/**
 * pre-build command callback
 * @param {String} commandType - current command type
 * @param {String} err - null|String if there is an error while command has run
 * @param {String} stdout - stdout logs
 * @param {String} stderr - stderr logs
 */
const commandCallback = (commandType, err, stdout, stderr) => {
    if (err) {
        console.error('%s failed with : %s', commandType, stderr);
        isCommandSuccessful = false;
    } else {
        console.log('%s succeeded with : %s', commandType, stdout);
    }
};

/**
 * run an npm command
 * @param {String} command - command to run
 * @param {String} commandType - current command type
 * @param {String} path - current working directory
 */
const runCommand = (command, commandType, path) => {
    isCommandSuccessful = true;
    return npmRun.exec(command, { cwd: __dirname + path }, commandCallback.bind(this, commandType));
};

/**
 * connect to std out of a child process
 * @param {Object} childProcess
 */
const connectToStdout = (childProcess) => {
    childProcess.stdout.setEncoding('utf8');
    childProcess.stdout.on('data', (data) => {
        console.log('%s', data);
    });
    childProcess.on('close', (code) => {
        console.log('child process exited with code %s', code);
    });
};

module.exports = {
    /**
     * serve current package
     * @param {String} profile - current profile
     */
    _serve(profile) {
        console.log('Current Profile : %s', profile);
        runCommand(commands.preBuildCommand + profile, 'preBuild', '');
        if (isCommandSuccessful) {
            runCommand(commands.aliasesCommand + profile, 'aliases', '');
            runCommand(commands.configCommand + profile, 'config', '');
            if (isCommandSuccessful) {
                connectToStdout(runCommand(commands.serveCommand, 'serve', ''));
            }
        }
    },

    /**
     * create package command
     * @param {String} profile - current profile
     */
    _package(profile) {
        console.log('Current Profile : %s', profile);
        runCommand(commands.preBuildCommand + profile, 'preBuild', '');
        if (isCommandSuccessful) {
            runCommand(commands.aliasesCommand + profile, 'aliases', '');
            if (isCommandSuccessful) {
                runCommand(commands.buildCommand, 'build', '');
            }
        }
    }
};
