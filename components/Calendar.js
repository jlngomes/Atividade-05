function Calendar({ selectedDate, workouts, onDateSelect }) {
    try {
        const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
        const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();

        const handlePrevMonth = () => {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        };

        const handleNextMonth = () => {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        };

        const renderDays = () => {
            const days = [];
            const totalDays = daysInMonth + firstDay;
            const rows = Math.ceil(totalDays / 7);

            for (let i = 0; i < rows * 7; i++) {
                const dayNumber = i - firstDay + 1;
                const date = new Date(currentYear, currentMonth, dayNumber);
                const dateString = formatDate(date);
                const hasWorkout = workouts[dateString]?.length > 0;
                const isSelected = dateString === formatDate(selectedDate);

                if (dayNumber > 0 && dayNumber <= daysInMonth) {
                    days.push(
                        <div
                            key={i}
                            data-name={`calendar-day-${dayNumber}`}
                            onClick={() => onDateSelect(date)}
                            className={`calendar-day p-2 border cursor-pointer ${
                                hasWorkout ? 'has-workout' : ''
                            } ${isSelected ? 'selected' : ''}`}
                        >
                            <span className="font-bold">{dayNumber}</span>
                            {hasWorkout && (
                                <div className="text-xs text-blue-600">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                            )}
                        </div>
                    );
                } else {
                    days.push(<div key={i} className="calendar-day p-2 border bg-gray-100"></div>);
                }
            }
            return days;
        };

        return (
            <div data-name="calendar" className="calendar-container my-8">
                <div data-name="calendar-header" className="flex justify-between items-center mb-4">
                    <button
                        data-name="prev-month"
                        onClick={handlePrevMonth}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <h2 className="text-xl font-bold">
                        {getMonthName(currentMonth)} {currentYear}
                    </h2>
                    <button
                        data-name="next-month"
                        onClick={handleNextMonth}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div data-name="calendar-grid" className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-bold p-2">
                            {day}
                        </div>
                    ))}
                    {renderDays()}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Calendar component error:', error);
        reportError(error);
        return null;
    }
}
