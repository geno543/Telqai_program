import React, { useState, useEffect, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { submitRegistration, type RegistrationData } from '../lib/supabase';

// MENA countries list
const MENA_COUNTRIES = [
  'Algeria', 'Bahrain', 'Djibouti', 'Egypt', 'Iraq', 'Jordan', 'Kuwait', 'Lebanon', 
  'Libya', 'Malta', 'Morocco', 'Oman', 'Palestine', 'Qatar', 'Saudi Arabia', 
  'Somalia', 'Sudan', 'Syria', 'Tunisia', 'Turkey', 'United Arab Emirates', 'Yemen'
];

// Country codes for MENA region
const COUNTRY_CODES = {
  'Algeria': '+213', 'Bahrain': '+973', 'Djibouti': '+253', 'Egypt': '+20', 
  'Iraq': '+964', 'Jordan': '+962', 'Kuwait': '+965', 'Lebanon': '+961', 
  'Libya': '+218', 'Malta': '+356', 'Morocco': '+212', 'Oman': '+968', 
  'Palestine': '+970', 'Qatar': '+974', 'Saudi Arabia': '+966', 'Somalia': '+252', 
  'Sudan': '+249', 'Syria': '+963', 'Tunisia': '+216', 'Turkey': '+90', 
  'United Arab Emirates': '+971', 'Yemen': '+967'
};

// Temporary email domains to block
const TEMP_EMAIL_DOMAINS = [
  '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
  'temp-mail.org', 'throwaway.email', 'getairmail.com', 'fakemailgenerator.com'
];

interface FormErrors {
  fullName?: string;
  dateOfBirth?: string;
  email?: string;
  city?: string;
  country?: string;
  phone?: string;
  currentSchool?: string;
  grade?: string;
  usedAITools?: string;
  aiExperience?: string;
  motivation?: string;
  problemSolving?: string;
  reliableInternet?: string;
  programCommitment?: string;
  acceptProgramEmails?: string;
}

const JoinProgram: React.FC = memo(() => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [formData, setFormData] = useState(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem('talaqai-registration-form');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    
    return {
      // Section 1: Personal Information
      fullName: '',
      dateOfBirth: '',
      email: '',
      city: '',
      country: '',
      phone: '',
      currentSchool: '',
      grade: '',
      
      // Section 2: Educational Background and Experience
      usedAITools: '',
      aiExperience: '',
      
      // Section 3: Motivation and Goals
      motivation: '',
      problemSolving: '',
      
      // Section 4: Accessibility and Commitment
      reliableInternet: '',
      programCommitment: '',
      additionalInformation: '',
      
      // Communication Preferences
      acceptProgramEmails: false,
      subscribeNewsletter: false
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isFormClosed, setIsFormClosed] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Form deadline: October 8, 2025 in GMT+3
  useEffect(() => {
    const formDeadline = new Date('2025-10-08T23:59:59+03:00'); // October 8, 2025 11:59 PM GMT+3
    const now = new Date();
    
    // Check if form is closed
    if (now > formDeadline) {
      setIsFormClosed(true);
    }
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = formDeadline.getTime() - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsFormClosed(true);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-update phone with country code when country changes
  useEffect(() => {
    if (formData.country && COUNTRY_CODES[formData.country as keyof typeof COUNTRY_CODES]) {
      const currentPhone = formData.phone;
      const countryCode = COUNTRY_CODES[formData.country as keyof typeof COUNTRY_CODES];
      
      // Only update if phone doesn't already have the correct country code
      if (!currentPhone.startsWith(countryCode + ' ')) {
        const updatedPhone = getPhoneWithCountryCode(currentPhone, formData.country);
        setFormData(prev => ({ ...prev, phone: updatedPhone }));
      }
    }
  }, [formData.country]);

  const getPhoneWithCountryCode = (phone: string, country: string): string => {
    const countryCode = COUNTRY_CODES[country as keyof typeof COUNTRY_CODES] || '';
    if (!countryCode) return phone;
    
    // Remove all non-digits and spaces
    const digits = phone.replace(/[^\d\s]/g, '').replace(/\s+/g, ' ').trim();
    
    // If phone is empty or just country code, return country code
    if (!digits || digits === countryCode.replace('+', '')) {
      return `${countryCode} `;
    }
    
    // Extract the local number part (remove country code if present)
    let localNumber = digits;
    const countryCodeDigits = countryCode.replace('+', '');
    
    if (digits.startsWith(countryCodeDigits)) {
      localNumber = digits.substring(countryCodeDigits.length).trim();
    }
    
    // Format: +CountryCode LocalNumber
    return localNumber ? `${countryCode} ${localNumber}` : `${countryCode} `;
  };

  const handlePhoneChange = (phoneValue: string, country: string): string => {
    const countryCode = COUNTRY_CODES[country as keyof typeof COUNTRY_CODES] || '';
    if (!countryCode) return phoneValue;
    
    // Don't allow editing before the country code
    if (!phoneValue.startsWith(countryCode + ' ')) {
      // If user tries to edit the country code part, restore it
      const localPart = phoneValue.replace(countryCode, '').replace(/^\+?\d*\s*/, '').trim();
      return `${countryCode} ${localPart}`;
    }
    
    return phoneValue;
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = type === 'checkbox' ? checked : value;
    let updatedFormData = { ...formData };
    
    if (name === 'country' && typeof processedValue === 'string') {
      // When country changes, update phone with new country code
      updatedFormData.country = processedValue;
      updatedFormData.phone = getPhoneWithCountryCode(formData.phone, processedValue);
    } else if (name === 'phone' && typeof processedValue === 'string') {
      // Handle phone number input with country code protection
      processedValue = handlePhoneChange(processedValue, formData.country);
      updatedFormData[name] = processedValue;
    } else {
      updatedFormData[name] = processedValue;
    }
    
    // Clear AI experience if user selects "no" for AI tools
    if (name === 'usedAITools' && processedValue === 'no') {
      updatedFormData.aiExperience = '';
    }
    
    setFormData(updatedFormData);
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
    
    // Clear aiExperience error when user selects "no" for AI tools
    if (name === 'usedAITools' && processedValue === 'no' && errors.aiExperience) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.aiExperience;
        return newErrors;
      });
    }
    
    // Save to localStorage
    localStorage.setItem('talaqai-registration-form', JSON.stringify(updatedFormData));
  }, [formData, errors]);

  // Helper function to count words
  const countWords = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const validateFullName = (name: string): string | null => {
    if (!name.trim()) return 'Full name is required';
    const nameParts = name.trim().split(' ').filter(part => part.length > 0);
    if (nameParts.length < 2) return 'Please enter your full name (first and last name)';
    const nameRegex = /^[A-Za-z\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFE70-\uFEFF-]+$/;
    if (!nameRegex.test(name)) return 'Full name can only contain letters, spaces, and hyphens';
    return null;
  };

  const validateDateOfBirth = (dob: string): string | null => {
    if (!dob) return 'Date of birth is required';
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
    
    if (actualAge < 12) return 'You must be at least 12 years old to apply';
    if (actualAge > 25) return 'This program is designed for students aged 12-25';
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (TEMP_EMAIL_DOMAINS.includes(domain)) {
      return 'Please use a permanent email address (temporary emails are not allowed)';
    }
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[\+]?[1-9][\d]{7,14}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  };

  const validateCountry = (country: string): string | null => {
    if (!country) return 'Please select your country';
    if (!MENA_COUNTRIES.includes(country)) {
      return 'This program is currently available for MENA region countries only';
    }
    return null;
  };

  // Validation function for each phase
  const validateCurrentPhase = (): boolean => {
    const newErrors: FormErrors = {};

    switch (currentPhase) {
      case 1:
        // Personal Information validation
        const nameError = validateFullName(formData.fullName);
        if (nameError) newErrors.fullName = nameError;

        const dobError = validateDateOfBirth(formData.dateOfBirth);
        if (dobError) newErrors.dateOfBirth = dobError;

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        }

        const countryError = validateCountry(formData.country);
        if (countryError) newErrors.country = countryError;

        const phoneError = validatePhone(formData.phone);
        if (phoneError) newErrors.phone = phoneError;

        if (!formData.currentSchool.trim()) {
          newErrors.currentSchool = 'School/institution name is required';
        }

        if (!formData.grade) {
          newErrors.grade = 'Please select your current grade/level';
        }
        break;

      case 2:
        // Motivation and Goals validation
        if (!formData.motivation.trim()) {
          newErrors.motivation = 'Please explain your motivation for joining the program';
        } else {
          const motivationWords = countWords(formData.motivation);
          if (motivationWords < 150) {
            newErrors.motivation = 'Please provide at least 150 words for your motivation';
          } else if (motivationWords > 250) {
            newErrors.motivation = 'Please limit your motivation to 250 words maximum';
          }
        }

        if (!formData.problemSolving.trim()) {
          newErrors.problemSolving = 'Please describe a problem AI can help solve';
        } else {
          const problemWords = countWords(formData.problemSolving);
          if (problemWords < 150) {
            newErrors.problemSolving = 'Please provide at least 150 words for this question';
          } else if (problemWords > 250) {
            newErrors.problemSolving = 'Please limit your response to 250 words maximum';
          }
        }
        break;

      case 3:
        // Educational Background validation
        if (!formData.usedAITools) {
          newErrors.usedAITools = 'Please select whether you have used AI automations before';
        }

        // Only validate AI experience if user has used AI tools
        if (formData.usedAITools === 'yes') {
          if (!formData.aiExperience.trim()) {
            newErrors.aiExperience = 'Please describe your AI/programming experience';
          } else if (countWords(formData.aiExperience) > 1000) {
            newErrors.aiExperience = 'Please limit your description to 1000 words maximum';
          }
        }
        break;

      case 4:
        // Accessibility and Commitment validation
        if (!formData.reliableInternet) {
          newErrors.reliableInternet = 'Please indicate if you have reliable internet access';
        }
        
        if (!formData.programCommitment) {
          newErrors.programCommitment = 'Please confirm your commitment to attend all sessions';
        }
        
        if (!formData.acceptProgramEmails) {
          newErrors.acceptProgramEmails = 'You must accept receiving program-related communications';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextPhase = () => {
    const isValid = validateCurrentPhase();
    console.log('Phase:', currentPhase, 'Valid:', isValid, 'Errors:', errors);
    
    if (isValid && currentPhase < 4) {
      console.log('Moving from phase', currentPhase, 'to phase', currentPhase + 1);
      setCurrentPhase(currentPhase + 1);
    } else if (!isValid) {
      // Validation failed, stay on current phase to show errors
      console.log('Validation failed for phase:', currentPhase, 'Current errors:', errors);
    }
  };

  const prevPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};

    // Personal Information validation
    const nameError = validateFullName(formData.fullName);
    if (nameError) newErrors.fullName = nameError;

    const dobError = validateDateOfBirth(formData.dateOfBirth);
    if (dobError) newErrors.dateOfBirth = dobError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    const countryError = validateCountry(formData.country);
    if (countryError) newErrors.country = countryError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    if (!formData.currentSchool.trim()) {
      newErrors.currentSchool = 'School/institution name is required';
    }

    if (!formData.grade) {
      newErrors.grade = 'Please select your current grade/level';
    }

    // Educational Background validation
    if (!formData.usedAITools) {
      newErrors.usedAITools = 'Please select whether you have used AI tools before';
    }

    // Only validate AI experience if user selected 'yes'
    if (formData.usedAITools === 'yes') {
      if (!formData.aiExperience.trim()) {
        newErrors.aiExperience = 'Please describe your AI/programming experience';
      } else if (countWords(formData.aiExperience) > 1000) {
        newErrors.aiExperience = 'Please limit your description to 1000 words maximum';
      }
    }

    // Motivation and Goals validation
    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Please explain your motivation for joining the program';
    } else {
      const motivationWords = countWords(formData.motivation);
      if (motivationWords < 150) {
        newErrors.motivation = 'Please provide at least 150 words for your motivation';
      } else if (motivationWords > 250) {
        newErrors.motivation = 'Please limit your motivation to 250 words maximum';
      }
    }

    if (!formData.problemSolving.trim()) {
      newErrors.problemSolving = 'Please describe a problem AI can help solve';
    } else {
      const problemWords = countWords(formData.problemSolving);
      if (problemWords < 150) {
        newErrors.problemSolving = 'Please provide at least 150 words for this question';
      } else if (problemWords > 250) {
        newErrors.problemSolving = 'Please limit your response to 250 words maximum';
      }
    }

    // Accessibility and Commitment validation
    if (!formData.reliableInternet) {
      newErrors.reliableInternet = 'Please indicate if you have reliable internet access';
    }
    
    if (!formData.programCommitment) {
      newErrors.programCommitment = 'Please confirm your commitment to attend all sessions';
    }
    
    if (!formData.acceptProgramEmails) {
      newErrors.acceptProgramEmails = 'You must accept receiving program-related communications';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Final validation before submission
    if (!validateAllFields()) {
      // Scroll to first error or go to first phase with errors
      setCurrentPhase(1);
      return;
    }
    
    // Show confirmation dialog first
    setShowConfirmDialog(true);
  };

  const confirmSubmission = async () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);
    
    try {
      // Prepare data for Supabase
      const registrationData: RegistrationData = {
        full_name: formData.fullName,
        date_of_birth: formData.dateOfBirth,
        email: formData.email,
        city: formData.city,
        country: formData.country,
        phone: formData.phone,
        education_level: formData.grade,
        current_school: formData.currentSchool,
        used_ai_tools: formData.usedAITools,
        ai_experience: formData.aiExperience || '',
        motivation: formData.motivation,
        problem_solving: formData.problemSolving,
        reliable_internet: formData.reliableInternet,
        program_commitment: formData.programCommitment,
        additional_information: formData.additionalInformation || '',
        accept_program_emails: formData.acceptProgramEmails,
        subscribe_newsletter: formData.subscribeNewsletter
      };

      const result = await submitRegistration(registrationData);
      
      if (result.success) {
        // Show success message and reset form
        setShowSuccessMessage(true);
        // Clear localStorage
        localStorage.removeItem('talaqai-registration-form');
        // Reset form
        setFormData({
          fullName: '',
          dateOfBirth: '',
          email: '',
          city: '',
          country: '',
          phone: '',
          currentSchool: '',
          grade: '',
          usedAITools: '',
          aiExperience: '',
          motivation: '',
          problemSolving: '',
          reliableInternet: '',
          programCommitment: '',
          additionalInformation: '',
          acceptProgramEmails: false,
          subscribeNewsletter: false
        });
        setCurrentPhase(1);
      } else {
        console.error('Submission error details:', result.error);
        alert(`There was an error submitting your application: ${result.error?.message || 'Unknown error'}. Please try again.`);
      }
    } catch (error) {
      console.error('Unexpected error details:', error);
      alert(`There was an unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPhase = () => {
    switch (currentPhase) {
      case 1:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Section 1: Personal Information</h3>
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-white/90 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white"
                />
                {errors.dateOfBirth && (
                  <p className="mt-2 text-sm text-red-400">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-white/90 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60"
                  placeholder="Your city"
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-400">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-white/90 mb-2">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white"
                >
                  <option value="" className="bg-slate-800">Select your country</option>
                  {MENA_COUNTRIES.map(country => (
                    <option key={country} value={country} className="bg-slate-800">
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-2 text-sm text-red-400">{errors.country}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60"
                placeholder={formData.country && COUNTRY_CODES[formData.country as keyof typeof COUNTRY_CODES] 
                  ? `${COUNTRY_CODES[formData.country as keyof typeof COUNTRY_CODES]} XXXXXXXXX`
                  : "Please select your country first"
                }
                disabled={!formData.country}
              />
              {formData.country && (
                <p className="mt-1 text-xs text-white/60">
                  Country code ({COUNTRY_CODES[formData.country as keyof typeof COUNTRY_CODES]}) is automatically added
                </p>
              )}
              {errors.phone && (
                <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentSchool" className="block text-sm font-medium text-white/90 mb-2">
                  Current School *
                </label>
                <input
                  type="text"
                  id="currentSchool"
                  name="currentSchool"
                  required
                  value={formData.currentSchool}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60"
                  placeholder="Your high school name"
                />
                {errors.currentSchool && (
                  <p className="mt-2 text-sm text-red-400">{errors.currentSchool}</p>
                )}
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-white/90 mb-2">
                  Grade *
                </label>
                <select
                  id="grade"
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white"
                >
                  <option value="" className="bg-slate-800">Select your grade/level</option>
                  <option value="9" className="bg-slate-800">Grade 9</option>
                  <option value="10" className="bg-slate-800">Grade 10</option>
                  <option value="11" className="bg-slate-800">Grade 11</option>
                  <option value="12" className="bg-slate-800">Grade 12</option>
                  <option value="undergraduate" className="bg-slate-800">Undergraduate</option>
                </select>
                {errors.grade && (
                  <p className="mt-2 text-sm text-red-400">{errors.grade}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Section 2: Motivation and Goals</h3>
            
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-white/90 mb-2">
                Why do you want to join this AI education program? What are your goals? 
                Please explain in 150-250 words. *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                required
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 resize-none"
                placeholder="Share your motivation and goals for joining the program..."
              />
              <div className="text-right text-white/60 text-xs mt-1">
                {countWords(formData.motivation)} words (150-250 required) {countWords(formData.motivation) >= 150 && countWords(formData.motivation) <= 250 ? '✓' : ''}
              </div>
              {errors.motivation && (
                <p className="mt-2 text-sm text-red-400">{errors.motivation}</p>
              )}
            </div>

            <div>
              <label htmlFor="problemSolving" className="block text-sm font-medium text-white/90 mb-2">
                Describe a problem or challenge you think AI and automation can help solve in your community or school. 
                (150-250 words) *
              </label>
              <textarea
                id="problemSolving"
                name="problemSolving"
                required
                value={formData.problemSolving}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 resize-none"
                placeholder="Describe a problem you think AI can help solve..."
              />
              <div className="text-right text-white/60 text-xs mt-1">
                {countWords(formData.problemSolving)} words (150-250 required) {countWords(formData.problemSolving) >= 150 && countWords(formData.problemSolving) <= 250 ? '✓' : ''}
              </div>
              {errors.problemSolving && (
                <p className="mt-2 text-sm text-red-400">{errors.problemSolving}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Section 3: Educational Background and Experience</h3>
            
            <div>
              <label htmlFor="usedAITools" className="block text-sm font-medium text-white/90 mb-2">
                Have you used any AI automations before? *
              </label>
              <select
                id="usedAITools"
                name="usedAITools"
                required
                value={formData.usedAITools}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white"
              >
                <option value="" className="bg-slate-800">Select an option</option>
                <option value="yes" className="bg-slate-800">Yes</option>
                <option value="no" className="bg-slate-800">No</option>
              </select>
              {errors.usedAITools && (
                <p className="mt-2 text-sm text-red-400">{errors.usedAITools}</p>
              )}
            </div>

            {/* Conditional AI Experience Question - Only show if user has used AI tools */}
            {formData.usedAITools === 'yes' && (
              <div>
                <label htmlFor="aiExperience" className="block text-sm font-medium text-white/90 mb-2">
                  Briefly describe your experience with AI or programming (maximum 1000 words) *
                </label>
                <textarea
                  id="aiExperience"
                  name="aiExperience"
                  required={formData.usedAITools === 'yes'}
                  value={formData.aiExperience}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 resize-none"
                  placeholder="Describe your experience with AI, programming, or automation tools..."
                />
                <div className="text-right text-white/60 text-xs mt-1">
                  {countWords(formData.aiExperience)} words (max 1000) {countWords(formData.aiExperience) <= 1000 ? '✓' : ''}
                </div>
                {errors.aiExperience && (
                  <p className="mt-2 text-sm text-red-400">{errors.aiExperience}</p>
                )}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Section 4: Accessibility and Commitment</h3>
            
            <div>
              <label htmlFor="reliableInternet" className="block text-sm font-medium text-white/90 mb-2">
                Do you have reliable internet access to attend online sessions? *
              </label>
              <select
                id="reliableInternet"
                name="reliableInternet"
                required
                value={formData.reliableInternet}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white"
              >
                <option value="" className="bg-slate-800">Select an option</option>
                <option value="yes" className="bg-slate-800">Yes, I have reliable internet access</option>
                <option value="no" className="bg-slate-800">No, my internet connection is unstable</option>
              </select>
              {errors.reliableInternet && (
                <p className="mt-2 text-sm text-red-400">{errors.reliableInternet}</p>
              )}
            </div>

            <div>
              <label htmlFor="programCommitment" className="block text-sm font-medium text-white/90 mb-2">
                Can you commit to attending all 8 sessions of the program (approximately 16 hours total)? *
              </label>
              <select
                id="programCommitment"
                name="programCommitment"
                required
                value={formData.programCommitment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white"
              >
                <option value="" className="bg-slate-800">Select an option</option>
                <option value="yes" className="bg-slate-800">Yes, I can commit to all sessions</option>
                <option value="mostly" className="bg-slate-800">I can attend most sessions (6-7 sessions)</option>
                <option value="unsure" className="bg-slate-800">I'm not sure about my availability</option>
              </select>
              {errors.programCommitment && (
                <p className="mt-2 text-sm text-red-400">{errors.programCommitment}</p>
              )}
            </div>

            <div>
              <label htmlFor="additionalInformation" className="block text-sm font-medium text-white/90 mb-2">
                Additional Information (Optional)
              </label>
              <textarea
                id="additionalInformation"
                name="additionalInformation"
                value={formData.additionalInformation}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 resize-none"
                placeholder="Share anything else you'd like us to know about your background, interests, or expectations..."
              />
              <div className="text-xs text-white/60 mt-1">
                You may include any special accommodations, learning preferences, or other relevant information.
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white mb-4">Communication Preferences</h4>
              
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="acceptProgramEmails"
                  name="acceptProgramEmails"
                  checked={formData.acceptProgramEmails}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-cyan-500 bg-transparent border-2 border-white/30 rounded focus:ring-cyan-400 focus:ring-2"
                  required
                />
                <label htmlFor="acceptProgramEmails" className="text-sm text-white/90 leading-relaxed">
                  <span className="font-medium">I accept receiving program-related communications *</span>
                  <br />
                  <span className="text-white/70 text-xs">
                    This includes application updates, program announcements, session reminders, and important information about your participation.
                  </span>
                </label>
              </div>
              {errors.acceptProgramEmails && (
                <p className="text-sm text-red-400">{errors.acceptProgramEmails}</p>
              )}

              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="mt-1 w-5 h-5 text-cyan-500 bg-transparent border-2 border-white/30 rounded focus:ring-cyan-400 focus:ring-2"
                />
                <label htmlFor="subscribeNewsletter" className="text-sm text-white/90 leading-relaxed">
                  <span className="font-medium">Subscribe to our newsletter (Optional)</span>
                  <br />
                  <span className="text-white/70 text-xs">
                    Receive updates about future programs, AI education resources, and community highlights.
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="JoinProgram" className="min-h-screen relative overflow-hidden">
      {/* Form Closed Message */}
      {isFormClosed && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md w-full text-center">
            <div className="text-6xl mb-4">⏰</div>
            <h3 className="text-2xl font-bold text-white mb-4">Registration Closed</h3>
            <p className="text-white/80 mb-6">
              The registration period for the Telqai AI Program has ended on October 8, 2025. 
              Thank you for your interest! Please stay tuned for future program announcements.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 scale-150 transform-gpu">
        <div className="w-full h-full relative">
          <Spline 
            scene="https://prod.spline.design/pIJQq1X3VycnDOfe/scene.splinecode"
            style={{
              width: '100%',
              height: '100%',
              transform: 'scale(1.5) translateZ(0)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      </div>

      {/* Reduced dark overlay for better 3D visibility */}
      <div className="absolute inset-0 bg-black/25 z-10"></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col pt-20 sm:pt-24 pb-8 sm:pb-16">
        {/* Header with Back Button */}
        <div className="p-6">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-cyan-400 transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-['Plus_Jakarta_Sans']">
            Join Telqai Program
          </h1>
          <p className="text-cyan-300 text-base md:text-lg mb-4">Application Deadline Countdown</p>
          <div className="flex justify-center space-x-3 md:space-x-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15 w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center">
              <div className="text-xl md:text-2xl font-bold text-cyan-400 leading-none">{countdown.days}</div>
              <div className="text-white/70 text-xs mt-1 font-medium">Days</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15 w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center">
              <div className="text-xl md:text-2xl font-bold text-cyan-400 leading-none">{countdown.hours}</div>
              <div className="text-white/70 text-xs mt-1 font-medium">Hours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15 w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center">
              <div className="text-xl md:text-2xl font-bold text-cyan-400 leading-none">{countdown.minutes}</div>
              <div className="text-white/70 text-xs mt-1 font-medium">Minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15 w-16 h-20 md:w-20 md:h-24 flex flex-col items-center justify-center">
              <div className="text-xl md:text-2xl font-bold text-cyan-400 leading-none">{countdown.seconds}</div>
              <div className="text-white/70 text-xs mt-1 font-medium">Seconds</div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-start justify-center px-6 sm:px-8 lg:px-12 py-8 md:py-12">
          <div className="w-full max-w-3xl">
            {/* Progress Indicator */}
            <div className="mb-8">
              {/* Desktop Progress Bar */}
              <div className="hidden md:flex justify-between items-center mb-4">
                {[
                  { num: 1, name: 'Personal Info' },
                  { num: 2, name: 'Motivation' },
                  { num: 3, name: 'Background' },
                  { num: 4, name: 'Commitment' }
                ].map((phase) => (
                  <div key={phase.num} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                          currentPhase >= phase.num
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/20 text-white/60'
                        }`}
                      >
                        {phase.num}
                      </div>
                      <span className={`text-xs mt-2 transition-all duration-300 ${
                        currentPhase >= phase.num ? 'text-cyan-400 font-medium' : 'text-white/60'
                      }`}>
                        {phase.name}
                      </span>
                    </div>
                    {phase.num < 4 && (
                      <div
                        className={`w-20 h-1 mx-4 transition-all duration-300 ${
                          currentPhase > phase.num ? 'bg-cyan-500' : 'bg-white/20'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile Progress Bar */}
              <div className="md:hidden mb-4">
                <div className="flex justify-center items-center space-x-2 mb-3">
                  {[1, 2, 3, 4].map((phase) => (
                    <div
                      key={phase}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        currentPhase >= phase
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/20 text-white/60'
                      }`}
                    >
                      {phase}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPhase / 4) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-center text-white/80 text-sm">
                Section {currentPhase} of 4: {
                  currentPhase === 1 ? 'Personal Information' :
                  currentPhase === 2 ? 'Motivation and Goals' :
                  currentPhase === 3 ? 'Educational Background' :
                  'Accessibility and Commitment'
                }
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-10 md:p-12 border border-white/20">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="px-2">
                  {renderPhase()}
                </div>

                {/* Privacy Notice and Application Note */}
                {currentPhase === 4 && (
                  <div className="bg-blue-500/10 mt-10 border border-blue-400/30 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-400 mt-1">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-sm text-white/90 leading-relaxed">
                        <p className="font-semibold text-white mb-2">Application Review Process</p>
                        <p className="mb-3">
                          Your application will be reviewed by our admissions committee. Due to limited spots, 
                          we carefully evaluate each application based on motivation, commitment, and program fit.
                        </p>
                        <p className="text-white/80 text-xs">
                          <span className="font-medium">Privacy:</span> Your personal information will be kept confidential and used only for program purposes. 
                          We do not share your data with third parties. You can request data deletion at any time by contacting us.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0 mt-12 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={prevPhase}
                    disabled={currentPhase === 1}
                    className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      currentPhase === 1
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    Previous
                  </button>

                  {currentPhase < 4 ? (
                    <button
                      type="button"
                      onClick={nextPhase}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Next Section
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-8 py-4 bg-gradient-to-r font-semibold rounded-xl transition-all duration-300 transform ${
                        isSubmitting 
                          ? 'from-gray-500 to-gray-600 cursor-not-allowed' 
                          : 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105'
                      } text-white`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Review & Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 max-w-lg w-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Confirm Submission</h3>
              <p className="text-white/80 text-sm">
                Are you ready to submit your application? Please review all your information before confirming.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 mb-6 text-sm text-white/80">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Name: {formData.fullName}</div>
                <div>Email: {formData.email}</div>
                <div>Country: {formData.country}</div>
                <div>Grade: {formData.grade}</div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-4 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Review Again
              </button>
              <button
                onClick={confirmSubmission}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 max-w-lg w-full text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Application Submitted Successfully!</h3>
            <div className="text-white/80 mb-6 text-left space-y-3">
              <p>
                <strong>Thank you for applying to the TelqAI Program!</strong> We have received your application and our admissions team will review it carefully.
              </p>
              <div className="bg-white/5 rounded-lg p-4 text-sm">
                <p className="font-semibold text-white mb-2">What happens next?</p>
                <ul className="space-y-1 text-white/70">
                  <li>• Review period: 3-5 business days</li>
                  <li>• You'll receive an email confirmation shortly</li>
                  <li>• Selected candidates will be contacted for next steps</li>
                  <li>• Program starts soon - stay tuned!</li>
                </ul>
              </div>
              <p className="text-sm text-white/60">
                Check your email (including spam folder) for updates. If you have questions, contact us at telqAI@stemcsclub.org
              </p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default JoinProgram;
