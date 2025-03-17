
import { formatDistanceToNow } from 'date-fns';

/**
 * Formats a date to show how long ago it was created
 * @param date The date to format
 * @returns Formatted string like "5m ago" or "2h ago"
 */
export const formatTimeAgo = (date: Date): string => {
  const distance = formatDistanceToNow(date, { addSuffix: false });
  
  // Convert the default output to a shorter format
  if (distance.includes('less than a minute')) return 'now';
  if (distance.includes('minute')) return distance.replace('minute', 'm').replace('minutes', 'm');
  if (distance.includes('hour')) return distance.replace('hour', 'h').replace('hours', 'h');
  if (distance.includes('day')) return distance.replace('day', 'd').replace('days', 'd');
  if (distance.includes('month')) return distance.replace('month', 'mo').replace('months', 'mo');
  if (distance.includes('year')) return distance.replace('year', 'y').replace('years', 'y');
  
  // Default fallback
  return `${distance} ago`;
};

/**
 * Retrieves random motivational messages for task notifications
 */
export const getRandomMessage = (): string => {
  const messages = [
    "This task needs your priority!",
    "Please handle this task on priority!",
    "Focus on this important task!",
    "Don't forget about this task!",
    "Remember to complete this task soon!",
    "This task is waiting for your attention!",
    "Add this to your priority list!",
    "Make sure to get this done soon!",
    "Your future self will thank you for doing this!",
    "Every completed task is a step forward!"
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};
