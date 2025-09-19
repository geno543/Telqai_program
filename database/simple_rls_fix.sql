-- Simple RLS Fix - Handle Existing Policy
-- This will work even if policies already exist

-- Step 1: Drop the existing policy that's causing the error
DROP POLICY IF EXISTS "allow_all_insertions" ON registrations;
DROP POLICY IF EXISTS "Allow anonymous insertions" ON registrations;

-- Step 2: Create a fresh policy with a unique name
CREATE POLICY "registration_insert_policy" ON registrations
    FOR INSERT 
    TO anon, authenticated, public
    WITH CHECK (true);

-- Step 3: Ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Step 4: Grant essential permissions
GRANT INSERT ON registrations TO anon;
GRANT USAGE ON SEQUENCE registrations_id_seq TO anon;

-- Step 5: Verify the setup
SELECT 
    'RLS Enabled' as status,
    CASE WHEN rowsecurity THEN 'YES' ELSE 'NO' END as value
FROM pg_tables 
WHERE tablename = 'registrations'

UNION ALL

SELECT 
    'Active Policies' as status,
    COUNT(*)::text as value
FROM pg_policies 
WHERE tablename = 'registrations'

UNION ALL

SELECT 
    'Anon Can Insert' as status,
    CASE WHEN COUNT(*) > 0 THEN 'YES' ELSE 'NO' END as value
FROM information_schema.table_privileges 
WHERE table_name = 'registrations' 
AND grantee = 'anon' 
AND privilege_type = 'INSERT';