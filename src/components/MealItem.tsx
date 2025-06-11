import { Meal } from '@/types';

interface MealItemProps {
  meal: Meal;
  mealType: 'breakfast' | 'lunch';
}

export function MealItem({ meal, mealType }: MealItemProps) {
  const getMealIcon = (type: 'breakfast' | 'lunch') => {
    return type === 'breakfast' ? '🍳' : '🍽️';
  };

  return (
    <div className="meal-item">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getMealIcon(mealType)}</span>
            <h4 className="font-semibold text-gray-900 capitalize">
              {mealType}
            </h4>
          </div>
          
          <div className="space-y-1">
            <p className="font-medium text-primary-600">
              {meal.vendorName}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {meal.description}
            </p>
          </div>
        </div>
        
        {meal.price && (
          <div className="ml-4 flex-shrink-0">
            <span className="text-lg font-bold text-green-600">
              ${meal.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 