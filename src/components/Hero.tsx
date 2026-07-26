import React, { memo, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Hero: React.FC = memo(() => {
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0718] film-grain circuit-grid">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-br from-navy via-navy-50 to-violet-dark" />
        }>
          <Spline
            scene="https://prod.spline.design/cphhsMWDnoBs2mjl/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/20 to-navy/70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-navy/40 pointer-events-none"></div>
      </div>

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 left-[10%] w-3 h-3 bg-cyan rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 right-[15%] w-2 h-2 bg-magenta rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-[20%] w-2 h-2 bg-purple rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>

      {/* Circuit-board decorative traces */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        {/* Left cluster */}
        <polyline points="0,120 80,120 80,200 160,200 160,280 120,280" fill="none" stroke="#21D3F3" strokeWidth="1" />
        <circle cx="80" cy="120" r="3" fill="none" stroke="#21D3F3" strokeWidth="1" />
        <circle cx="160" cy="200" r="3" fill="none" stroke="#21D3F3" strokeWidth="1" />
        <circle cx="120" cy="280" r="2.5" fill="none" stroke="#21D3F3" strokeWidth="0.8" />
        {/* Right cluster */}
        <polyline points="100%,180 85%,180 85%,260 75%,260 75%,340 80%,340" fill="none" stroke="#21D3F3" strokeWidth="1" />
        <circle cx="85%" cy="180" r="3" fill="none" stroke="#21D3F3" strokeWidth="1" />
        <circle cx="75%" cy="260" r="3" fill="none" stroke="#21D3F3" strokeWidth="1" />
        {/* Bottom traces */}
        <polyline points="30%,100% 30%,90% 45%,90% 45%,85% 55%,85% 55%,90% 70%,90% 70%,100%" fill="none" stroke="#21D3F3" strokeWidth="0.8" />
        <circle cx="30%" cy="90%" r="2" fill="none" stroke="#21D3F3" strokeWidth="0.8" />
        <circle cx="70%" cy="90%" r="2" fill="none" stroke="#21D3F3" strokeWidth="0.8" />
      </svg>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center min-h-[85vh] py-20">
          <div className="text-center space-y-8 max-w-5xl">
            {/* Animated badge */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan"></span>
                </span>
                AI Automation Program for Arab High Schoolers & Undergraduates
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-white leading-[1.1] tracking-tight font-display"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
              >
                <span className="block">Elevate Your</span>
                <span className="block mt-2">
                  <span className="bg-gradient-to-r from-cyan via-cyan-300 to-purple bg-clip-text text-transparent">
                    AI Skills
                  </span>
                </span>
              </h1>

              <div className="max-w-3xl mx-auto">
                <p className="text-lg lg:text-xl text-white/70 leading-relaxed font-light">
                  Master AI automation with n8n and AI agents in our intensive program designed for Arab students ready to shape the future.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/join"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 overflow-hidden"
              >
                {/* Button gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan via-purple to-magenta rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan via-purple to-magenta rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-xl border border-white/20"></div>
                <span className="relative z-10">Join Program</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <button
                onClick={() => scrollToSection('#about')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Explore Program</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              {[
                { value: '+8', label: 'Sessions Total' },
                { value: '+4', label: 'Week Program' },
                { value: '+2h', label: 'Per Session' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-5 text-center rounded-xl hover:border-white/20 transition-all duration-300">
                    <div className="text-3xl font-bold text-white mb-1 font-display" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-navy to-transparent pointer-events-none z-10"></div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
