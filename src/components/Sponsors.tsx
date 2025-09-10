import React from 'react';

interface Sponsor {
  name: string;
  description: string;
  logo: string; // This will be a placeholder path that you can replace
  website: string;
  type: 'platinum' | 'gold' | 'silver' | 'partner';
}

const Sponsors: React.FC = () => {
  // Placeholder sponsors - replace with your actual sponsors
  const sponsors: Sponsor[] = [
    {
      name: "TechCorp International",
      description: "Leading technology solutions provider supporting AI education initiatives across the MENA region.",
      logo: "/sponsors/techcorp-logo.png", // Replace with actual logo path
      website: "https://techcorp.example.com",
      type: "platinum"
    },
    {
      name: "AI Innovation Hub",
      description: "Research institute dedicated to advancing artificial intelligence education and development.",
      logo: "/sponsors/ai-hub-logo.png", // Replace with actual logo path
      website: "https://aihub.example.com",
      type: "gold"
    },
    {
      name: "Future Skills Foundation",
      description: "Non-profit organization focused on preparing students for the digital economy.",
      logo: "/sponsors/future-skills-logo.png", // Replace with actual logo path
      website: "https://futureskills.example.com",
      type: "gold"
    },
    {
      name: "Digital Learning Academy",
      description: "Educational platform providing cutting-edge technology courses and resources.",
      logo: "/sponsors/digital-academy-logo.png", // Replace with actual logo path
      website: "https://digitalacademy.example.com",
      type: "silver"
    },
    {
      name: "Innovation Labs MENA",
      description: "Technology incubator supporting startups and educational initiatives in the Middle East.",
      logo: "/sponsors/innovation-labs-logo.png", // Replace with actual logo path
      website: "https://innovationlabs.example.com",
      type: "silver"
    },
    {
      name: "Youth Tech Initiative",
      description: "Government-backed program promoting technology education among young people.",
      logo: "/sponsors/youth-tech-logo.png", // Replace with actual logo path
      website: "https://youthtech.example.com",
      type: "partner"
    }
  ];

  const getSponsorsByType = (type: string) => {
    return sponsors.filter(sponsor => sponsor.type === type);
  };

  const SponsorCard: React.FC<{ sponsor: Sponsor; size: 'large' | 'medium' | 'small' }> = ({ sponsor, size }) => {
    const sizeClasses = {
      large: 'p-8 text-center',
      medium: 'p-6 text-center',
      small: 'p-4 text-center'
    };

    const logoSizes = {
      large: 'w-32 h-32',
      medium: 'w-24 h-24',
      small: 'w-16 h-16'
    };

    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${sizeClasses[size]}`}>
        {/* Logo placeholder - replace with actual logo */}
        <div className={`${logoSizes[size]} bg-gradient-to-br from-accent-blue/20 to-accent-green/20 rounded-lg mx-auto mb-4 flex items-center justify-center`}>
          <span className="text-primary dark:text-white font-bold text-2xl">
            {sponsor.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
          </span>
        </div>
        
        <h3 className={`font-bold text-primary dark:text-white mb-2 ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
          {sponsor.name}
        </h3>
        
        <p className={`text-gray-600 dark:text-gray-300 mb-4 ${size === 'small' ? 'text-sm' : 'text-base'}`}>
          {sponsor.description}
        </p>
        
        <a
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-accent-blue hover:text-accent-green transition-colors duration-200 font-medium"
        >
          <span className={size === 'small' ? 'text-sm' : 'text-base'}>Visit Website</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    );
  };

  return (
    <section id="sponsors" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary dark:text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
              Sponsors & Partners
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're proud to collaborate with leading organizations that share our vision of empowering the next generation with AI skills.
          </p>
        </div>

        {/* Platinum Sponsors */}
        {getSponsorsByType('platinum').length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-primary dark:text-white mb-8">
              Platinum Sponsors
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {getSponsorsByType('platinum').map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} size="large" />
              ))}
            </div>
          </div>
        )}

        {/* Gold Sponsors */}
        {getSponsorsByType('gold').length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-primary dark:text-white mb-8">
              Gold Sponsors
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSponsorsByType('gold').map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} size="medium" />
              ))}
            </div>
          </div>
        )}

        {/* Silver Sponsors */}
        {getSponsorsByType('silver').length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-primary dark:text-white mb-8">
              Silver Sponsors
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getSponsorsByType('silver').map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} size="small" />
              ))}
            </div>
          </div>
        )}

        {/* Partners */}
        {getSponsorsByType('partner').length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-primary dark:text-white mb-8">
              Strategic Partners
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSponsorsByType('partner').map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} size="small" />
              ))}
            </div>
          </div>
        )}

        {/* Partnership Benefits */}
        <div className="bg-gradient-to-r from-primary/5 to-accent-blue/5 dark:from-primary/10 dark:to-accent-blue/10 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-primary dark:text-white mb-4">
              Why Partner With Us?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join us in shaping the future of AI education and empowering the next generation of innovators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-accent-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-primary dark:text-white mb-3">
                Talent Pipeline
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Access to skilled, AI-literate graduates ready to contribute to your organization.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-primary dark:text-white mb-3">
                Social Impact
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Make a meaningful difference in young people's lives and contribute to regional development.
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-primary dark:text-white mb-3">
                Brand Visibility
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Enhance your brand presence in the education and technology sectors across the Arab world.
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-to-r from-accent-blue to-accent-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Become a Partner
            </button>
          </div>
        </div>

        {/* Note about logo replacement */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Logo Placeholders
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                The sponsor logos shown are placeholders. Please replace the logo paths in the sponsors array with your actual sponsor logo images.
                You can add your logo files to the <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">public/sponsors/</code> folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
