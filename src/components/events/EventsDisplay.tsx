import { useEffect, useState } from "react";
import type { EVENT } from "../../constants/interfaces";
import EventEntry from "./EventEntry";

export default function EventsDisplay({ macroURL } : { macroURL: string}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [events, setEvents] = useState<EVENT[]>([]);

    const [upcomingLimit, setUpcomingLimit] = useState(5);
    const [pastLimit, setPastLimit] = useState(2);

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


    const upcomingEvents = events
        .filter((event) => new Date(event.startDate) > currentDate)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const ongoingEvents = events.filter(
        (event) =>
            new Date(event.startDate) <= currentDate &&
            new Date(event.endDate) >= currentDate
    );

    const completedEvents = events
        .filter((event) => new Date(event.endDate) < currentDate)
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());



    return (
        <>
            {loading && 
                <div className="flex flex-col items-center text-center">
                    <span className="mt-5 min-md:w-16 min-md:h-16 min-md:border-6 w-12 h-12 border-4 border-text-body border-b-transparent rounded-full inline-block animate-spin" style={{animationDuration: "0.75s"}}></span>
                </div>
            }

            {!loading && error && <p className="text-3xl text-red-400">Error loading Events - Please try again</p>}

            {!loading && !error && 
                <div className="text-white flex xl:w-4/5 min-2xl:w-3/5 justify-between max-md:flex-col max-lg:w-4/5">
                    <div id="upcoming" className="min-md:mb-10 md:mr-5">
                    <h1 className="text-4xl max-md:hidden">Upcoming Events</h1>
                    {upcomingEvents.length > 0 ? (
                        <>
                            {upcomingEvents.slice(0, upcomingLimit).map((event) => (
                                <EventEntry
                                    key={event.id}
                                    event={event}
                                    category={"upcoming"}
                                />
                            ))}
                            {upcomingLimit < upcomingEvents.length && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setUpcomingLimit(prev => prev + 5)}
                                        className="mt-3 ml-auto mr-auto px-4 py-2 bg-blue-600 rounded-2xl shadow hover:bg-blue-700 transition duration-200 cursor-pointer"
                                    >
                                        Show more upcoming events
                                    </button>
                                </div>
                            )}
                        </>
                        ) : (
                            <p className="text-xl min-md:mt-5 max-md:hidden">
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
                                    <p className="text-xl min-md:mt-5 max-md:hidden">No ongoing events!</p>
                                )
                            }
                        </div>
                        <div id="past" className="min-md:mt-10">
                            <h1 className="text-4xl max-md:hidden">Past Events</h1>
                            {completedEvents.length > 0 ? (
                                <>
                                    {completedEvents.slice(0, pastLimit).map((event) => (
                                        <EventEntry
                                            key={event.id}
                                            event={event}
                                            category={"completed"}
                                        />
                                    ))}
                                    {pastLimit < completedEvents.length && (
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => setPastLimit(prev => prev + 2)}
                                                className="mt-3 ml-auto mr-auto px-4 py-2 bg-blue-600 rounded-2xl shadow hover:bg-blue-700 transition duration-200 cursor-pointer"
                                            >
                                                Show more past events
                                            </button>
                                        </div>
                                    )}
                                </>
                                ) : (
                                    <p className="text-xl min-md:mt-5 max-md:hidden">No past events!</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
