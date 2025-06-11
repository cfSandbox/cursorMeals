import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyMockData } from '@/lib/mockData';
import { ApiResponse, WeekSchedule } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would fetch this from a database
    // For now, we'll use mock data
    const weekSchedule = generateWeeklyMockData();
    
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