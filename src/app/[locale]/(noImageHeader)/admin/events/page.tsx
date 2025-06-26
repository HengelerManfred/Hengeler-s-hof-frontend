import { loadEvents } from "@/entities/api/events.service";
import AdminEventsList from "@/features/adminEventList/adminEventList";
import CreateEventForm from "@/widgets/events/createEventForm";

export default async function AdminEvents() {

  const events = await loadEvents();


  return (
    <div className="flex w-9/10 lg:w-3/4 flex-col lg:flex-row gap-3">
      <CreateEventForm></CreateEventForm>
      <AdminEventsList events={events}></AdminEventsList>
    </div>
  );
}
