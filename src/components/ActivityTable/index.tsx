import './ActivityTable.css';
import { Activity } from '../../types/Activity';
import { ReactComponent as Thrash } from '../../assets/trash.svg';

export interface ActivityTableProps{
    title:string;
    activitiesState:{activity:Activity, checks:number}[];
    // eslint-disable-next-line no-unused-vars
    onCheck:(checked:boolean, activity:Activity)=>void;
    // eslint-disable-next-line no-unused-vars
    onRemove:(activity:Activity)=>void;
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
    const element = <input className="checkbox" type="checkbox" checked={checksCount > 0} onChange={onChange}></input>;
    checksCount--;
    arr.push(element);
  }
  return <>{arr.map((element) => element)}</>;
}

export function ActivityTable(props:ActivityTableProps) {
  return <>
  <table className='table'>
    <th className='table-title'>{props.title}</th>
    <tbody>
    <tr>
        <th>Icon</th>
        <th>Activity</th>
        <th>Information</th>
        <th>Checks</th>
        <th>Remove</th>
    </tr>
    {props.activitiesState.map(({ activity, checks }) => <tr key={activity.name} className={activity.checksRequired === checks ? 'tr-highlight' : ''}>
        <td>
            {activity.iconsUrl?.map((url:string) => <img className='table-img' src={url}></img>)}
         </td>
        <td>{activity.name}</td>
        <td>
            {activity.utilitiesUrl?.map(({ url, description }) => <a className="table-link" target="_blank" href={url !== '' ? url : undefined}>{description}</a>)}
         </td>
         <td>
            {renderChecksRequired(activity, checks, props.onCheck)}
         </td>
         <td>
            <Thrash className='thrash-icon' onClick={() => props.onRemove(activity)}/>
         </td>
    </tr>)}
    </tbody>
</table>
  </>;
}
