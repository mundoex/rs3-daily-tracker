import { useContext, useEffect, useState } from 'react';
import {
  dailyActivities, weeklyActivities, monthlyActivities, getActivityById,
} from '../../utils/activities';
import { Activity } from '../../types/Activity';
import { getDailyResetTimer, getMonthlyResetTimer, getWeeklyResetTimer } from '../../utils/date';
import { ActivityPicker } from '../ActivityPicker';
import { SelectPickerProps } from '../SelectPicker';
import {
  ActivityPickersComponent, AddButton, MainComponent, NotesArea, NotesContainer, NotesTitle, ResetButton, Header, TrackedActivitiesComponent, TrackedActivityColumn,
} from './styled';
import ActivityContext from '../../context/ActivityContext';
import NotesContext from '../../context/NotesContext';
import { ReactComponent as Thrash } from '../../assets/trash.svg';
import IronmanIcon from '../../assets/ironman-icon.png';
import { ActivityTable } from '../ActivityTable';
import { InventionTable } from '../InventionTable';
import { commonMaterials, goodShops } from '../../utils/materials';

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
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    const dailies:{activity:Activity, checks:number}[] = [];
    const weeklies:{activity:Activity, checks:number}[] = [];
    const monthlies:{activity:Activity, checks:number}[] = [];

    context?.activities.forEach((value, key) => {
      const activity = getActivityById(key);
      if (activity) {
        switch (activity.type) {
          case 'daily':
            dailies.push({ activity, checks: value.checksCount });
            break;
          case 'weekly':
            weeklies.push({ activity, checks: value.checksCount });
            break;
          case 'monthly':
            monthlies.push({ activity, checks: value.checksCount });
            break;
          default: throw new Error('Activity type not found');
        }
      }
    });
    setDaily(dailies);
    setWeekly(weeklies);
    setMonthly(monthlies);
    setNotes(notesContext?.notes || '');
  }, [context, notesContext, setDaily, setWeekly, setMonthly]);

  const onSelect = (activity:Activity) => setSelected(activity);
  const onClick = () => selected && context?.addActivity(selected);
  const AddActivityButton = <AddButton onClick={onClick}/>;

  const onCheck = (checked:boolean, activity:Activity) => (checked ? context?.checkActivity(activity.name) : context?.unCheckActivity(activity.name));
  const onRemove = (activity:Activity) => (activity) && context?.removeActivity(activity.name);

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
          <ActivityTable title="Daily" activitiesState={daily} onCheck={onCheck} onRemove={onRemove}/>
        </TrackedActivityColumn>

        <TrackedActivityColumn key="Weekly">
          <ActivityTable title="Weekly" activitiesState={weekly} onCheck={onCheck} onRemove={onRemove}/>
        </TrackedActivityColumn>

        <TrackedActivityColumn key="Monthly">
          <ActivityTable title="Monthly" activitiesState={monthly} onCheck={onCheck} onRemove={onRemove}/>
        </TrackedActivityColumn>

        </TrackedActivitiesComponent>
        <NotesContainer>
          <Header>
          <img src="https://runescape.wiki/images/Invention.png?b4132"></img>
          <NotesTitle>Invention</NotesTitle>
          </Header>
          <NotesTitle>Good Shops</NotesTitle>
          {goodShops.map((shop) => <a className="table-link" href={shop.link} target="__blank">{shop.name}</a>)}
          <InventionTable title="Common Materials" materials={commonMaterials}/>
        </NotesContainer>
        <NotesContainer>
          <NotesTitle>Notes</NotesTitle>
          <NotesArea onChange={(e) => notesContext?.updateNotes(e.target.value)} value={notes}/>
        </NotesContainer>

    </MainComponent>;
}
