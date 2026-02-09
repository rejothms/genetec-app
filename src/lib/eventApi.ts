import { EventItem } from "@/types/events";

export async function getEventApi(): Promise<EventItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/event`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}