const { ipcRenderer } = require('electron');

const { ADD_NEW_WATCHER_SYNC } = require('./actions');

const addNewWatcherSync = (watcherInfo) => {
    return ipcRenderer.sendSync(ADD_NEW_WATCHER_SYNC, watcherInfo);
}

module.exports = {
    addNewWatcherSync
};