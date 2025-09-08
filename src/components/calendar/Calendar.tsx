import { useState } from "react";
import CalendarEvent from "./CalendarEvent.tsx";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Calendar({ events } : { events: [] }) {
    const today = new Date()
    const [currentDate, setCurrentDate] = useState(new Date());

    function getStartDay(currentDate: Date) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    }

    function getDaysInMonth(currentDate: Date) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    }
    
    function prevMonth() {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    }

    function setToday() {
        setCurrentDate(new Date());
    }

    function nextMonth() {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    }

    console.log(getStartDay(currentDate))
    return (
        <div className="text-text-body w-4/5 h-full mb-10">
            <div id="calendarControls" className="text-4xl flex justify-between">
                <div className="flex align-middle">
                    <button onClick={prevMonth} className="cursor-pointer">&lt;</button>
                    <button onClick={setToday} className="cursor-pointer text-xl ml-2 hover:border-text-body border-transparent border-b-2 transition duration-300">Today</button>
                </div>
                <p>{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                <button onClick={nextMonth} className="cursor-pointer">&gt;</button>
            </div>
            <div id="calendarBody" className="grid h-full grid-cols-7 mt-5 text-center gap-2">
                {days.map(day => (
                    <p key={day} className="text-xl mb-2">{day}</p>
                ))}
                {[...Array(getStartDay(currentDate) > 4 && getDaysInMonth(currentDate) >= 30 ? 42 : 35)].map((_, i) => {
                    const dayNumber = i - getStartDay(currentDate) + 1;

                    const isToday =
                        currentDate.getMonth() === today.getMonth() &&
                        currentDate.getFullYear() === today.getFullYear() &&
                        dayNumber === today.getDate();

                    const dayEvents = events.filter(event => {
                        const day = new Date(new Date(currentDate).setDate(dayNumber))
                        const eventDate = new Date(event["startDate"]);

                        return (
                            eventDate.getDate() === day.getDate() &&
                            eventDate.getMonth() === day.getMonth() &&
                            eventDate.getFullYear() === day.getFullYear()
                        );
                    });

                    return (
                        <div key={i} className={`flex flex-col items-center h-[150px] pb-15 rounded-2xl ${dayNumber > 0  && dayNumber < (getDaysInMonth(currentDate) + 1) ? 'border-bg-offset bg-bg-offset ' : 'border-zinc-800 bg-zinc-800'}`}>
                            <p className={`mt-2 text-lg font-bold ${isToday ? 'text-text-title' : 'text-text-body'}`}>
                                {dayNumber > 0 && dayNumber < (getDaysInMonth(currentDate) + 1) && dayNumber}
                            </p>
                            <div className="w-4/5">
                                {dayEvents.map(event => (
                                    <p key={event}><CalendarEvent event={event} /></p>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}