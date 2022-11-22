import styled from 'styled-components';
import Select from 'react-select';

export const SelectPickerComponent = styled.div`
    display:flex;
    flex-direction:column;
`;

export const SelectComponent = styled(Select)`
    width:200px;
    text-align:start;
`;

export const SelectPickerOptionsComponent = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    background-color:#313e59;
    cursor:pointer;
    padding:4px;
    :hover{
        background-color:lightblue;
    }
`;

export const SelectPickerImage = styled.img`
    padding-right:8px;
    max-width: 30px;
    max-height: 30px;
    width: auto;
    height: auto;
`;

export const SelectTitleRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    align-items:center;
`;
