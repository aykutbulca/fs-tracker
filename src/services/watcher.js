const stateManager = require('../state/state_manager');

const watcherService = (function () {
    let publicMembers = {};

    const validateWatcher = (watcherInfo) => {
        return {
            success: true,
            message: ''
        };
    }

    publicMembers.saveWatcher = (watcherInfo) => {
        const validWatcherCheck = validateWatcher(watcherInfo);
        if(validWatcherCheck.success) {
            stateManager.saveWatcher(watcherInfo);
        }
        return validWatcherCheck;
    }

    publicMembers.getWatcherInfoDesc = (watcherInfo) => {
        const folderToWatch = 'Folder to be watched: \n - ' + watcherInfo.folderToWatch.path;
        const foldersToSync = 'Folders to be synced: \n - ' + watcherInfo.foldersToSync.map(i => i.path).join('\n - ');

        return '\n' + folderToWatch + '\n\n' + foldersToSync + '\n';
    }

    return publicMembers;
})();

module.exports = watcherService;