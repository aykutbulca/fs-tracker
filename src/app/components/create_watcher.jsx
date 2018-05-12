import React from 'react';
import styled from 'styled-components';

import FolderInput from './folder_input';

const StyledButton = styled.button`
    margin-top: 10px !important;
    float: right !important;
`;

class CreateWatcher extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            folderToWatch: 'initial value',
            folderToSync: 'initial value'
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const newState = {};
        newState[event.name] = event.newValue;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("state", this.state);
    }

    showFolderDialog(element) {
        element.click();
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Select a <u>folder</u> to watch for changes</label>
                    <FolderInput placeholder="Type or browse folder to watch" 
                        name="folderToWatch"
                        value={this.state.folderToWatch}
                        onChange={this.handleInputChange}/>
                </div>
                <div className="field">
                    <label>Select <u>folder(s)</u> to sync</label>
                    <FolderInput placeholder="Type or browse folder to watch" 
                        name="folderToSync"
                        value={this.state.folderToSync}
                        onChange={this.handleInputChange}/>
                </div>
                <StyledButton className="ui primary compact button" type="submit">Start Watcher</StyledButton>
                <StyledButton className="ui compact button" type="button">Close</StyledButton>
            </form>
        );
    }

}

export default CreateWatcher;