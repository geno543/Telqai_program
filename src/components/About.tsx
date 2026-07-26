import React, { useState, memo, useCallback, useMemo, lazy, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const About: React.FC = memo(() => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'مرحباً! أنا تلقائي (Telqai Assistant) 🤖\n\nيمكنني مساعدتك في أي أسئلة حول:\n• برنامج أتمتة الذكاء الاصطناعي (4 أسابيع، 8 جلسات)\n• المنهج الدراسي وتقنيات n8n\n• عملية القبول\n• شهادات البرنامج والمشاريع\n\nHello! I\'m Telqai (تلقائي) 🤖\n\nI can help you with questions about:\n• AI Automation Program (4 weeks, 8 sessions)\n• Curriculum and n8n technologies\n• Admission process\n• Program certificates and projects\n\nكيف يمكنني مساعدتك؟ How can I help you?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cleanResponse = useCallback((text: string): string => {
    return text
      .replace(/<think>[\s\S]*?<\/think>/gi, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/`(.*?)`/g, '$1')
      .replace(/^\s*[-*+]\s/gm, '')
      .replace(/^\s*\d+\.\s/gm, '')
      .trim();
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are تلقائي (Telqai Assistant), an AI helper for the Telqai AI automation program. Give clean direct answers without <think> tags. Use plain text only. Arabic input → Arabic response. English input → English response. Program: 4 weeks, 8 sessions, 2h each, Arabic instruction, n8n & AI agents.`
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: inputMessage }
          ]
        })
      });

      const data = await response.json();
      if (data.choices?.[0]?.message) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: cleanResponse(data.choices[0].message.content),
          timestamp: new Date()
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, messages, isLoading, cleanResponse]);

  const features = useMemo(() => [
    {
      title: 'AI Automation',
      description: 'Build smart workflows',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'No-Code Tools',
      description: 'Create without coding',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="12" rx="1" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h4M7 11h6" />
          <line x1="7" y1="20" x2="17" y2="20" strokeWidth={2} />
          <line x1="12" y1="16" x2="12" y2="20" strokeWidth={2} />
        </svg>
      ),
    },
    {
      title: 'Smart Agents',
      description: 'Intelligent systems',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
          <line x1="8" y1="21" x2="16" y2="21" strokeWidth={2} />
          <line x1="12" y1="17" x2="12" y2="21" strokeWidth={2} />
          <circle cx="8" cy="9" r="1.5" fill="currentColor" />
          <circle cx="16" cy="9" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Industry Tools',
      description: 'Professional platforms',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
  ], []);

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-[#0a0718] film-grain">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-magenta/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content with 3D Robot */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 animate-fade-in-up">
          {/* Left: Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display">
              <span className="text-slate-900 dark:text-white">
                Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan to-cyan-600 bg-clip-text text-transparent">
                AI Education
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">
              Learn AI automation and n8n through our 4-week intensive program for Arab high school and university students.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-4 hover-lift">
                <div className="text-2xl font-bold bg-gradient-brand bg-clip-text text-transparent">4</div>
                <div className="text-sm text-slate-400">Week Program</div>
              </div>
              <div className="glass-card rounded-2xl p-4 hover-lift">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan to-cyan-600 bg-clip-text text-transparent">8</div>
                <div className="text-sm text-slate-400">Sessions Total</div>
              </div>
            </div>
          </div>

          {/* Right: 3D Robot */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Suspense fallback={
                <div className="w-full h-full bg-gradient-to-br from-navy to-navy-50 rounded-2xl animate-pulse" />
              }>
                <Spline
                  scene="https://prod.spline.design/h2LsDkHyDtg3rYwJ/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                />
              </Suspense>

              {/* Chat Assistant */}
              <div className="absolute bottom-3 right-3 z-50">
                {!isChatOpen ? (
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="glass-card rounded-xl p-3 max-w-xs hover-lift group transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
                          <circle cx="8" cy="9" r="1" fill="currentColor" />
                          <circle cx="16" cy="9" r="1" fill="currentColor" />
                          <path d="M9 13h6" strokeWidth={2} strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="text-xs leading-tight">
                        <div className="font-semibold text-cyan-500">Telqai Assistant</div>
                        <div className="opacity-80 text-slate-600 dark:text-slate-300">How can I help you?</div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="glass-card rounded-xl w-80 h-96 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-3 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth={2} />
                            <circle cx="8" cy="9" r="1" fill="currentColor" />
                            <circle cx="16" cy="9" r="1" fill="currentColor" />
                            <path d="M9 13h6" strokeWidth={2} strokeLinecap="round" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-cyan-500 text-sm">تلقائي (Telqai)</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">Program Help</div>
                        </div>
                      </div>
                      <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                            message.role === 'user'
                              ? 'bg-gradient-brand text-white rounded-br-none'
                              : 'bg-white/10 text-slate-700 dark:text-slate-300 rounded-bl-none'
                          }`}>
                            <div className="whitespace-pre-wrap">{message.content}</div>
                            <div className={`text-xs mt-1 opacity-60 ${
                              message.role === 'user' ? 'text-white/70' : 'text-slate-400'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white/10 text-slate-400 rounded-lg rounded-bl-none p-2 text-sm">
                            <span className="animate-pulse">Thinking...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-white/10">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Ask about the program..."
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/15 rounded-lg text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none"
                          disabled={isLoading}
                        />
                        <button
                          onClick={sendMessage}
                          disabled={isLoading || !inputMessage.trim()}
                          className="px-3 py-2 bg-gradient-brand text-white rounded-lg hover:bg-gradient-brand-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Skills Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card rounded-2xl p-6 transition-all duration-500 hover-scale hover-lift glow-border relative overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-cyan/10 rounded-xl flex items-center justify-center text-cyan-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-display group-hover:text-cyan-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Impact Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="glass-card rounded-3xl p-8 hover-lift glow-border-intense relative overflow-hidden group animate-fade-in-up">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent mb-4 font-display">
                AI Automation Mastery
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Master AI automation tools like n8n and build intelligent systems with real-world business applications.
              </p>

              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4 hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Training Sessions</span>
                    <span className="text-sm font-bold text-cyan-500">+8</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-brand h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Training Hours</span>
                    <span className="text-sm font-bold text-magenta">+20</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-magenta to-purple h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <div className="glass-card rounded-3xl p-8 hover-lift glow-border relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-display relative z-10">
              4-Week Learning Path
            </h3>

            <div className="space-y-3 relative z-10">
              {[
                { week: 'Week 1', skill: 'AI Agents & APIs', sessions: 'AI Agents Intro + API Fundamentals' },
                { week: 'Week 2', skill: 'n8n Automation', sessions: 'Basic Automation + Advanced Workflows' },
                { week: 'Week 3', skill: 'Advanced Components', sessions: 'AI Agent Components + RAG Systems' },
                { week: 'Week 4', skill: 'Integration & Business', sessions: 'Hosting + Advanced Models' }
              ].map((item, index) => (
                <div key={index} className="glass-card rounded-xl p-4 hover-lift group">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium text-slate-400">{item.week}</span>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-500 transition-colors duration-300">{item.skill}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sessions}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-display">
            Built For{' '}
            <span className="bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent">
              Arab High Schoolers & Undergraduates
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'Tech Enthusiasts',
                desc: 'Learn cutting-edge automation',
                color: 'from-violet/10 to-cyan/10',
                iconColor: 'text-cyan-500',
              },
              {
                title: 'Future Engineers',
                desc: 'Build intelligent systems',
                color: 'from-magenta/10 to-purple/10',
                iconColor: 'text-magenta',
              },
              {
                title: 'Problem Solvers',
                desc: 'Automate real challenges',
                color: 'from-cyan/10 to-violet/10',
                iconColor: 'text-purple',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-2xl p-6 hover-lift glow-border group hover-scale relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50`}></div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
