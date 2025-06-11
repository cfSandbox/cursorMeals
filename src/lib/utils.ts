export function getCurrentWeekDates(): { start: Date; end: Date; dates: Date[] } {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday
  
  const monday = new Date(today.setDate(diff));
  const dates: Date[] = [];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  
  const friday = dates[4];
  
  return {
    start: monday,
    end: friday,
    dates
  };
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long'
  });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function normalizeDateToMonday(date: Date | string): Date {
  const targetDate = typeof date === 'string' ? new Date(date) : new Date(date);
  const dayOfWeek = targetDate.getDay();
  const diff = targetDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday
  
  const monday = new Date(targetDate);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0); // Reset time to start of day
  
  return monday;
} 