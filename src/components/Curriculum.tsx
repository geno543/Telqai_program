import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CurriculumModule {
  week: number;
  title: string;
  description: string;
  topics: string[];
  duration: string;
  project: string;
}

const Curriculum: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<number>(0);

  // Telqai: AI Automation with n8n and AI Agents - 8-Session Syllabus
  const curriculumModules: CurriculumModule[] = [
    {
      week: 1,
      title: "Introduction to AI Agents and Automation Concepts",
      description: "Understanding the fundamental differences between AI Agents, LLMs, and traditional automation workflows for selected students.",
      topics: [
        "Understanding AI Agents vs. Large Language Models (LLM)",
        "Differences between AI Agents and Workflows (Anthropic examples)",
        "Prompt Chaining and Smart Workflow Exploration",
        "Key uniqueness, risks, and mitigation of AI Agents",
        "Comparing Traditional Automation, AI Automation, and AI Agents"
      ],
      duration: "2 hours",
      project: "Design your first AI agent concept and automation strategy"
    },
    {
      week: 1,
      title: "API Fundamentals and Getting Started with n8n",
      description: "Master API integration and set up your n8n development environment for AI automation.",
      topics: [
        "How APIs work inside AI Agents: client-server overview",
        "OpenAI API signup, billing, and key setup",
        "n8n overview: self-hosted vs cloud, installation, and registration",
        "Installing and updating n8n self-hosted via npm"
      ],
      duration: "2 hours",
      project: "Set up complete n8n environment and create first API integration"
    },
    {
      week: 2,
      title: "Building Basic Automations in n8n",
      description: "Create practical automation workflows integrating email, Google Sheets, and chatbot functionality.",
      topics: [
        "n8n trigger types and chatbot automation with the Gmail API",
        "Practical automation examples: email, Google Sheets, smart workflows",
        "Managing n8n projects: duplicate, download, import",
        "Workflow debugging and optimization techniques"
      ],
      duration: "2 hours",
      project: "Build an automated email response system with Google Sheets integration"
    },
    {
      week: 2,
      title: "Advanced AI Automation Workflows",
      description: "Implement sophisticated AI workflows for business applications using various LLM providers.",
      topics: [
        "Summarizing support tickets with AI agents",
        "Sentiment analysis and data export workflows",
        "Integrating open-source LLMs with n8n: considerations",
        "Using DeepSeek, Ollama, and other open-source LLMs with n8n"
      ],
      duration: "2 hours",
      project: "Create an intelligent support ticket system with sentiment analysis"
    },
    {
      week: 3,
      title: "Deep Dive into AI Agent Components and APIs",
      description: "Master advanced AI agent architecture and multi-provider API integration.",
      topics: [
        "Chain node basics, LLM message types, and parameters",
        "API pricing, usage details, and integration with Anthropic, DeepSeek, Gemini, Groq",
        "Working with AI Agent memory nodes in n8n",
        "Building smart sales and customer-response chatbots"
      ],
      duration: "2 hours",
      project: "Develop a multi-provider AI sales chatbot with memory capabilities"
    },
    {
      week: 3,
      title: "Retrieval-Augmented Generation (RAG) and Vector Databases",
      description: "Build professional-grade RAG systems and implement vector database solutions.",
      topics: [
        "Introduction to RAG and feeding LLMs without retraining (fine-tuning)",
        "Top vector databases in 2025",
        "Building professional-grade RAG chatbots with n8n",
        "Automating file uploads and accuracy optimization for RAG AI Agents"
      ],
      duration: "2 hours",
      project: "Create a knowledge-base RAG chatbot with automated document processing"
    },
    {
      week: 4,
      title: "Hosting, Self-Hosting Challenges, and Multi-Agent Systems",
      description: "Deploy and manage complex multi-agent systems with enterprise-grade hosting solutions.",
      topics: [
        "Overview of server hosting types for n8n",
        "Troubleshooting WhatsApp and Telegram issues in self-hosting",
        "Updating n8n self-hosting inside Docker",
        "WhatsApp multi-agent orchestrator and securing WhatsApp agents"
      ],
      duration: "2 hours",
      project: "Deploy and secure a multi-agent WhatsApp automation system"
    },
    {
      week: 4,
      title: "Cutting-edge Models, Integration, and Business Automation",
      description: "Implement advanced business automation solutions and prepare for real-world deployment.",
      topics: [
        "Designing AI agents with GPT-OSS",
        "Automating meetings and business tasks (text and voice)",
        "Meta Business Account setup for WhatsApp API",
        "n8n community nodes and final project guidance"
      ],
      duration: "2 hours",
      project: "Complete business automation solution with voice and text capabilities"
    }
  ];

  return (
    <section id="curriculum" className="py-24 bg-gradient-to-br from-cyan-50 via-slate-50 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900 relative overflow-hidden">
      {/* Enhanced background elements with floating animations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        }}></div>
        
        {/* Floating curriculum elements */}
        <div className="absolute top-16 left-16 w-8 h-8 bg-indigo-400/20 rounded-lg rotate-12 animate-subtle-float"></div>
        <div className="absolute top-32 right-24 w-6 h-6 bg-violet-400/25 rounded-full animate-subtle-float" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-48 left-1/4 w-4 h-4 bg-blue-400/30 rounded-sm rotate-45 animate-subtle-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-24 right-1/3 w-7 h-7 bg-purple-400/20 rounded-lg animate-subtle-float" style={{ animationDelay: '0.3s' }}></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-['Plus_Jakarta_Sans'] leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Program
            </span>{' '}
            <span className="text-slate-800 dark:text-slate-100">Curriculum</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            An intensive 4-week AI automation program for selected Arab high school students. 
            +8 comprehensive sessions of 2 hours each, taught in Arabic.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full border border-amber-200 dark:border-amber-700">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-amber-700 dark:text-amber-300 font-semibold">Selective Program • Arabic Instruction</span>
          </div>
        </div>

        {/* Program Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center glass-card rounded-3xl p-8 hover-lift glow-border animate-scale-in group hover-scale">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/50 dark:to-cyan-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-3 font-['Plus_Jakarta_Sans']">4 Weeks</h3>
            <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Intensive selective AI automation program for Arab high schoolers</p>
          </div>
          
          <div className="text-center glass-card rounded-3xl p-8 hover-lift glow-border animate-scale-in group hover-scale" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-800/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-3 font-['Plus_Jakarta_Sans']">+20 Hours</h3>
            <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">+8 intensive sessions × 2 hours each with hands-on practical applications</p>
          </div>
          
          <div className="text-center glass-card rounded-3xl p-8 hover-lift glow-border animate-scale-in group hover-scale" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 font-['Plus_Jakarta_Sans']">8 Projects</h3>
            <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Real-world AI automation projects building professional portfolio solutions</p>
          </div>
        </div>

        {/* Interactive Curriculum */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Module List */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 font-['Plus_Jakarta_Sans']">Program Sessions</h3>
            <div className="space-y-3">
              {curriculumModules.map((module, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedModule(index)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-500 border ripple-effect hover-scale ${
                    selectedModule === index
                      ? 'glass-card-active glow-border-intense text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-glow-intense'
                      : 'glass-card glow-border text-slate-700 dark:text-slate-300 hover-lift'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-semibold text-sm transition-colors duration-300 flex items-center gap-2 ${selectedModule === index ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        Session {index + 1}
                      </div>
                      <div className={`font-medium transition-colors duration-300 ${selectedModule === index ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {module.title}
                      </div>
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                      selectedModule === index
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100/80 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                    }`}>
                      {module.duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Module Details */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="glass-card rounded-3xl p-8 hover-lift glow-border h-full relative overflow-hidden">
              {/* Animated background accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-r from-indigo-400/5 to-violet-400/5 rounded-full blur-3xl animate-pulse-glow"></div>
              
              <div className="mb-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
                    Session {selectedModule + 1}
                  </h3>
                  <span className="glass-tag bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold shadow-glow">
                    {curriculumModules[selectedModule].duration}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  {curriculumModules[selectedModule].title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  {curriculumModules[selectedModule].description}
                </p>
              </div>

              <div className="mb-8 relative z-10">
                <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 font-['Plus_Jakarta_Sans']">
                  Learning Topics
                </h5>
                <ul className="grid md:grid-cols-2 gap-3">
                  {curriculumModules[selectedModule].topics.map((topic, index) => (
                    <li key={index} className="flex items-start space-x-3 text-slate-600 dark:text-slate-300 group">
                      <div className="w-5 h-5 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {curriculumModules[selectedModule].project && (
                <div className="glass-card rounded-2xl p-6 glow-border relative z-10">
                  <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 font-['Plus_Jakarta_Sans']">
                    Session Project
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    {curriculumModules[selectedModule].project}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="glass-card rounded-3xl p-8 lg:p-12 glow-border-intense hover-lift relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-violet-400/10 rounded-full blur-2xl animate-pulse-glow"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-r from-violet-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent mb-6 font-['Plus_Jakarta_Sans']">
                Ready to Apply for Our Selective Program?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Join our carefully selected group of Arab high school students learning AI automation. 
                Apply now for this intensive 4-week program with expert instruction in Arabic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link
                  to="/join-program"
                  className="glass-button glass-button-primary px-10 py-4 rounded-2xl font-semibold text-lg ripple-effect hover-scale hover-glow inline-block text-center"
                >
                  Apply Now
                </Link>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                   Selective admission • Professional certification
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
