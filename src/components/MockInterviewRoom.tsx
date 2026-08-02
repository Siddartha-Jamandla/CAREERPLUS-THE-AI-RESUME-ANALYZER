import React, { useState } from 'react';
import { Mic, Send, RefreshCw, Award, AlertCircle, CheckCircle2, Bot, Sparkles, MessageSquare, Play, Zap, HelpCircle } from 'lucide-react';
import { ResumeAnalysisResult, MockInterviewEvaluation } from '../types';

interface MockInterviewRoomProps {
  analysis: ResumeAnalysisResult;
  targetRole: string;
}

export const MockInterviewRoom: React.FC<MockInterviewRoomProps> = ({
  analysis,
  targetRole,
}) => {
  const [selectedPersona, setSelectedPersona] = useState<string>('Tough Engineering Director');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [candidateAnswer, setCandidateAnswer] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<MockInterviewEvaluation | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);

  const questionsList = analysis.tailoredInterviewQuestions || [
    {
      question: "Walk me through your most complex technical architecture or project and how you handled unexpected scalability bottlenecks.",
      category: "Technical",
      whyAsked: "Tests architectural depth and problem-solving under load.",
      winningAnswerStrategy: "Use STAR method. Highlight metrics before and after optimization."
    },
    {
      question: "Describe a situation where a key stakeholder pushed back on your technical timeline. How did you negotiate scope?",
      category: "Behavioral",
      whyAsked: "Evaluates cross-functional communication and leadership resilience.",
      winningAnswerStrategy: "Focus on data-driven trade-offs, scope trimming, and alignment."
    }
  ];

  const currentQ = questionsList[currentQuestionIndex] || questionsList[0];

  const personas = [
    { id: 'Tough Engineering Director', name: 'Bar-Raiser Engineering Director', desc: 'Probes technical depth, architectural trade-offs, and failure post-mortems.' },
    { id: 'Behavioral HR Specialist', name: 'Senior Talent Acquisition Lead', desc: 'Evaluates culture fit, team collaboration, conflict resolution, and leadership growth.' },
    { id: 'Startup CEO / Founder', name: 'Startup Founder & CEO', desc: 'Focuses on execution speed, business outcome impact, agility, and ownership.' },
  ];

  const handleSpeechToggle = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your answer.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCandidateAnswer((prev) => prev + ' ' + transcript);
    };

    recognition.start();
  };

  const handleEvaluateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const response = await fetch('/api/mock-interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          candidateAnswer,
          persona: selectedPersona,
          targetRole,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate answer.');
      }

      const data = await response.json();
      setEvaluation(data);
    } catch (err: any) {
      console.error(err);
      alert('Error evaluating answer: ' + err.message);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Mic className="w-4 h-4" />
            <span>Interactive AI Mock Practice Room</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Live Interview Simulator & STAR Method Evaluator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Practice answering real interview questions tailored to your target role ({targetRole}) and receive instant interviewer feedback.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Question {currentQuestionIndex + 1} of {questionsList.length}
          </span>
        </div>
      </div>

      {/* Select Persona Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Select Interviewer Persona:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {personas.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                selectedPersona === p.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50'
              }`}
            >
              <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                <span>{p.name}</span>
                {selectedPersona === p.id && <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Question Box & Answer Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  {selectedPersona} Asks:
                </span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
                Category: {currentQ.category}
              </span>
            </div>

            <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
              "{currentQ.question}"
            </p>

            <div className="bg-slate-800/80 p-3 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="font-bold text-blue-400 block">Why this question is asked:</span>
              <p>{currentQ.whyAsked}</p>
            </div>

            {/* Questions Switcher */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  setCurrentQuestionIndex((prev) => prev - 1);
                  setEvaluation(null);
                  setCandidateAnswer('');
                }}
                className="text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                ← Previous Question
              </button>
              <button
                disabled={currentQuestionIndex === questionsList.length - 1}
                onClick={() => {
                  setCurrentQuestionIndex((prev) => prev + 1);
                  setEvaluation(null);
                  setCandidateAnswer('');
                }}
                className="text-blue-400 font-bold hover:text-blue-300 disabled:opacity-30 cursor-pointer"
              >
                Next Question →
              </button>
            </div>
          </div>

          {/* Candidate Response Workspace */}
          <form onSubmit={handleEvaluateAnswer} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Your Spoken / Written Response (STAR Technique)
              </label>
              <button
                type="button"
                onClick={handleSpeechToggle}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{isListening ? 'Stop Recording' : 'Voice Input'}</span>
              </button>
            </div>

            <textarea
              rows={6}
              value={candidateAnswer}
              onChange={(e) => setCandidateAnswer(e.target.value)}
              placeholder="Structure your answer using STAR (Situation, Task, Action, Result). For example: 'In my previous role at X, we faced a scaling issue (Situation)... my task was to optimize the API (Task)... I re-architected the queries using Redis caching (Action)... which improved latency by 65% (Result)...'"
              className="w-full p-4 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <p className="text-[11px] text-slate-500">
                Tip: Include specific numbers, percentages, and tech stack names.
              </p>
              <button
                type="submit"
                disabled={!candidateAnswer.trim() || isEvaluating}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs disabled:opacity-50 flex items-center space-x-2 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Evaluate My Answer</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Evaluation Output Section */}
        <div className="lg:col-span-5">
          {evaluation ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">STAR Method Assessment</h3>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-blue-600">{evaluation.overallAnswerScore}</span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>

              {/* STAR Score Breakdown */}
              <div className="grid grid-cols-4 gap-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Situation</div>
                  <div className="text-sm font-extrabold text-slate-800">{evaluation.starScore.situation}/25</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Task</div>
                  <div className="text-sm font-extrabold text-slate-800">{evaluation.starScore.task}/25</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Action</div>
                  <div className="text-sm font-extrabold text-slate-800">{evaluation.starScore.action}/25</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Result</div>
                  <div className="text-sm font-extrabold text-slate-800">{evaluation.starScore.result}/25</div>
                </div>
              </div>

              {/* Feedback Narrative */}
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Interviewer Verdict:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  {evaluation.interviewerFeedback}
                </p>
              </div>

              {/* Key Missing Terms */}
              {evaluation.missingKeywords.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                    Missing Technical Keywords To Mention:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {evaluation.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Exemplary Benchmark Answer */}
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  High-Scoring Exemplary Benchmark Answer:
                </span>
                <p className="text-xs text-slate-600 italic bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                  "{evaluation.exemplaryAnswer}"
                </p>
              </div>

              {/* Follow up Question */}
              <div className="bg-slate-900 text-white p-3.5 rounded-xl text-xs space-y-1">
                <span className="text-blue-400 font-bold block">Expected Follow-Up Question:</span>
                <p>"{evaluation.followUpQuestion}"</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
              <Bot className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-700 text-sm">Ready For Your Response</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Type or speak your answer on the left and click "Evaluate My Answer" to get instant STAR method scoring and feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
