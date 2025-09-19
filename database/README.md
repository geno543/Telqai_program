# Database Setup for AI Program Registration

This folder contains the SQL scripts needed to set up your Supabase database for the registration form.

## Setup Instructions

### 1. Create the Registrations Table

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `qrspbmpxacpeokgigzbl`
3. Navigate to **SQL Editor** in the left sidebar
4. Copy and paste the contents of `create_registrations_table.sql`
5. Click **Run** to execute the SQL

### 2. What the Script Creates

The script will create:

- **`registrations` table** with all necessary columns for the form data
- **Indexes** for better query performance on email and created_at columns
- **Row Level Security (RLS)** policies:
  - Anonymous users can INSERT (submit forms)
  - Authenticated users can SELECT and UPDATE (admin access)
- **Automatic timestamp updates** via triggers
- **Data validation** with CHECK constraints
- **Documentation** via column comments

### 3. Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `full_name` | TEXT | Applicant's full name |
| `date_of_birth` | DATE | Applicant's date of birth |
| `email` | TEXT | Applicant's email address |
| `city` | TEXT | Applicant's city |
| `country` | TEXT | Applicant's country |
| `phone` | TEXT | Applicant's phone number |
| `education_level` | TEXT | Current education level/grade |
| `field_of_study` | TEXT | Current school or field of study |
| `current_occupation` | TEXT | Current occupation or school |
| `used_ai_tools` | TEXT | Has used AI tools before (yes/no) |
| `ai_experience` | TEXT | AI/programming experience description |
| `motivation` | TEXT | Motivation for joining (min 150 words) |
| `problem_solving` | TEXT | Problem-solving response (min 150 words) |
| `reliable_internet` | TEXT | Has reliable internet (yes/no) |
| `accommodations` | TEXT | Any accommodations needed (optional) |
| `commitment_confirmation` | TEXT | Full name confirmation |
| `created_at` | TIMESTAMP | When registration was submitted |
| `updated_at` | TIMESTAMP | When registration was last updated |

### 4. Security

The table uses Row Level Security (RLS) with these policies:

- **Public form submissions**: Anonymous users can insert new registrations
- **Admin access**: Authenticated users can view and update all registrations
- **Data validation**: CHECK constraints ensure data integrity

### 5. Viewing Registrations

After setting up the table, you can view submitted registrations by:

1. Going to **Table Editor** in your Supabase dashboard
2. Selecting the `registrations` table
3. Viewing all submitted applications

### 6. Admin Access

To manage registrations programmatically, you'll need to authenticate with Supabase using the service key (not the anon key) for full access.

## Troubleshooting

If you encounter any issues:

1. Make sure you're using the correct project URL and API key
2. Check that RLS policies are properly configured
3. Verify that the anon key has the necessary permissions
4. Check the Supabase logs for any error messages

## Next Steps

Once the table is created, your registration form will automatically start saving submissions to the database. You can then:

- Set up email notifications for new registrations
- Create an admin dashboard to review applications
- Export registration data for analysis
- Set up automated responses to applicants