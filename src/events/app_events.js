const { ipcMain } = require('electron');

const stateManager = require('../state/state_manager');
const watcherService = require('../services/watcher');
const { ADD_NEW_WATCHER_SYNC } = require('./actions');

const dialogHelper = require('../modules/dialog');

const registerAppEvents = (function (appTray) {

    const saveWatcherEvent = (watcherInfo) => {
        const saveApproved = dialogHelper.showQuestion({
            title: 'User Approval',
            message: 'Do you want to create a new watcher with the following details?',
            detail: watcherService.getWatcherInfoDesc(watcherInfo)
        });

        if(!saveApproved) {
            return false;
        }

        const saveResult = watcherService.saveWatcher(watcherInfo);

        if(!saveResult.success) {
            dialogHelper.showDialog({
                title: 'Error',
                message: saveResult.message,
                detail: saveResult.message
            })

            return false;
        }

        return saveApproved;
    }

    ipcMain.on(ADD_NEW_WATCHER_SYNC, (event, data) => {
        event.returnValue = saveWatcherEvent(data);
    });

});

module.exports = registerAppEvents;