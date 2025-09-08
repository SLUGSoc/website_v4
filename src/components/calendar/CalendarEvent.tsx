export default function CalendarEvent({event} : {event: {}}) {

    return (
        <p className="border mb-2 rounded-md border-text-title bg-text-title text-bg-offset">{event.name}</p>
    )
}