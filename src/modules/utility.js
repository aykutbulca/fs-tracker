const platform = require('os').platform();
const path = require('path');

const utility = {

    isMac: () => {
        return platform == 'darwin'
    },

    isWindows: () => {
        return platform == 'win32'
    },

    getPath: (folder, file) => {
        return path.join(__dirname, '../..', folder, file);
    },

    getDefaultIconPath: () => {
        if (utility.isMac()) {
            return utility.getPath('src', 'assets/icons/mirror.png');
        } else if (utility.isWindows()) {
            return utility.getPath('src', 'assets/icons/icon.ico');
        }

        return null;
    },

    getDefaultPressedIconPath: () => {
        if (utility.isMac()) {
            return utility.getPath('src', 'assets/icons/mirror-pressed.png');
        }

        return null;
    }

};

module.exports = utility;