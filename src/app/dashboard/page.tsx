import Link from 'next/link';
import { WeeklySchedule } from '@/components/WeeklySchedule';
import { getCurrentWeekDates } from '@/lib/utils';

interface DashboardPageProps {
  searchParams: {
    week?: string;
  };
}

// Helper function to format date as YYYY-MM-DD
function formatDateForUrl(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to get Monday of a specific week offset
function getMondayOfWeek(baseDate: Date, weekOffset: number): Date {
  const targetDate = new Date(baseDate);
  targetDate.setDate(baseDate.getDate() + (weekOffset * 7));
  return targetDate;
}

// Helper function to check if two dates are the same Monday
function isSameWeek(date1: Date, date2: Date): boolean {
  return formatDateForUrl(date1) === formatDateForUrl(date2);
}

export default function Dashboard({ searchParams }: DashboardPageProps) {
  // Get current week's Monday for comparison
  const { start: currentWeekMonday } = getCurrentWeekDates();
  
  // If week parameter is provided, use it; otherwise use current week
  let weekStartDate: Date;
  let displayDate: string;
  
  if (searchParams.week) {
    // Parse the provided week parameter (expected format: YYYY-MM-DD)
    weekStartDate = new Date(searchParams.week);
    // Validate the date
    if (isNaN(weekStartDate.getTime())) {
      // If invalid date, fall back to current week
      weekStartDate = currentWeekMonday;
    }
  } else {
    // Use current week
    weekStartDate = currentWeekMonday;
  }

  displayDate = weekStartDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate navigation dates
  const previousWeekMonday = getMondayOfWeek(weekStartDate, -1);
  const nextWeekMonday = getMondayOfWeek(weekStartDate, 1);

  // Determine which navigation buttons to show
  const isCurrentWeek = isSameWeek(weekStartDate, currentWeekMonday);
  const isNextWeek = isSameWeek(weekStartDate, getMondayOfWeek(currentWeekMonday, 1));

  return (
    <div className="space-y-8">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 relative">
        {/* Navigation Buttons */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
          {isNextWeek && (
            <Link
              href={`/dashboard?week=${formatDateForUrl(previousWeekMonday)}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg"
            >
              ← Previous Week
            </Link>
          )}
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
          {isCurrentWeek && (
            <Link
              href={`/dashboard?week=${formatDateForUrl(nextWeekMonday)}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg"
            >
              Next Week →
            </Link>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Week of {displayDate}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover delicious breakfast and lunch options from our partner vendors. 
          Fresh meals delivered daily to keep your team energized and satisfied.
        </p>
      </div>
      
      <WeeklySchedule weekStartDate={weekStartDate} />
    </div>
  );
} 