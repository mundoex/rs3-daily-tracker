import { useContext, useEffect, useState } from 'react';
import {
  dailyActivities, weeklyActivities, monthlyActivities, getActivityById,
} from '../../utils/activities';
import { Activity } from '../../types/Activity';
import { getDailyResetTimer, getMonthlyResetTimer, getWeeklyResetTimer } from '../../utils/date';
import { ActivityPicker } from '../ActivityPicker';
import { SelectPickerProps } from '../SelectPicker';
import {
  ActivityPickersComponent, AddButton, MainComponent, NotesContainer, NotesTitle, ResetButton, Header, TrackedActivitiesComponent, TrackedActivityColumn,
} from './styled';
import ActivityContext from '../../context/ActivityContext';
import NotesContext from '../../context/NotesContext';
import { ReactComponent as Thrash } from '../../assets/trash.svg';
import IronmanIcon from '../../assets/ironman-icon.png';
import { ActivityTable } from '../ActivityTable';
import { InventionTable } from '../InventionTable';
import { commonMaterials, goodShops } from '../../utils/materials';
import { ActivityType } from '../../types/ActivityType';

function generateSelectPickerOptions(activities:Activity[]) {
  return activities.map((activity) => ({ label: activity.name, value: activity }));
}

const dailyPicker:{resetDate:Date, pickerProps:SelectPickerProps<Activity>} = {
  resetDate: getDailyResetTimer(),
  pickerProps: { title: 'Daily', options: generateSelectPickerOptions(dailyActivities) },
};

const weeklyPicker:{resetDate:Date, pickerProps:SelectPickerProps<Activity>} = {
  resetDate: getWeeklyResetTimer(),
  pickerProps: { title: 'Weekly', options: generateSelectPickerOptions(weeklyActivities) },
};

const monthlyPicker:{resetDate:Date, pickerProps:SelectPickerProps<Activity>} = {
  resetDate: getMonthlyResetTimer(),
  pickerProps: { title: 'Monthly', options: generateSelectPickerOptions(monthlyActivities) },
};

