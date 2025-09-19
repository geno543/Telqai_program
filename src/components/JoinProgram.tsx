import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { submitRegistration, type RegistrationData } from '../lib/supabase';

const JoinProgram: React.FC = () => {
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
      accommodations: ''
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isFormClosed, setIsFormClosed] = useState(false);

  // Form deadline: October 5, 2025 in Egypt time (UTC+2)
  useEffect(() => {
    const formDeadline = new Date('2025-10-05T23:59:59+02:00'); // October 5, 2025 11:59 PM Egypt time
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(updatedFormData);
    
    // Save to localStorage
    localStorage.setItem('talaqai-registration-form', JSON.stringify(updatedFormData));
  };

  // Helper function to count words
  const countWords = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  // Validation function for each phase
  const validateCurrentPhase = () => {
    switch (currentPhase) {
      case 1:
        // Personal Information validation
        if (!formData.fullName.trim()) {
          alert('Please enter your full name.');
          return false;
        }
        if (!formData.dateOfBirth) {
          alert('Please enter your date of birth.');
          return false;
        }
        if (!formData.email.trim()) {
          alert('Please enter your email address.');
          return false;
        }
        if (!formData.city.trim()) {
          alert('Please enter your city.');
          return false;
        }
        if (!formData.country.trim()) {
          alert('Please enter your country.');
          return false;
        }
        if (!formData.phone.trim()) {
          alert('Please enter your phone number.');
          return false;
        }
        if (!formData.currentSchool.trim()) {
          alert('Please enter your current school.');
          return false;
        }
        if (!formData.grade) {
          alert('Please select your grade.');
          return false;
        }
        return true;

      case 2:
        // Educational Background validation
        if (!formData.usedAITools) {
          alert('Please select whether you have used AI tools before.');
          return false;
        }
        if (!formData.aiExperience.trim()) {
          alert('Please describe your AI/programming experience.');
          return false;
        }
        if (countWords(formData.aiExperience) > 200) {
          alert('Please limit your AI experience description to 200 words maximum.');
          return false;
        }
        return true;

      case 3:
        // Motivation and Goals validation
        if (!formData.motivation.trim()) {
          alert('Please explain your motivation for joining the program.');
          return false;
        }
        if (countWords(formData.motivation) < 150) {
          alert('Please provide at least 150 words for your motivation.');
          return false;
        }
        if (!formData.problemSolving.trim()) {
          alert('Please describe a problem AI can help solve.');
          return false;
        }
        if (countWords(formData.problemSolving) < 150) {
          alert('Please provide at least 150 words for the problem-solving question.');
          return false;
        }
        return true;

      case 4:
        // Accessibility validation
        if (!formData.reliableInternet) {
          alert('Please indicate if you have reliable internet access.');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextPhase = () => {
    if (validateCurrentPhase() && currentPhase < 4) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const prevPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Final validation before submission
    if (!validateCurrentPhase()) {
      return;
    }
    
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
        field_of_study: formData.currentSchool,
        current_occupation: formData.currentSchool, // Using school as occupation for students
        used_ai_tools: formData.usedAITools,
        ai_experience: formData.aiExperience,
        motivation: formData.motivation,
        problem_solving: formData.problemSolving,
        reliable_internet: formData.reliableInternet,
        accommodations: formData.accommodations,
        commitment_confirmation: formData.fullName // Using full name as commitment confirmation
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
          accommodations: ''
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
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Section 1: Personal Information</h3>
            
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
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-white/90 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60"
                  placeholder="Your country"
                />
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
                placeholder="Your phone number"
              />
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
                  <option value="" className="bg-slate-800">Select your grade</option>
                  <option value="9" className="bg-slate-800">Grade 9</option>
                  <option value="10" className="bg-slate-800">Grade 10</option>
                  <option value="11" className="bg-slate-800">Grade 11</option>
                  <option value="12" className="bg-slate-800">Grade 12</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Section 2: Educational Background and Experience</h3>
            
            <div>
              <label htmlFor="usedAITools" className="block text-sm font-medium text-white/90 mb-2">
                Have you used any AI or automation tools before? *
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
            </div>

            <div>
              <label htmlFor="aiExperience" className="block text-sm font-medium text-white/90 mb-2">
                Briefly describe your experience with AI or programming (maximum 200 words) *
              </label>
              <textarea
                id="aiExperience"
                name="aiExperience"
                required
                value={formData.aiExperience}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 resize-none"
                placeholder="Describe your experience with AI, programming, or automation tools..."
              />
              <div className="text-right text-white/60 text-xs mt-1">
                {formData.aiExperience.trim() === '' ? 0 : formData.aiExperience.trim().split(/\s+/).length}/200 words
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Section 3: Motivation and Goals</h3>
            
            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-white/90 mb-2">
                Why do you want to join the Telqai program, and what skills or knowledge do you hope to gain? 
                Please explain in at least 150 words. *
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
                {formData.motivation.trim() === '' ? 0 : formData.motivation.trim().split(/\s+/).length} words {formData.motivation.trim() === '' || formData.motivation.trim().split(/\s+/).length >= 150 ? '✓' : '(minimum 150)'}
              </div>
            </div>

            <div>
              <label htmlFor="problemSolving" className="block text-sm font-medium text-white/90 mb-2">
                Describe a problem or challenge you think AI and automation can help solve in your community or school. 
                (Minimum 150 words) *
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
                {formData.problemSolving.trim() === '' ? 0 : formData.problemSolving.trim().split(/\s+/).length} words {formData.problemSolving.trim() === '' || formData.problemSolving.trim().split(/\s+/).length >= 150 ? '✓' : '(minimum 150)'}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Section 4: Accessibility and Commitment</h3>
            
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
                <option value="yes" className="bg-slate-800">Yes</option>
                <option value="no" className="bg-slate-800">No</option>
              </select>
            </div>

            <div>
              <label htmlFor="accommodations" className="block text-sm font-medium text-white/90 mb-2">
                Are there any accommodations or support you may need? (Optional)
              </label>
              <textarea
                id="accommodations"
                name="accommodations"
                value={formData.accommodations}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white placeholder-white/60 resize-none"
                placeholder="Describe any accommodations or support you may need..."
              />
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
              The registration period for the Telqai AI Program has ended on October 5, 2025. 
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
          <div className="flex justify-center space-x-2 md:space-x-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-cyan-400">{countdown.days}</div>
              <div className="text-white/70 text-xs">Days</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-cyan-400">{countdown.hours}</div>
              <div className="text-white/70 text-xs">Hours</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-cyan-400">{countdown.minutes}</div>
              <div className="text-white/70 text-xs">Minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/20">
              <div className="text-lg md:text-xl font-bold text-cyan-400">{countdown.seconds}</div>
              <div className="text-white/70 text-xs">Seconds</div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="w-full max-w-2xl">
            {/* Progress Indicator */}
            <div className="mb-8">
              {/* Desktop Progress Bar */}
              <div className="hidden md:flex justify-between items-center mb-4">
                {[1, 2, 3, 4].map((phase) => (
                  <div key={phase} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentPhase >= phase
                          ? 'bg-cyan-500 text-white'
                          : 'bg-white/20 text-white/60'
                      }`}
                    >
                      {phase}
                    </div>
                    {phase < 4 && (
                      <div
                        className={`w-20 h-1 mx-2 transition-all duration-300 ${
                          currentPhase > phase ? 'bg-cyan-500' : 'bg-white/20'
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
                  currentPhase === 2 ? 'Educational Background' :
                  currentPhase === 3 ? 'Motivation and Goals' :
                  'Accessibility and Commitment'
                }
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <form onSubmit={currentPhase === 4 ? handleSubmit : (e) => e.preventDefault()}>
                {renderPhase()}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8">
                  <button
                    type="button"
                    onClick={prevPhase}
                    disabled={currentPhase === 1}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
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
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Next Section
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r font-semibold rounded-xl transition-all duration-300 transform ${
                        isSubmitting 
                          ? 'from-gray-500 to-gray-600 cursor-not-allowed' 
                          : 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105'
                      } text-white`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md w-full text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
            <p className="text-white/80 mb-6">
              Thank you for applying to the Telqai AI Program! We have received your application and will review it carefully. 
              You will hear from us soon with next steps.
            </p>
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
};

export default JoinProgram;
