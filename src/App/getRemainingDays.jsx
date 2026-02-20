export function getRemainingDays(dueDate) {

    if(!dueDate)
    return null;

    const today = new Date();
    today.setHours(0,0,0,0);
    const [year, month, day] = dueDate.split('-').map(Number);
    const dueDates = new Date(year, month - 1, day);
    dueDates.setHours(0,0,0,0);
    const difference = dueDates - today;
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
    }

    export function getDueDates(dueDate){
        const days = getRemainingDays(dueDate);

        if (days === null) return null;
        if (days < 0) return 'due-Overdue';
        if (days === 0) return "due-today";
        if (days >= 1) return 'due-Upcoming';
        return '';
    }