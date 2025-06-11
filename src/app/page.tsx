import { WeeklySchedule } from '@/components/WeeklySchedule';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          This Week&apos;s Meal Schedule
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