import React, { memo } from 'react';

interface Sponsor {
  name: string;
  description: string;
  logo: string;
  website: string;
}

const Sponsors: React.FC = memo(() => {
  const sponsors: Sponsor[] = [
    {
      name: 'Make.com',
      description: 'Visual automation platform powering the no-code revolution. Make enables students to build powerful workflows without writing a single line of code.',
      logo: '/logos/make.png',
      website: 'https://www.make.com',
    },
    {
      name: 'CSC',
      description: 'Computer Science Club — a student-led community fostering innovation, collaboration, and technical excellence among young minds.',
      logo: '/logos/cs logo.webp',
      website: 'https://www.instagram.com/csc_dev/',
    },
  ];

  return (
    <section id="sponsors" className="relative py-28 overflow-hidden bg-[#0a0718] film-grain circuit-grid">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0718] via-[#0d0a20] to-[#0a0718]"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(33,211,243,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(33,211,243,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}></div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan animate-pulse"></div>
            <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Trusted Partners</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 font-display">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan via-purple to-magenta bg-clip-text text-transparent">
              Sponsors
            </span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Powering the next generation of innovators through industry-leading partnerships.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              {/* Card glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan/20 via-purple/20 to-magenta/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative glass-card rounded-2xl p-8 lg:p-10 h-full">
                {/* Accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex items-start gap-6">
                  {/* Logo container */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 bg-gradient-to-br from-cyan/10 to-purple/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-24 h-20 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 rounded-xl border border-white/20 dark:border-white/10 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} Logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">{sponsor.name}</h3>
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-1.5 rounded-lg bg-cyan/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan/20 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{sponsor.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor CTA */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-px bg-gradient-to-r from-cyan/30 via-purple/30 to-magenta/30 rounded-3xl blur-sm opacity-50"></div>
          <div className="relative glass-card rounded-3xl p-10 lg:p-14 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan/20 to-purple/20 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-cyan/10">
                <svg className="w-10 h-10 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">
                Shape the Future of{' '}
                <span className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">Education</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg max-w-xl mx-auto">
                Join our mission to equip Arab youth with world-class AI and automation skills.
              </p>
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-brand hover:bg-gradient-brand-hover text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple/20 transform hover:scale-105 inline-flex items-center space-x-3 text-lg"
              >
                <span>Become a Sponsor</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Partnership Impact */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 font-display">Partnership Impact</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Through our sponsors' support, students get access to industry-standard tools and resources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg>,
                title: 'Talent Pipeline',
                desc: 'Access to skilled, AI-literate graduates ready to contribute.',
                color: 'from-cyan to-cyan-600',
              },
              {
                icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>,
                title: 'Social Impact',
                desc: 'Make a meaningful difference in young people\'s lives.',
                color: 'from-purple to-magenta',
              },
              {
                icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>,
                title: 'Brand Visibility',
                desc: 'Enhance your brand presence in education and tech.',
                color: 'from-magenta to-purple',
              },
            ].map((item) => (
              <div key={item.title} className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -inset-px bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center p-8 glass-card rounded-2xl h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-5 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 font-display">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Sponsors.displayName = 'Sponsors';

export default Sponsors;
