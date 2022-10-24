import React, { useContext } from 'react';
import ActivityContext from '../../context/ActivityContext';
import { Activity } from '../../types/Activity';
import {
  TrackedActivityComponent, IconsNameContainer, IconImage, ProgressContainer, Check, HelpLinksContainer, RemoveButton,
} from './styled';

export interface TrackedActivityProps{
    activity?:Activity;
    onCheck?:Function;
    checks:number;
}

function getCheckBoxes(requiredChecks:number, checks:number, onCheck?:Function) {
  const arr = [];
  // eslint-disable-next-line no-undef
  const onClick = (event: React.MouseEvent<HTMLInputElement>) => onCheck && onCheck(event.currentTarget.checked);
  let checksCopy = checks;
  for (let i = 0; i < requiredChecks; i++) {
    arr.push(<Check type="checkbox" key={i} readOnly onClick={onClick} checked={checksCopy > 0}/>);
    checksCopy--;
  }
  return arr;
}

export function TrackedActivity(props:TrackedActivityProps) {
  const context = useContext(ActivityContext);
  const onCheck = (checked:boolean) => (checked ? props.activity && context?.checkActivity(props.activity.name) : props.activity && context?.unCheckActivity(props.activity.name));
  const onRemove = () => (props.activity) && context?.removeActivity(props.activity.name);

  return <>
        {props.activity ? <TrackedActivityComponent complete={props.activity.checksRequired === props.checks}>
         <IconsNameContainer>
             {props.activity?.iconsUrl?.map((iconUrl:string) => <IconImage key={props.activity?.name} src={iconUrl} alt={props.activity?.name}/>)}
             <div>{props.activity?.name}</div>
            <ProgressContainer>
                {getCheckBoxes(props.activity.checksRequired, props.checks, onCheck)}
             </ProgressContainer>
             <HelpLinksContainer>
                 {props.activity?.utilitiesUrl?.map(({ description, url }) => <a key={props.activity?.name} href={url} target="_blank" rel="noreferrer">{description}</a>)}
             </HelpLinksContainer>
             <RemoveButton onClick={onRemove}/>
         </IconsNameContainer>
     </TrackedActivityComponent>
          : null}
    </>;
}
