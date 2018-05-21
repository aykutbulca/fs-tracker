const envHelper = require('./environment');
const path = require('path');

const fsHelper = (function () {
    let publicMembers = {};

    const getFullPath = (folder, file) => {
        return path.join(__dirname, '../..', folder, file);
    }

    publicMembers.getDefaultIconPath = () => {
        if (envHelper.isMac()) {
            return getFullPath('src', 'assets/icons/mirror.png');
        } else if (envHelper.isWindows()) {
            return getFullPath('src', 'assets/icons/icon.ico');
        }

        return null;
    }

    publicMembers.getDefaultPressedIconPath = () => {
        if (envHelper.isMac()) {
            return getFullPath('src', 'assets/icons/mirror-pressed.png');
        }

        return null;
    }

    publicMembers.getDefaultIndexHtmlUrl = () => {
        if(envHelper.isDevelopment()) {
            return 'http://localhost:8080';
        }

        return `file://${ getFullPath('dist', 'index.html') }`
    }

    return publicMembers;
})();

module.exports = fsHelper;