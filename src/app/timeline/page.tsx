import { getEventApi } from "@/lib/eventApi";
import { EventDashboard } from "@/components/EventDashboard/EventDashboard";

export default async function TimelinePage() {
  const events = await getEventApi();

  return <EventDashboard events={events}  />;
}