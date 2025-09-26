import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

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
    
    // Use the RPC function with clean parameter mapping
    const { data: functionData, error: functionError } = await supabase
      .rpc('submit_registration', {
        p_full_name: formData.full_name,
        p_date_of_birth: formData.date_of_birth,
        p_email: formData.email,
        p_city: formData.city,
        p_country: formData.country,
        p_phone: formData.phone,
        p_education_level: formData.education_level,
        p_current_school: formData.current_school,
        p_used_ai_tools: formData.used_ai_tools,
        p_motivation: formData.motivation,
        p_problem_solving: formData.problem_solving,
        p_reliable_internet: formData.reliable_internet,
        p_program_commitment: formData.program_commitment,
        p_ai_experience: formData.ai_experience || null,
        p_additional_information: formData.additional_information || null,
        p_accept_program_emails: formData.accept_program_emails,
        p_subscribe_newsletter: formData.subscribe_newsletter
      });

    if (functionError) {
      console.error('Registration submission error:', functionError);
      
      return { 
        success: false, 
        error: { 
          message: functionError.message || 'Failed to submit registration. Please try again.',
          details: functionError
        }
      }
    }

    const result = functionData as { success: boolean; error?: string; id?: string; message?: string }
    
    if (!result.success) {
      return { 
        success: false, 
        error: { 
          message: result.error || 'Registration submission failed. Please try again.',
          details: result
        }
      }
    }

    console.log('Registration succeeded:', result);
    return { 
      success: true, 
      data: [{ id: result.id }],
      message: result.message || 'Registration submitted successfully!'
    }
    
  } catch (error) {
    console.error('Unexpected error submitting registration:', error)
    return { 
      success: false, 
      error: { 
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        details: error
      }
    }
  }
}