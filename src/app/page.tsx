import { WeeklySchedule } from '@/components/WeeklySchedule';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          This Week's Meal Schedule
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover delicious breakfast and lunch options from our partner vendors. 
          Fresh meals delivered daily to keep your team energized and satisfied.
        </p>
      </div>
      
      <WeeklySchedule />
    </div>
  );
} 