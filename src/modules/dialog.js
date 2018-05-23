const { dialog } = require('electron');

const dialogHelper = (function () {
    let publicMembers = {};

    publicMembers.showQuestion = (options) => {
        return dialog.showMessageBox({
            type: 'question',
            title: options.title || 'User Approval',
            message: options.message ,
            detail: options.detail,
            buttons: ['Yes', 'No']
        }) == 0; //Index of button 'YES'
    }

    publicMembers.showDialog = (options) => {
        return dialog.showMessageBox({
            type: options.type || 'info',
            title: options.title || 'Info',
            message: options.message ,
            detail: options.detail,
            buttons: ['Ok']
        });
    }

    return publicMembers;
})();

module.exports = dialogHelper;