import { useState } from "react";
import { EventType } from "../types";

export default function useGetEvents() {
  const [events, setEvents] = useState<EventType[] | null>(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : null;
  });

  return [events, setEvents] as const;
}
