import { Material } from '../../types/Material';
import './InventionTable.css';

const BASE_LINK = 'https://runescape.wiki/w';

export interface InventionTableProps{
    title:string;
    materials:Material[];
}

export function InventionTable(props:InventionTableProps) {
  const materialsRarity = props.title.split(' ')[0];
  return <>
  <table className='table'>
    <th className='table-title'>
        <a className="table-link" href={`${BASE_LINK}/Materials#${materialsRarity}_materials`} target="__blank">{props.title}</a>
        </th>
    <tbody>
    <tr>
        <th>Material</th>
        <th>Level</th>
        <th>Sources</th>
        <th>Info</th>
    </tr>
    {props.materials.map((material:Material) => <tr key={material.name}>
        <td>
            <img className='table-img' src={material.icon}/>
            <a className="table-link" href={material.info} target="__blank">{material.name}</a>
         </td>
        <td>{material.level}</td>
        <td>{material.sources}</td>
        <td>{material.items.join(', ')}</td>
    </tr>)}
    </tbody>
</table>
  </>;
}
