import React, { useState, useRef, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Contact: React.FC = memo(() => {
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    interest: ''
  });

  const [errors, setErrors] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: '', interest: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return 'Phone number is required';
    if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) return 'Please enter a valid phone number';
    return '';
  };

  const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) return `${fieldName} is required`;
    return '';
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let error = '';
    switch (name) {
      case 'firstName': error = validateRequired(value, 'First name'); break;
      case 'lastName': error = validateRequired(value, 'Last name'); break;
      case 'email': error = validateEmail(value); break;
      case 'phone': error = validatePhone(value); break;
      case 'message': error = validateRequired(value, 'Message'); break;
      case 'interest': error = validateRequired(value, 'Interest'); break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors = {
      firstName: validateRequired(formData.firstName, 'First name'),
      lastName: validateRequired(formData.lastName, 'Last name'),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateRequired(formData.message, 'Message'),
      interest: validateRequired(formData.interest, 'Interest')
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
        throw new Error('EmailJS configuration missing.');
      }

      await emailjs.sendForm(emailServiceId, emailTemplateId, form.current!, emailPublicKey);
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', interest: '' });
      if (form.current) form.current.reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  }, [formData, validateForm]);

  return (
    <section id="contact" className="py-24 bg-[#0a0718] relative overflow-hidden film-grain">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-magenta/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            <span className="text-slate-800 dark:text-slate-100">Get</span>{' '}
            <span className="bg-gradient-to-r from-cyan to-cyan-600 bg-clip-text text-transparent">In Touch</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            Ready to start your AI journey? Contact us or apply to join the Telqai program designed for Arab high schoolers and undergraduates.
          </p>

          <Link
            to="/join"
            className="inline-flex items-center px-8 py-4 bg-gradient-brand hover:bg-gradient-brand-hover text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-display group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Apply to Join Program
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan to-cyan-600 bg-clip-text text-transparent mb-8 font-display">
                Connect With Our AI Community
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                    title: 'Email Contact',
                    lines: ['telqAI@stemcsclub.org', 'Response within 24 hours'],
                    iconColor: 'text-cyan-500',
                    bgGradient: 'from-cyan-500/10 to-cyan-600/10',
                  },
                  {
                    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                    title: 'Location',
                    lines: ['Online Program', 'Accessible Worldwide'],
                    iconColor: 'text-magenta',
                    bgGradient: 'from-magenta/10 to-purple/10',
                  },
                  {
                    icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                    title: 'Response Time',
                    lines: ['24-48 hours', 'Quick support guaranteed'],
                    iconColor: 'text-violet',
                    bgGradient: 'from-violet/10 to-cyan/10',
                  },
                ].map((item) => (
                  <div key={item.title} className="glass-card rounded-2xl p-6 hover-lift glow-border group">
                    <div className="flex items-start space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.bgGradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${item.iconColor}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-display">{item.title}</h4>
                        {item.lines.map((line, i) => (
                          <p key={i} className="text-slate-500 dark:text-slate-400 text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-magenta to-purple bg-clip-text text-transparent mb-8 font-display">
                Connect With Us
              </h3>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/profile.php?id=100094026166056" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/telqai-program/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-700 hover:bg-blue-800 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/stem_computer_science_club/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-105">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">
                Follow STEM Computer Science Club for updates
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="glass-card rounded-3xl p-10 hover-lift glow-border-intense backdrop-blur-xl animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-display text-2xl font-bold bg-gradient-to-r from-cyan to-cyan-600 bg-clip-text text-transparent mb-8 relative z-10">
              Send Us a Message
            </h3>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-800 dark:text-green-200 font-medium text-sm">
                    Thank you! We'll be in touch soon.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800 dark:text-red-200 font-medium text-sm">
                    Something went wrong. Please try again.
                  </p>
                </div>
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} className="space-y-5 relative z-10" noValidate>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">I am contacting as a:</label>
                <input type="text" name="interest" value={formData.interest} onChange={handleInputChange}
                  className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white ${errors.interest ? 'border-red-500' : ''}`}
                  placeholder="e.g., Student, Partner, Ambassador" required />
                {errors.interest && <p className="mt-1 text-xs text-red-500">{errors.interest}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                    className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white ${errors.firstName ? 'border-red-500' : ''}`} required />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                    className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white ${errors.lastName ? 'border-red-500' : ''}`} required />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white ${errors.email ? 'border-red-500' : ''}`} required />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone (Optional)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white ${errors.phone ? 'border-red-500' : ''}`} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4}
                  className={`glass-input w-full px-4 py-3 rounded-xl text-sm text-slate-900 dark:text-white resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell us how we can help you..." required />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-brand hover:bg-gradient-brand-hover text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : 'Send Message'}
              </button>
            </form>

            <div className="mt-4 p-3 bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/15 rounded-xl relative z-10">
              <p className="text-cyan-700 dark:text-cyan-300 text-sm">
                <strong>Ready to join?</strong> Use our{' '}
                <Link to="/join" className="underline hover:text-cyan-500 transition-colors duration-300">application form</Link>{' '}
                for program enrollment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
