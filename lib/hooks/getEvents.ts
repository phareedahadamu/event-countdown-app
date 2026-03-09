"use client";
import { useState } from "react";
import { EventType } from "../types";

export function useGetEvents() {
  const [events, setEvents] = useState<EventType[] | null>(() => {
    if (typeof window === "undefined") return null;
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : null;
  });

  return [events, setEvents] as const;
}
