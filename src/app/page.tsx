
import { EventDashboard } from '@/components/EventDashboard/EventDashboard';

import { EventItem } from '@/types/events';
import { Suspense } from 'react';
import LoadingSpinner from './loading';

async function getEvents(): Promise<EventItem[]> {
  const res = await fetch("http://localhost:3000/api/event", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

async function EventsWrapper() {
  const events = await getEvents();
  return <EventDashboard events={events} />;
}

export default async function Home() {


  return (
    <div className="min-h-screen w-full bg-zinc-50">
      <main className="min-h-screen w-full">
         <Suspense fallback={<LoadingSpinner />}>
         <EventsWrapper />
        </Suspense>
         
      </main>
    </div>
  );
}

