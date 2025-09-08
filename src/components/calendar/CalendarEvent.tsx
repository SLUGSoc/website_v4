export default function CalendarEvent({event, position} : {event: {}, position: string}) {

    return (
        <p 
            className={`
                border mb-2 border-text-title bg-text-title text-bg-offset
                ${position == 'single' ? 'w-4/5' : 'w-full'}
                ${position == 'middle' ? '' : 'rounded-md'} 
                ${position == 'start' ? 'rounded-r-none ml-6 pr-6' : ''}
                ${position == 'end' ? 'rounded-l-none mr-6 pl-6' : ''}

                `}
        >{event.name}</p>
    )
}