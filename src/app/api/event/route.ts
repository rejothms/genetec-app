import { NextResponse } from "next/server";
import {
    EventItem,
    EventOwner,
    EventPriority,
    EventStatus,
} from "@/types/events";
import eventsData from '@/mock/events.json'

const events: EventItem[] = eventsData.map(e => ({
    ...e,
    owner: e.owner as EventOwner,
    status: e.status as EventStatus,
    priority: e.priority as EventPriority
}))


export async function GET() {
    
    const sortedEvents = events.sort((a, b) => new Date(a.startAt).getDate() - new Date(b.startAt).getDate());

    return NextResponse.json(events);
}


export async function POST(req: Request) {
    const body = (await req.json()) as EventItem;

    if (!body.title || !body.startAt || !body.owner) {
        return NextResponse.json(
            { message: "Invalid event data" },
            { status: 400 }
        );
    }

    const newEvent: EventItem = {
        ...body,
        createdAt: new Date().toISOString(),
    };

    events.push(newEvent);

    return NextResponse.json(newEvent, { status: 201 });
}
