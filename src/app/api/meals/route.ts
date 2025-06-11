import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyMockData } from '@/lib/mockData';
import { normalizeDateToMonday } from '@/lib/utils';
import { ApiResponse, WeekSchedule } from '@/types';

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
    
    // In a real application, you would fetch this from a database
    // For now, we'll use mock data based on the Monday date
    const weekSchedule = generateWeeklyMockData(mondayDate);
    
    const response: ApiResponse<WeekSchedule> = {
      success: true,
      data: weekSchedule
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching meals:', error);
    
    const response: ApiResponse<WeekSchedule> = {
      success: false,
      error: 'Failed to fetch meal schedule'
    };
    
    return NextResponse.json(response, { status: 500 });
  }
} 