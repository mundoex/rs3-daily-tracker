import styled from 'styled-components';

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
  margin:20px;
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

export const AddButton = styled.button`
    height:fit-content;
    border-color: #2684ff;
    border-radius: 10%;
`;
