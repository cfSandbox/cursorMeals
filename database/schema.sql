-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('breakfast', 'lunch')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(vendor_id, description, meal_type)
);

-- Create meal_schedules table
CREATE TABLE IF NOT EXISTS meal_schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  meal_id UUID NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, meal_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_meals_vendor_id ON meals(vendor_id);
CREATE INDEX IF NOT EXISTS idx_meals_type ON meals(meal_type);
CREATE INDEX IF NOT EXISTS idx_meal_schedules_date ON meal_schedules(date);
CREATE INDEX IF NOT EXISTS idx_meal_schedules_meal_id ON meal_schedules(meal_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meals_updated_at BEFORE UPDATE ON meals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_schedules_updated_at BEFORE UPDATE ON meal_schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_schedules ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on vendors" ON vendors
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on meals" ON meals
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on meal_schedules" ON meal_schedules
    FOR SELECT USING (true);

-- Create policies for service role full access
CREATE POLICY "Allow service role full access on vendors" ON vendors
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on meals" ON meals
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access on meal_schedules" ON meal_schedules
    FOR ALL USING (auth.role() = 'service_role'); 