
import { EventDashboard } from '@/components/EventDashboard/EventDashboard';

import { EventItem } from '@/types/events';

async function getEvents(): Promise<EventItem[]> {
  const res = await fetch("http://localhost:3000/api/event", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export default async function Home() {
  const events = await getEvents();

  return (
    <div className="min-h-screen w-full bg-zinc-50">
      <main className="min-h-screen w-full">
         <EventDashboard events={events} />
      </main>
    </div>
  );
}
