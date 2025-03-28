function Sidebar({ activeView, onViewChange }) {
    try {
        const menuItems = [
            { id: 'calendar', icon: 'fa-calendar-alt', label: 'Calendar' },
            { id: 'exercises', icon: 'fa-dumbbell', label: 'Exercises' },
            { id: 'plans', icon: 'fa-clipboard-list', label: 'Workout Plans' },
            { id: 'stats', icon: 'fa-chart-line', label: 'Progress Stats' }
        ];

        return (
            <div data-name="sidebar" className="bg-gray-800 text-white w-64 min-h-screen p-4">
                <div data-name="sidebar-header" className="mb-8">
                    <h2 className="text-xl font-bold">
                        <i className="fas fa-fire-alt mr-2"></i>
                        Workout Pro
                    </h2>
                </div>
                <nav data-name="sidebar-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            data-name={`nav-${item.id}`}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full text-left p-3 mb-2 rounded transition-colors ${
                                activeView === item.id
                                    ? 'bg-blue-600'
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            <i className={`fas ${item.icon} mr-3`}></i>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return null;
    }
}
