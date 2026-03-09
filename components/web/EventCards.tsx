"use client";
import EmptyState from "./EmptyState";
import {
  useMemo,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useEffectEvent,
} from "react";
import { useGetCachedDate } from "@/lib/hooks/getCurrentDate";
import EventCard from "./EventCard";
import { EventType } from "@/lib/types";
type TabType = "all" | "upcoming" | "past";
export default function EventCards({
  activeTab,
  events,
  setEvents,
}: {
  activeTab: TabType;
  events: EventType[] | null;
  setEvents: Dispatch<SetStateAction<EventType[] | null>>;
}) {
  const [mounted, setMounted] = useState(false);
  const updateMounted = useEffectEvent(() => {
    setMounted(true);
  });
  useEffect(() => {
    updateMounted();
  }, []);
  const cachedDate = useGetCachedDate();

  const displayedEvents = useMemo(() => {
    if (!events) return [];

    switch (activeTab) {
      case "all":
        return events.sort(
          (a, b) =>
            new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
        );
      case "upcoming":
        return events
          .filter((e) => {
            const isUpcoming = new Date(e.dueDate) > cachedDate;
            return isUpcoming;
          })
          .sort(
            (a, b) =>
              new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
          );
      case "past":
        return events
          .filter((e) => {
            const isPast = new Date(e.dueDate) <= cachedDate;
            return isPast;
          })
          .sort(
            (a, b) =>
              new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
          );
      default:
        return events;
    }
  }, [events, activeTab, cachedDate]);
  if (!mounted) return null;

  const displayedComponents =
    displayedEvents.length < 1 ? (
      <EmptyState tab={activeTab} setEvents={setEvents} />
    ) : (
      displayedEvents.map((e, index) => {
        return <EventCard key={index} e={e} setEvents={setEvents} />;
      })
    );
  return (
    <div
      className={`w-full ${displayedEvents.length < 1 ? "block" : "grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5"}`}
    >
      {displayedComponents}
    </div>
  );
}
