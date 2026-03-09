import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";
import { useGetCachedDate } from "@/lib/hooks/getCurrentDate";

export function DatePickerTime({
  date,
  setDate,
  clearDateError,
  clearTimeError,
  editEvent = false,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  clearDateError: () => void;
  clearTimeError: () => void;
  editEvent?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const currentDate = useGetCachedDate();
  const time = date ? date.toTimeString().split(" ")[0] : "09:00:00";

  return (
    <FieldGroup className="mx-auto max-w-xs flex-row">
      <Field>
        <FieldLabel
          htmlFor="date-picker-optional"
          className="after:text-red-500 after:content-['*']"
        >
          Date
        </FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, "PPP") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              defaultMonth={date}
              startMonth={currentDate}
              endMonth={new Date(currentDate.getFullYear() + 10, 11)}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
              disabled={{ before: currentDate }}
              onDayClick={clearDateError}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel
          htmlFor="time-picker-optional"
          className="after:text-red-500 after:content-['*']"
        >
          Time
        </FieldLabel>
        <Input
          onInput={clearTimeError}
          name="time"
          type="time"
          id="time-picker-optional"
          step="1"
          defaultValue={!editEvent ? "09:00:00" : time}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
