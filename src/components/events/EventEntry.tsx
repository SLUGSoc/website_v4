import type { EVENT } from "../../constants/interfaces";

export default function EventEntry({ event } : { event: EVENT }) {

    function formatDates(event: EVENT) {
        if (event.startDate.getDate() == event.endDate.getDate() &&
            event.startDate.getMonth() == event.endDate.getMonth() &&
            event.startDate.getFullYear() == event.endDate.getFullYear()
        ) {
            return `
                ${event.startDate.toDateString()}
                ${String(event.startDate.getHours()).padStart(2, "0")}:${String(event.startDate.getMinutes()).padStart(2, "0")}
                -
                ${String(event.endDate.getHours()).padStart(2, "0")}:${String(event.endDate.getMinutes()).padStart(2, "0")}
            `
        }

        return `
            ${event.startDate.toDateString()}
            ${String(event.startDate.getHours()).padStart(2, "0")}:${String(event.startDate.getMinutes()).padStart(2, "0")}
            -
            ${event.endDate.toDateString()}
            ${String(event.endDate.getHours()).padStart(2, "0")}:${String(event.endDate.getMinutes()).padStart(2, "0")}
            
        `
    }

    return (
        <div className="bg-bg-offset border-2 border-bg-offset rounded-xl p-5 mt-5">
            <h1 className="text-xl">{event.name}</h1>
            <p className="text-lg">{formatDates(event)}</p>
            <p>{event.description}</p>
        </div>
    )
}