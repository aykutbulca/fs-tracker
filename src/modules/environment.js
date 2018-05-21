const platform = require('os').platform();

const envHelper = (function () {
    let publicMembers = {};

    publicMembers.isMac = () => {
        return platform == 'darwin'
    }

    publicMembers.isWindows = () => {
        return platform == 'win32'
    }

    publicMembers.isDevelopment = () => {
        return process.defaultApp 
            || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) 
            || /[\\/]electron[\\/]/.test(process.execPath)
            || process.argv.indexOf('--noDevServer') > -1;
    }

    return publicMembers;
})();

module.exports = envHelper;