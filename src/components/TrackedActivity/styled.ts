import styled from 'styled-components';

export const TrackedActivityComponent = styled.div.attrs((props:{complete:boolean}) => props)`
    display:flex;
    flex-direction:row;
    height:fit-content;
    align-items:center;
    border: 2px solid  #2684ff;
    border-radius: 5px;
    background-color: ${(props) => (props.complete ? '#4fe04c' : '#db2c2c')};
`;

export const IconsNameContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    text-align:center;
    align-items:center;
    padding:4px;
    font-size:25px;
`;

export const IconImage = styled.img`
    padding-right:8px;
    width:50px;
    height:50px;
`;

export const ProgressContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    margin-inline:20px;
`;

export const Check = styled.input`
    width:50px;
    height:50px;
    cursor: pointer;
`;

export const HelpLinksContainer = styled.div`
    display:flex;
    flex-direction:column;
    font-size:20px;
    margin-inline:20px;
`;

export const RemoveButton = styled.button`
    height:fit-content;
    background-color:red;
    border-radius: 10%;
    width:35px;
    height:10px;
    cursor: pointer;
    margin-inline:20px;
`;
