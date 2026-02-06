
import { EventDashboard } from '@/components/EventDashboard/EventDashboard';
import eventsData from '@/mock/events.json'
import { EventItem, EventOwner, EventPriority, EventStatus } from '@/types/events';

export default function Home() {
  const events: EventItem[] = eventsData.map(e => ({
    ...e,
    owner: e.owner as EventOwner,
    status: e.status as EventStatus,
    priority: e.priority as EventPriority
  }))

  return (
    <div className="min-h-screen w-full bg-zinc-50">
      <main className="min-h-screen w-full">
         <EventDashboard events={events} />
      </main>
    </div>
  );
}
