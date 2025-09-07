import { useState } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    function prevMonth() {
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(prev);
    }

    function nextMonth() {
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(next);
    }

    
    return (
        <div className="text-white w-4/5">
            <div id="calendarControls" className="text-4xl flex justify-between">
                <button onClick={prevMonth} className="cursor-pointer">&lt;</button>
                <p>{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                <button onClick={nextMonth} className="cursor-pointer">&gt;</button>
            </div>
            <div id="calendarBody" className="grid grid-cols-7 mt-5 text-center">
                {days.map(day => (
                    <p className="text-xl mb-2">{day}</p>
                ))}
                {[...Array(40)].map((_, i) => (
                    <p key={i} className="p-10">{i}</p>
                ))}
            </div>
        </div>
    )
}