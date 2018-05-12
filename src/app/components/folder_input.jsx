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

        this.handlePathChange = this.handlePathChange.bind(this);
    }

    handlePathChange(event) {
        const stateSummary = {
            name: this.props.name,
            oldValue: this.state.path,
            newValue: event.target.value
        };
        
        this.setState({ path: event.target.value });
        this.props.onChange(stateSummary);
    }

    render() {
        return (
            <FlexDiv>
                <StyledInput type="text" placeholder={this.props.placeholder}
                    value={this.state.path} 
                    onChange={this.handlePathChange}/>
                <StyledButton className="ui button" type="button" title="Browse" >
                    <CenteredIcon className="folder icon"></CenteredIcon>
                </StyledButton>
            </FlexDiv>
        );
    }
}

export default FolderInput;