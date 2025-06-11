import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { normalizeDateToMonday, formatDate } from '@/lib/utils';
import { ApiResponse, WeekSchedule, DaySchedule } from '@/types';

async function fetchWeekScheduleFromSupabase(mondayDate: Date): Promise<WeekSchedule> {
  // Generate week dates (Monday to Friday)
  const weekDates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(mondayDate);
    date.setDate(mondayDate.getDate() + i);
    weekDates.push(date);
  }

  const startDate = formatDate(weekDates[0]);
  const endDate = formatDate(weekDates[4]);

  // Query meal schedules with joined meal and vendor data
  const { data: schedules, error } = await supabase
    .from('meal_schedules')
    .select(`
      date,
      breakfast_meal:breakfast_meal_id(
        id,
        description,
        vendor:vendor_id(
          id,
          name
        )
      ),
      lunch_meal:lunch_meal_id(
        id,
        description,
        vendor:vendor_id(
          id,
          name
        )
      )
    `)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date');

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  // Transform Supabase data to API format
  const days: DaySchedule[] = weekDates.map(date => {
    const dateStr = formatDate(date);
    const schedule = schedules?.find(s => s.date === dateStr);

    if (!schedule || !schedule.breakfast_meal || !schedule.lunch_meal) {
      // No schedule found for this date
      throw new Error(`No meal schedule found for ${dateStr}`);
    }

    // Type assertion to handle Supabase nested data structure
    const breakfastMeal = schedule.breakfast_meal as any;
    const lunchMeal = schedule.lunch_meal as any;

    return {
      date: dateStr,
      breakfast: {
        id: breakfastMeal.id,
        vendorName: breakfastMeal.vendor.name,
        description: breakfastMeal.description
      },
      lunch: {
        id: lunchMeal.id,
        vendorName: lunchMeal.vendor.name,
        description: lunchMeal.description
      }
    };
  });

  return {
    weekStart: startDate,
    weekEnd: endDate,
    days
  };
}

export async function GET(request: NextRequest) {
  try {
    // Get date parameter from query string
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');
    
    // Normalize the date to Monday of the week
    let mondayDate: Date;
    if (dateParam) {
      mondayDate = normalizeDateToMonday(dateParam);
    } else {
      // If no date provided, use current week's Monday
      mondayDate = normalizeDateToMonday(new Date());
    }
    
    // Fetch week schedule from Supabase
    const weekSchedule = await fetchWeekScheduleFromSupabase(mondayDate);
    
    const response: ApiResponse<WeekSchedule> = {
      success: true,
      data: weekSchedule
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching meals:', error);
    
    const response: ApiResponse<WeekSchedule> = {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch meal schedule'
    };
    
    return NextResponse.json(response, { status: 500 });
  }
} 