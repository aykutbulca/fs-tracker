import React from 'react'
import styled from 'styled-components';

const FlexDiv = styled.div`
    display: flex !important;
`;

const StyledInput = styled.input`
    margin-right: 7px !important;
    padding-right: 2em !important;
`;

const StyledButton = styled.button`
    padding: 11px !important;
`;

const CenteredIcon = styled.i`
    margin: auto !important;
`;

const RelativeFlexDiv = styled(FlexDiv)`
    position: relative !important;
    width: 100%;
`;

const RightFixedIcon = styled.i`
    margin: auto !important;
    position: absolute !important;
    right: 15px !important;
    top: 11px !important;
    cursor: pointer !important;
`;

const HoverStyle = {
    borderColor: '#2185d0'
}

class FolderInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { path: this.props.value, dragOver: false, mouseOver: false };

        this.changePathState = this.changePathState.bind(this);
        this.changeDragOverState = this.changeDragOverState.bind(this);
        
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleFolderInputChange = this.handleFolderInputChange.bind(this);
        
        this.handleInputDrop = this.handleInputDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);

        this.onMouseEnterInput = this.onMouseEnterInput.bind(this);
        this.onMouseLeaveInput = this.onMouseLeaveInput.bind(this);
        
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleInputRemoveClick = this.handleInputRemoveClick.bind(this);
    }

    changePathState(newValue, isCleared) {
        const stateSummary = {
            oldValue: this.state.path,
            newValue: newValue,
            cleared: isCleared
        };

        this.setState({ path: newValue });

        //If parent component wants to know state changes
        if(this.props.onChange) { 
            this.props.onChange(stateSummary);
        }
    }

    changeDragOverState(newValue) {
        this.setState({ dragOver: newValue });
    }

    changeMouseOverState(newValue) {
        this.setState({ mouseOver: newValue });
    }

    handleTextInputChange(event) {
        this.changePathState(event.target.value);
    }

    handleButtonClick(event) {
        this.folderInputRef.click();
    }

    handleFolderInputChange() {
        const folderPath = this.folderInputRef.files[0].path;
        this.changePathState(folderPath);
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
                this.changePathState(file.path);
            }
        }
    }

    handleInputRemoveClick() {
        this.changePathState('', true);
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

    onMouseEnterInput(event) {
        this.changeMouseOverState(true);
    }

    onMouseLeaveInput(event) {
        this.changeMouseOverState(false);
    }

    render() {
        return (
            <FlexDiv className={this.props.className}>
                <RelativeFlexDiv
                    onDragOver={this.onDragOver}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.handleInputDrop}
                    onMouseEnter={this.onMouseEnterInput}
                    onMouseLeave={this.onMouseLeaveInput}>
                    <StyledInput type="text" 
                        style={this.state.dragOver ? HoverStyle: null}
                        placeholder={this.props.placeholder}
                        value={this.state.path}
                        onChange={this.handleTextInputChange}/>
                    { 
                        this.state.mouseOver && 
                        <RightFixedIcon className="remove red icon"
                            title="Clear"
                            onClick={this.handleInputRemoveClick}/> 
                    }
                </RelativeFlexDiv>
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