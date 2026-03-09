"use client";
import { EventType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { getUrgency } from "@/lib/utils";
import { useGetTimeRemaining } from "@/lib/hooks/getTimeRemaining";
import { Progress } from "../ui/progress";
import { useGetEleapsedPercentage } from "@/lib/hooks/getElapsedPercentage";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";

type Urgency = "high" | "medium" | "low";
export default function EventCard({
  e,
  setEvents,
}: {
  e: EventType;
  setEvents: Dispatch<SetStateAction<EventType[] | null>>;
}) {
  const { days, hours, minutes, seconds } = useGetTimeRemaining(e.dueDate);
  const isPast = days === 0 && hours === 0 && minutes === 0 && seconds === 0;
  const urgency = getUrgency({ days, hours, minutes, seconds }) as Urgency;
  const elapsedPercentage = useGetEleapsedPercentage(e.date, e.dueDate);
  return (
    <Card className="bg-popover px-4 ">
      <CardContent className="w-full px-0 flex flex-col gap-8">
        <div
          className={`[&>div]:w-fit [&>div]:relative [&>div]:flex [&>div>span]:nth-2:absolute [&>div>span]:nth-2:left-[50%] [&>div>span]:nth-2:bottom-0 [&>div>span]:nth-2:-translate-x-[50%] [&>div>span]:nth-2:translate-y-full [&>div]:text-[10px] [&>div>.counter]:text-[36px] w-full [&>div]:text-muted-foreground  justify-center flex text-[36px] [&>span]:font-mono [&>div>.counter]:font-mono [&>div>.counter]:bg-muted  [&>div>.counter]:py-1.5 [&>div>.counter]:rounded-md [&>div>.counter]:w-14 [&>div>.counter]:text-center gap-1 items-center ${isPast ? "[&>div>.counter]:text-muted-foreground/25" : urgency === "high" ? "[&>div>.counter]:text-red-500 [&>div>.counter]:animate-pulse" : urgency === "medium" ? "[&>div>.counter]:text-chart-3" : "[&>div>.counter]:text-chart-1"}`}
        >
          <div>
            <span className="counter">{days}</span>
            <span> Days</span>
          </div>
          <span>:</span>
          <div>
            <span className="counter">{hours}</span>
            <span> Hours</span>
          </div>
          <span>:</span>
          <div>
            <span className="counter">{minutes}</span>
            <span> Minutes</span>
          </div>
          <span>:</span>
          <div>
            <span className="counter">{seconds}</span> <span> Seconds</span>
          </div>
        </div>
        <Field className="flex flex-col gap-1">
          <FieldLabel className="flex w-full justify-between [&>span]:nth-1:text-muted-foreground [&>span]:nth-1:font-normal text-[12px]">
            <span>Time elapsed</span> <span>{elapsedPercentage}%</span>
          </FieldLabel>
          <Progress
            value={elapsedPercentage}
            className={` ${isPast ? "*:bg-muted-foreground/25 bg-none" : "bg-accent *:bg-accent-foreground/50"}`}
          />
        </Field>
      </CardContent>
      <hr className="w-full text-muted-foreground/25" />
      <CardHeader className="w-full px-0">
        <CardTitle className=" font-medium">{e.title}</CardTitle>

        <CardDescription className="text-muted-foreground text-[12px] line-clamp-text h-8">
          {e.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="w-full px-0 gap-4">
        <EditEvent event={e} setEvents={setEvents} />
        <DeleteEvent setEvents={setEvents} id={e.id} />
      </CardFooter>
    </Card>
  );
}
