-- Fix RLS Policy for Anonymous Form Submissions
-- This SQL will ensure anonymous users can submit the registration form

-- Step 1: Check current RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'registrations';

-- Step 2: Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'registrations';

-- Step 3: Drop existing policy and recreate it properly
DROP POLICY IF EXISTS "Allow anonymous insertions" ON registrations;

-- Step 4: Create a proper policy for anonymous insertions
CREATE POLICY "Allow anonymous insertions" ON registrations
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (true);

-- Step 5: Ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Step 6: Grant necessary permissions to anon role
GRANT INSERT ON registrations TO anon;
GRANT USAGE ON SEQUENCE registrations_id_seq TO anon;

-- Step 7: Verify the setup
SELECT 
    'RLS Status' as check_type,
    CASE WHEN rowsecurity THEN 'ENABLED' ELSE 'DISABLED' END as status
FROM pg_tables 
WHERE tablename = 'registrations'

UNION ALL

SELECT 
    'Policy Status' as check_type,
    CASE WHEN COUNT(*) > 0 THEN 'POLICY EXISTS' ELSE 'NO POLICY' END as status
FROM pg_policies 
WHERE tablename = 'registrations' AND policyname = 'Allow anonymous insertions'

UNION ALL

SELECT 
    'Anon Permissions' as check_type,
    CASE WHEN COUNT(*) > 0 THEN 'GRANTED' ELSE 'NOT GRANTED' END as status
FROM information_schema.table_privileges 
WHERE table_name = 'registrations' AND grantee = 'anon' AND privilege_type = 'INSERT';

-- Step 8: Test insertion (this should work after running the above)
-- You can uncomment this to test, but remove it for production
-- INSERT INTO registrations (full_name, email, date_of_birth, city, country, phone) 
-- VALUES ('Test User', 'test@example.com', '1990-01-01', 'Test City', 'Test Country', '+1234567890');