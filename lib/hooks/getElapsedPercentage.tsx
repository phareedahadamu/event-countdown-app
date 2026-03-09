import { useGetCurrentDate } from "./getCurrentDate";
export function useGetEleapsedPercentage(createdDate: Date, dueDate: Date) {
  const currentDate = useGetCurrentDate();
  const createdAt = new Date(createdDate);
  const dueAt = new Date(dueDate);

  const totalDuration = dueAt.getTime() - createdAt.getTime();
  const elapsed = currentDate.getTime() - createdAt.getTime();

  const percentage = (elapsed / totalDuration) * 100;

  return Math.round(Math.min(Math.max(percentage, 0), 100));
}
