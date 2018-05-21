const envHelper = require('./environment');
const path = require('path');

const fsHelper = (function () {

    getFullPath = (folder, file) => {
        return path.join(__dirname, '../..', folder, file);
    },

    getDefaultIconPath = () => {
        if (envHelper.isMac()) {
            return fsHelper.getFullPath('src', 'assets/icons/mirror.png');
        } else if (envHelper.isWindows()) {
            return fsHelper.getFullPath('src', 'assets/icons/icon.ico');
        }

        return null;
    },

    getDefaultPressedIconPath = () => {
        if (envHelper.isMac()) {
            return fsHelper.getFullPath('src', 'assets/icons/mirror-pressed.png');
        }

        return null;
    },

    getDefaultIndexHtmlUrl = () => {
        if(envHelper.isDevelopment()) {
            return 'http://localhost:8080';
        }

        return `file://${ fsHelper.getFullPath('dist', 'index.html') }`
    }

    return {
        getFullPath,
        getDefaultIconPath,
        getDefaultPressedIconPath,
        getDefaultIndexHtmlUrl
    }
})();

module.exports = fsHelper;