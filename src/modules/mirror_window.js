const { BrowserWindow } = require('electron');
const fsHelper = require('../helpers/file_system');

const defaultWindowProperties = {
    minimizable: false,
    maximizable: false,
    resizable: false,
    show: false
};

// Private class member symbols for encapsulation
const _init = Symbol('init');
const _registerEvents = Symbol('registerEvents');

class MirrorWindow extends BrowserWindow {
    constructor(options) {
        super(defaultWindowProperties);

        this[_init](options);
        this[_registerEvents](options);
    }

    [_init](options) {
        this.setSize(options.width, options.height, options.animate);
        this.center();

        if(options.view) {
            this.loadURL(fsHelper.getDefaultIndexHtmlUrl() + '?' + options.view);
        }
    }

    [_registerEvents](options) {
        this.once('ready-to-show', () => {
            this.setTitle(options.title);
            if(options.show) {
                this.show();
            }
        });
    }
}

module.exports = MirrorWindow;