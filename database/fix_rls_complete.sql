-- Complete RLS Fix for Anonymous Form Submissions
-- This addresses all possible RLS and permission issues

-- Step 1: Disable RLS temporarily to check if that's the core issue
ALTER TABLE registrations DISABLE ROW LEVEL SECURITY;

-- Step 2: Test if form works without RLS (run form test after this)
-- If it works, then we know it's an RLS policy issue

-- Step 3: Re-enable RLS with proper configuration
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous insertions" ON registrations;
DROP POLICY IF EXISTS "Enable insert for anon users" ON registrations;
DROP POLICY IF EXISTS "Allow public insertions" ON registrations;

-- Step 5: Create a comprehensive policy that allows all insertions
CREATE POLICY "allow_all_insertions" ON registrations
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- Step 6: Grant all necessary permissions
GRANT ALL ON registrations TO anon;
GRANT ALL ON registrations TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Step 7: Ensure the anon role has proper schema access
GRANT USAGE ON SCHEMA public TO anon;
GRANT CREATE ON SCHEMA public TO anon;

-- Step 8: Alternative approach - Create a function for insertions
CREATE OR REPLACE FUNCTION insert_registration(
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
AS $$
DECLARE
    result_id INTEGER;
BEGIN
    INSERT INTO registrations (
        full_name, email, date_of_birth, city, country, phone,
        problem_solving, reliable_internet, accommodations, commitment_confirmation
    ) VALUES (
        p_full_name, p_email, p_date_of_birth, p_city, p_country, p_phone,
        p_problem_solving, p_reliable_internet, p_accommodations, p_commitment_confirmation
    ) RETURNING id INTO result_id;
    
    RETURN json_build_object('success', true, 'id', result_id);
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

-- Step 9: Grant execute permission on the function
GRANT EXECUTE ON FUNCTION insert_registration TO anon;
GRANT EXECUTE ON FUNCTION insert_registration TO authenticated;

-- Step 10: Verification queries
SELECT 'Table RLS Status' as check_type, 
       CASE WHEN rowsecurity THEN 'ENABLED' ELSE 'DISABLED' END as status
FROM pg_tables WHERE tablename = 'registrations';

SELECT 'Policies Count' as check_type, 
       COUNT(*)::text as status
FROM pg_policies WHERE tablename = 'registrations';

SELECT 'Anon Permissions' as check_type,
       string_agg(privilege_type, ', ') as status
FROM information_schema.table_privileges 
WHERE table_name = 'registrations' AND grantee = 'anon';