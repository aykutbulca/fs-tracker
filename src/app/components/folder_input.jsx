import React from 'react'
import styled from 'styled-components';

const FlexDiv = styled.div`
    display: flex !important;
`;

const StyledInput = styled.input`
    margin-right: 7px !important;
`;

const StyledButton = styled.button`
    padding: 11px !important;
`;

const CenteredIcon = styled.i`
    margin: auto !important;
`;

const HoverStyle = {
    borderColor: '#2185d0'
}

class FolderInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { path: this.props.value, onDragOver: false };

        this.changePathState = this.changePathState.bind(this);
        this.changeDragOverState = this.changeDragOverState.bind(this);
        
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleFolderInputChange = this.handleFolderInputChange.bind(this);
        
        this.handleInputDrop = this.handleInputDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    changePathState(oldValue, newValue) {
        const stateSummary = {
            oldValue: oldValue,
            newValue: newValue
        };

        this.setState({ path: newValue });

        //If parent component wants to know state changes
        if(this.props.onChange) { 
            this.props.onChange(stateSummary);
        }
    }

    changeDragOverState(newValue) {
        this.setState({ onDragOver: newValue });
    }

    handleTextInputChange(event) {
        this.changePathState(this.state.path, event.target.value);
    }

    handleButtonClick(event) {
        this.folderInputRef.click();
    }

    handleFolderInputChange() {
        const folderPath = this.folderInputRef.files[0].path;
        this.changePathState(this.state.path, folderPath);
    }

    handleInputDrop(event) {
        event.stopPropagation();
        event.preventDefault();

        this.changeDragOverState(false);

        const items  = event.dataTransfer.items;

        for (let i = 0; i < items.length; i++) 
        {
            const entry = items[i].webkitGetAsEntry();
            const file = items[i].getAsFile();

            if (entry.isDirectory) 
            {
                this.changePathState(this.state.path, file.path);
            }
        }
    }

    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        this.changeDragOverState(true);
    }

    onDragLeave(event) {
        event.stopPropagation();
        event.preventDefault();
        this.changeDragOverState(false);
    }

    render() {
        return (
            <FlexDiv className={this.props.className}>
                <StyledInput 
                    type="text" 
                    style={this.state.onDragOver ? HoverStyle: null}
                    placeholder={this.props.placeholder}
                    value={this.state.path} 
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.handleInputDrop}
                    onChange={this.handleTextInputChange}/>
                <StyledButton className="ui button" type="button" title="Browse" onClick={this.handleButtonClick} >
                    <CenteredIcon className="folder black icon"></CenteredIcon>
                </StyledButton>
                <input type="file" style={{display: "none"}} webkitdirectory="true" 
                    ref={input => this.folderInputRef = input}
                    onChange={this.handleFolderInputChange}/>
            </FlexDiv>
        );
    }
}

export default FolderInput;