import eventsData from "@/mock/events.json";
import {
  EventItem,
  EventOwner,
  EventPriority,
  EventStatus,
} from "@/types/events";

let events: EventItem[] = [];

if (!global.eventsStore) {
  global.eventsStore = eventsData.map((e) => ({
    ...e,
    owner: e.owner as EventOwner,
    status: e.status as EventStatus,
    priority: e.priority as EventPriority,
  }));
}

export function getEvents() {
  return global.eventsStore;
}

export function addEvent(event: EventItem) {
  global.eventsStore.push(event);
  console.log(global.eventsStore);
}

export function updateEvent(id: string, data: Partial<EventItem>) {
  const index = global.eventsStore.findIndex((e) => e.id === id);
  if (index === -1) return null;

  global.eventsStore[index] = {
    ...global.eventsStore[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return global.eventsStore[index];
}

export function deleteEvent(id: string) {
  console.log(global.eventsStore);
  const index = global.eventsStore.findIndex((e) => e.id === id);
  if (index === -1) return null;

  return global.eventsStore.splice(index, 1)[0];
}

declare global {
  var eventsStore: EventItem[];
}