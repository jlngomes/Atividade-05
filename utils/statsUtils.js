function calculateWorkoutStats(workouts) {
    try {
        const stats = {
            totalWorkouts: 0,
            completedExercises: 0,
            mostPopularExercise: '',
            exerciseCounts: {},
            weeklyProgress: Array(7).fill(0),
            streakDays: 0
        };

        const exerciseCounts = {};
        let currentStreak = 0;
        let lastWorkoutDate = null;

        Object.entries(workouts).forEach(([date, exercises]) => {
            if (exercises.length > 0) {
                stats.totalWorkouts++;
                
                // Count completed exercises
                const completed = exercises.filter(ex => ex.completed).length;
                stats.completedExercises += completed;

                // Track exercise popularity
                exercises.forEach(ex => {
                    exerciseCounts[ex.name] = (exerciseCounts[ex.name] || 0) + 1;
                });

                // Calculate streak
                const currentDate = new Date(date);
                if (lastWorkoutDate) {
                    const dayDiff = Math.floor((currentDate - lastWorkoutDate) / (1000 * 60 * 60 * 24));
                    if (dayDiff === 1) {
                        currentStreak++;
                    } else if (dayDiff > 1) {
                        currentStreak = 1;
                    }
                } else {
                    currentStreak = 1;
                }
                lastWorkoutDate = currentDate;

                // Update weekly progress
                const dayOfWeek = new Date(date).getDay();
                stats.weeklyProgress[dayOfWeek]++;
            }
        });

        stats.streakDays = currentStreak;
        stats.mostPopularExercise = Object.entries(exerciseCounts)
            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

        return stats;
    } catch (error) {
        console.error('Error calculating stats:', error);
        reportError(error);
        return null;
    }
}

function generateWorkoutPlan(userLevel = 'beginner') {
    try {
        const plans = {
            beginner: [
                { day: 'Monday', focus: 'Full Body', exercises: ['Push-ups', 'Squats', 'Plank'] },
                { day: 'Wednesday', focus: 'Cardio', exercises: ['Jumping Jacks', 'Mountain Climbers'] },
                { day: 'Friday', focus: 'Full Body', exercises: ['Pull-ups', 'Lunges', 'Crunches'] }
            ],
            intermediate: [
                { day: 'Monday', focus: 'Upper Body', exercises: ['Push-ups', 'Pull-ups', 'Dips'] },
                { day: 'Tuesday', focus: 'Lower Body', exercises: ['Squats', 'Lunges', 'Calf Raises'] },
                { day: 'Thursday', focus: 'Core', exercises: ['Plank', 'Crunches', 'Russian Twists'] },
                { day: 'Friday', focus: 'Full Body', exercises: ['Burpees', 'Mountain Climbers', 'Jump Rope'] }
            ],
            advanced: [
                { day: 'Monday', focus: 'Push', exercises: ['Bench Press', 'Shoulder Press', 'Tricep Dips'] },
                { day: 'Tuesday', focus: 'Pull', exercises: ['Pull-ups', 'Rows', 'Face Pulls'] },
                { day: 'Wednesday', focus: 'Legs', exercises: ['Squats', 'Deadlifts', 'Lunges'] },
                { day: 'Thursday', focus: 'Upper Body', exercises: ['Push-ups', 'Pull-ups', 'Lateral Raises'] },
                { day: 'Friday', focus: 'Lower Body', exercises: ['Front Squats', 'Romanian Deadlifts', 'Calf Raises'] }
            ]
        };

        return plans[userLevel] || plans.beginner;
    } catch (error) {
        console.error('Error generating workout plan:', error);
        reportError(error);
        return [];
    }
}
