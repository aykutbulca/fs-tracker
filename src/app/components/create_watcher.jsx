const { remote } = require('electron');
const uuid = require('uuid/v4');

import React from 'react';
import styled from 'styled-components';

import FolderInput from './folder_input';

const StyledButton = styled.button`
    margin-top: 10px !important;
    float: right !important;
`;

const Link = styled.a`
    font-size: 13px !important;
    padding-left: 3px !important;
`;

const FolderInputWithMargin = styled(FolderInput)`
    margin-bottom: 3px;
`;

const FOLDER_INPUT_SIZE = 40;

class CreateWatcher extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            folderToWatch: this.getNewPathInputItem(),
            foldersToSync: [this.getNewPathInputItem()],
        };

        this.handleFolderToWatchInputChange = this.handleFolderToWatchInputChange.bind(this);
        this.addNewFolderToSync = this.addNewFolderToSync.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    getNewPathInputItem() {
       return {
            id: uuid(), 
            path: ''
        }
    }

    getChangedPathInputItem(oldItem, newPath) {
        let newItem = Object.assign({}, oldItem);
        newItem.path = newPath;
        return newItem;
     }

    handleFolderToWatchInputChange(event) {
        const newItem = this.getChangedPathInputItem(this.state.folderToWatch, event.newValue);
        this.setState({ folderToWatch: newItem });
    }

    handleFoldersToSyncInputChange(event, index) {
        let newFoldersToSync = this.state.foldersToSync.map(i => i);

        if(index < 0) { // index < 0 means, we want to add new empty item to list.
            newFoldersToSync.push(this.getNewPathInputItem());
        } else {
            const newItem = this.getChangedPathInputItem(newFoldersToSync[index], event.newValue);
            newFoldersToSync[index] = newItem;
            
            if(event.cleared &&  newFoldersToSync.length > 1) {
                newFoldersToSync.splice(index, 1);
                this.changeWindowHeight(-FOLDER_INPUT_SIZE);
            }
        }

        this.setState({ foldersToSync: newFoldersToSync });
    }

    addNewFolderToSync() {
        this.handleFoldersToSyncInputChange(null, -1);
        this.changeWindowHeight(FOLDER_INPUT_SIZE);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("state", this.state);
    }

    changeWindowHeight(offset) {
        const currentWindow = remote.getCurrentWindow();
        const bounds = currentWindow.getBounds();
        currentWindow.setSize(bounds.width, bounds.height + offset);
    }

    closeWindow() {
        remote.getCurrentWindow().close();
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Select a <u>folder</u> to watch for changes</label>
                    <FolderInput placeholder="Type or browse or drop a folder to watch" 
                        value={this.state.folderToWatch.path}
                        onChange={this.handleFolderToWatchInputChange}/>
                </div>
                <div className="field">
                    <label>Select <u>folder(s)</u> to sync</label>
                    { this.renderFoldersToSyncItems() }
                    <Link href="#" onClick={this.addNewFolderToSync} >+ Add more folders to sync...</Link>
                </div>
                <StyledButton className="ui primary compact button" type="submit">Start Watcher</StyledButton>
                <StyledButton className="ui compact button" type="button" onClick={this.closeWindow} >Close</StyledButton>
            </form>
        );
    }

    renderFoldersToSyncItems() {
        return this.state.foldersToSync.map((item, index) => {
            const stateItem = this.state.foldersToSync[index];
            return (
                <FolderInputWithMargin 
                    key={stateItem.id}
                    placeholder="Type or browse or drop a folder to sync"
                    value={stateItem.path}
                    onChange={event => this.handleFoldersToSyncInputChange(event, index)}/>
            );
        });
    }

}

export default CreateWatcher;