# Database Setup

## Supabase Configuration

### 1. Create Environment File

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin API Security
ADMIN_API_SECRET=your_admin_secret_key
```

### 2. Run Database Schema

Execute the SQL in `database/schema.sql` in your Supabase SQL editor to create the required tables:

- `vendors` - Food vendors/restaurants
- `meals` - Individual meal items with vendor references
- `meal_schedules` - Weekly meal schedule assignments

### 3. Database Schema

#### Vendors Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique)
- `created_at`, `updated_at` (Timestamps)

#### Meals Table
- `id` (UUID, Primary Key)
- `vendor_id` (UUID, Foreign Key to vendors)
- `description` (TEXT)
- `meal_type` (breakfast | lunch)
- `created_at`, `updated_at` (Timestamps)
- Unique constraint on (vendor_id, description, meal_type)

#### Meal Schedules Table
- `id` (UUID, Primary Key)
- `date` (DATE)
- `meal_id` (UUID, Foreign Key to meals)
- `created_at`, `updated_at` (Timestamps)
- Unique constraint on (date, meal_id)

## Admin API Usage

### Seed Database with Mock Data

```bash
POST /api/admin/seed
Headers: x-admin-secret: your_admin_secret_key
Body: { "date": "2024-12-11" }
```

This will:
1. Normalize the date to Monday of that week
2. Create vendors if they don't exist
3. Create meals if they don't exist
4. Create meal schedules for Monday-Friday of that week

### Row Level Security

The database uses RLS with:
- Public read access for all tables
- Service role full access for admin operations
- Proper indexes for performance

## Benefits

- **Reusable Meals**: Same meal can be scheduled multiple times
- **Vendor Management**: Centralized vendor information
- **Flexible Scheduling**: Easy to modify meal schedules
- **Data Integrity**: Foreign key constraints and unique constraints
- **Performance**: Proper indexing for common queries 