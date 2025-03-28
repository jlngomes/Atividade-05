function ProgressStats({ workouts }) {
    try {
        const stats = calculateWorkoutStats(workouts);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        return (
            <div data-name="progress-stats" className="p-6 bg-white rounded-lg shadow-lg fade-in">
                <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
                <div data-name="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div data-name="stat-card-workouts" className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-blue-600 text-4xl mb-2">
                            <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
                        <div className="text-gray-600">Total Workouts</div>
                    </div>
                    <div data-name="stat-card-exercises" className="p-4 bg-green-50 rounded-lg">
                        <div className="text-green-600 text-4xl mb-2">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="text-2xl font-bold">{stats.completedExercises}</div>
                        <div className="text-gray-600">Completed Exercises</div>
                    </div>
                    <div data-name="stat-card-streak" className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-orange-600 text-4xl mb-2">
                            <i className="fas fa-fire"></i>
                        </div>
                        <div className="text-2xl font-bold">{stats.streakDays}</div>
                        <div className="text-gray-600">Day Streak</div>
                    </div>
                    <div data-name="stat-card-popular" className="p-4 bg-purple-50 rounded-lg">
                        <div className="text-purple-600 text-4xl mb-2">
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="text-lg font-bold truncate">{stats.mostPopularExercise}</div>
                        <div className="text-gray-600">Most Popular Exercise</div>
                    </div>
                </div>

                <div data-name="weekly-progress" className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {weekDays.map((day, index) => (
                            <div key={day} data-name={`day-${day}`} className="text-center">
                                <div className="text-sm text-gray-600 mb-2">{day}</div>
                                <div
                                    className="mx-auto w-8 h-24 bg-blue-100 rounded-t-lg relative"
                                    style={{
                                        backgroundImage: `linear-gradient(to top, #3B82F6 ${
                                            (stats.weeklyProgress[index] / Math.max(...stats.weeklyProgress)) * 100
                                        }%, transparent 0%)`
                                    }}
                                ></div>
                                <div className="text-sm font-bold">{stats.weeklyProgress[index]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProgressStats component error:', error);
        reportError(error);
        return null;
    }
}
