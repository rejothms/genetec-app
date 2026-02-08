import { NextResponse } from "next/server";
import {
    EventItem,
} from "@/types/events";
import { addEvent, getEvents } from "@/lib/eventStore";

export async function GET() {
    const sortedEvents = getEvents().sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
    return NextResponse.json(sortedEvents);
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

    addEvent(newEvent);

    return NextResponse.json(newEvent, { status: 201 });
}

