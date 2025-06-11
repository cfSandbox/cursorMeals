export interface Meal {
  id: string;
  vendorName: string;
  description: string;
  type: 'breakfast' | 'lunch';
  day: string;
  price?: number;
}

export interface DaySchedule {
  date: string;
  dayName: string;
  isToday: boolean;
  breakfast: Meal;
  lunch: Meal;
}

export interface WeekSchedule {
  weekStart: string;
  weekEnd: string;
  days: DaySchedule[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
} 