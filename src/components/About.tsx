import React, { useState, memo, useMemo, useCallback } from 'react';
import Spline from '@splinetool/react-spline';
import { useHideSplineWatermark } from '../hooks/useHideSplineWatermark';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const About: React.FC = memo(() => {
  // Use the custom hook to hide watermark
  useHideSplineWatermark();
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'مرحباً! أنا تلقائي (Telqai Assistant) 🤖\n\nيمكنني مساعدتك في أي أسئلة حول:\n• برنامج أتمتة الذكاء الاصطناعي (4 أسابيع، 8 جلسات)\n• المنهج الدراسي وتقنيات n8n\n• عملية القبول الانتقائية\n• شهادات البرنامج والمشاريع\n\nHello! I\'m Telqai (تلقائي) 🤖\n\nI can help you with questions about:\n• AI Automation Program (4 weeks, 8 sessions)\n• Curriculum and n8n technologies\n• Selective admission process\n• Program certificates and projects\n\nكيف يمكنني مساعدتك؟ How can I help you?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to clean AI response from formatting and thinking tags
  const cleanResponse = useCallback((text: string): string => {
    return text
      .replace(/<think>[\s\S]*?<\/think>/gi, '') // Remove <think> tags and content
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/`(.*?)`/g, '$1') // Remove code formatting
      .replace(/^\s*[-*+]\s/gm, '') // Remove bullet points
      .replace(/^\s*\d+\.\s/gm, '') // Remove numbered lists
      .trim();
  }, []);

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;
    
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are تلقائي (Telqai Assistant), an AI helper for the Telqai AI automation program.

RESPONSE STYLE:
- Give clean, direct answers without <think> tags or internal thoughts
- Use plain text only, no bold, italics, or formatting
- Use minimal emojis (maximum 1 per response)
- Be conversational but professional
- Keep responses concise and helpful

LANGUAGE RULE:
- Arabic input → Respond completely in Arabic
- English input → Respond completely in English
- Mixed → Use dominant language

PROGRAM INFO:
تلقائي - برنامج أتمتة الذكاء الاصطناعي انتقائي لطلاب الثانوية العرب
4 أسابيع، 8 جلسات، ساعتان لكل جلسة، تدريس باللغة العربية

Telqai - Selective AI automation program for Arab high school students
4 weeks, 8 sessions, 2 hours each, taught in Arabic

SESSIONS:
1. مقدمة وكلاء الذكاء الاصطناعي / AI Agents Introduction
2. أساسيات APIs وإعداد n8n / API Fundamentals & n8n Setup
3. أتمتة n8n الأساسية / Basic n8n Automation
4. سير عمل الذكاء الاصطناعي المتقدم / Advanced AI Workflows
5. مكونات وكلاء الذكاء الاصطناعي / AI Agent Components
6. أنظمة RAG وقواعد البيانات / RAG & Vector Databases
7. الاستضافة والأنظمة المتعددة / Hosting & Multi-Agent Systems
8. النماذج المتطورة وأتمتة الأعمال / Advanced Models & Business Automation

FEATURES:
- تعليم باللغة العربية، برنامج انتقائي، شهادة مهنية
- Arabic instruction, selective program, professional certificate
- تطبيقات عملية مع n8n والذكاء الاصطناعي
- Hands-on projects with n8n and AI automation

Answer questions directly and helpfully about the program.`
            },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: inputMessage }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: cleanResponse(data.choices[0].message.content),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later or contact us directly for assistance.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, messages, cleanResponse]);
  
  const features = useMemo(() => [
    {
      title: 'AI Automation',
      description: 'Build smart workflows',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12a4 4 0 118 0 4 4 0 01-8 0z" opacity="0.6" />
        </svg>
      ),
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTAwXzEwMCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTYwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM2MzY2RjEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMDBfMTAwKSIgb3BhY2l0eT0iMC4xIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjgiIGZpbGw9IiM2MzY2RjEiIG9wYWNpdHk9IjAuOCIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSI0MCIgcj0iOCIgZmlsbD0iIzYzNjZGMSIgb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEyMCIgcj0iOCIgZmlsbD0iIzYzNjZGMSIgb3BhY2l0eT0iMC44Ii8+CjxsaW5lIHgxPSI1MCIgeTE9IjQwIiB4Mj0iMTUwIiB5Mj0iNDAiIHN0cm9rZT0iIzYzNjZGMSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjYiLz4KPGxpbmUgeDE9IjUwIiB5MT0iNDAiIHgyPSIxMDAiIHkyPSIxMjAiIHN0cm9rZT0iIzYzNjZGMSIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjYiLz4KPGxpbmUgeDE9IjE1MCIgeTE9IjQwIiB4Mj0iMTAwIiB5Mj0iMTIwIiBzdHJva2U9IiM2MzY2RjEiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC42Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzYzNjZGMSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QUkgTmV0d29yazwvdGV4dD4KPC9zdmc+"
    },
    {
      title: 'No-Code Tools',
      description: 'Create without coding',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="12" rx="1" strokeWidth={2} />
          <rect x="7" y="8" width="4" height="1" rx="0.5" fill="currentColor" />
          <rect x="13" y="8" width="4" height="1" rx="0.5" fill="currentColor" />
          <rect x="7" y="11" width="6" height="1" rx="0.5" fill="currentColor" />
          <circle cx="5" cy="6" r="0.5" fill="currentColor" />
          <circle cx="5" cy="8" r="0.5" fill="currentColor" />
          <circle cx="5" cy="10" r="0.5" fill="currentColor" />
        </svg>
      ),
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfMTAwXzEwMCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTYwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM4QjVDRjYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0I4MkY2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8xMDBfMTAwKSIgb3BhY2l0eT0iMC4xIi8+CjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxMDAiIHJ4PSI4IiBmaWxsPSIjOEI1Q0Y2IiBvcGFjaXR5PSIwLjIiLz4KPHJlY3QgeD0iNDUiIHk9IjUwIiB3aWR0aD0iMzAiIGhlaWdodD0iNCIgZmlsbD0iIzhCNUNGNiIgb3BhY2l0eT0iMC44Ii8+CjxyZWN0IHg9Ijg1IiB5PSI1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjQiIGZpbGw9IiM4QjVDRjYiIG9wYWNpdHk9IjAuOCIvPgo8cmVjdCB4PSIxMjUiIHk9IjUwIiB3aWR0aD0iMzAiIGhlaWdodD0iNCIgZmlsbD0iIzhCNUNGNiIgb3BhY2l0eT0iMC44Ii8+CjxyZWN0IHg9IjQ1IiB5PSI3MCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQiIGZpbGw9IiM4QjVDRjYiIG9wYWNpdHk9IjAuNiIvPgo8cmVjdCB4PSIxMDUiIHk9IjcwIiB3aWR0aD0iNTAiIGhlaWdodD0iNCIgZmlsbD0iIzhCNUNGNiIgb3BhY2l0eT0iMC42Ii8+CjxyZWN0IHg9IjQ1IiB5PSI5MCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjQiIGZpbGw9IiM4QjVDRjYiIG9wYWNpdHk9IjAuNCIvPgo8Y2lyY2xlIGN4PSIzOCIgY3k9IjUyIiByPSIyIiBmaWxsPSIjOEI1Q0Y2Ii8+CjxjaXJjbGUgY3g9IjM4IiBjeT0iNzIiIHI9IjIiIGZpbGw9IiM4QjVDRjYiLz4KPGNpcmNsZSBjeD0iMzgiIGN5PSI5MiIgcj0iMiIgZmlsbD0iIzhCNUNGNiIvPgo8L3N2Zz4="
    },
    {
      title: 'Smart Agents',
      description: 'Intelligent systems',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={2} />
          <line x1="8" y1="21" x2="16" y2="21" strokeWidth={2} />
          <line x1="12" y1="17" x2="12" y2="21" strokeWidth={2} />
          <circle cx="7" cy="8" r="1" fill="currentColor" />
          <circle cx="12" cy="8" r="1" fill="currentColor" />
          <rect x="9" y="11" width="6" height="3" rx="1" fill="currentColor" opacity="0.6" />
        </svg>
      ),
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMTAwXzEwMCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTYwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMzQjgyRjYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjM2NkYxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9InVybCgjcGFpbnQyX2xpbmVhcl8xMDBfMTAwKSIgb3BhY2l0eT0iMC4xIi8+CjxyZWN0IHg9IjQwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgcng9IjgiIGZpbGw9IiMzQjgyRjYiIG9wYWNpdHk9IjAuMiIvPgo8Y2lyY2xlIGN4PSI3MCIgY3k9IjQwIiByPSI0IiBmaWxsPSIjM0I4MkY2Ii8+CjxjaXJjbGUgY3g9IjEzMCIgY3k9IjQwIiByPSI0IiBmaWxsPSIjM0I4MkY2Ii8+CjxyZWN0IHg9Ijg1IiB5PSI2MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjE1IiByeD0iNCIgZmlsbD0iIzNCODJGNiIgb3BhY2l0eT0iMC42Ii8+CjxyZWN0IHg9Ijc1IiB5PSIxMTAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI0IiBmaWxsPSIjM0I4MkY2IiBvcGFjaXR5PSIwLjgiLz4KPGxpbmUgeDE9IjEwMCIgeTE9IjEwMCIgeDI9IjEwMCIgeTI9IjExNCIgc3Ryb2tlPSIjM0I4MkY2IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+"
    },
    {
      title: 'Global Impact',
      description: 'Worldwide reach',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-4v8" opacity="0.6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 9l-3 3-3-3" fill="none" />
          <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.4" />
          <circle cx="16" cy="8" r="1" fill="currentColor" opacity="0.4" />
          <circle cx="8" cy="16" r="1" fill="currentColor" opacity="0.4" />
          <circle cx="16" cy="16" r="1" fill="currentColor" opacity="0.4" />
        </svg>
      ),
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50M19saW5lYXJfMTAwXzEwMCIgeDE9IjAiIHkxPSIwIiB4Mj0iMjAwIiB5Mj0iMTYwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMxMEI5ODEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM0I4MkY2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNjAiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcl8xMDBfMTAwKSIgb3BhY2l0eT0iMC4xIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBCOTgxIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuOCIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI0IiBmaWxsPSIjMTBCOTgxIiBvcGFjaXR5PSIwLjgiLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iNTAiIHI9IjQiIGZpbGw9IiMxMEI5ODEiIG9wYWNpdHk9IjAuOCIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjExMCIgcj0iNCIgZmlsbD0iIzEwQjk4MSIgb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjEyMCIgY3k9IjExMCIgcj0iNCIgZmlsbD0iIzEwQjk4MSIgb3BhY2l0eT0iMC44Ii8+CjxsaW5lIHgxPSI4MCIgeTE9IjUwIiB4Mj0iMTIwIiB5Mj0iNTAiIHN0cm9rZT0iIzEwQjk4MSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPGxpbmUgeDE9IjgwIiB5MT0iMTEwIiB4Mj0iMTIwIiB5Mj0iMTEwIiBzdHJva2U9IiMxMEI5ODEiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC42Ii8+CjxsaW5lIHgxPSI4MCIgeTE9IjUwIiB4Mj0iODAiIHkyPSIxMTAiIHN0cm9rZT0iIzEwQjk4MSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjYiLz4KPGxpbmUgeDE9IjEyMCIgeTE9IjUwIiB4Mj0iMTIwIiB5Mj0iMTEwIiBzdHJva2U9IiMxMEI5ODEiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC42Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMxMEI5ODEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkdsb2JhbCBOZXR3b3JrPC90ZXh0Pgo8L3N2Zz4="
    },
  ], []);

  return (
    <section id="about" className="relative py-24 overflow-hidden min-h-screen">
      {/* Multi-layered animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white/95 to-cyan-50/90 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-cyan-950/95"></div>
        
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-50/20 to-cyan-50/30 dark:from-transparent dark:via-cyan-950/20 dark:to-cyan-950/30"></div>
        
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse-glow"></div>
        </div>
        
        {/* Geometric accent shapes */}
        <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-cyan-200/40 to-cyan-300/40 dark:from-cyan-800/40 dark:to-cyan-900/40 transform rotate-45 animate-float opacity-70" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 dark:from-cyan-800/40 dark:to-blue-800/40 rounded-full animate-float-reverse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 dark:from-blue-800/40 dark:to-cyan-800/40 transform rotate-12 animate-float opacity-50" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}></div>
        
        {/* Particle system */}
        <div className="absolute inset-0">
          <div className="particle-float absolute top-1/4 left-1/6 w-2 h-2 bg-cyan-400/60 rounded-full"></div>
          <div className="particle-float absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-cyan-400/60 rounded-full" style={{ animationDelay: '1s' }}></div>
          <div className="particle-float absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-400/50 rounded-full" style={{ animationDelay: '2s' }}></div>
          <div className="particle-float absolute top-2/3 right-1/3 w-1 h-1 bg-cyan-500/70 rounded-full" style={{ animationDelay: '0.5s' }}></div>
          <div className="particle-float absolute bottom-1/4 right-1/6 w-2 h-2 bg-cyan-500/60 rounded-full" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main content section with 3D Robot */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16 animate-fade-in-up">
          {/* Left: Hero Content */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-['Plus_Jakarta_Sans']">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent relative">
                AI Education
              </span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">
              Learn AI automation and n8n through our selective 4-week intensive program for Arab high school students.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-4 hover-lift">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">4</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Week Program</div>
              </div>
              <div className="glass-card rounded-2xl p-4 hover-lift">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">8</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Sessions Total</div>
              </div>
            </div>
          </div>

          {/* Right: 3D Robot Section - Free flowing */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <Spline 
                scene="https://prod.spline.design/h2LsDkHyDtg3rYwJ/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
              {/* Custom Telqai Assistant Box with Chat Functionality */}
              <div className="absolute bottom-3 right-3 z-[999]">
                {!isChatOpen ? (
                  /* Assistant Button */
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="glass-card rounded-xl p-3 max-w-xs hover-lift group transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      {/* Robot Avatar */}
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={2} />
                          <circle cx="8" cy="9" r="1" fill="currentColor" />
                          <circle cx="16" cy="9" r="1" fill="currentColor" />
                          <path d="M9 13h6" strokeWidth={2} strokeLinecap="round" />
                        </svg>
                      </div>
                      {/* Message */}
                      <div className="text-xs text-slate-700 dark:text-slate-300 leading-tight">
                        <div className="font-semibold text-cyan-400 dark:text-cyan-400">Telqai Assistant</div>
                        <div className="opacity-80">How can I help you?</div>
                      </div>
                    </div>
                  </button>
                ) : (
                  /* Chat Interface */
                  <div className="glass-card rounded-xl w-80 h-96 flex flex-col">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-3 border-b border-white/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth={2} />
                            <circle cx="8" cy="9" r="1" fill="currentColor" />
                            <circle cx="16" cy="9" r="1" fill="currentColor" />
                            <path d="M9 13h6" strokeWidth={2} strokeLinecap="round" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-cyan-400 text-sm">تلقائي (Telqai Assistant)</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">مساعد البرنامج والمنهج • Program & Syllabus Help</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsChatOpen(false)}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-2 rounded-lg text-sm ${
                            message.role === 'user'
                              ? 'bg-cyan-500 text-white rounded-br-none'
                              : 'bg-white/10 text-slate-700 dark:text-slate-300 rounded-bl-none'
                          }`}>
                            <div className="whitespace-pre-wrap">
                              {message.content}
                            </div>
                            <div className={`text-xs mt-1 opacity-70 ${
                              message.role === 'user' ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 border-t border-white/20">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="اسأل عن البرنامج... | Ask about the program..."
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                          disabled={isLoading}
                        />
                        <button
                          onClick={sendMessage}
                          disabled={isLoading || !inputMessage.trim()}
                          className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
            {/* Floating particles around robot */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400/40 rounded-full animate-float blur-sm"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-400/50 rounded-full animate-float-reverse blur-sm"></div>
            <div className="absolute top-2/3 left-1/6 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse blur-sm"></div>
          </div>
        </div>

        {/* AI Skills Grid - Simplified */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group animate-scale-in glass-card rounded-2xl p-6 transition-all duration-500 hover-scale hover-lift glow-border relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-100 to-cyan-200 dark:from-cyan-900/50 dark:to-cyan-800/50 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 font-['Plus_Jakarta_Sans'] group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Impact Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Interactive AI Dashboard */}
          <div className="animate-fade-in-up glass-card rounded-3xl p-8 hover-lift glow-border-intense relative overflow-hidden group" style={{ animationDelay: '0.2s' }}>
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20"></div>
              <div className="absolute top-4 left-4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-4 left-12 w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-4 left-20 w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent mb-4 font-['Plus_Jakarta_Sans']">
                AI Automation Mastery
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                Master AI automation tools like n8n and build intelligent systems with real-world business applications.
              </p>
              
              {/* Program Statistics */}
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-4 hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Training Sessions</span>
                    <span className="text-sm font-bold text-indigo-600">+8</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-4 hover-lift">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Training Hours</span>
                    <span className="text-sm font-bold text-violet-600">+20</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '100%', animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Learning Path */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card rounded-3xl p-8 hover-lift glow-border relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{ 
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%), 
                                   radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
                }}></div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-['Plus_Jakarta_Sans'] relative z-10">
                4-Week Learning Path
              </h3>
              
              <div className="space-y-4 relative z-10">
                {[
                  { week: 'Week 1', skill: 'AI Agents & APIs', sessions: 'Sessions: AI Agents Intro + API Fundamentals' },
                  { week: 'Week 2', skill: 'n8n Automation', sessions: 'Sessions: Basic Automation + Advanced Workflows' },
                  { week: 'Week 3', skill: 'Advanced Components', sessions: 'Sessions: AI Agent Components + RAG Systems' },
                  { week: 'Week 4', skill: 'Integration & Business', sessions: 'Sessions: Hosting Solutions + Advanced Models' }
                ].map((item, index) => (
                  <div key={index} className="glass-card rounded-xl p-4 hover-lift group">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.week}</span>
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">{item.skill}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.sessions}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience - Compact Visual Cards */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 font-['Plus_Jakarta_Sans']">
            Built For 
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent"> Arab High Schoolers</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-6 hover-lift glow-border group hover-scale relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  Tech Enthusiasts
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                  Learn cutting-edge automation
                </p>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 hover-lift glow-border group hover-scale relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-blue-500/20"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/50 dark:to-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  Future Engineers
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                  Build intelligent systems
                </p>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-6 hover-lift glow-border group hover-scale relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  Problem Solvers
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                  Automate real challenges
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
