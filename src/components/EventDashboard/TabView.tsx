"use client";
import { useState } from "react";
import { Datagrid } from "../Datagrid/Datagrid";
import { EventItem } from "@/types/events";
import { eventColumns } from "@/utils/datagrid/event.columns";
import { TimeLine } from "../Timeline/Timeline";
import { CreateEventModal } from "../CreateEvent/CreateEvent";

export default function TabView({ events }: { events: EventItem[] }) {
  const [activeTab, setActiveTab] =
    useState<"dashboard" | "timeline">("dashboard");
  const [showAddEvent, setShowAddEvent] =
    useState<boolean>(false);

  const [eventList, setEventList] =
    useState<EventItem[]>(events);

  return (
    <div className="w-full mt-8">

      <div className="w-full border-b border-gray-200">
        <div className="flex items-center px-6 mx-auto">

          <div className="flex">
            <button
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
              }}
            >
              Create Event
            </button>
          </div>
        </div>
      </div>
      <div className="md:px-40 mx-auto p-6">
        {activeTab === "dashboard" && (
          <Datagrid data={eventList} columns={eventColumns} />
        )}

        {activeTab === "timeline" && <TimeLine events={eventList} />}
      </div>

      {showAddEvent && (
        <CreateEventModal
          onClose={() => setShowAddEvent(false)}
          onSubmit={(event) =>
            setEventList((prev) => [...prev, event])
          }
        />
      )}
    </div>
  );
}
