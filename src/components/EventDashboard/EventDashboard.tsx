import { FC } from "react"
import { EventItem } from "@/types/events"
import TabView from "./TabView"

export const EventDashboard: FC<{ events: EventItem[] }> = ({ events }) => {
    return (

        <main id="event-tab-section" aria-label="Event dashboard">
            <section>
                <TabView events={events} />
            </section>
        </main>
    )
}   