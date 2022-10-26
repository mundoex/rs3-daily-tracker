import { useContext, useEffect, useState } from 'react';
import {
  dailyActivities, weeklyActivities, monthlyActivities, getActivityById,
} from '../../utils/activities';
import { Activity } from '../../types/Activity';
import { getDailyResetTimer, getMonthlyResetTimer, getWeeklyResetTimer } from '../../utils/date';
import { ActivityPicker } from '../ActivityPicker';
import { SelectPickerProps } from '../SelectPicker';
import { TrackedActivity } from '../TrackedActivity';
import {
  ActivityPickersComponent, AddButton, MainComponent, ResetButton, TrackedActivitiesComponent, TrackedActivityColumn, TrackedActivityColumnActivity, TrackedActivityColumnTitle,
} from './styled';
import ActivityContext from '../../context/ActivityContext';

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

  const [selected, setSelected] = useState<Activity>();

  const [daily, setDaily] = useState<{activity:Activity, checks:number}[]>([]);
  const [weekly, setWeekly] = useState<{activity:Activity, checks:number}[]>([]);
  const [monthly, setMonthly] = useState<{activity:Activity, checks:number}[]>([]);

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
  }, [context, setDaily, setWeekly, setMonthly]);

  const onSelect = (activity:Activity) => setSelected(activity);
  const onClick = () => selected && context?.addActivity(selected);
  const AddActivityButton = <AddButton onClick={onClick}>Add</AddButton>;

  return <MainComponent>
    <ResetButton onClick={() => context?.removeAll()}>Remove All</ResetButton>
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

        <TrackedActivityColumn key="daily">
            <TrackedActivityColumnTitle>Daily:</TrackedActivityColumnTitle>
            {daily.length > 0 ? daily.map(({ activity, checks }) => <TrackedActivityColumnActivity>
                <TrackedActivity key={activity.name} activity={activity} checks={checks}/>
              </TrackedActivityColumnActivity>) : null}
        </TrackedActivityColumn>

        <TrackedActivityColumn key="weekly">
            <TrackedActivityColumnTitle>Weekly:</TrackedActivityColumnTitle>
            {weekly.length > 0 ? weekly.map(({ activity, checks }) => <TrackedActivityColumnActivity>
                <TrackedActivity key={activity.name} activity={activity} checks={checks}/>
              </TrackedActivityColumnActivity>) : null}
        </TrackedActivityColumn>

        <TrackedActivityColumn key="monthly">
            <TrackedActivityColumnTitle>Monthly:</TrackedActivityColumnTitle>
            {monthly.length > 0 ? monthly.map(({ activity, checks }) => <TrackedActivityColumnActivity>
                <TrackedActivity key={activity.name} activity={activity} checks={checks}/>
              </TrackedActivityColumnActivity>) : null}
        </TrackedActivityColumn>
        </TrackedActivitiesComponent>

    </MainComponent>;
}
