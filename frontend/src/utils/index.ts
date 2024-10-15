export function formatDate(date: string): string { // Converte a data de yyyy-mm-dd para dd/mm/yyyy
    return date.split('-').reverse().join('/')
    }