/**
 * Date utility functions for handling Turkish date formats (DD/MM/YYYY)
 */

/**
 * Parses a Turkish date format (DD/MM/YYYY) string into a Date object
 * @param dateString - Date string in DD/MM/YYYY format
 * @returns Date object
 * @throws Error if date string is invalid
 */
export function parseTurkishDate(dateString: string): Date {
  const parts = dateString.split('/');

  if (parts.length !== 3) {
    throw new Error(`Invalid date format: ${dateString}. Expected DD/MM/YYYY`);
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error(`Invalid date values in: ${dateString}`);
  }

  // JavaScript Date months are 0-indexed (0 = January, 11 = December)
  const date = new Date(year, month - 1, day);

  // Validate that the date is valid
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    throw new Error(`Invalid date: ${dateString}`);
  }

  return date;
}

/**
 * Safely parses a Turkish date format string, returning null for invalid/null inputs
 * @param dateString - Date string in DD/MM/YYYY format or null
 * @returns Date object or null
 */
export function parseTurkishDateSafe(dateString: string | null | undefined): Date | null {
  if (!dateString) {
    return null;
  }

  try {
    return parseTurkishDate(dateString);
  } catch {
    return null;
  }
}
