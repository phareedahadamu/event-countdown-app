"use client";
import EventTabs from "@/components/web/EventTabs";
import AddEvent from "@/components/web/AddEvent";
import { useEffect } from "react";

import { useGetEvents } from "@/lib/hooks/getEvents";

export default function Home() {
  const [events, setEvents] = useGetEvents();
  useEffect(() => {
    if (events) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);
  return (
    <div className="w-full flex flex-col gap-6 max-w-250 px-4 lg:px-0 min-h-screen items-center py-8 mx-auto font-sans font-normal text-foreground">
      <div className="w-full flex justify-between items-center pb-6 border-b-[0.89px] border-b-muted-foreground/20">
        <div className="flex flex-col ">
          <h1 className=" text-[24px] font-medium">Event Dashboard</h1>
          <p className="text-muted-foreground text-[14px]">
            Keep track of birthdays, deadlines, and launches in one place.
          </p>
        </div>
        <AddEvent  setEvents={setEvents} />
      </div>
      <EventTabs events={events} setEvents={setEvents} />
    </div>
  );
}
