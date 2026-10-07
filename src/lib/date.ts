import { config } from './config';

/**
 * Formats an ISO 8601 UTC date string to the brand standard format:
 * "7 Oct 2026"
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  // Format as day Month Year, e.g. "7 Oct 2026"
  const day = date.getUTCDate();
  const month = date.toLocaleDateString(config.locale, {
    month: 'short',
    timeZone: 'UTC',
  });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Formats an ISO 8601 date to a relative string ("Today", "Yesterday", "3 days ago")
 * Brand guideline: "relative dates ('3 days ago') always have the absolute date available on hover."
 */
export function formatRelativeDate(
  isoString: string,
  nowUtc: Date = new Date()
): {
  relativeText: string;
  absoluteText: string;
} {
  const date = new Date(isoString);
  const absoluteText = formatDate(isoString);

  if (isNaN(date.getTime())) {
    return { relativeText: 'Invalid date', absoluteText };
  }

  const diffMs = nowUtc.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { relativeText: 'Today', absoluteText };
  }
  if (diffDays === 1) {
    return { relativeText: 'Yesterday', absoluteText };
  }
  if (diffDays > 1 && diffDays < 30) {
    return { relativeText: `${diffDays} days ago`, absoluteText };
  }

  return { relativeText: absoluteText, absoluteText };
}
