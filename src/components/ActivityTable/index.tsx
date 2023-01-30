import './ActivityTable.css';
import {
  DragDropContext, Draggable, Droppable, DropResult,
} from 'react-beautiful-dnd';
import { Activity } from '../../types/Activity';
import { ReactComponent as Thrash } from '../../assets/trash.svg';
import { ActivityType } from '../../types/ActivityType';

export interface ActivityTableProps{
    title:string;
    activitiesState:{activity:Activity, checks:number}[];
    // eslint-disable-next-line no-unused-vars
    onCheck:(checked:boolean, activity:Activity)=>void;
    // eslint-disable-next-line no-unused-vars
    onRemove:(activity:Activity)=>void;
    // eslint-disable-next-line no-unused-vars
    onShuffle:(type:ActivityType, swapIndex:number, swappieIndex:number)=>void;
}

function renderChecksRequired(activity:Activity, checks:number, onCheck:Function) {
  // eslint-disable-next-line no-undef
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = Boolean(e.currentTarget.checked);
    return onCheck(newValue, activity);
  };

  const arr = [];
  let checksCount = checks;
  for (let i = 0; i < activity.checksRequired; i++) {
    const element = <input key={`checks-${activity.name}-${i}`} className="checkbox" type="checkbox" checked={checksCount > 0} onChange={onChange}></input>;
    checksCount--;
    arr.push(element);
  }
  return <>{arr.map((element) => element)}</>;
}

export function ActivityTable(props:ActivityTableProps) {
  const tableActivityType = props.title.toLowerCase() as ActivityType;

  const onDragEnd = (result:DropResult, type:ActivityType) => {
    if (!result.destination?.index) return;
    const items = Array.from(props.activitiesState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination?.index, 0, reorderedItem);
    props.onShuffle(type, result.source.index, result.destination.index);
  };

  return <DragDropContext onDragEnd={(result) => onDragEnd(result, tableActivityType)}>
    <Droppable droppableId={props.title}>
  {(provided) => (
  <table className='table' >
    <th className='table-title'>{props.title}</th>
    <tbody {...provided.droppableProps} ref={provided.innerRef}>
    <tr>
        <th>Icon</th>
        <th>Activity</th>
        <th>Information</th>
        <th>Checks</th>
        <th>Remove</th>
    </tr>
    {props.activitiesState.map(({ activity, checks }, i) => <Draggable key={activity.name} draggableId={activity.name} index={i}>
      {(dragProvided) => (
        <tr key={activity.name} className={activity.checksRequired === checks ? 'tr-highlight' : ''} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps} ref={dragProvided.innerRef}>
        <td>
            {activity.iconsUrl?.map((url:string) => <img className='table-img' key={url} src={url}></img>)}
         </td>
        <td>{activity.name}</td>
        <td>
            {activity.utilitiesUrl?.map(({ url, description }) => <a className="table-link" key={url} target="_blank" href={url !== '' ? url : undefined}>{description}</a>)}
         </td>
         <td>
            {renderChecksRequired(activity, checks, props.onCheck)}
         </td>
         <td>
            <Thrash className='thrash-icon' onClick={() => props.onRemove(activity)}/>
         </td>
    </tr>
      )}
    </Draggable>)}
    </tbody>
    {provided.placeholder}
</table>)}

    </Droppable>

  </DragDropContext>;
}
