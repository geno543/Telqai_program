import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import telqaiLogo from '../assets/logos/telqai logo.png';

const Navigation: React.FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
      isScrolled ? 'top-2 left-2 right-2' : ''
    }`}>
      <div className={`absolute inset-0 transition-all duration-500 rounded-2xl border border-white/[0.08] ${
        isScrolled
          ? 'backdrop-blur-2xl bg-navy/70 shadow-xl shadow-black/10'
          : 'backdrop-blur-xl bg-navy/40'
      }`}>
        {/* Top accent glow when scrolled */}
        <div className={`absolute -top-px left-8 right-8 h-px transition-all duration-700 rounded-full ${
          isScrolled
            ? 'bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-100'
            : 'opacity-0'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center group cursor-pointer"
          >
            <img
              src={telqaiLogo}
              alt="Telqai Logo"
              className="h-12 object-contain transition-all duration-300 group-hover:scale-105"
              loading="eager"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="relative px-4 py-2 text-white/60 hover:text-white transition-all duration-300 font-medium group rounded-lg text-sm"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/5"></div>
                <span className="absolute bottom-1 left-1/2 w-0 h-px bg-gradient-to-r from-cyan to-purple transition-all duration-300 group-hover:w-2/3 group-hover:left-[16.67%] rounded-full"></span>
              </button>
            ))}

            {/* Separator */}
            <div className="w-px h-6 bg-white/10 mx-2"></div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/5 text-white/50 hover:text-white/80"
            >
              {isDarkMode ? (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* CTA Button */}
            <Link
              to="/join"
              className="group relative ml-1 px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
              <span className="relative z-10 text-white">Join Program</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/5 text-white/50"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-white/5 text-white/70"
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-400 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-5">
            <div className="bg-navy/90 backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-4 shadow-xl">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-white/60 hover:text-white transition-all duration-300 font-medium rounded-xl hover:bg-white/5"
                  >
                    {item.label}
                  </button>
                ))}

                <Link
                  to="/join"
                  className="block w-full text-center px-4 py-3 mt-3 bg-gradient-to-r from-cyan to-purple text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan/20"
                >
                  Join Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
