import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cofqbeoxwiwqemrlujdg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvZnFiZW94d2l3cWVtcmx1amRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDIxMDQsImV4cCI6MjA3MzgxODEwNH0.BqKIr4LhbJoN4Vt4WHzNdgmn4wXeR-k3lhWaGyUtOfw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for the registration form data
export interface RegistrationData {
  full_name: string
  date_of_birth: string
  email: string
  city: string
  country: string
  phone: string
  education_level: string
  current_school: string
  used_ai_tools: string
  ai_experience?: string
  motivation: string
  problem_solving: string
  reliable_internet: string
  program_commitment: string
  additional_information?: string
  accept_program_emails: boolean
  subscribe_newsletter: boolean
  created_at?: string
}

// Function to submit registration data
export const submitRegistration = async (formData: RegistrationData) => {
  try {
    console.log('Attempting registration with data:', formData);
    
    // First try direct insert (should work with new RLS setup)
    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          full_name: formData.full_name,
          date_of_birth: formData.date_of_birth,
          email: formData.email,
          city: formData.city,
          country: formData.country,
          phone: formData.phone,
          problem_solving: formData.problem_solving,
          reliable_internet: formData.reliable_internet,
          accommodations: formData.accommodations,
          commitment_confirmation: formData.commitment_confirmation
        }
      ])
      .select()

    if (error) {
      console.log('Direct insert failed, error:', error);
      
      // If direct insert fails due to RLS, try the secure function
      if (error.message.includes('row-level security') || error.message.includes('policy')) {
        console.log('Trying RPC function fallback...');
        
        const { data: functionData, error: functionError } = await supabase
          .rpc('submit_registration', {
            p_full_name: formData.full_name,
            p_email: formData.email,
            p_date_of_birth: formData.date_of_birth,
            p_city: formData.city,
            p_country: formData.country,
            p_phone: formData.phone,
            p_problem_solving: formData.problem_solving,
            p_reliable_internet: formData.reliable_internet,
            p_accommodations: formData.accommodations,
            p_commitment_confirmation: formData.commitment_confirmation
          })

        if (functionError) {
          console.error('RPC function error:', functionError);
          return { 
            success: false, 
            error: { 
              message: functionError.message || 'Database function failed',
              details: functionError
            }
          }
        }

        const result = functionData as { success: boolean; error?: string; id?: number }
        if (!result.success) {
          return { 
            success: false, 
            error: { 
              message: result.error || 'Registration function failed',
              details: result
            }
          }
        }

        console.log('RPC function succeeded:', result);
        return { success: true, data: [{ id: result.id }] }
      }
      
      // Other database errors
      return { 
        success: false, 
        error: { 
          message: error.message || 'Database error occurred',
          details: error
        }
      }
    }

    console.log('Direct insert succeeded:', data);
    return { success: true, data }
  } catch (error) {
    console.error('Unexpected error submitting registration:', error)
    return { 
      success: false, 
      error: { 
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error
      }
    }
  }
}