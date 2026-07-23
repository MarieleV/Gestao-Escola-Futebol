// src/utils/formatters.ts

/** Formata uma data de "YYYY-MM-DD" para "DD/MM/YYYY" */
export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

/** Retorna as iniciais do nome (ex: "Gabriel Silva" -> "GS") */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}