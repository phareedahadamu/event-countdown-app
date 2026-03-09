import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import EventCards from "./EventCards";
import { EventType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
export default function EventTabs({
  events,
  setEvents,
}: {
  events: EventType[] | null;
  setEvents: Dispatch<SetStateAction<EventType[] | null>>;
}) {
  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList className="gap-x-3">
        <TabsTrigger value="upcoming" className="px-5">
          Upcoming
        </TabsTrigger>
        <TabsTrigger value="past" className="px-5">
          Past
        </TabsTrigger>
        <TabsTrigger value="all" className="px-5">
          All
        </TabsTrigger>
      </TabsList>
      <div className="border-[0.89px] border-muted-foreground/30 rounded-[12px] lg:p-6 p-4 flex bg-accent/10">
        <TabsContent value="all">
          <EventCards activeTab="all" events={events} setEvents={setEvents} />
        </TabsContent>
        <TabsContent value="upcoming">
          <EventCards
            activeTab="upcoming"
            events={events}
            setEvents={setEvents}
          />
        </TabsContent>
        <TabsContent value="past">
          <EventCards activeTab="past" events={events} setEvents={setEvents} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
