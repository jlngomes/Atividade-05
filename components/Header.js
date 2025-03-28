function Header() {
    try {
        return (
            <header data-name="header" className="bg-blue-600 text-white p-4 shadow-lg">
                <div data-name="header-content" className="container mx-auto flex justify-between items-center">
                    <h1 data-name="app-title" className="text-2xl font-bold">
                        <i className="fas fa-dumbbell mr-2"></i>
                        Workout Tracker
                    </h1>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
