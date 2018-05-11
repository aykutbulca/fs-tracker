const { app, Tray, Menu } = require('electron');
const utility = require('./utility');

class MirrorTray extends Tray {
    constructor(options) {
        super(options.iconPath || utility.getDefaultIconPath());

        this.init(options);
        this.registerEvents();
    }

    init(options) {
        this.setToolTip(options.toolTip);
        this.setPressedImage(utility.getDefaultPressedIconPath());
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
            this.createContextMenuItem("New Watcher", null),
            this.createSeperator(),
            this.createContextMenuItem("Quit", app.quit, 'CmdOrCtrl+Q')
        ];
    }

    createContextMenuItem(label, click, accelerator) {
        return { label, click, accelerator };
    }

    createSeperator() {
        return { type: 'separator' };
    }
}

module.exports = MirrorTray;