const { app, Tray, Menu } = require('electron');

const MirrorWindow = require('./mirror_window');
const fsHelper = require('../modules/file_system');

// Private class member symbols for encapsulation
const _init = Symbol('init');
const _buildContextMenu = Symbol('buildContextMenu');
const _createContextMenuTemplate = Symbol('createContextMenuTemplate');
const _createContextMenuItem = Symbol('createContextMenuItem');
const _createSeperator = Symbol('createSeperator');
const _showCreateWatcherWindow = Symbol('showCreateWatcherWindow');
const _createWatcherWindowRef = Symbol('createWatcherWindowRef');

class MirrorTray extends Tray {
    constructor(options) {
        super(options.iconPath || fsHelper.getDefaultIconPath());

        this[_createWatcherWindowRef] = null;
        
        this[_init](options);
        this[_buildContextMenu]();
    }

    [_init](options) {
        this.setToolTip(options.toolTip);
        this.setPressedImage(fsHelper.getDefaultPressedIconPath());
    }

    [_buildContextMenu]() {
        const menuTemplate = this[_createContextMenuTemplate]();
        const contextMenu = Menu.buildFromTemplate(menuTemplate);
        this.setContextMenu(contextMenu);
    }

    [_createContextMenuTemplate]() {
        return [
            this[_createContextMenuItem]("New..", () => {
                this[_showCreateWatcherWindow]();
            }, 'CmdOrCtrl+N'),
            this[_createSeperator](),
            this[_createContextMenuItem]("About Mirror"),
            this[_createContextMenuItem]("Quit", app.quit, 'CmdOrCtrl+Q')
        ];
    }

    [_createContextMenuItem](label, click, accelerator) {
        return { label, click, accelerator };
    }

    [_createSeperator]() {
        return { type: 'separator' };
    }

    [_showCreateWatcherWindow]() {
        if(this[_createWatcherWindowRef] == null) {
            this[_createWatcherWindowRef] = new MirrorWindow({
                height: 275,
                width: 400,
                show: true,
                view: 'CreateWatcher',
                title: 'Create New Watcher'
            });

            this[_createWatcherWindowRef].on('close', () => {
                this[_createWatcherWindowRef] = null;
            })
        } else {
            this[_createWatcherWindowRef].focus();
        }
    }
}

module.exports = MirrorTray;