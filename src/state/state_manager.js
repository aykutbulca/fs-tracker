const Store = require('electron-store');

const STORAGE_FILE_NAME = 'mirror.storage'
const WATCHERS_KEY = 'watchers'

const stateManager = (function () {
    let publicMembers = {};

    const getInitialStorageData = () => {
        let data = {};
        data[WATCHERS_KEY] = [];
        return data;
    }

    let store = new Store({
        name: STORAGE_FILE_NAME,
        defaults: getInitialStorageData()
    });

    publicMembers.saveWatcher = (watcherInfo) => {
        let currentWatchers = store.get(WATCHERS_KEY, []);
        currentWatchers.push(watcherInfo);
        store.set(WATCHERS_KEY, currentWatchers);

        store.openInEditor();
    }

    publicMembers.getWatchers = () => {
        return store.get(WATCHERS_KEY, []);
    }

    return publicMembers;
})();

module.exports = stateManager;