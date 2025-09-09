import type { EVENT } from "../../constants/interfaces";
import EventEntry from "./EventEntry";

export default function EventsDisplay({ events }: { events: EVENT[] }){
    const currentDate = new Date()

    let upcomingEvents: EVENT[] = [];
    let ongoingEvents: EVENT[] = [];
    let pastEvents: EVENT[] = [];

    events.filter(event => {
        const startDate = event["startDate"];
        const endDate = event["endDate"];
        
        if (startDate > currentDate) {
            upcomingEvents.push(event);
        } else if (endDate < currentDate) {
            pastEvents.push(event);
        } else {
            ongoingEvents.push(event)
        }
    });

    upcomingEvents.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

    return (
        <div className="text-white flex w-3/5 justify-between">
            <div id="upcoming">
                <h1 className="text-4xl">Upcoming Events</h1>
                {upcomingEvents.length > 0 && upcomingEvents.map(event => (
                    <EventEntry key={event} event={event} />
                ))}
                {upcomingEvents.length == 0 && <p className="text-xl mt-5">No upcoming events!<br/>Check back soon!</p>}
            </div>

            <div className="flex flex-col">
                <div id="ongoing">
                    <h1 className="text-4xl">Ongoing Events</h1>
                    {ongoingEvents.length > 0 &&  ongoingEvents.map(event => (
                        <EventEntry key={event} event={event} />
                    ))}
                    {ongoingEvents.length == 0 && <p className="text-xl mt-5">No ongoing events!</p>}

                </div>
                <div id="past" className="mt-10">
                    <h1 className="text-4xl">Past Events</h1>
                    {pastEvents.length > 0 && pastEvents.map(event => (
                        <EventEntry key={event} event={event} />
                    ))}
                    {pastEvents.length == 0 && <p className="text-xl mt-5">No past events!</p>}
                </div>
            </div>
        </div>
    )
}
