import { format, parseISO } from 'date-fns';

export const formatDateTime = (dateStr: string): string => {
    const date = parseISO(dateStr);
    return format(date, 'MMM dd, yyyy HH:mm');
}

export const formatDateTimeObj = (date: Date): string => {
    return format(date, 'MMM dd, yyyy HH:mm');
}

export const convertDateStrToObj = ( dateStr: string) : Date => {
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(5,7), 10) - 1;
    const day = parseInt(dateStr.substring(8,10), 10);
    
    return new Date( year, month, day );
}

export const getCurrentWeekDates = (): { startDate: Date, endDate: Date } => {
    const currentDate = new Date();

    // Get the current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    const currentDayOfWeek = currentDate.getDay();

    // Define the difference to get the start and end of the week
    const diffToStartOfWeek = currentDayOfWeek; // If week starts on Sunday
    const diffToEndOfWeek = 6 - currentDayOfWeek; // If week ends on Saturday

    // Calculate the start of the week
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - diffToStartOfWeek);
    startDate.setHours(0, 0, 0, 0); // Optional: set time to start of the day

    // Calculate the end of the week
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + diffToEndOfWeek);
    endDate.setHours(23, 59, 59, 999); // Optional: set time to end of the day

    return { startDate, endDate };
}

export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
    // Convert both dates to milliseconds
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // Calculate the difference in milliseconds
    const difference = end - start;

    // Convert milliseconds to days
    const days = difference / (1000 * 60 * 60 * 24);

    return Math.floor(days);
}