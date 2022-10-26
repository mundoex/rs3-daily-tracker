import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// config dayjs
dayjs.extend(utc);

export function now() {
  return dayjs().toDate();
}

export function getDailyResetTimer() {
  return dayjs().hour(24).minute(59).second(59)
    .toDate();
}

export function getWeeklyResetTimer() {
  const dayjsDate = dayjs().day(2).hour(23).minute(59)
    .second(59);
  return now().getTime() > dayjsDate.toDate().getTime() ? dayjsDate.add(7, 'day').toDate() : dayjsDate.toDate();
}

export function getMonthlyResetTimer() {
  const dayjsDate = dayjs().month(dayjs().get('month') + 1).date(1).hour(0)
    .minute(0)
    .second(0);
  return now().getTime() > dayjsDate.toDate().getTime() ? dayjsDate.add(1, 'month').toDate() : dayjsDate.toDate();
}
