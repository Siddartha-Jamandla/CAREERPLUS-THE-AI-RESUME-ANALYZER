import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, User, Bot, Loader2, Lightbulb } from 'lucide-react';
import { ResumeAnalysisResult } from '../types';

interface CareerCoachChatProps {
  result: ResumeAnalysisResult | null;
  targetRole: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export const CareerCoachChat: React.FC<CareerCoachChatProps> = ({ result, targetRole }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I am your AI Career Coach. I've reviewed your resume profile and target role (${targetRole}). Ask me anything about positioning your background, framing employment gaps, interview preparation strategies, or salary negotiation!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    `How can I best position my background for ${targetRole}?`,
    `What specific hands-on project should I build to address my top missing skills?`,
    `How do I answer "What is your biggest weakness?" for this role?`,
    `How should I structure my salary negotiation for ${targetRole}?`,
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!promptText) setInput('');
    setIsSending(true);

    try {
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.content,
      }));

      const contextPayload = result
        ? {
            targetRole,
            currentRole: result.extractedDetails.currentRole,
            strengths: result.extractedDetails.topStrengths,
            missingSkills: result.skillGapAnalysis.missingCriticalSkills.map((s) => s.skill),
            overallScore: result.overallScore,
          }
        : { targetRole };

      const response = await fetch('/api/career-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          context: contextPayload,
        }),
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'I am happy to assist you further with your career roadmap!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to send career chat message:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col h-[650px]">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center space-x-2">
              <span>CareerPulse AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-xs text-slate-300">
              Context-Aware Advisor • Target Role: {targetRole}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-900/60 text-blue-200 text-xs font-semibold border border-blue-700 hidden sm:inline-block">
          Advanced AI Powered
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div key={m.id} className={`flex items-start space-x-2.5 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-400'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] space-y-1 ${isUser ? 'text-right' : ''}`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs whitespace-pre-line'
                  }`}
                >
                  {m.content}
                </div>
                <span className="text-[10px] text-slate-400 font-medium px-1 block">{m.time}</span>
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center space-x-2 text-xs text-slate-500 p-2 bg-white rounded-xl border border-slate-200 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            <span>AI Career Coach is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-3 bg-slate-100 border-t border-slate-200 overflow-x-auto whitespace-nowrap space-x-2 shrink-0 flex items-center no-scrollbar">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mr-1" />
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isSending}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI Career Coach anything about your resume, gaps, or interviews..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center space-x-1 shrink-0 cursor-pointer"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
