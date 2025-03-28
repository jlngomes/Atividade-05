function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getMonthName(month) {
    return new Date(2000, month, 1).toLocaleString('default', { month: 'long' });
}