export function Main() {
  const context = useContext(ActivityContext);
  const notesContext = useContext(NotesContext);
  const [selected, setSelected] = useState<Activity>();

  const [daily, setDaily] = useState<{activity:Activity, checks:number}[]>([]);
  const [weekly, setWeekly] = useState<{activity:Activity, checks:number}[]>([]);
  const [monthly, setMonthly] = useState<{activity:Activity, checks:number}[]>([]);
  // const [notes, setNotes] = useState<string>('');

  // ACTIONS
  const onSelect = (activity:Activity) => setSelected(activity);
  const onClick = () => selected && context?.addActivity(selected);
  const onCheck = (checked:boolean, activity:Activity) => (checked ? context?.checkActivity(activity.name) : context?.unCheckActivity(activity.name));
  const onRemove = (activity:Activity) => (activity) && context?.removeActivity(activity.name);
  const onShuffle = (type:ActivityType, swapIndex:number, swappieIndex:number) => {
    let arr; let setArr; let offset;
    switch (type) {
      case ActivityType.DAILY:
        arr = Array.from(daily);
        setArr = setDaily;
        offset = 0;
        break;
      case ActivityType.WEEKLY:
        arr = Array.from(weekly);
        setArr = setWeekly;
        offset = daily.length;
        break;
      case ActivityType.MONTHLY:
        arr = Array.from(monthly);
        setArr = setMonthly;
        offset = daily.length + weekly.length;
        break;
      default: return new Error('No such type');
    }
    // eslint-disable-next-line prefer-destructuring
    arr[swapIndex] = arr.splice(swappieIndex, 1, arr[swapIndex])[0];
    setArr(arr);
    return context?.swap(swapIndex + offset, swappieIndex + offset);
  };

  // COMPONENTS
  const AddActivityButton = <AddButton onClick={onClick}/>;

  useEffect(() => {
    const dailies:{activity:Activity, checks:number}[] = [];
    const weeklies:{activity:Activity, checks:number}[] = [];
    const monthlies:{activity:Activity, checks:number}[] = [];

    // eslint-disable-next-line consistent-return
    context?.activities.forEach((act) => {
      const activity = getActivityById(act.id);
      if (activity) {
        switch (activity.type) {
          case ActivityType.DAILY: return dailies.push({ activity, checks: act.checksCount });
          case ActivityType.WEEKLY: return weeklies.push({ activity, checks: act.checksCount });
          case ActivityType.MONTHLY: return monthlies.push({ activity, checks: act.checksCount });
          default: return new Error('Activity type not found');
        }
      }
    });
    setDaily(dailies);
    setWeekly(weeklies);
    setMonthly(monthlies);
    // setNotes(notesContext?.notes || '');
  }, [context, notesContext, setDaily, setWeekly, setMonthly]);

  return <MainComponent>
    <Header>
      <div>
      <a href='https://runescape.wiki/w/Ironman_Mode/Strategies/Efficient_Ironman_Pathway_Guide' target="__blank">
        <img className="thrash-icon" src={IronmanIcon}/>
      </a>
      <div>Ironman Guide</div>
      </div>

      <ResetButton onClick={() => context?.removeAll()}>
        <Thrash className='thrash-icon' onClick={() => context?.removeAll()}/>
        <div>Remove all</div>
      </ResetButton>
    </Header>

        <ActivityPickersComponent>
          <ActivityPicker key="daily-picker" resetDate={dailyPicker.resetDate} pickerProps={{
            children: AddActivityButton, onSelect, title: dailyPicker.pickerProps.title, options: dailyPicker.pickerProps.options,
          }}></ActivityPicker>

        <ActivityPicker key="weekly-picker" resetDate={weeklyPicker.resetDate} pickerProps={{
          children: AddActivityButton, onSelect, title: weeklyPicker.pickerProps.title, options: weeklyPicker.pickerProps.options,
        }}></ActivityPicker>

        <ActivityPicker key="monthly-picker" resetDate={monthlyPicker.resetDate} pickerProps={{
          children: AddActivityButton, onSelect, title: monthlyPicker.pickerProps.title, options: monthlyPicker.pickerProps.options,
        }}></ActivityPicker>
        </ActivityPickersComponent>

        <TrackedActivitiesComponent>
        <TrackedActivityColumn key="Daily">
          <ActivityTable title="Daily" activitiesState={daily} onCheck={onCheck} onRemove={onRemove} onShuffle={onShuffle}/>
        </TrackedActivityColumn>

        <TrackedActivityColumn key="Weekly">
          <ActivityTable title="Weekly" activitiesState={weekly} onCheck={onCheck} onRemove={onRemove} onShuffle={onShuffle}/>
        </TrackedActivityColumn>

        <TrackedActivityColumn key="Monthly">
          <ActivityTable title="Monthly" activitiesState={monthly} onCheck={onCheck} onRemove={onRemove} onShuffle={onShuffle}/>
        </TrackedActivityColumn>

        </TrackedActivitiesComponent>
        <NotesContainer>
          <Header>
          <img src="https://runescape.wiki/images/Invention.png?b4132"></img>
          <NotesTitle>Invention</NotesTitle>
          </Header>
          <NotesTitle>Good Shops</NotesTitle>
          {goodShops.map((shop) => <a className="table-link" key={shop.name} href={shop.link} target="__blank">{shop.name}</a>)}
          <InventionTable title="Common Materials" materials={commonMaterials}/>
        </NotesContainer>

        {/* <NotesContainer>
          <NotesTitle>Notes</NotesTitle>
          <NotesArea onChange={(e) => notesContext?.updateNotes(e.target.value)} value={notes}/>
        </NotesContainer> */}

    </MainComponent>;
}
