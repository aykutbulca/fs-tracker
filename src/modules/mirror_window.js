const { BrowserWindow } = require('electron');
const fsHelper = require('../helpers/file_system');

const defaultWindowProperties = {
    minimizable: false,
    maximizable: false,
    resizable: false,
    show: false
};

class MirrorWindow extends BrowserWindow {
    constructor(options) {
        super(defaultWindowProperties);

        this.init(options);
        this.registerEvents(options);
    }

    init(options) {
        this.setSize(options.width, options.height, options.animate);
        this.center();

        if(options.view) {
            this.loadURL(fsHelper.getDefaultIndexHtmlUrl() + '?' + options.view);
        }
    }

    registerEvents(options) {
        this.once('ready-to-show', () => {
            this.setTitle(options.title);
            if(options.show) {
                this.show();
            }
        });
    }
}

module.exports = MirrorWindow;