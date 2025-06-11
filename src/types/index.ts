export interface Meal {
  id: string;
  vendorName: string;
  description: string;
}

export interface DaySchedule {
  date: string;
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