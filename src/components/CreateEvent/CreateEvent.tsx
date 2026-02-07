"use client";

import { useState } from "react";
import {
  EventItem,
  EventOwner,
  EventPriority,
  EventStatus,
} from "@/types/events";


interface CreateEventModalProps {
  onClose: () => void;
  onSubmit: (event: EventItem) => void;
}

type FormErrors = Partial<
  Record<
    | "title"
    | "date"
    | "startTime"
    | "endTime"
    | "owner"
    | "priority",
    string
  >
>;


export function CreateEventModal({
  onClose,
  onSubmit,
}: CreateEventModalProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [priority, setPriority] = useState<EventPriority>(
    EventPriority.MEDIUM
  );

  const [owner, setOwner] = useState<EventOwner>(
    EventOwner.MonitoringTeam
  );

  const [errors, setErrors] = useState<FormErrors>({});


  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    if (!startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (endTime && startTime && endTime <= startTime) {
      newErrors.endTime = "End time must be after start time";
    }

    if (!owner) {
      newErrors.owner = "Owner is required";
    }

    if (!priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = () => {
    if (!validate()) return;

    const startAt = new Date(
      `${date}T${startTime}`
    ).toISOString();

    const endAt = endTime
      ? new Date(`${date}T${endTime}`).toISOString()
      : undefined;

    const newEvent: EventItem = {
      id: `evt-${crypto.randomUUID().slice(0, 6)}`,
      title,
      description: description || undefined,
      startAt: new Date(`${date}T${startTime}`).toISOString(),
      endAt: endTime
        ? new Date(`${date}T${endTime}`).toISOString()
        : undefined,
      owner,
      status: EventStatus.PLANNED,
      priority
    };

    onSubmit(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Add Event</h2>


        <div>
          <input
            className={`w-full border p-2 rounded ${errors.title ? "border-red-500" : ""
              }`}
            placeholder="Event title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <input
              type="date"
              className={`w-full border p-2 rounded ${errors.date ? "border-red-500" : ""
                }`}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <input
              type="time"
              className={`w-full border p-2 rounded ${errors.startTime ? "border-red-500" : ""
                }`}
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  startTime: undefined,
                }));
              }}
            />
            {errors.startTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.startTime}
              </p>
            )}
          </div>

          <div>
            <input
              type="time"
              className={`w-full border p-2 rounded ${errors.endTime ? "border-red-500" : ""
                }`}
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  endTime: undefined,
                }));
              }}
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.endTime}
              </p>
            )}
          </div>
        </div>

        <div>
          <select
            className={`w-full border p-2 rounded ${errors.owner ? "border-red-500" : ""
              }`}
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value as EventOwner);
              setErrors((prev) => ({ ...prev, owner: undefined }));
            }}
          >
            {Object.values(EventOwner).map((o) => (
              <option key={o} value={o}>
                {o.replace(/-/g, " ")}
              </option>
            ))}
          </select>
          {errors.owner && (
            <p className="text-red-500 text-xs mt-1">
              {errors.owner}
            </p>
          )}
        </div>

        <div>
          <select
            className={`w-full border p-2 rounded ${errors.priority ? "border-red-500" : ""
              }`}
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value as EventPriority);
              setErrors((prev) => ({
                ...prev,
                priority: undefined,
              }));
            }}
          >
            {Object.values(EventPriority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">
              {errors.priority}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
