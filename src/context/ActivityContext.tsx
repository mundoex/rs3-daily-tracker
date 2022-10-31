import { createContext, useState } from 'react';
import { Activity } from '../types/Activity';
import { ActivitySave } from '../types/ActivitySave';
import { getActivityById } from '../utils/activities';
import {
  getDailyResetTimer, getMonthlyResetTimer, getWeeklyResetTimer, now,
} from '../utils/date';

interface IActivityContext{
    activities:Map<string, ActivitySave>;

    // eslint-disable-next-line no-unused-vars
    addActivity:(activity:Activity) => void;
    // eslint-disable-next-line no-unused-vars
    removeActivity:(id:string) => void;

    // eslint-disable-next-line no-unused-vars
    checkActivity:(id:string) => void;
    // eslint-disable-next-line no-unused-vars
    unCheckActivity:(id:string) => void;

    removeAll:() => void;
}

const ActivityContext = createContext<IActivityContext|null>(null);

interface ActivityProviderProps{
    // eslint-disable-next-line no-undef
    children:JSX.Element;
}

function getActivityResetTimer(activity:Activity) {
  switch (activity.type) {
    case 'weekly': return getWeeklyResetTimer().getTime();
    case 'monthly': return getMonthlyResetTimer().getTime();
    case 'daily':
    default:
      return getDailyResetTimer().getTime();
  }
}

function save(acts:ActivitySave[]) {
  // eslint-disable-next-line no-undef
  localStorage.setItem('activities', JSON.stringify(acts));
}

function load() : Map<string, ActivitySave> {
  // eslint-disable-next-line no-undef
  const saveString = localStorage.getItem('activities');
  const map = new Map<string, ActivitySave>();
  if (saveString) {
    const loadedActivities:ActivitySave[] = JSON.parse(saveString);
    loadedActivities.forEach((act) => {
      const hasExpired:boolean = act.expiryTimestamp < now().getTime();
      const activity = getActivityById(act.id);
      let newResetTimer = 0;
      if (activity) newResetTimer = getActivityResetTimer(activity);
      map.set(act.id, hasExpired ? { ...act, checksCount: 0, expiryTimestamp: newResetTimer } : act);
    });
  }
  return map;
}

export function ActivityProvider(props:ActivityProviderProps) {
  const [activities, setActivities] = useState<Map<string, ActivitySave>>(load());

  const addActivity = (activity:Activity) => {
    const expiryTimestamp = getActivityResetTimer(activity);
    const newMapRef = new Map(activities.set(activity.name, { id: activity.name, checksCount: 0, expiryTimestamp }));
    save(Array.from(newMapRef.values()));
    setActivities(newMapRef);
  };

  const removeActivity = (id:string) => {
    const newMapRef = new Map(activities);
    newMapRef.delete(id);
    save(Array.from(newMapRef.values()));
    setActivities(newMapRef);
  };

  const checkActivity = (id:string) => {
    const saveActivity = activities.get(id);
    if (saveActivity) {
      saveActivity.checksCount++;
      const activity = getActivityById(saveActivity.id);
      if (activity) {
        if (activity.checksRequired === saveActivity.checksCount) {
          saveActivity.completedTimestamp = now().getTime();
        }
      }
    }
    const newMapRef = new Map(activities);
    save(Array.from(newMapRef.values()));
    setActivities(newMapRef);
  };

  const unCheckActivity = (id:string) => {
    const saveActivity = activities.get(id);
    if (saveActivity) {
      saveActivity.checksCount--;
      const activity = getActivityById(saveActivity.id);
      if (activity) {
        saveActivity.completedTimestamp = undefined;
      }
    }
    const newMapRef = new Map(activities);
    save(Array.from(newMapRef.values()));
    setActivities(newMapRef);
  };

  const removeAll = () => {
    // eslint-disable-next-line no-undef
    localStorage.removeItem('activities');
    setActivities(new Map());
  };

  return <ActivityContext.Provider value={{
    activities, addActivity, removeActivity, checkActivity, unCheckActivity, removeAll,
  }}>
    {props.children}
    </ActivityContext.Provider>;
}

export default ActivityContext;
