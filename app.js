function App() {
    try {
        const [selectedDate, setSelectedDate] = React.useState(new Date());
        const [workouts, setWorkouts] = React.useState(getWorkouts());
        const [activeView, setActiveView] = React.useState('calendar');

        React.useEffect(() => {
            setWorkouts(getWorkouts());
        }, []);

        const handleDateSelect = (date) => {
            setSelectedDate(date);
        };

        const handleAddExercise = (exercise) => {
            const dateStr = formatDate(selectedDate);
            const updatedWorkouts = {
                ...workouts,
                [dateStr]: [
                    ...(workouts[dateStr] || []),
                    { ...exercise, id: Date.now(), completed: false }
                ]
            };
            setWorkouts(updatedWorkouts);
            saveWorkouts(updatedWorkouts);
        };

        const handleToggleComplete = (exerciseId) => {
            const dateStr = formatDate(selectedDate);
            const updatedWorkouts = {
                ...workouts,
                [dateStr]: workouts[dateStr].map(ex =>
                    ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
                )
            };
            setWorkouts(updatedWorkouts);
            saveWorkouts(updatedWorkouts);
        };

        const handleRemoveExercise = (exerciseId) => {
            const dateStr = formatDate(selectedDate);
            const updatedWorkouts = {
                ...workouts,
                [dateStr]: workouts[dateStr].filter(ex => ex.id !== exerciseId)
            };
            setWorkouts(updatedWorkouts);
            saveWorkouts(updatedWorkouts);
        };

        const renderActiveView = () => {
            switch (activeView) {
                case 'calendar':
                    return (
                        <div data-name="calendar-view">
                            <Calendar
                                selectedDate={selectedDate}
                                workouts={workouts}
                                onDateSelect={handleDateSelect}
                            />
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">
                                    Workouts for {selectedDate.toLocaleDateString()}
                                </h2>
                                <ExerciseList
                                    date={selectedDate}
                                    exercises={workouts[formatDate(selectedDate)] || []}
                                    onToggleComplete={handleToggleComplete}
                                    onRemoveExercise={handleRemoveExercise}
                                />
                            </div>
                            <ExerciseSelector onAddExercise={handleAddExercise} />
                        </div>
                    );
                case 'exercises':
                    return <ExerciseSelector onAddExercise={handleAddExercise} />;
                case 'plans':
                    return <WorkoutPlans onAddExercise={handleAddExercise} />;
                case 'stats':
                    return <ProgressStats workouts={workouts} />;
                default:
                    return null;
            }
        };

        return (
            <div data-name="app-container" className="flex min-h-screen">
                <Sidebar activeView={activeView} onViewChange={setActiveView} />
                <div data-name="main-content" className="flex-1 p-8">
                    <Header />
                    {renderActiveView()}
                </div>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
