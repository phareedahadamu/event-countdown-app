import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function combineDateAndTime(date: Date, timeString: string) {
  const [h, m, s] = timeString.split(":").map(Number);
  date.setHours(h, m, s || 0);
  return date;
}

export function checkUpcoming(dueDate: Date, currentDate: Date) {
  const date = new Date(dueDate);
  return currentDate < date;
}
export function getUrgency(timeLeft: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const totalMinutes =
    timeLeft.days * 24 * 60 + timeLeft.hours * 60 + timeLeft.minutes;

  if (totalMinutes <= 60) {
    return "high";
  } else if (totalMinutes <= 24 * 60) {
    return "medium";
  } else {
    return "low";
  }
}


