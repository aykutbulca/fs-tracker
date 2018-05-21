const platform = require('os').platform();

const envHelper = (function () {
    isMac = () => {
        return platform == 'darwin'
    },

    isWindows = () => {
        return platform == 'win32'
    },

    isDevelopment = () => {
        return process.defaultApp 
            || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) 
            || /[\\/]electron[\\/]/.test(process.execPath)
            || process.argv.indexOf('--noDevServer') > -1;
    }

    return {
        isMac,
        isWindows,
        isDevelopment
    }
})();

module.exports = envHelper;