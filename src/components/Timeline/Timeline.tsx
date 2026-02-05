
'use client';
import { FC } from "react";
import { formatDayLabel, groupedByDay } from "./Timeline.utils";
import './Timeline.css';
import { TimelineProps } from "@/types/events";


export const TimeLine: FC<TimelineProps> = ({ events }) => {
    const eventsByDate = groupedByDay(events);


    const getStatusColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#9ca3af';
            default: return '#10b981';
        }
    };


    return (
        <main className="timeline-container">
            {Object.entries(eventsByDate).map(([date, dayEvents]) => (


                <section key={date} className="timeline-card" >
                    <div className="timeline-card-header">
                        <span className="calendar-icon"></span>
                        <h3 className="timeline-day-header">
                            {formatDayLabel(date)}
                            <span className="event-count">({dayEvents.length} events)</span>
                        </h3>
                    </div>


                    <div className="timeline-day-events">
                        <div className="timeline-vertical-line" />




                        <ul className="timeline-event-list">
                            {dayEvents.map(event => (
                                <li className="timeline-event" key={event.id}>
                                    <div className="timeline-event-time">
                                        {new Date(event.startAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}
                                    </div>


                                    <div className="timeline-event-content">
                                        <span
                                            className="timeline-event-dot"
                                            style={{ backgroundColor: getStatusColor(event.priority) }}
                                            aria-hidden="true"
                                        />
                                        <h4 className="timeline-event-title">{event.title}</h4>
                                        <div className="timeline-event-meta">
                                            {event.owner} • {event.status} • {event.priority}
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
