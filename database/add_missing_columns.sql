-- Add Missing Columns to Existing Registrations Table
-- Run this SQL if the table already exists and you just need to add the missing columns

-- Add missing columns that the form is trying to submit
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS problem_solving TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS reliable_internet TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS accommodations TEXT,
ADD COLUMN IF NOT EXISTS commitment_confirmation TEXT NOT NULL DEFAULT '';

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'registrations' 
ORDER BY ordinal_position;