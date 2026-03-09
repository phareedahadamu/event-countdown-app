import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, Dispatch, SetStateAction } from "react";
import { DatePickerTime } from "./DatePicker";
import { Textarea } from "../ui/textarea";
import { useGetCachedDate } from "@/lib/hooks/getCurrentDate";
import { combineDateAndTime } from "@/lib/utils";
import { EventType } from "@/lib/types";
import { toast } from "sonner";

export default function EditEvent({
  event,
  setEvents,
}: {
  event: EventType;
  setEvents: Dispatch<SetStateAction<EventType[] | null>>;
}) {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date(event.dueDate));
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);

  const cachedDate = useGetCachedDate();
  function validate(data: {
    title: string | undefined;
    description: string | undefined;
    dDate: Date | undefined;
    dTime: string | undefined;
  }) {
    if (!data.title) {
      setTitleError("Title is required");
      return false;
    }
    if (data.title.length < 4) {
      setTitleError("Too Short! Must be at least 4 characters");
      return false;
    }
    if (data.title.length > 30) {
      setTitleError("Too long! Cannot exceed 30 characters");
      return false;
    }
    if (data.description && data.description.length > 200) {
      setDescriptionError("Too long! Cannot exceed 200 characters");
      return false;
    }
    if (!data.dDate) {
      setDateError("Date is required");
      return false;
    }
    if (!data.dTime) {
      setTimeError("Time is required");
      return false;
    }
    const combinedDate = combineDateAndTime(data.dDate, data.dTime);

    if (combinedDate < new Date()) {
      setDateTimeError("Cannot pick a past date");
      return false;
    }
    return true;
  }
  // Submit new event
  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = (formData.get("title") as string).trim();
    const description = (formData.get("description") as string).trim();
    const time = formData.get("time") as string;
    const isValid = validate({ title, description, dTime: time, dDate: date });
    if (!isValid) return;
    if (typeof window === "undefined") return;
    if (!date) return;
    const combinedDate = combineDateAndTime(date, time);
    const payload = {
      ...event,
      title,
      dueDate: combinedDate,
      date: cachedDate,
      description: description,
    };
    setEvents((prev) => {
      if (!prev) return null;
      const updated = prev.map((e) => {
        if (payload.id === e.id) return payload;
        else return e;
      });

      return updated;
    });

    setIsOpen(false);
    toast("Event has been updated");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-6">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Edit your event here. Click save changes when you are done
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <FieldGroup>
            <Field>
              <Label
                htmlFor="title"
                className="after:text-red-500 after:content-['*']"
              >
                Title
              </Label>
              <Input
                defaultValue={event.title}
                id="title"
                name="title"
                placeholder="Enter title here"
                max={25}
                onBeforeInput={() => {
                  if (titleError) setTitleError(null);
                }}
              />
              {titleError && <FieldError>{titleError}</FieldError>}
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                defaultValue={event.description}
                id="description"
                name="description"
                placeholder="Enter description here"
                onBeforeInput={() => {
                  if (descriptionError) setDescriptionError(null);
                }}
              />
              {descriptionError && <FieldError>{descriptionError}</FieldError>}
            </Field>
            <Field>
              <DatePickerTime
                editEvent={true}
                date={date}
                setDate={setDate}
                clearDateError={() => {
                  if (dateError) {
                    setDateError(null);
                  }
                  if (dateTimeError) {
                    setDateTimeError(null);
                  }
                }}
                clearTimeError={() => {
                  if (timeError) {
                    setTimeError(null);
                  }
                  if (dateTimeError) {
                    setDateTimeError(null);
                  }
                }}
              />
              {dateError && <FieldError>{dateError}</FieldError>}
              {timeError && <FieldError>{timeError}</FieldError>}
              {dateTimeError && <FieldError>{dateTimeError}</FieldError>}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
