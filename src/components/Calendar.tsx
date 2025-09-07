import { useState } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    function getStartDay(currentDate: Date) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    }

    function getDaysInMonth(currentDate: Date) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    }
    
    function prevMonth() {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(prev);
    }

    function today() {
        const today = new Date();
        setCurrentDate(today);
    }

    function nextMonth() {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(next);
    }

    
    return (
        <div className="text-text-body w-4/5">
            <div id="calendarControls" className="text-4xl flex justify-between">
                <div className="flex align-middle">
                    <button onClick={prevMonth} className="cursor-pointer">&lt;</button>
                    <button onClick={today} className="cursor-pointer text-xl ml-2 hover:border-text-body border-transparent border-b-2 transition duration-300">Today</button>
                </div>
                <p>{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                <button onClick={nextMonth} className="cursor-pointer">&gt;</button>
            </div>
            <div id="calendarBody" className="grid grid-cols-7 mt-5 text-center">
                {days.map(day => (
                    <p className="text-xl mb-2">{day}</p>
                ))}
                {[...Array(getDaysInMonth(currentDate) + getStartDay(currentDate))].map((_, i) => {
                    let dayNumber = i - getStartDay(currentDate);
                    return dayNumber >= 0 ? (
                        <p key={i} className="p-10">{dayNumber + 1}</p>
                    ) : (
                        <p key={i} className="p-10 text-gray-500 "></p>
                    )
                })}
            </div>
        </div>
    )
}