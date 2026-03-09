import { CalendarOff } from "lucide-react";
import AddEvent from "./AddEvent";
import { Dispatch, SetStateAction, useState } from "react";
import { EventType } from "@/lib/types";

type TabType = "all" | "upcoming" | "past";
export default function EmptyState({
  tab,
  setEvents,
}: {
  tab: TabType;
  setEvents: Dispatch<SetStateAction<EventType[] | null>>;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const message = `No ${tab === "all" ? "" : tab} events yet`;
  return (
    <div className=" flex flex-col w-full items-center gap-4 py-8 ">
      <div className="rounded-full p-2.5 bg-muted text-muted-foreground/60">
        <CalendarOff size="50" className="text-inherit" strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <h2 className="text-[20px] font-medium">{message}</h2>
        <p className="text-muted-foreground">Start by adding a new event</p>
      </div>
      <AddEvent setEvents={setEvents} date={date} setDate={setDate} />
    </div>
  );
}
