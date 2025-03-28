function WorkoutPlans({ onAddExercise }) {
    try {
        const [selectedLevel, setSelectedLevel] = React.useState('beginner');
        const workoutPlan = generateWorkoutPlan(selectedLevel);

        return (
            <div data-name="workout-plans" className="p-6 bg-white rounded-lg shadow-lg fade-in">
                <div data-name="plans-header" className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">Workout Plans</h2>
                    <div className="flex space-x-4">
                        {['beginner', 'intermediate', 'advanced'].map(level => (
                            <button
                                key={level}
                                data-name={`level-${level}`}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-full ${
                                    selectedLevel === level
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div data-name="plan-schedule" className="grid gap-6">
                    {workoutPlan.map((day, index) => (
                        <div
                            key={index}
                            data-name={`workout-day-${index}`}
                            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-lg font-bold mb-2">{day.day} - {day.focus}</h3>
                            <ul className="space-y-2">
                                {day.exercises.map((exercise, i) => (
                                    <li
                                        key={i}
                                        data-name={`exercise-${i}`}
                                        className="flex items-center justify-between"
                                    >
                                        <span>{exercise}</span>
                                        <button
                                            onClick={() => onAddExercise({ 
                                                id: Date.now(), 
                                                name: exercise, 
                                                category: day.focus 
                                            })}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <i className="fas fa-plus-circle"></i>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('WorkoutPlans component error:', error);
        reportError(error);
        return null;
    }
}
