import { useEffect, useState } from "react";
import type { EVENT } from "../../constants/interfaces";
import EventEntry from "./EventEntry";

export default function EventsDisplay({ macroURL } : { macroURL: string}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [events, setEvents] = useState<EVENT[]>([]);

    const currentDate = new Date();

    useEffect(() => {
        async function fetchEvents() {
            try {
                setLoading(true);
                const res = await fetch(macroURL);
                const data = await res.json();

                data.forEach((event: EVENT ) => {
                    event.startDate = new Date(event.startDate);
                    event.endDate = new Date(event.endDate);
                });

                setEvents(data);
            } catch (e) {
                console.log("Failed to fetch events:", e);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);


    const upcomingEvents = events.filter((event) => new Date(event.startDate) > currentDate);
    const ongoingEvents = events.filter((event) =>
        new Date(event.startDate) <= currentDate &&
        new Date(event.endDate) >= currentDate
    );
    const completedEvents = events.filter((event) => new Date(event.endDate) < currentDate);


    upcomingEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());


    return (
        <>
            {loading && 
                <div className="flex flex-col items-center text-center">
                    <span className="mt-5 min-md:w-16 min-md:h-16 min-md:border-6 w-12 h-12 border-4 border-text-body border-b-transparent rounded-full inline-block animate-spin"></span>
                </div>
            }

            {!loading && error && <p className="text-3xl text-red-400">Error loading Events - Please try again</p>}

            {!loading && !error && 
                <div className="text-white flex xl:w-3/5 min-2xl:w-2/5 justify-between max-md:flex-col max-lg:w-4/5">
                    <div id="upcoming" className="min-md:mb-10 md:mr-5">
                    <h1 className="text-4xl max-md:hidden">Upcoming Events</h1>
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                            <EventEntry key={event.id} event={event} category={"upcoming"} />
                        ))
                        ) : (
                            <p className="text-xl min-md:mt-5">
                            No upcoming events!<br />
                            Check back soon!
                            </p>
                        )
                    }
                    </div>

                    <div className="flex flex-col">
                        <div id="ongoing">
                            <h1 className="text-4xl max-md:hidden">Ongoing Events</h1>
                            {ongoingEvents.length > 0 ? (
                                ongoingEvents.map((event) => (
                                    <EventEntry key={event.id} event={event} category={"ongoing"} />
                                ))
                                ) : (
                                    <p className="text-xl min-md:mt-5">No ongoing events!</p>
                                )
                            }
                        </div>
                        <div id="past" className="min-md:mt-10">
                            <h1 className="text-4xl max-md:hidden">Past Events</h1>
                            {completedEvents.length > 0 ? (
                                completedEvents.map((event) => (
                                    <EventEntry key={event.id} event={event} category={"completed"} />
                                ))
                                ) : (
                                    <p className="text-xl min-md:mt-5">No past events!</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
