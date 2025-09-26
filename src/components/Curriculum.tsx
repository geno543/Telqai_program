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

  // TelqAI: AI Automation Program - 8-Session Syllabus
  const curriculumModules: CurriculumModule[] = [
    {
      week: 1,
      title: "Introduction to AI Agents & Automation Fundamentals",
      description: "Understand the core differences between a static LLM and an active AI Agent. Differentiate between traditional automation and AI-driven workflows.",
      topics: [
        "Introduction: Calculator vs Robot - Static tools vs autonomous agents",
        "LLM vs AI Agent: Core components (LLM, Memory, Tools)",
        "Workflows vs Agentic Systems: Traditional vs AI-driven workflows",
        "Hands-on: Pre-built AI agent for news article summarization",
        "Understanding data flow between nodes in n8n"
      ],
      duration: "120 minutes",
      project: "Identify automation tasks vs AI agent tasks and analyze workflow components"
    },
    {
      week: 1,
      title: "APIs & n8n Self-Hosting",
      description: "Understand what an API is and successfully install n8n on your local machine using Docker.",
      topics: [
        "APIs explained: Restaurant analogy (menu, client, waiter, kitchen)",
        "Setting up OpenAI API account and generating API keys",
        "Cloud vs Self-Hosted n8n: pros, cons, and decision factors",
        "Docker installation and n8n setup with environment variables",
        "Initial n8n configuration and interface exploration"
      ],
      duration: "120 minutes",
      project: "Successfully install and configure self-hosted n8n instance with API access"
    },
    {
      week: 2,
      title: "Building Simple Automations",
      description: "Build a complete, functional workflow from scratch using webhook triggers and multiple nodes.",
      topics: [
        "Workflow triggers: Manual, Webhook, and Scheduled triggers",
        "Email-to-Sheet automation with Gmail and Google Sheets integration",
        "JavaScript code node for data parsing and extraction",
        "Workflow debugging using execution history",
        "Authentication with Google APIs and troubleshooting"
      ],
      duration: "120 minutes",
      project: "Create email-to-spreadsheet automation with webhook integration"
    },
    {
      week: 2,
      title: "Advanced AI Automation",
      description: "Integrate AI into existing workflows to perform data analysis and make intelligent decisions.",
      topics: [
        "Adding intelligence to workflows with LLM nodes",
        "Sentiment analysis automation for customer reviews",
        "Prompt engineering: crafting effective AI instructions",
        "Data flow from Google Sheets through AI analysis back to sheets",
        "Testing and validating AI-powered workflow results"
      ],
      duration: "120 minutes",
      project: "Build sentiment analysis agent for customer review processing"
    },
    {
      week: 3,
      title: "Advanced AI Agents & Integrations",
      description: "Understand advanced agentic concepts like memory and connect to various LLM providers.",
      topics: [
        "Agent memory: Simple Memory and Memory Buffer nodes",
        "LLM ecosystem: Proprietary vs open-source models",
        "OpenRouter integration for multi-model access",
        "Building memory-aware conversational chatbots",
        "System prompts and persona customization"
      ],
      duration: "120 minutes",
      project: "Create memory-aware chatbot with custom persona and multi-turn conversations"
    },
    {
      week: 3,
      title: "RAG & Vector Databases",
      description: "Introduce Retrieval-Augmented Generation and demonstrate access to private, up-to-date information.",
      topics: [
        "LLM limitations and RAG as solution for private data",
        "Vector databases: Pinecone, Weaviate, and embeddings concept",
        "Building RAG chatbot with PDF document knowledge",
        "Document ingestion, vectorization, and retrieval processes",
        "Context-aware AI responses using external knowledge"
      ],
      duration: "120 minutes",
      project: "Build RAG chatbot that answers questions about uploaded PDF documents"
    },
    {
      week: 4,
      title: "Self-Hosting & Multi-Agent Systems",
      description: "Understand deployment practicalities and the concept of multi-agent collaboration.",
      topics: [
        "VPS deployment and 24/7 agent hosting considerations",
        "Security: reverse proxy, SSL certificates, and Docker updates",
        "Multi-Agent Systems: orchestrator and specialist agent design",
        "Sub-workflows and agent delegation patterns",
        "Router agent directing tasks to specialized agents"
      ],
      duration: "120 minutes",
      project: "Design multi-agent system with router directing customer service vs technical support"
    },
    {
      week: 4,
      title: "Business Automation & Final Project",
      description: "Apply all learned concepts to a comprehensive, real-world business problem with voice and image integration.",
      topics: [
        "Voice-to-text and multimodal LLM integration",
        "WhatsApp Business API and Meta account setup",
        "Final project requirements and design patterns",
        "Voice message processing and image analysis workflows",
        "Project presentation and real-world deployment strategies"
      ],
      duration: "120 minutes",
      project: "Complete business automation solution with AI agents, voice, and messaging integration"
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
            An intensive 8-session cohort-based program empowering high school and undergraduate students across the MENA region with hands-on AI automation skills.
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full border border-amber-200 dark:border-amber-700">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-amber-700 dark:text-amber-300 font-semibold">Arabic Instruction</span>
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
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-3 font-['Plus_Jakarta_Sans']">8 Sessions</h3>
            <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Cohort-based seasonal program for MENA high schoolers and undergraduates</p>
          </div>
          
          <div className="text-center glass-card rounded-3xl p-8 hover-lift glow-border animate-scale-in group hover-scale" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-800/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-3 font-['Plus_Jakarta_Sans']">16+ Hours</h3>
            <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">8 intensive sessions of 120 minutes each with hands-on practical applications</p>
          </div>
          
          <div className="text-center glass-card rounded-3xl p-8 hover-lift glow-border animate-scale-in group hover-scale" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 font-['Plus_Jakarta_Sans']">8 Projects</h3>
            <p className="text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">Hands-on projects from basic automations to advanced multi-agent business solutions</p>
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
                    <div className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 min-w-fit whitespace-nowrap flex-shrink-0 ${
                      selectedModule === index
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/90 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300'
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
                  <span className="glass-tag bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-indigo-900/50 dark:to-violet-900/50 text-cyan-700 dark:text-indigo-300 px-4 py-2 rounded-full text-sm font-semibold shadow-glow border border-cyan-200/60 dark:border-indigo-700/50">
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
                Ready to Apply for Our Program?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Join our cohort-based program designed to democratize AI education across the MENA region. 
                Learn to build, manage, and deploy AI agents using no-code tools with expert instruction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link
                  to="/join"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 dark:from-indigo-600 dark:to-violet-600 dark:hover:from-indigo-700 dark:hover:to-violet-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block text-center"
                >
                  Apply Now
                </Link>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                   Professional certification
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
