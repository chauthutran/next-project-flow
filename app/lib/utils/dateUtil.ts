import { format, parseISO } from 'date-fns';

export const formatDateTime = (dateStr: string): string => {
    const date = parseISO(dateStr);
    return format(date, 'MMM dd, yyyy HH:mm');
}