import React from 'react';

interface Sponsor {
  name: string;
  description: string;
  logo: string; // This will be a placeholder path that you can replace
  website: string;
}

const Sponsors: React.FC = () => {
  const sponsors: Sponsor[] = [
    // {
    //   name: "Make",
    //   description: "The visual platform for anyone to design, build, and automate anything—from simple tasks to complex workflows—in minutes.",
    //   logo: "/sponsors/make-logo.svg", // You can replace this with Make's actual logo
    //   website: "https://make.com"
    // }
  ];



  return (
    <section id="sponsors" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary dark:text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
              Sponsor
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our sponsors believe in empowering young minds with the tools they need to succeed. Their support helps us provide world-class resources and opportunities that make TelqAI truly exceptional.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Make Sponsor Card */}
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 p-8 text-center">
                {/* Make Logo */}
                <div className="w-40 h-32 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mx-auto mb-6 flex items-center justify-center">
                  <span className="text-primary dark:text-white font-bold p-2 text-3xl">
                    <img style={{ filter: "brightness(0) invert(1)" }} src={sponsor.logo} alt={`${sponsor.name} Logo`} className="w-full h-full object-contain" />
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
                  {sponsor.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Make is partnering with us to give every student hands-on experience with professional automation tools. They're providing 6-month premium subscriptions so our participants can build real workflows and learn industry-standard practices.
                </p>
                
                <a
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-accent-blue hover:text-accent-green transition-colors duration-200 font-medium text-lg"
                >
                  <span>Visit Make.com</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
         
            {/* Be a Sponsor Card */}
            <div className="bg-gradient-to-br from-accent-blue/10 to-accent-green/10 dark:from-accent-blue/20 dark:to-accent-green/20 rounded-xl border-2 border-dashed border-accent-blue/30 dark:border-accent-blue/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-32 h-32 bg-gradient-to-br from-accent-blue/20 to-accent-green/20 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-primary dark:text-white mb-4">
                Your Company Here
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Help us train the next generation of tech leaders. Your support provides students with tools, mentorship, and real opportunities to launch their careers in AI and automation.
              </p>
              
              <button 
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-accent-blue to-accent-green text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>Become a Sponsor</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sponsorship Benefits */}
        <div className="bg-gradient-to-r from-primary/5 to-accent-blue/5 dark:from-primary/10 dark:to-accent-blue/10 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-primary dark:text-white mb-4">
              Partnership Impact
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Through our sponsors' support, students get access to industry-standard tools and resources that prepare them for real-world careers in technology and automation.
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
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
