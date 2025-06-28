/**
 * A lightweight set of date formatting utilities to replace date-fns
 */

/**
 * Group messages by date for display in chat
 */
export function groupMessagesByDate<T extends { timestamp: Date | string | number }>(messages: T[]) {
  const groups: { [key: string]: T[] } = {}

  messages.forEach(message => {
    const dateObj = message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp)
    const date = formatDateKey(dateObj)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
  })

  return groups
}
/**
 * Format date as YYYY-MM-DD for use as a key
 */
function formatDateKey(date: Date): string {
  try {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    console.error("Invalid date object:", date,error)
    return "invalid-date"
  }
}


/**
 * Format a date in a readable format like "Today", "Yesterday" or "Jun 28, 2025"
 */
export function formatDate(date: Date): string {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(date, today)) {
    return 'Today';
  } else if (isSameDay(date, yesterday)) {
    return 'Yesterday';
  } else {
    return formatToMonthDayYear(date);
  }
}

/**
 * Format a date to "Month Day, Year" format
 */
export function formatToMonthDayYear(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

/**
 * Format time to hours and minutes with AM/PM
 */
export function formatTime(date: Date | string | number): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date:", date);
    return 'invalid time';
  }

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24h to 12h format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes with leading zero
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

/**
 * Format a date to include both time and relative day if needed
 */
export function formatDateTime(date: Date | string | number): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    console.error("Invalid date:", date);
    return 'invalid date';
  }

  const timeStr = formatTime(dateObj);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (isSameDay(dateObj, today)) {
    return timeStr;
  } else if (isSameDay(dateObj, yesterday)) {
    return `Yesterday ${timeStr}`;
  } else {
    return `${formatToMonthDayYear(dateObj)} ${timeStr}`;
  }
}

/**
 * Check if two dates are the same day
 */
function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

/**
 * Format a date in a "time ago" format (e.g., "2 minutes ago", "1 hour ago", etc.)
 */
export function formatDistanceToNow(date: Date | string | number): string {
    try {
        const dateObj = date instanceof Date ? date : new Date(date);
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            console.error("Invalid date:", date);
            return 'invalid date';
        }

        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'just now';
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
        }

        const diffInYears = Math.floor(diffInDays / 365);
        return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    } catch (error) {
        console.error("Error calculating time distance:", error);
        return 'unknown';
    }
}
