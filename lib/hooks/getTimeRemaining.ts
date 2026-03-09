import { useGetCurrentDate } from "./getCurrentDate";
export function useGetTimeRemaining(date: Date) {
  const fromDate = useGetCurrentDate();
  const targetDate = new Date(date);
  const diff = targetDate.getTime() - fromDate.getTime(); // milliseconds

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}
