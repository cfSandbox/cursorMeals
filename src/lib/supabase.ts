import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database Types
export interface Vendor {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Meal {
  id: string;
  vendor_id: string;
  description: string;
  meal_type: 'breakfast' | 'lunch';
  created_at: string;
  updated_at: string;
}

export interface MealSchedule {
  id: string;
  date: string;
  meal_id: string;
  created_at: string;
  updated_at: string;
}

// Types with relations
export interface MealWithVendor extends Meal {
  vendor: Vendor;
}

export interface MealScheduleWithMeal extends MealSchedule {
  meal: MealWithVendor;
} 