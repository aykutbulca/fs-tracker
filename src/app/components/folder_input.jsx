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

class FolderInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { path: this.props.value };

        this.changeState = this.changeState.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleFolderInputChange = this.handleFolderInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    changeState(name, oldValue, newValue) {
        const stateSummary = {
            name: name,
            oldValue: oldValue,
            newValue: newValue
        };

        this.setState({ path: newValue });
        this.props.onChange(stateSummary);
    }

    handleTextInputChange(event) {
        this.changeState(this.props.name, this.state.path, event.target.value);
    }

    handleButtonClick(event) {
        this.folderInputRef.click();
    }

    handleFolderInputChange() {
        const folderPath = this.folderInputRef.files[0].path;
        this.changeState(this.props.name, this.state.path, folderPath);
    }

    render() {
        return (
            <FlexDiv className={this.props.className}>
                <StyledInput type="text" placeholder={this.props.placeholder}
                    value={this.state.path} 
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