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

    reload:() => void;
}

const ActivityContext = createContext<IActivityContext|null>(null);

interface ActivityProviderProps{
    // eslint-disable-next-line no-undef
    children:JSX.Element;
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
      const hasExpired = (act?.completedTimestamp && act.expiryTimestamp) ? act?.expiryTimestamp < now().getTime() : false;
      map.set(act.id, hasExpired ? { id: act.id, checksCount: 0 } : act);
    });
  }
  return map;
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

export function ActivityProvider(props:ActivityProviderProps) {
  const [activities, setActivities] = useState<Map<string, ActivitySave>>(load());

  const reload = () => load();

  const addActivity = (activity:Activity) => {
    const newMapRef = new Map(activities.set(activity.name, { id: activity.name, checksCount: 0 }));
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
          saveActivity.expiryTimestamp = getActivityResetTimer(activity);
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
        saveActivity.expiryTimestamp = getActivityResetTimer(activity);
      }
    }
    const newMapRef = new Map(activities);
    save(Array.from(newMapRef.values()));
    setActivities(newMapRef);
  };

  return <ActivityContext.Provider value={{
    activities, addActivity, removeActivity, checkActivity, unCheckActivity, reload,
  }}>
    {props.children}
    </ActivityContext.Provider>;
}

export default ActivityContext;
