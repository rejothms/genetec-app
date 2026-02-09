
import { EventDashboard } from "@/components/EventDashboard/EventDashboard";
import { getEventApi } from "@/lib/eventApi";

export default async function DashboardPage() {
  const events = await getEventApi();

  return <EventDashboard events={events} />;
}

