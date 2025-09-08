import { useState } from "react";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function Calendar() {
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

    
    return (
        <div className="text-text-body w-4/5">
            <div id="calendarControls" className="text-4xl flex justify-between">
                <div className="flex align-middle">
                    <button onClick={prevMonth} className="cursor-pointer">&lt;</button>
                    <button onClick={setToday} className="cursor-pointer text-xl ml-2 hover:border-text-body border-transparent border-b-2 transition duration-300">Today</button>
                </div>
                <p>{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                <button onClick={nextMonth} className="cursor-pointer">&gt;</button>
            </div>
            <div id="calendarBody" className="grid h-full grid-cols-7 mt-5 text-center">
                {days.map(day => (
                    <p key={day} className="text-xl mb-2">{day}</p>
                ))}
                {[...Array(getDaysInMonth(currentDate) + getStartDay(currentDate))].map((_, i) => {
                    let dayNumber = i - getStartDay(currentDate) + 1;

                    const isToday =
                        currentDate.getMonth() === today.getMonth() &&
                        currentDate.getFullYear() === today.getFullYear() &&
                        dayNumber === today.getDate();

                    return dayNumber > 0 ? (
                        <div key={i} className={`pb-15 ${isToday ? 'text-text-title' : 'text-text-body'}`}>
                            {dayNumber}
                        </div>
                    ) : (
                        <div key={i} className="pb-15"></div>
                    )
                })}
            </div>
        </div>
    )
}