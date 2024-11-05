/**
 * Formate une date selon le format spécifié.
 * @param dateISO - La date au format ISO.
 * @param options - Options de formatage pour la date.
 * @returns La date formatée en chaîne de caractères.
 */
export function getFullDate(
  dateISO: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
): string {
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}

/**
 * Renvoie le jour de la semaine au format abrégé (e.g., "lun", "mar").
 * @param dateISO - La date au format ISO.
 * @returns Le jour de la semaine au format abrégé.
 */
export function getDay(dateISO: string): string {
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric" }).format(date);
}

/**
 * Renvoie le mois au format abrégé (e.g., "nov").
 * @param dateISO - La date au format ISO.
 * @returns Le mois au format abrégé.
 */
export function getMonth(dateISO: string): string {
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date);
}

/**
 * Renvoie l'heure au format hh:mm.
 * @param dateISO - La date au format ISO.
 * @returns L'heure formatée en chaîne de caractères.
 */
export function getTime(dateISO: string): string {
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Calcule la durée entre deux dates.
 * @param startDateISO - La date de début au format ISO.
 * @param endDateISO - La date de fin au format ISO.
 * @returns La durée formatée en jours, heures, minutes et secondes.
 */
export function getDuration(startDateISO: string, endDateISO: string): string {
  const startDate = new Date(startDateISO);
  const endDate = new Date(endDateISO);
  const durationMs = endDate.getTime() - startDate.getTime();

  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor((durationMs / (1000 * 60 * 60)) % 24);
  // const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));

  // Ajoute un zéro devant les nombres inférieurs à 10.
  const pad = (num: number) => num.toString().padStart(2, "0");
  const formattedHours = pad(hours);
  const formattedMinutes = pad(minutes);
  const formattedSeconds = pad(seconds);

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

