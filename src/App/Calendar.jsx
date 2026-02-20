import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getDueDates } from "./getRemainingDays";   

export default function Calendar({ on, setSelectedDate, taskslist, selectedDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1).getDay();
    const cells = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < firstDayofMonth; i++) {
        cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(day);
    }

    const today = new Date();

    return (
        <>
            <div className={`calendar-container ${on ? 'dark' : 'light'}`}>
                <h2 className={`calendar-heading ${on ? 'dark' : 'light'}`}>
                    <FaChevronLeft className="previous" onClick={() => setCurrentDate(new Date(year, month - 1, 1))} />
                    {currentDate.toLocaleString('default', { month: 'long' })} {year}
                    <FaChevronRight className="next" onClick={() => setCurrentDate(new Date(year, month + 1, 1))} /></h2>
                <div className="calendar-grid">

                    {weekdays.map((day) => (
                        <div key={day}>
                            {day}
                        </div>
                    ))}
                    {cells.map((day, index) => {
                        if (!day) return <div key={index} className="empty" />
                        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isToday =
                            day === today.getDate() &&
                            month === today.getMonth() &&
                            year === today.getFullYear();

                        const tasksForDate = taskslist.find(task => task.dueDate === fullDate)

                        return <div key={index} className={`date ${isToday ? 'today' : ''} ${on ? 'dark' : 'light'}
                       due-Date ${tasksForDate ? getDueDates(tasksForDate.dueDate) : ''} selected-date ${selectedDate === fullDate ? 'selected' : ''}`}
                            onClick={() => setSelectedDate(prev =>
                                prev === fullDate ? null : fullDate)}>
                            {day}
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}