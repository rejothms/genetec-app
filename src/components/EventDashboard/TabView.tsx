"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Datagrid } from "../Datagrid/Datagrid";
import { EventItem } from "@/types/events";
import { eventColumns } from "@/utils/datagrid/event.columns";
import { TimeLine } from "../Timeline/Timeline";
import { CreateEventModal } from "../CreateEvent/CreateEvent";

export default function TabView({ events }: { events: EventItem[] }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "timeline">("dashboard");
  const [showAddEvent, setShowAddEvent] = useState<boolean>(false);
  const [eventList, setEventList] = useState<EventItem[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const updatedColumns = eventColumns({ onEdit: handleEdit, onDelete: handleDelete });

  function handleEdit(row: EventItem) {
    setSelectedEvent(row);
    setShowAddEvent(true);
  }

  async function handleDelete(row: EventItem) {
    const toastId = toast.loading("Deleting event...");

    const res = await fetch(`/api/event/${row.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Failed to delete event", { id: toastId });
      return;
    }
    toast.success("Event deleted successfully", { id: toastId });
    setEventList((events) => events.filter((e) => e.id !== row.id));
  }

  const handleSubmit = async (event: EventItem) => {
    const toastId = toast.loading("Saving event...");
    let res;
    if (selectedEvent) {
      res = await fetch(`/api/event/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) {
        toast.error("Failed to update event", { id: toastId });
        return;
      }
      toast.success("Event updated successfully", { id: toastId });
      setEventList((events) =>
        events.map((e) => (e.id === event.id ? event : e))
      );
    } else {
      res = await fetch("/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
      if (!res.ok) {
        toast.error("Failed to create event", { id: toastId });
        return;
      }
      toast.success("Event created successfully", { id: toastId });
      setEventList((events) => [...events, event]);
    }
    setSelectedEvent(null);
  };

  return (
    <div className="w-full mt-8">

      <div className="w-full border-b border-gray-200">
        <div className="flex items-center px-6 mx-auto">

          <div className="flex" role="tablist" aria-label="Event Dashboard Tabs">
            <button
              id="tab-dashboard"
              role="tab"
              aria-selected={activeTab === "dashboard"}
              aria-controls="dashboard-panel"
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-3 text-sm font-medium transition
                ${activeTab === "dashboard"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Event Dashboard
            </button>

            <button
              id="tab-timeline"
              role="tab"
              aria-selected={activeTab === "timeline"}
              aria-controls="timeline-panel"
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-3 text-sm font-medium transition
                ${activeTab === "timeline"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Timeline
            </button>
          </div>
          <div className="ml-auto">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700 transition"
              onClick={() => {
                setShowAddEvent(true)
                setSelectedEvent(null);
              }}
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
      <div className="xl:px-40 mx-auto p-6">
        {activeTab === "dashboard" && (
          <div id="panel-dashboard" role="tabpanel" aria-labelledby="tab-dashboard">
            <Datagrid data={eventList} columns={updatedColumns} />
          </div>

        )}

        {activeTab === "timeline" && (
          <div id="panel-timeline" role="tabpanel" aria-labelledby="tab-timeline">
            <TimeLine events={eventList} />
          </div>
        )
        }
      </div>

      {showAddEvent && (
        <CreateEventModal
          onClose={() => setShowAddEvent(false)}
          onSubmit={(event) => handleSubmit(event)}
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
}
