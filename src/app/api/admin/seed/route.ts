import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { normalizeDateToMonday } from '@/lib/utils';

// Import mock data arrays
const mockVendors = [
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

const mockBreakfastOptions = [
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

const mockLunchOptions = [
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

async function getOrCreateVendor(vendorName: string) {
  // Check if vendor exists
  const { data: existingVendor, error: selectError } = await supabaseAdmin
    .from('vendors')
    .select('id, name')
    .eq('name', vendorName)
    .single();

  if (selectError && selectError.code !== 'PGRST116') {
    throw new Error(`Error checking vendor: ${selectError.message}`);
  }

  if (existingVendor) {
    return existingVendor;
  }

  // Create new vendor
  const { data: newVendor, error: insertError } = await supabaseAdmin
    .from('vendors')
    .insert({ name: vendorName })
    .select('id, name')
    .single();

  if (insertError) {
    throw new Error(`Error creating vendor: ${insertError.message}`);
  }

  return newVendor;
}

async function getOrCreateMeal(vendorId: string, description: string, mealType: 'breakfast' | 'lunch') {
  // Check if meal exists
  const { data: existingMeal, error: selectError } = await supabaseAdmin
    .from('meals')
    .select('id, vendor_id, description, meal_type')
    .eq('vendor_id', vendorId)
    .eq('description', description)
    .eq('meal_type', mealType)
    .single();

  if (selectError && selectError.code !== 'PGRST116') {
    throw new Error(`Error checking meal: ${selectError.message}`);
  }

  if (existingMeal) {
    return existingMeal;
  }

  // Create new meal
  const { data: newMeal, error: insertError } = await supabaseAdmin
    .from('meals')
    .insert({
      vendor_id: vendorId,
      description,
      meal_type: mealType
    })
    .select('id, vendor_id, description, meal_type')
    .single();

  if (insertError) {
    throw new Error(`Error creating meal: ${insertError.message}`);
  }

  return newMeal;
}

async function createMealSchedule(date: string, mealId: string) {
  // Check if schedule already exists
  const { data: existingSchedule, error: selectError } = await supabaseAdmin
    .from('meal_schedules')
    .select('id')
    .eq('date', date)
    .eq('meal_id', mealId)
    .single();

  if (selectError && selectError.code !== 'PGRST116') {
    throw new Error(`Error checking meal schedule: ${selectError.message}`);
  }

  if (existingSchedule) {
    return existingSchedule;
  }

  // Create new schedule
  const { data: newSchedule, error: insertError } = await supabaseAdmin
    .from('meal_schedules')
    .insert({
      date,
      meal_id: mealId
    })
    .select('id')
    .single();

  if (insertError) {
    throw new Error(`Error creating meal schedule: ${insertError.message}`);
  }

  return newSchedule;
}

export async function POST(request: NextRequest) {
  try {
    // Check admin API secret
    const adminSecret = request.headers.get('x-admin-secret');
    if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { date } = body;

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Normalize date to Monday
    const mondayDate = normalizeDateToMonday(date);
    
    // Generate week dates (Monday to Friday)
    const weekDates: Date[] = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(mondayDate);
      date.setDate(mondayDate.getDate() + i);
      weekDates.push(date);
    }

    const createdSchedules = [];

    // Create meals for each day
    for (const dayDate of weekDates) {
      const dateStr = dayDate.toISOString().split('T')[0];

      // Create breakfast
      const breakfastVendorName = getRandomItem(mockVendors);
      const breakfastDescription = getRandomItem(mockBreakfastOptions);
      
      const breakfastVendor = await getOrCreateVendor(breakfastVendorName);
      const breakfastMeal = await getOrCreateMeal(breakfastVendor.id, breakfastDescription, 'breakfast');
      const breakfastSchedule = await createMealSchedule(dateStr, breakfastMeal.id);

      // Create lunch
      const lunchVendorName = getRandomItem(mockVendors);
      const lunchDescription = getRandomItem(mockLunchOptions);
      
      const lunchVendor = await getOrCreateVendor(lunchVendorName);
      const lunchMeal = await getOrCreateMeal(lunchVendor.id, lunchDescription, 'lunch');
      const lunchSchedule = await createMealSchedule(dateStr, lunchMeal.id);

      createdSchedules.push({
        date: dateStr,
        breakfast: {
          vendor: breakfastVendor.name,
          description: breakfastDescription,
          scheduleId: breakfastSchedule.id
        },
        lunch: {
          vendor: lunchVendor.name,
          description: lunchDescription,
          scheduleId: lunchSchedule.id
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        weekStart: weekDates[0].toISOString().split('T')[0],
        weekEnd: weekDates[4].toISOString().split('T')[0],
        schedules: createdSchedules
      }
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to seed database' 
      },
      { status: 500 }
    );
  }
} 