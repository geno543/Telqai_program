-- COMPLETE DATABASE REBUILD - SOLVE ALL PROBLEMS
-- This script will completely rebuild the registrations table with proper RLS setup
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Clean slate - Drop everything and start fresh
DROP TABLE IF EXISTS registrations CASCADE;

-- Step 2: Create the registrations table with all required columns
CREATE TABLE registrations (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    date_of_birth DATE NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    phone TEXT NOT NULL,
    problem_solving TEXT NOT NULL DEFAULT '',
    reliable_internet TEXT NOT NULL DEFAULT '',
    accommodations TEXT,
    commitment_confirmation TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Create indexes for performance
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_created_at ON registrations(created_at);

-- Step 4: Create updated_at trigger
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

-- Step 5: DISABLE RLS initially to avoid conflicts
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- Step 6: Grant basic permissions first
GRANT ALL ON registrations TO postgres;
GRANT INSERT, SELECT ON registrations TO anon;
GRANT INSERT, SELECT ON registrations TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE registrations_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE registrations_id_seq TO authenticated;

-- Step 7: Enable RLS and create a simple, working policy
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create a policy that definitely works for anonymous insertions
CREATE POLICY "allow_anonymous_insert" ON registrations
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Create a policy for authenticated users too
CREATE POLICY "allow_authenticated_insert" ON registrations
    FOR INSERT 
    TO authenticated
    WITH CHECK (true);

-- Step 8: Create a secure function as backup method
CREATE OR REPLACE FUNCTION public.submit_registration(
    p_full_name TEXT,
    p_email TEXT,
    p_date_of_birth DATE,
    p_city TEXT,
    p_country TEXT,
    p_phone TEXT,
    p_problem_solving TEXT DEFAULT '',
    p_reliable_internet TEXT DEFAULT '',
    p_accommodations TEXT DEFAULT NULL,
    p_commitment_confirmation TEXT DEFAULT ''
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result_id BIGINT;
BEGIN
    -- Insert the registration
    INSERT INTO registrations (
        full_name, email, date_of_birth, city, country, phone,
        problem_solving, reliable_internet, accommodations, commitment_confirmation
    ) VALUES (
        p_full_name, p_email, p_date_of_birth, p_city, p_country, p_phone,
        p_problem_solving, p_reliable_internet, p_accommodations, p_commitment_confirmation
    ) RETURNING id INTO result_id;
    
    RETURN json_build_object(
        'success', true, 
        'id', result_id,
        'message', 'Registration submitted successfully'
    );
EXCEPTION 
    WHEN unique_violation THEN
        RETURN json_build_object(
            'success', false, 
            'error', 'Email already registered'
        );
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false, 
            'error', SQLERRM
        );
END;
$$;

-- Step 9: Grant execute permissions on the function
GRANT EXECUTE ON FUNCTION public.submit_registration TO anon;
GRANT EXECUTE ON FUNCTION public.submit_registration TO authenticated;

-- Step 10: Final verification
SELECT 
    'Table Exists' as check_name,
    CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as status
FROM information_schema.tables 
WHERE table_name = 'registrations'

UNION ALL

SELECT 
    'RLS Enabled' as check_name,
    CASE WHEN rowsecurity THEN '✅ YES' ELSE '❌ NO' END as status
FROM pg_tables 
WHERE tablename = 'registrations'

UNION ALL

SELECT 
    'Policies Count' as check_name,
    '✅ ' || COUNT(*)::text || ' policies' as status
FROM pg_policies 
WHERE tablename = 'registrations'

UNION ALL

SELECT 
    'Anon INSERT Permission' as check_name,
    CASE WHEN COUNT(*) > 0 THEN '✅ GRANTED' ELSE '❌ NOT GRANTED' END as status
FROM information_schema.table_privileges 
WHERE table_name = 'registrations' AND grantee = 'anon' AND privilege_type = 'INSERT'

UNION ALL

SELECT 
    'Function Exists' as check_name,
    CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as status
FROM information_schema.routines 
WHERE routine_name = 'submit_registration';

-- Step 11: Test the setup with a sample insert (comment out for production)
-- INSERT INTO registrations (full_name, email, date_of_birth, city, country, phone) 
-- VALUES ('Test User', 'test@example.com', '1990-01-01', 'Test City', 'Test Country', '+1234567890');

COMMENT ON TABLE registrations IS 'Registration form submissions with proper RLS policies for anonymous access';