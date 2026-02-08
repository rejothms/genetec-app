import { NextResponse } from "next/server";
import { deleteEvent, updateEvent } from "@/lib/eventStore";
type Params = Promise<{ id: string }>;
export async function PUT(
  req: Request,
  { params }: { params: Params }
) {

  const { id } = await params;

  console.log("Event ID:", id);

  try {
    const body = await req.json();
    const updated = updateEvent(id, body);
    if (!updated) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Params }
) {
  const { id } = await params;
  const deleted = deleteEvent(id);

  if (!deleted) {
    return NextResponse.json(
      { message: "Event not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(deleted);
}
