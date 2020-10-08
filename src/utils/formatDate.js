import { isToday, isThisMonth, isThisYear, format as formatDate } from 'date-fns';

export default function fmt(d) {
    let format = '';
    if (isToday(d)) {
        format = 'HH:mm';
    } else if (isThisMonth(d)) {
        format = 'd MMM HH:mm';
    } else if (isThisYear(d)) {
        format = 'd MMM';
    } else {
        format = 'd MMM yyyy';
    }
    return formatDate(d, format);
};
