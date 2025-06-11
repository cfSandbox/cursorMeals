import { WeeklySchedule } from '@/components/WeeklySchedule';
import { getCurrentWeekDates } from '@/lib/utils';

interface DashboardPageProps {
  searchParams: {
    week?: string;
  };
}

export default function Dashboard({ searchParams }: DashboardPageProps) {
  // If week parameter is provided, use it; otherwise use current week
  let weekStartDate: Date;
  let displayDate: string;
  
  if (searchParams.week) {
    // Parse the provided week parameter (expected format: YYYY-MM-DD)
    weekStartDate = new Date(searchParams.week);
    // Validate the date
    if (isNaN(weekStartDate.getTime())) {
      // If invalid date, fall back to current week
      const { start } = getCurrentWeekDates();
      weekStartDate = start;
    }
  } else {
    // Use current week
    const { start } = getCurrentWeekDates();
    weekStartDate = start;
  }

  displayDate = weekStartDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-8">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
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