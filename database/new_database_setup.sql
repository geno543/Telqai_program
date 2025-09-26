-- Clean setup for new Supabase database - TelqAI Registration System
-- Run this script in your new Supabase SQL Editor

-- Create the registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    email TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    phone TEXT NOT NULL,
    education_level TEXT NOT NULL,
    current_school TEXT NOT NULL,
    used_ai_tools TEXT NOT NULL CHECK (used_ai_tools IN ('yes', 'no')),
    ai_experience TEXT,
    motivation TEXT NOT NULL,
    problem_solving TEXT NOT NULL,
    reliable_internet TEXT NOT NULL CHECK (reliable_internet IN ('yes', 'no')),
    program_commitment TEXT NOT NULL,
    additional_information TEXT,
    accept_program_emails BOOLEAN NOT NULL DEFAULT false,
    subscribe_newsletter BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_registrations_country ON public.registrations(country);

-- Add table and column comments for documentation
COMMENT ON TABLE public.registrations IS 'TelqAI Program registration applications';
COMMENT ON COLUMN public.registrations.full_name IS 'Applicant full name (first and last)';
COMMENT ON COLUMN public.registrations.date_of_birth IS 'Applicant date of birth for age verification (12-25 years)';
COMMENT ON COLUMN public.registrations.email IS 'Applicant email address for communication';
COMMENT ON COLUMN public.registrations.city IS 'Applicant city of residence';
COMMENT ON COLUMN public.registrations.country IS 'Applicant country (MENA region only)';
COMMENT ON COLUMN public.registrations.phone IS 'Phone number with country code';
COMMENT ON COLUMN public.registrations.education_level IS 'Current education level (Grade 9-12 or Undergraduate)';
COMMENT ON COLUMN public.registrations.current_school IS 'Current school or institution name';
COMMENT ON COLUMN public.registrations.used_ai_tools IS 'Whether applicant has used AI tools before';
COMMENT ON COLUMN public.registrations.ai_experience IS 'AI/programming experience description (optional if no experience)';
COMMENT ON COLUMN public.registrations.motivation IS 'Motivation for joining program (150-250 words)';
COMMENT ON COLUMN public.registrations.problem_solving IS 'Problem AI can solve description (150-250 words)';
COMMENT ON COLUMN public.registrations.reliable_internet IS 'Whether applicant has reliable internet access';
COMMENT ON COLUMN public.registrations.program_commitment IS 'Commitment level for attending sessions';
COMMENT ON COLUMN public.registrations.additional_information IS 'Additional information or accommodations needed';
COMMENT ON COLUMN public.registrations.accept_program_emails IS 'Accept program-related communications';
COMMENT ON COLUMN public.registrations.subscribe_newsletter IS 'Subscribe to newsletter updates';

-- Enable Row Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow anonymous insertions (for public form submissions)
CREATE POLICY "Allow public registration submissions" ON public.registrations
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Create RLS policy to allow authenticated users to view registrations
CREATE POLICY "Allow authenticated users to view registrations" ON public.registrations
    FOR SELECT 
    TO authenticated
    USING (true);

-- Create RLS policy to allow service role full access
CREATE POLICY "Allow service role full access" ON public.registrations
    FOR ALL 
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at column
CREATE TRIGGER handle_registrations_updated_at
    BEFORE UPDATE ON public.registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create secure function for registration submission
CREATE OR REPLACE FUNCTION public.submit_registration(
    p_full_name TEXT,
    p_date_of_birth DATE,
    p_email TEXT,
    p_city TEXT,
    p_country TEXT,
    p_phone TEXT,
    p_education_level TEXT,
    p_current_school TEXT,
    p_used_ai_tools TEXT,
    p_motivation TEXT,
    p_problem_solving TEXT,
    p_reliable_internet TEXT,
    p_program_commitment TEXT,
    p_ai_experience TEXT DEFAULT NULL,
    p_additional_information TEXT DEFAULT NULL,
    p_accept_program_emails BOOLEAN DEFAULT false,
    p_subscribe_newsletter BOOLEAN DEFAULT false
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_id UUID;
    existing_email TEXT;
BEGIN
    -- Check if email already exists
    SELECT email INTO existing_email 
    FROM public.registrations 
    WHERE email = p_email 
    LIMIT 1;
    
    IF existing_email IS NOT NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'An application with this email address already exists. Please use a different email or contact support if this is an error.'
        );
    END IF;
    
    -- Insert new registration
    INSERT INTO public.registrations (
        full_name,
        date_of_birth,
        email,
        city,
        country,
        phone,
        education_level,
        current_school,
        used_ai_tools,
        ai_experience,
        motivation,
        problem_solving,
        reliable_internet,
        program_commitment,
        additional_information,
        accept_program_emails,
        subscribe_newsletter
    ) VALUES (
        p_full_name,
        p_date_of_birth,
        p_email,
        p_city,
        p_country,
        p_phone,
        p_education_level,
        p_current_school,
        p_used_ai_tools,
        NULLIF(p_ai_experience, ''),
        p_motivation,
        p_problem_solving,
        p_reliable_internet,
        p_program_commitment,
        NULLIF(p_additional_information, ''),
        p_accept_program_emails,
        p_subscribe_newsletter
    ) RETURNING id INTO new_id;

    RETURN json_build_object(
        'success', true,
        'id', new_id,
        'message', 'Registration submitted successfully!'
    );
    
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object(
            'success', false,
            'error', 'An unexpected error occurred: ' || SQLERRM
        );
END;
$$;

-- Grant execute permission to anonymous users for form submissions
GRANT EXECUTE ON FUNCTION public.submit_registration TO anon;

-- Create a function to get registration statistics (optional - for admin dashboard)
CREATE OR REPLACE FUNCTION public.get_registration_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    total_count INTEGER;
    today_count INTEGER;
    countries_data JSON;
BEGIN
    -- Get total registrations
    SELECT COUNT(*) INTO total_count FROM public.registrations;
    
    -- Get today's registrations
    SELECT COUNT(*) INTO today_count 
    FROM public.registrations 
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Get registrations by country
    SELECT json_agg(json_build_object('country', country, 'count', count))
    INTO countries_data
    FROM (
        SELECT country, COUNT(*) as count
        FROM public.registrations
        GROUP BY country
        ORDER BY count DESC
    ) country_stats;
    
    RETURN json_build_object(
        'total_registrations', total_count,
        'today_registrations', today_count,
        'countries', countries_data,
        'last_updated', NOW()
    );
END;
$$;

-- Grant execute permission for stats function to authenticated users only
GRANT EXECUTE ON FUNCTION public.get_registration_stats TO authenticated;