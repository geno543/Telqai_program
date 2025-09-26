import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const Hero: React.FC = memo(() => {
  const scrollToSection = useMemo(() => (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Memoize the Spline component props to prevent unnecessary re-renders
  const splineProps = useMemo(() => ({
    scene: "https://prod.spline.design/cphhsMWDnoBs2mjl/scene.splinecode",
    style: { width: '100%', height: '100%' }
  }), []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
      {/* 3D Spline Background */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene={splineProps.scene}
          style={splineProps.style}
        />
        {/* Reduced overlay for better text readability without heavy blur */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
        
        {/* Custom Hero-specific Box replacing watermark */}
        <div className="absolute bottom-4 right-4 z-[999]">
          <Link 
            to="/join"
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 max-w-xs hover-lift group transition-all duration-300 hover:scale-105 shadow-lg border border-white/20 block"
          >
            <div className="flex items-center space-x-2">
              {/* AI Education Icon */}
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              {/* Message */}
              <div className="text-xs text-slate-800 dark:text-slate-200 leading-tight">
                <div className="font-semibold text-cyan-400 dark:text-cyan-400">Apply Now</div>
                <div className="opacity-80">AI Automation Program</div>
              </div>
            </div>
            {/* Progress indicator */}
            <div className="flex space-x-1 mt-2 justify-end">
              <div className="w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content - No Box, Clean Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="relative max-w-6xl w-full">
            
            {/* Main Content - Clean, No Background Box */}
            <div className="relative">
              <div className="text-center space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-medium shadow-lg">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                  AI Automation Program for Arab High Schoolers & Undergraduates
                </div>

                {/* Main Heading with enhanced readability */}
                <div className="space-y-6">
                  <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight font-['Plus_Jakarta_Sans']" 
                      style={{ 
                        textShadow: '0 4px 8px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text'
                      }}>
                    Elevate Your
                    <br />
                    <span className="text-cyan-300" style={{ textShadow: '0 4px 8px rgba(25,205,250,0.4), 0 2px 4px rgba(25,205,250,0.2)' }}>
                      AI Skills
                    </span>
                  </h1>
                  
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-4xl">
                    <p className="text-xl lg:text-2xl text-white/95 leading-relaxed font-light">
                      Master AI automation with n8n and AI agents in our 4-week intensive program designed specifically for Arab high school and university students.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/join"
                    className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 px-8 py-4 rounded-2xl text-white font-semibold text-lg hover-lift ripple-effect group transition-smooth flex items-center justify-center space-x-3 shadow-xl border border-white/20"
                  >
                    <span>Join Program</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  
                  <button
                    onClick={() => scrollToSection('#about')}
                    className="bg-white/25 backdrop-blur-md border border-white/40 text-white hover:bg-white/35 px-8 py-4 rounded-2xl font-semibold text-lg hover-lift hover-glow transition-smooth group flex items-center justify-center space-x-3 shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Explore Program</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards - Enhanced readability */}
            <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white/25 backdrop-blur-md border border-white/40 p-6 text-center hover-lift transition-smooth rounded-2xl shadow-xl">
                <div className="text-4xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>+8</div>
                <div className="text-white/90 font-medium">Sessions Total</div>
              </div>

              {/* Card 2 */}
              <div className="bg-white/25 backdrop-blur-md border border-white/40 p-6 text-center hover-lift transition-smooth rounded-2xl shadow-xl">
                <div className="text-4xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>+4</div>
                <div className="text-white/90 font-medium">Week Program</div>
              </div>

              {/* Card 3 */}
              <div className="bg-white/25 backdrop-blur-md border border-white/40 p-6 text-center hover-lift transition-smooth rounded-2xl shadow-xl">
                <div className="text-4xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>+2h</div>
                <div className="text-white/90 font-medium">Per Session</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
