"use client";

import { useEffect, useState } from "react";
import {
  EventItem,
  EventOwner,
  EventPriority,
  EventStatus,
} from "@/types/events";
import { sanitizeInput, validateDescription, validateTitle } from "./validation";


interface CreateEventModalProps {
  selectedEvent?: EventItem | null;
  onClose: () => void;
  onSubmit: (event: EventItem) => void;
}

type FormErrors = Partial<
  Record<
    | "title"
    | "description"
    | "date"
    | "startTime"
    | "endTime"
    | "owner"
    | "priority"
    | "status",
    string
  >
>;


export function CreateEventModal({
  selectedEvent,
  onClose,
  onSubmit,
}: CreateEventModalProps) {

  const [title, setTitle] = useState(selectedEvent?.title || "");
  const [description, setDescription] = useState(selectedEvent?.description || "");
  const [date, setDate] = useState(selectedEvent?.startAt ? new Date(selectedEvent.startAt).toISOString().split('T')[0] : "");
  const [startTime, setStartTime] = useState(selectedEvent?.startAt ? selectedEvent.startAt.split("T")[1].slice(0, 5) : "");
  const [endTime, setEndTime] = useState(selectedEvent?.endAt ? selectedEvent.endAt.split("T")[1].slice(0, 5) : "");

  const [priority, setPriority] = useState<EventPriority>(
    selectedEvent?.priority || EventPriority.MEDIUM
  );

  const [owner, setOwner] = useState<EventOwner>(
    selectedEvent?.owner || EventOwner.MonitoringTeam
  );

  const [status, setStatus] = useState<EventStatus>(
    selectedEvent?.status || EventStatus.PLANNED
  );

  const [errors, setErrors] = useState<FormErrors>({});


  const validate = (): boolean => {
    const newErrors: FormErrors = {};


    const sanitizedTitle = sanitizeInput(title);
    const sanitizedDescription = sanitizeInput(description);


    const titleError = validateTitle(sanitizedTitle);
    if (titleError) newErrors.title = titleError;

    const descriptionError = validateDescription(sanitizedDescription);
    if (descriptionError) newErrors.description = descriptionError;

    if (!date) newErrors.date = "Date is required";
    if (!startTime) newErrors.startTime = "Start time is required";

    if (endTime && startTime && endTime <= startTime) {
      newErrors.endTime = "End time must be after start time";
    }

    if (!owner) newErrors.owner = "Owner is required";
    if (!priority) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    document.getElementById("event-title")?.focus();
  }, []);


  const handleSubmit = () => {
    if (!validate()) return;

    const newEvent: EventItem = {
      id: selectedEvent?.id ?? `evt-${crypto.randomUUID().slice(0, 6)}`,
      title,
      description: description || undefined,
      startAt: new Date(`${date}T${startTime}`).toISOString(),
      endAt: endTime
        ? new Date(`${date}T${endTime}`).toISOString()
        : undefined,
      owner,
      status: status || EventStatus.PLANNED,
      priority
    };

    onSubmit(newEvent);
    onClose();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div role="dialog" aria-modal="true" aria-labelledby="event-modal-title" aria-describedby="event-modal-description" className="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
        <h2 id="event-modal-title" className="text-lg font-semibold">{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
        <p id="event-modal-description" className="sr-only">
          Fill in the form to {selectedEvent ? 'update' : 'create'} an event
        </p>

        <div>
          <label htmlFor="event-title" className="sr-only">
            Event title
          </label>
          <input
            id="event-title"
            className={`w-full border p-2 rounded ${errors.title ? "border-red-500" : ""
              }`}
            placeholder="Event title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}

          />
          {errors.title && (
            <p id="title-error" role="alert" className="text-red-500 text-xs mt-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="event-description" className="sr-only">
            Event description , optional
          </label>
          <textarea
            id="event-description"
            className="w-full border p-2 rounded"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
          />
          {errors.description && (
            <p id="description-error" role="alert" className="text-red-500 text-xs mt-1">
              {errors.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="event-date" className="sr-only">
              Event date
            </label>
            <input
              id="event-date"
              type="date"
              className={`w-full border p-2 rounded ${errors.date ? "border-red-500" : ""
                }`}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              aria-invalid={!!errors.date}
              aria-describedby={errors.date ? "date-error" : undefined}
            />
            {errors.date && (
              <p id="date-error" role="alert" className="text-red-500 text-xs mt-1">
                {errors.date}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="event-start-time" className="sr-only">
              Event start time
            </label>
            <input
              id="event-start-time"
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
              aria-invalid={!!errors.startTime}
              aria-describedby={errors.startTime ? "start-time-error" : undefined}
            />
            {errors.startTime && (
              <p id="start-time-error" role="alert" className="text-red-500 text-xs mt-1">
                {errors.startTime}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="event-end-time" className="sr-only">
              Event end time
            </label>
            <input
              id="event-end-time"
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
              aria-invalid={!!errors.endTime}
              aria-describedby={errors.endTime ? "end-time-error" : undefined}
            />
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1" id="end-time-error" role="alert">
                {errors.endTime}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="event-owner" className="sr-only">
            Event owner
          </label>
          <select
            id="event-owner"
            className={`w-full border p-2 rounded ${errors.owner ? "border-red-500" : ""
              }`}
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value as EventOwner);
              setErrors((prev) => ({ ...prev, owner: undefined }));
            }}
            aria-invalid={!!errors.owner}
            aria-describedby={errors.owner ? "owner-error" : undefined}
          >
            {Object.values(EventOwner).map((o) => (
              <option key={o} value={o}>
                {o.replace(/-/g, " ")}
              </option>
            ))}

          </select>
          {errors.owner && (
            <p id="owner-error" role="alert" className="text-red-500 text-xs mt-1">
              {errors.owner}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="event-priority" className="sr-only">
            Event priority
          </label>
          <select
            id="event-priority"
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
            aria-invalid={!!errors.priority}
            aria-describedby={errors.priority ? "priority-error" : undefined}
          >
            {Object.values(EventPriority).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.priority && (
            <p id="priority-error" role="alert" className="text-red-500 text-xs mt-1">
              {errors.priority}
            </p>
          )}
        </div>

        { selectedEvent && (
        <div>
          <label htmlFor="event-status" className="sr-only">
            Event Status
          </label>
          <select
            id="event-status"
            className={`w-full border p-2 rounded ${errors.status ? "border-red-500" : ""
              }`}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as EventStatus);
              setErrors((prev) => ({
                ...prev,
                status: undefined,
              }));
            }}
            aria-invalid={!!errors.status}
            aria-describedby={errors.status ? "status-error" : undefined}
          >
            {Object.values(EventStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && (
            <p id="status-error" role="alert" className="text-red-500 text-xs mt-1">
              {errors.status}
            </p>
          )}
        </div>
        )}

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
            {selectedEvent ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
