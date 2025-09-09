export default function CalendarEvent({event, position} : {event: {}, position: string}) {

    function getStartTime(event) {
        const date = new Date(event["startDate"]);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    function getEndTime(event) {
        const date = new Date(event["endDate"]);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    return (
        <p 
            className={`
                border mb-2 border-text-title bg-text-title text-bg-offset
                ${position == 'single' ? 'w-4/5' : 'w-full'}
                ${position == 'middle' ? '' : 'rounded-md'} 
                ${position == 'start' ? 'rounded-r-none' : ''}
                ${position == 'end' ? 'rounded-l-none' : ''}
            `}
        >
            {event.name}
        </p>
    )
}