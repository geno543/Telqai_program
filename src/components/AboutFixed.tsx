import React from 'react';

const About: React.FC = () => {
  const features = [
    {
      title: 'No-Code Innovation',
      description: 'Learn to build powerful AI solutions without traditional programming, making advanced technology accessible to everyone.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Real-World Applications',
      description: 'Apply your skills to solve authentic challenges in business, education, and social impact initiatives.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
    },
    {
      title: 'Expert Mentorship',
      description: 'Learn from industry professionals who provide personalized guidance throughout your learning journey.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Global Community',
      description: 'Join a network of ambitious learners and innovators from across the Arab world and beyond.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden min-h-screen">
      {/* Multi-layered animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/95 to-indigo-50/90 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-indigo-950/95"></div>
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-50/20 to-violet-50/30 dark:from-transparent dark:via-indigo-950/20 dark:to-violet-950/30"></div>
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full blur-2xl animate-pulse-glow"></div>
        </div>
        
        {/* Geometric accent shapes */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-indigo-200/40 to-violet-200/40 dark:from-indigo-800/40 dark:to-violet-800/40 transform rotate-45 animate-float opacity-70" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-violet-200/40 to-blue-200/40 dark:from-violet-800/40 dark:to-blue-800/40 rounded-full animate-float-reverse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 dark:from-blue-800/40 dark:to-indigo-800/40 transform rotate-12 animate-float opacity-50" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
        
        {/* Particle system */}
        <div className="absolute inset-0">
          <div className="particle-float absolute top-1/4 left-1/6 w-2 h-2 bg-indigo-400/60 rounded-full"></div>
          <div className="particle-float absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-violet-400/60 rounded-full" style={{ animationDelay: '1s' }}></div>
          <div className="particle-float absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-400/50 rounded-full" style={{ animationDelay: '2s' }}></div>
          <div className="particle-float absolute top-2/3 right-1/3 w-1 h-1 bg-indigo-500/70 rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="particle-float absolute bottom-1/4 right-1/6 w-2 h-2 bg-violet-500/60 rounded-full" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-['Plus_Jakarta_Sans']">
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
              Empowering Tomorrow's
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent relative">
              AI Innovators
              {/* Geometric accent */}
              <div className="absolute -top-2 -right-8 w-12 h-12 bg-gradient-to-br from-indigo-200/40 to-violet-200/40 dark:from-indigo-700/40 dark:to-violet-700/40 transform rotate-45 animate-float opacity-70" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}></div>
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Talaqai bridges the gap between AI potential and practical application, 
            providing students with the tools and knowledge to shape tomorrow's digital landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group animate-scale-in feature-card rounded-3xl p-6 transition-all duration-500 hover-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 font-['Plus_Jakarta_Sans'] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mission Section */}
          <div className="animate-fade-in-up glass-card rounded-3xl p-8 hover-lift glow-border" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-6 font-['Plus_Jakarta_Sans']">
              Our Mission
            </h3>
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                We're democratizing AI education by making sophisticated automation tools 
                accessible to high school students across the Arab world. Our comprehensive 
                program transforms technical complexity into intuitive, practical skills.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    Hands-on learning with industry-standard AI tools and platforms
                  </p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    Project-based curriculum designed for real-world impact
                  </p>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    Collaborative learning environment fostering innovation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card rounded-3xl p-8 hover-lift glow-border-intense relative overflow-hidden">
              {/* Animated background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-full blur-2xl animate-pulse-glow"></div>
              
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent mb-6 font-['Plus_Jakarta_Sans'] relative z-10">
                Our Vision
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium relative z-10">
                To cultivate a generation of AI-literate innovators who will drive technological 
                advancement and solve complex challenges in their communities and beyond.
              </p>
              
              <div className="space-y-4 relative z-10">
                <div className="glass-card rounded-2xl p-6 hover-lift glow-border group">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    Global Impact
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    Connecting Arab youth to the global AI ecosystem and fostering international collaboration.
                  </p>
                </div>
                
                <div className="glass-card rounded-2xl p-6 hover-lift glow-border group">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    Innovation Hub
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    Building a community where creativity meets technology to address local and global challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-['Plus_Jakarta_Sans']">
            Perfect For 
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent"> Ambitious Students</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-8 hover-lift glow-border group hover-scale">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
                Future Entrepreneurs
              </div>
              <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                Students ready to transform ideas into AI-powered solutions
              </p>
            </div>
            <div className="glass-card rounded-3xl p-8 hover-lift glow-border group hover-scale">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
                Technology Enthusiasts
              </div>
              <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                Curious minds eager to explore the frontiers of artificial intelligence
              </p>
            </div>
            <div className="glass-card rounded-3xl p-8 hover-lift glow-border group hover-scale">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
                Social Innovators
              </div>
              <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                Change-makers who want to use technology for positive community impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
