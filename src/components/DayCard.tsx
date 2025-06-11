import { DaySchedule } from '@/types';
import { MealItem } from './MealItem';
import { formatDateDisplay, cn } from '@/lib/utils';

interface DayCardProps {
  day: DaySchedule;
}

export function DayCard({ day }: DayCardProps) {
  return (
    <div className={cn(
      'day-card p-6',
      day.isToday ? 'current-day' : ''
    )}>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {day.dayName}
          </h2>
          {day.isToday && (
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Today
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {formatDateDisplay(new Date(day.date))}
        </p>
      </div>
      
      <div className="space-y-4">
        <MealItem meal={day.breakfast} mealType="breakfast" />
        <MealItem meal={day.lunch} mealType="lunch" />
      </div>
    </div>
  );
} 