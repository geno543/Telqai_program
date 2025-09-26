import React, { memo } from 'react';

const Footer: React.FC = memo(() => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-transparent to-slate-800"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logos/logo_white.png" 
                alt="Telqai Logo" 
                className="w-40 h-30 object-contain"
              />
            </div>
            <p className="text-slate-300 mb-8 max-w-md leading-relaxed font-light">
              AI automation program organized by STEM Computer Science Club, teaching n8n and AI agents to Arab high school and university students through intensive 4-week training.
            </p>
            <div className="flex space-x-4">
              {/* <a href="https://twitter.com/stem_cs_club" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a> */}
              <a href="https://www.facebook.com/profile.php?id=100094026166056" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/telqai-program/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/stem_computer_science_club/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* <a href="https://www.stemcomputerscienceclub.org/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 hover:bg-green-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 13.8h-3.569v1.2h3.431v1.2H13.8v-6h4.769v1.2H15v1.2h2.568v1.4zm-8.569-3.6H6.2v6h1.2v-2.4h1.6c1.319 0 2.4-1.08 2.4-2.4s-1.081-2.2-2.401-2.2zm0 3.4H7.4v-2.2h1.6c.662 0 1.2.538 1.2 1.1s-.538 1.1-1.201 1.1z"/>
                </svg>
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-600 mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light"
                >
                  About Telqai
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#curriculum')}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light"
                >
                  Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          {/* <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-600 mb-6 text-white">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 block font-light">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-300 text-sm mb-4 md:mb-0 font-light">
              © {currentYear} Telqai. All rights reserved. Empowering the future with AI education.
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <span className="font-light">Made with</span>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="font-light">for the Arab world</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-600 to-slate-700 rounded-xl flex items-center justify-center text-white shadow-luxury hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 border border-white/10 backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
