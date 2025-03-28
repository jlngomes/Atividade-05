function saveWorkouts(workouts) {
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

function getWorkouts() {
    const workouts = localStorage.getItem('workouts');
    return workouts ? JSON.parse(workouts) : {};
}

function saveExercises(exercises) {
    localStorage.setItem('exercises', JSON.stringify(exercises));
}

function getExercises() {
    const exercises = localStorage.getItem('exercises');
    return exercises ? JSON.parse(exercises) : defaultExercises;
}

const defaultExercises = [
    { id: 1, name: 'Push-ups', category: 'Chest' },
    { id: 2, name: 'Pull-ups', category: 'Back' },
    { id: 3, name: 'Squats', category: 'Legs' },
    { id: 4, name: 'Bench Press', category: 'Chest' },
    { id: 5, name: 'Deadlift', category: 'Back' },
    { id: 6, name: 'Shoulder Press', category: 'Shoulders' }
];
