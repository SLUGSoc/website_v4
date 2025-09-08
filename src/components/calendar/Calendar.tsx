import { useState } from "react";
import CalendarEvent from "./CalendarEvent.tsx";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Calendar({ events } : { events: [] }) {
    const today = new Date()
    const [currentDate, setCurrentDate] = useState(new Date());

    // Gets which day of the week is the start of a given month
    function getStartDay(currentDate: Date) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    }

    // Gets number of days in a given month
    function getDaysInMonth(currentDate: Date) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    }
    
    // Sets the 'currentDate' backwards 1 month
    function prevMonth() {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
    }

    // Sets the 'currentDate' to today
    function setToday() {
        setCurrentDate(new Date());
    }

    // Sets the 'currentDate' forwards 1 month
    function nextMonth() {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
    }

    // Returns a Date set to the start of a day (00:00:00) 
    function startOfDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    // Returns a Date set to the end of a new day (23:59:59) 
    function endOfDay(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
    }

    // Compares dates (better than plain === as doesn't care about hours/minutes/seconds)
    function datesAreEqual(a: Date, b: Date): boolean {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

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

                    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);                        

                    const dayEvents = events.map(event => {
                        const eventStart = new Date(event["startDate"]); 
                        const eventEnd = new Date(event["endDate"]);

                        if (datesAreEqual(day, startOfDay(eventStart)) && datesAreEqual(day, startOfDay(eventEnd))) {
                            return { event, position: 'single'}
                        } else if (datesAreEqual(day, startOfDay(eventStart))) {
                            return { event, position: 'start' };
                        } else if (datesAreEqual(day, startOfDay(eventEnd))) {
                            return { event, position: 'end' };
                        } else if (day >= startOfDay(eventStart) && day <= endOfDay(eventEnd)) {
                            return { event, position: 'middle' };
                        }

                        return null;
                        }).filter(Boolean);

                    return (
                        <div key={i} className={`flex flex-col items-center h-[150px] pb-15 rounded-2xl ${dayNumber > 0  && dayNumber < (getDaysInMonth(currentDate) + 1) ? 'border-bg-offset bg-bg-offset ' : 'border-zinc-800 bg-zinc-800'}`}>
                            <p className={`mt-2 text-lg font-bold ${isToday ? 'text-text-title' : 'text-text-body'}`}>
                                {dayNumber > 0 && dayNumber < (getDaysInMonth(currentDate) + 1) && dayNumber}
                            </p>
                            <div className="flex flex-col items-center w-full">
                                {dayNumber > 0 && dayNumber < (getDaysInMonth(currentDate) + 1) &&
                                    dayEvents.map(({ event, position }) => (
                                    <CalendarEvent key={event} event={event} position={position} />
                                    )
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}