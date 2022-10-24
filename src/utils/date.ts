import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// config dayjs
dayjs.extend(utc);

export function getDailyResetTimer() {
  return dayjs().hour(23).minute(59).second(59)
    .toDate();
}

export function getWeeklyResetTimer() {
  return dayjs().day(3).hour(23).minute(59)
    .second(59)
    .toDate();
}

export function getMonthlyResetTimer() {
  return dayjs().month(dayjs().get('month') + 1).date(1).hour(0)
    .minute(0)
    .second(0)
    .toDate();
}

export function now() {
  return dayjs().toDate();
}
