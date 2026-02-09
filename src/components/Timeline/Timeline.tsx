'use client';
import { FC, KeyboardEvent } from "react";
import { formatDayLabel, getStatusColor, groupedByDay } from "./Timeline.utils";
import './Timeline.css';
import { TimelineProps } from "@/types/events";

export const TimeLine: FC<TimelineProps> = ({ events }) => {
    const eventsByDate = groupedByDay(events);

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        const key = e.key;
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) return;
        const container = e.currentTarget;
        const focusableElements = Array.from(
            container.querySelectorAll('[tabIndex="0"]')
        ) as HTMLElement[];

        const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
        if (currentIndex === -1) return;

        e.preventDefault();
        let nextIndex = currentIndex;
        if (key === 'ArrowDown' || key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % focusableElements.length;
        } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        }
        focusableElements[nextIndex]?.focus();
    };



    return (
        <main aria-label="Event timeline" className="timeline-container" onKeyDown={handleKeyDown}>
            {Object.entries(eventsByDate).map(([date, dayEvents]) => (
                <section key={date} className="timeline-card" aria-labelledby={`timeline-day-header-${date}`}>
                    <div className="timeline-card-header">
                        <h3 id={`timeline-day-header-${date}`} className="timeline-day-header" tabIndex={0}>
                            {formatDayLabel(date)}
                            <span className="event-count">({dayEvents.length} events)</span>
                        </h3>
                    </div>

                    <div className="timeline-day-events">
                        <div className="timeline-vertical-line" />
                        <ul className="timeline-event-list" role="list" aria-label={`Events on ${formatDayLabel(date)}`}>
                            {dayEvents.map(event => (
                                <li className="timeline-event" key={event.id} role="listitem" >
                                    <div className="timeline-event-time" tabIndex={0} aria-label={`Event time ${new Date(event.startAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}`}>
                                        {new Date(event.startAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}
                                    </div>

                                    <div className="timeline-event-content" tabIndex={0} role="group" aria-label={`${event.title}, owned by ${event.owner}, status ${event.status}, priority ${event.priority}`}>
                                        <span
                                            className="timeline-event-dot"
                                            style={{ backgroundColor: getStatusColor(event.priority) }}
                                            aria-hidden="true"
                                        />
                                        <h4 className="timeline-event-title">{event.title}</h4>
                                        <div className="timeline-event-meta">
                                            {event.owner} - {event.status} - {event.priority}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ))}
        </main>
    );
}