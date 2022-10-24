import { ActivityPickerComponent, TimerContainer } from './styled';
import { Timer } from '../../components/Timer';
import { SelectPicker, SelectPickerProps } from '../../components/SelectPicker';
import { Activity } from '../../types/Activity';

export interface ActivityPickerProps{
    resetDate:Date;
    pickerProps:SelectPickerProps<Activity>;
}

export function ActivityPicker(props:ActivityPickerProps) {
  return <ActivityPickerComponent>
        <TimerContainer>
            <div>Resets in:</div>
            <Timer expiryTimestamp={props.resetDate}></Timer>
        </TimerContainer>

        <SelectPicker {...props.pickerProps}></SelectPicker>
    </ActivityPickerComponent>;
}
