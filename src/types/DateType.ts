const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();


export const DateDefaultValue:DateType = {
    year: currentYear,
    month: currentMonth
}


export type DateType = {
    year: number,
    month: number
}