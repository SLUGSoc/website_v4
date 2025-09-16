import { FaLocationDot } from "react-icons/fa6";
import type { EVENT } from "../../constants/interfaces";

export default function EventEntry({ event, category } : { event: EVENT, category: string }) {

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
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-2xl">{event.title}</h1>
                    {event.location && 
                    <div className="flex flex-row items-center">
                        <h3 className=" text-lg">{event.location}</h3>
                        <FaLocationDot className="mb-1 ml-1" />
                    </div>    
                    }
                </div>
                <p 
                className={`
                    border ml-5 min-w-fit min-md:pt-1 w-20 text-center rounded-xl border-transparent
                    ${category.toLowerCase() == "upcoming" ? 'bg-green-500' : ''}
                    ${category == "ongoing" ? 'bg-amber-500' : ''}
                    ${category == "completed" ? 'bg-zinc-600' : ''}
                    min-md:hidden
                `}>{category}</p>
            </div>
            <p className="text-lg">{formatDates(event)}</p>
            <p>{event.description}</p>
        </div>
    )
}