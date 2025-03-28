function ExerciseList({ date, exercises, onToggleComplete, onRemoveExercise }) {
    try {
        if (!exercises || exercises.length === 0) {
            return (
                <div data-name="empty-exercise-list" className="text-center p-8 bg-gray-50 rounded">
                    <i className="fas fa-dumbbell text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">No exercises scheduled for this day</p>
                </div>
            );
        }

        return (
            <div data-name="exercise-list" className="space-y-4">
                {exercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        data-name={`exercise-item-${exercise.id}`}
                        className={`p-4 border rounded flex justify-between items-center ${
                            exercise.completed ? 'bg-green-50' : 'bg-white'
                        }`}
                    >
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={exercise.completed}
                                onChange={() => onToggleComplete(exercise.id)}
                                className="mr-4 h-5 w-5"
                            />
                            <div>
                                <h3 className={`font-bold ${exercise.completed ? 'line-through' : ''}`}>
                                    {exercise.name}
                                </h3>
                                <p className="text-sm text-gray-600">{exercise.category}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onRemoveExercise(exercise.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('ExerciseList component error:', error);
        reportError(error);
        return null;
    }
}
