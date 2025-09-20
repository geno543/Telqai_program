import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

const Navigation: React.FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-3 left-3 right-3 z-50 transition-all duration-700 rounded-2xl ${
        isScrolled ? 'py-1' : 'py-2'
      }`}>
      {/* Modern glassmorphism background with rounded edges */}
      <div className={`absolute inset-0 transition-all duration-700 rounded-2xl border border-white/20 dark:border-slate-700/30 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/70 dark:bg-slate-900/70' 
          : 'backdrop-blur-lg bg-white/50 dark:bg-slate-900/50'
      }`} style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}>
        {/* Enhanced gradient overlay with rounded edges */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
          isScrolled
            ? 'bg-gradient-to-r from-white/60 via-slate-50/70 to-white/60 dark:from-slate-900/70 dark:via-slate-800/60 dark:to-slate-900/70'
            : 'bg-gradient-to-r from-white/40 via-slate-50/50 to-white/40 dark:from-slate-900/50 dark:via-slate-800/40 dark:to-slate-900/50'
        }`}></div>
        
        {/* Modern animated border */}
        <div className={`absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-700 ${
          isScrolled 
            ? 'bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent dark:via-cyan-600/60' 
            : 'bg-transparent'
        }`}></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-2 left-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-3 right-1/3 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-blue-400/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo with cyan color transformation */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <img 
                src="/logo_program/logo_program_dark-removebg-preview.png" 
                alt="Telqai Logo"
                className="w-28 h-28 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg"
              
              />
            </div>
          </div>

          {/* Desktop Navigation - more compact */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 font-medium group rounded-lg text-sm"
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Modern hover effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/40" style={{
                  boxShadow: '0 2px 8px rgba(79, 70, 229, 0.15)'
                }}></div>
                
                {/* Animated underline */}
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 transition-all duration-300 group-hover:w-3/4 group-hover:left-1/2 group-hover:-translate-x-1/2 rounded-full"></span>
              </button>
            ))}
            
            {/* Dark Mode Toggle - compact */}
            <button
              onClick={toggleDarkMode}
              className="relative p-2 rounded-lg transition-all duration-300 group ml-3 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/50"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>

            {/* CTA Button - compact */}
            <Link
              to="/join-program"
              className="relative px-4 py-2 ml-3 rounded-lg font-semibold transition-all duration-300 group overflow-hidden bg-gradient-to-r from-cyan-400 to-cyan-500 text-white hover:from-cyan-500 hover:to-cyan-600 text-sm inline-block"
              style={{
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
            >
              <span className="relative z-10">Join Program</span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Mobile Menu Controls - compact */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-all duration-300 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/50"
              style={{
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
              }}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Toggle - compact */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-all duration-300 bg-white/30 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-slate-700/50 hover:bg-white/40 dark:hover:bg-slate-800/50"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <svg className={`w-5 h-5 text-slate-700 dark:text-slate-300 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-6">
            {/* Glassmorphism container */}
            <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 border border-white/30 dark:border-slate-700/40" style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 font-medium rounded-xl hover:bg-white/30 dark:hover:bg-slate-800/30"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile CTA Button */}
                <Link
                  to="/join-program"
                  className="block w-full text-center px-4 py-3 mt-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 hover:from-cyan-500 hover:to-cyan-600"
                  style={{
                    boxShadow: '0 4px 16px rgba(79, 70, 229, 0.2)'
                  }}
                >
                  Join Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
