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
import { Plus } from "lucide-react";
import { useState, Dispatch, SetStateAction, useTransition } from "react";
import { DatePickerTime } from "./DatePicker";
import { Textarea } from "../ui/textarea";
import { useGetCachedDate } from "@/lib/hooks/getCurrentDate";
import { combineDateAndTime } from "@/lib/utils";
import { EventType } from "@/lib/types";
import { toast } from "sonner";

export default function AddEvent({
  setEvents,
  date,
  setDate,
}: {
  setEvents: Dispatch<SetStateAction<EventType[] | null>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  // States
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

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
    startTransition(() => {
      const combinedDate = combineDateAndTime(date, time);
      const payload = {
        id: crypto.randomUUID(),
        title,
        dueDate: combinedDate,
        date: cachedDate,
        description: description,
      };
      setEvents((prev) => {
        const updated = prev ? [payload, ...prev] : [payload];

        return updated;
      });

      setIsOpen(false);
      toast("New event has been created");
      setDate(undefined);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="px-6">
          <Plus /> Add new event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Add new Event</DialogTitle>
          <DialogDescription>
            Create a new event here. Click save changes when you are done
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
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
