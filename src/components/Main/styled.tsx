import styled from 'styled-components';
import { ReactComponent as Add } from '../../assets/add.svg';

export const MainComponent = styled.div`
    display:flex;
    flex-direction:column;
`;

export const ActivityPickersComponent = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;
  margin-top:20px;
`;

export const TrackedActivitiesComponent = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-evenly;
  width:100%;
`;

export const TrackedActivityColumn = styled.div`
    display:flex;
    flex-direction:column;
    align-self:center;
    justify-content:space-between;
    min-width:20%;
`;

export const TrackedActivityColumnTitle = styled.div`
    font-size: 20px;
    width:100%;
    margin-bottom:10px;
`;

export const TrackedActivityColumnActivity = styled.div`
    margin-bottom:5px;
`;

export const AddButton = styled(Add)`
    color:white;
    padding:5px;
    width:20px;
    height:20px;
    fill:#8cabe6;
    border-radius:5px;
    background-color:#313e59;
    cursor:pointer;
`;

export const ResetButton = styled.div`
    display:flex;
    font-weight:600;
    align-items:center;
    flex-direction:column;
    justify-content:space-between;
    align-self:flex-start;
    align-self:center;
    width: 100px;
    color:red;
    margin:10px;
`;

export const NotesContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    margin: 10px;
`;

export const NotesTitle = styled.p`
    font-weight:700;
    font-size:125%;
`;

export const NotesArea = styled.textarea`
    width: 30%;
    height:200px;
    background-color:#313e59;
    color:#cbd9f4;
    font-size:125%;
`;
