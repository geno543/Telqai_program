-- Complete Setup for New Supabase Project
-- Run this SQL in your new Supabase SQL Editor: https://cofqbeoxwiwqemrlujdg.supabase.co

-- Step 1: Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    phone TEXT NOT NULL,
    education_level TEXT NOT NULL,
    field_of_study TEXT NOT NULL,
    current_occupation TEXT NOT NULL,
    used_ai_tools TEXT NOT NULL,
    ai_experience TEXT NOT NULL,
    motivation TEXT NOT NULL,
    problem_solving TEXT NOT NULL,
    reliable_internet TEXT NOT NULL,
    accommodations TEXT,
    commitment_confirmation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_registrations_country ON registrations(country);

-- Step 3: Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policy for anonymous insertions (this is the key fix!)
DROP POLICY IF EXISTS "Allow anonymous insertions" ON registrations;
CREATE POLICY "Allow anonymous insertions" ON registrations
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Step 5: Grant necessary permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON registrations TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;

-- Step 6: Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Add comments for documentation
COMMENT ON TABLE registrations IS 'Stores registration data for the AI program applications';
COMMENT ON COLUMN registrations.full_name IS 'Full name of the applicant';
COMMENT ON COLUMN registrations.date_of_birth IS 'Date of birth of the applicant';
COMMENT ON COLUMN registrations.email IS 'Email address of the applicant';
COMMENT ON COLUMN registrations.created_at IS 'Timestamp when the registration was created';
COMMENT ON COLUMN registrations.updated_at IS 'Timestamp when the registration was last updated';

-- Verification queries (run these separately to check if everything is set up correctly)
-- SELECT * FROM registrations LIMIT 5;
-- SELECT * FROM pg_policies WHERE tablename = 'registrations';
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables WHERE tablename = 'registrations';