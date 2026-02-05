import { EventItem } from "@/types/events";



export function groupedByDay(events: EventItem[]): Record<string, EventItem[]> {
  const grouped: Record<string, EventItem[]> = events.reduce((acc, event) => {
    const dateKey = event.startAt.split('T')[0];
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, EventItem[]>);


    Object.keys(grouped).forEach(dateKey => {
    grouped[dateKey].sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
    );
  });
  return grouped;
}




export function formatDayLabel(dateString: string) {
  const date = new Date(dateString);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();


  return isToday
    ? `Today · ${date.toLocaleDateString()}`
    : date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}
