'use client';

import { useState, useEffect } from 'react';
import { WeekSchedule, ApiResponse } from '@/types';
import { DayCard } from './DayCard';
import { LoadingSpinner } from './LoadingSpinner';
import { formatDateDisplay } from '@/lib/utils';

interface WeeklyScheduleProps {
  weekStartDate?: Date;
}

export function WeeklySchedule({ weekStartDate }: WeeklyScheduleProps) {
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeeklySchedule();
  }, [weekStartDate]); // Re-fetch when weekStartDate changes

  const fetchWeeklySchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build the API URL with date parameter if weekStartDate is provided
      let url = '/api/meals';
      if (weekStartDate) {
        const dateString = weekStartDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        url += `?date=${dateString}`;
      }
      
      const response = await fetch(url);
      const data: ApiResponse<WeekSchedule> = await response.json();
      
      if (data.success && data.data) {
        setWeekSchedule(data.data);
      } else {
        setError(data.error || 'Failed to fetch meal schedule');
      }
    } catch (err) {
      setError('An error occurred while fetching the meal schedule');
      console.error('Error fetching meals:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-semibold">Error loading meals</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
        </div>
        <button
          onClick={fetchWeeklySchedule}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!weekSchedule) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No meal schedule available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
   
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {weekSchedule.days.map((day) => (
          <DayCard key={day.date} day={day} />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={fetchWeeklySchedule}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Refresh Schedule
        </button>
      </div>
    </div>
  );
} 