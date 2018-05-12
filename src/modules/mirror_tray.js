const { app, Tray, Menu } = require('electron');

const MirrorWindow = require('./mirror_window');
const fsHelper = require('../helpers/file_system');

class MirrorTray extends Tray {
    constructor(options) {
        super(options.iconPath || fsHelper.getDefaultIconPath());

        this.init(options);
        //this.registerEvents();
        this.buildContextMenu();

        this.createWatcherWindowRef = null;
    }

    init(options) {
        this.setToolTip(options.toolTip);
        this.setPressedImage(fsHelper.getDefaultPressedIconPath());
    }

    registerEvents() {
        this.on('click', () => {
            this.buildContextMenu();
        });
    }

    buildContextMenu() {
        const menuTemplate = this.createContextMenuTemplate();
        const contextMenu = Menu.buildFromTemplate(menuTemplate);
        this.setContextMenu(contextMenu);
    }

    createContextMenuTemplate() {
        return [
            this.createContextMenuItem("New..", () => {
                this.showCreateWatcherWindow();
            }, 'CmdOrCtrl+N'),
            this.createSeperator(),
            this.createContextMenuItem("About Mirror"),
            this.createContextMenuItem("Quit", app.quit, 'CmdOrCtrl+Q')
        ];
    }

    createContextMenuItem(label, click, accelerator) {
        return { label, click, accelerator };
    }

    createSeperator() {
        return { type: 'separator' };
    }

    showCreateWatcherWindow() {
        if(this.createWatcherWindowRef == null) {
            this.createWatcherWindowRef = new MirrorWindow({
                height: 300,
                width: 400,
                show: true,
                view: 'CreateWatcher',
                title: 'Create New Watcher'
            });

            this.createWatcherWindowRef.on('close', () => {
                this.createWatcherWindowRef = null;
            })
        } else {
            this.createWatcherWindowRef.focus();
        }
    }
}

module.exports = MirrorTray;