import { Meal, DaySchedule, WeekSchedule } from '@/types';
import { getCurrentWeekDates, formatDate, getDayName, isToday } from './utils';

const vendors = [
  'Fresh & Healthy',
  'Downtown Deli',
  'Mediterranean Corner',
  'Asian Fusion Kitchen',
  'Green Garden Cafe',
  'Italian Bistro',
  'BBQ Masters',
  'Vegan Delights',
  'Local Farm Kitchen'
];

const breakfastOptions = [
  'Avocado Toast with Poached Egg',
  'Greek Yogurt Parfait with Berries',
  'Breakfast Burrito with Scrambled Eggs',
  'Oatmeal with Fresh Fruits and Nuts',
  'Smoked Salmon Bagel',
  'Pancakes with Maple Syrup',
  'Acai Bowl with Granola',
  'Croissant with Ham and Cheese',
  'Quinoa Breakfast Bowl'
];

const lunchOptions = [
  'Grilled Chicken Caesar Salad',
  'Mediterranean Wrap with Hummus',
  'Beef and Vegetable Stir Fry',
  'Margherita Pizza Slice',
  'Thai Green Curry with Rice',
  'Turkey Club Sandwich',
  'Quinoa Buddha Bowl',
  'Fish Tacos with Avocado',
  'Mushroom Risotto',
  'BBQ Pulled Pork Sandwich',
  'Vegetarian Pasta Primavera',
  'Chicken Teriyaki Bowl'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateMeal(type: 'breakfast' | 'lunch', day: string): Meal {
  const options = type === 'breakfast' ? breakfastOptions : lunchOptions;
  
  return {
    id: `${day}-${type}-${Math.random().toString(36).substr(2, 9)}`,
    vendorName: getRandomItem(vendors),
    description: getRandomItem(options),
    type,
    day,
    price: type === 'breakfast' ? 
      Math.floor(Math.random() * 8) + 7 : // $7-14 for breakfast
      Math.floor(Math.random() * 12) + 10  // $10-21 for lunch
  };
}

function getWeekDatesFromMonday(mondayDate: Date): { start: Date; end: Date; dates: Date[] } {
  const monday = new Date(mondayDate);
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

export function generateWeeklyMockData(mondayDate?: Date): WeekSchedule {
  const weekData = mondayDate ? 
    getWeekDatesFromMonday(mondayDate) : 
    getCurrentWeekDates();
  
  const { start, end, dates } = weekData;
  
  const days: DaySchedule[] = dates.map(date => {
    const dayName = getDayName(date);
    const dateStr = formatDate(date);
    
    return {
      date: dateStr,
      dayName,
      isToday: isToday(date),
      breakfast: generateMeal('breakfast', dayName),
      lunch: generateMeal('lunch', dayName)
    };
  });
  
  return {
    weekStart: formatDate(start),
    weekEnd: formatDate(end),
    days
  };
} 