function ExerciseSelector({ onAddExercise }) {
    try {
        const [exercises, setExercises] = React.useState(getExercises());
        const [newExercise, setNewExercise] = React.useState({ name: '', category: '' });
        const [showForm, setShowForm] = React.useState(false);

        const handleAddCustomExercise = (e) => {
            e.preventDefault();
            if (newExercise.name && newExercise.category) {
                const exercise = {
                    id: Date.now(),
                    ...newExercise
                };
                const updatedExercises = [...exercises, exercise];
                setExercises(updatedExercises);
                saveExercises(updatedExercises);
                setNewExercise({ name: '', category: '' });
                setShowForm(false);
            }
        };

        return (
            <div data-name="exercise-selector" className="mb-8">
                <div data-name="exercise-selector-header" className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Available Exercises</h2>
                    <button
                        data-name="toggle-form"
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add Custom Exercise
                    </button>
                </div>

                {showForm && (
                    <form data-name="add-exercise-form" onSubmit={handleAddCustomExercise} className="mb-4 p-4 bg-gray-100 rounded">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Exercise Name"
                                value={newExercise.name}
                                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                                className="p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={newExercise.category}
                                onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                                className="p-2 border rounded"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save Exercise
                        </button>
                    </form>
                )}

                <div data-name="exercise-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            data-name={`exercise-item-${exercise.id}`}
                            className="exercise-item p-4 border rounded hover:shadow-lg cursor-pointer"
                            onClick={() => onAddExercise(exercise)}
                        >
                            <h3 className="font-bold">{exercise.name}</h3>
                            <p className="text-sm text-gray-600">{exercise.category}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ExerciseSelector component error:', error);
        reportError(error);
        return null;
    }
}
