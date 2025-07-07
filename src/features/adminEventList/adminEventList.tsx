"use client";

import {
  changeEventVisibility,
  deleteEvent,
} from "@/entities/api/events.service";
import CreateEventForm from "@/widgets/events/createEventForm";
import { EventExample } from "@/widgets/events/event";
import { Delete, Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import { Dialog, DialogContent } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminEventsList({
  events,
}: {
  events: EventExample[];
}) {
  const t = useTranslations("");
  const [selectedEvent, setSelectedEvent] = useState<null | EventExample>(null);
  const handleVisibilityChange = async (id: string, visibility: boolean) => {
    try {
      await changeEventVisibility(id, visibility);
      toast.success(t("AdminEvents.visibilityChanged"));
    } catch {
      toast.error(t("AdminEvents.visibilityChangeFailed"));
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id);
      toast.success(t("AdminEvents.eventDeleted"));
    } catch {
      toast.error(t("AdminEvents.eventDeleteFailed"));
    }
  };

  return (
    <div className="flex w-full lg:w-1/2 flex-col bg-[var(--section-bg)] border rounded-lg border-[var(--section-border)] p-5 ">
      <h2 className="w-full text-center text-[24px] inter font-medium text-[var(--primary-text)]">
        {t("AdminEvents.eventsList")}
      </h2>
      <div className=" flex flex-col gap-2">
        {events.map((event) => (
          <div key={event.id}>
            <div className="relative w-full min-h-[500px]">
              <img
                src={
                  process.env.NEXT_PUBLIC_URL_TO_PROXY_REQUESTS?.slice(0, -1) +
                  event.imageUrl
                }
                alt={t(event.titleKey)}
                className="object-cover w-full h-full rounded-lg absolute inset-0"
              />
              <div
                className="w-full h-full absolute"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 64%, rgba(0,0,0,0.4) 100%), linear-gradient(90deg, rgba(0,0,0,0) 80%, rgba(0,0,0,0.45) 100%)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
              <h3 className="absolute bottom-0 w-full text-center inter text-[32px] text-[white] font-semibold">
                {t(event.titleKey)}
              </h3>
              <div className="absolute top-0 items-center right-0 w-[50px] text-[white] flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleVisibilityChange(event.id, !event.isActive);
                  }}
                >
                  {event.isActive ? (
                    <Visibility className="!size-[35px] cursor-pointer"></Visibility>
                  ) : (
                    <VisibilityOff className="!size-[35px] cursor-pointer"></VisibilityOff>
                  )}
                </button>
                <Edit
                  onClick={() => {
                    setSelectedEvent(event);
                  }}
                  className="!size-[35px] cursor-pointer"
                />
                <Delete
                  onClick={() => {
                    handleDeleteEvent(event.id);
                  }}
                  className="!size-[35px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent className="">
          {selectedEvent && (
            <CreateEventForm
              event={selectedEvent}
              closeDialog={() => setSelectedEvent(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
