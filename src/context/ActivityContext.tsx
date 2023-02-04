import { createContext, useState } from 'react';
import { Activity } from '../types/Activity';
import { ActivitySave } from '../types/ActivitySave';
import { ActivityType } from '../types/ActivityType';
import { getActivityById } from '../utils/activities';
import {
  getDailyResetTimer, getMonthlyResetTimer, getWeeklyResetTimer, now,
} from '../utils/date';

interface IActivityContext{
    activities:ActivitySave[];

    // eslint-disable-next-line no-unused-vars
    addActivity:(activity:Activity) => void;
    // eslint-disable-next-line no-unused-vars
    removeActivity:(id:string) => void;
    // eslint-disable-next-line no-unused-vars
    checkActivity:(id:string) => void;
    // eslint-disable-next-line no-unused-vars
    unCheckActivity:(id:string) => void;
    // eslint-disable-next-line no-unused-vars
    getSavedActivityById:(id:string) => ActivitySave|undefined;
    // eslint-disable-next-line no-unused-vars
    swap:(swapIndex:number, swappieIndex:number) => void;

    removeAll:() => void;
}

const ActivityContext = createContext<IActivityContext|null>(null);

interface ActivityProviderProps{
    // eslint-disable-next-line no-undef
    children:JSX.Element;
}

function getActivityResetTimer(activity:Activity) {
  switch (activity.type) {
    case ActivityType.WEEKLY: return getWeeklyResetTimer().getTime();
    case ActivityType.MONTHLY: return getMonthlyResetTimer().getTime();
    case ActivityType.DAILY:
    default: return getDailyResetTimer().getTime();
  }
}

function save(acts:ActivitySave[]) {
  // eslint-disable-next-line no-undef
  localStorage.setItem('activities', JSON.stringify(acts));
}

function load() : ActivitySave[] {
  // eslint-disable-next-line no-undef
  const saveString = localStorage.getItem('activities');

  if (saveString) {
    const saveObjArr:ActivitySave[] = JSON.parse(saveString);
    return saveObjArr.map((act) => {
      const hasExpired:boolean = act.expiryTimestamp < now().getTime();
      const activity = getActivityById(act.id);
      let newResetTimer = 0;
      if (activity) newResetTimer = getActivityResetTimer(activity);
      return hasExpired ? { ...act, checksCount: 0, expiryTimestamp: newResetTimer } : act;
    });
  }
  return [];
}

export function ActivityProvider(props:ActivityProviderProps) {
  const [activities, setActivities] = useState<ActivitySave[]>(load());

  const getSavedActivityById = (id:string) :ActivitySave|undefined => activities.find((act) => act.id === id);

  const addActivity = (activity:Activity) => {
    const expiryTimestamp = getActivityResetTimer(activity);
    activities.push({ id: activity.name, checksCount: 0, expiryTimestamp });
    const newRefArr = Array.from(activities);
    save(newRefArr);
    setActivities(newRefArr);
  };

  const removeActivity = (id:string) => {
    const newRefArr = activities.filter((act) => act.id !== id);
    save(newRefArr);
    setActivities(newRefArr);
  };

  const checkActivity = (id:string) => {
    const saveActivity = getSavedActivityById(id);
    if (saveActivity) {
      saveActivity.checksCount++;
      const activity = getActivityById(saveActivity.id);
      if (activity) {
        if (activity.checksRequired === saveActivity.checksCount) {
          saveActivity.completedTimestamp = now().getTime();
        }
      }
    }
    const newArrRef = Array.from(activities);
    save(newArrRef);
    setActivities(newArrRef);
  };

  const unCheckActivity = (id:string) => {
    const saveActivity = getSavedActivityById(id);
    if (saveActivity) {
      saveActivity.checksCount--;
      const activity = getActivityById(saveActivity.id);
      if (activity) {
        saveActivity.completedTimestamp = undefined;
      }
    }
    const newArrRef = Array.from(activities);
    save(newArrRef);
    setActivities(newArrRef);
  };

  const removeAll = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('activities');
    setActivities([]);
  };

  const swap = (swapIndex:number, swappieIndex:number) => {
    const arr = Array.from(activities);
    // eslint-disable-next-line prefer-destructuring
    arr[swapIndex] = arr.splice(swappieIndex, 1, arr[swapIndex])[0];
    setActivities(arr);
    save(arr);
  };

  return <ActivityContext.Provider
  value={{
    addActivity, removeActivity, checkActivity, unCheckActivity, removeAll, activities, getSavedActivityById, swap,
  }}>
    {props.children}
    </ActivityContext.Provider>;
}

export default ActivityContext;
