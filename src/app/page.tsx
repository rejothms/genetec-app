import eventsData from '@/mock/events.json'
import { EventItem, EventOwner, EventPriority, EventStatus } from '@/types/events';
import { TimeLine } from './Timeline/Timeline';

export default function Home() {
  const events: EventItem[] = eventsData.map(e => ({
    ...e,
    owner: e.owner as EventOwner,
    status: e.status as EventStatus,
    priority: e.priority as EventPriority
  }))

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <TimeLine events={events} />
      </main>
    </div>
  );
}
