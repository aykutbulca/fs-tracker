import React from 'react';
import styled from 'styled-components';

const { remote } = require('electron');

import FolderInput from './folder_input';

const StyledButton = styled.button`
    margin-top: 10px !important;
    float: right !important;
`;

const Link = styled.a`
    font-size: 13px !important;
    padding-left: 3px !important;
`;

class CreateWatcher extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            folderToWatch: '',
            foldersToSync: [''],
        };

        this.handleFolderToWatchInputChange = this.handleFolderToWatchInputChange.bind(this);
        this.addNewFolderToSync = this.addNewFolderToSync.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    handleFolderToWatchInputChange(event) {
        this.setState({ folderToWatch: event.newValue });
    }

    handleFoldersToSyncInputChange(event, index) {
        const newFoldersToSync = this.state.foldersToSync.map(i => i);

        if(index < 0) { // index < 0 means, we want to add new empty item to list.
            newFoldersToSync.push('');
        } else {
            newFoldersToSync[index] = event.newValue;
        }

        this.setState({ foldersToSync: newFoldersToSync });
    }

    addNewFolderToSync() {
        this.handleFoldersToSyncInputChange(null, -1);
        this.changeWindowHeight(40);
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
                    <FolderInput placeholder="Type or browse folder to watch" 
                        name="folderToWatch"
                        value={this.state.folderToWatch}
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
        const syncFolderItems = this.state.foldersToSync.map((item, index) => {
            return (
                <FolderInput 
                    key={index}
                    placeholder="Type or browse folder to watch" 
                    style={{marginBottom: '3px'}}
                    name={`foldersToSync[${index}]`}
                    value={this.state.foldersToSync[index]}
                    onChange={event => this.handleFoldersToSyncInputChange(event, index)}/>
            );
        });

        return syncFolderItems;
    }

}

export default CreateWatcher;