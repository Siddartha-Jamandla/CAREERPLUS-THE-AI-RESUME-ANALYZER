import React, { useState } from 'react';
import { HelpCircle, Volume2, VolumeX, RotateCw, CheckCircle, AlertCircle, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResumeAnalysisResult, InterviewQuestion } from '../types';

interface InterviewFlashcardsProps {
  analysis?: ResumeAnalysisResult;
  targetRole?: string;
}

export const InterviewFlashcards: React.FC<InterviewFlashcardsProps> = ({
  analysis,
  targetRole = 'Software Professional',
}) => {
  const cardsList: InterviewQuestion[] = analysis?.tailoredInterviewQuestions || [
    {
      question: "Walk me through your most complex technical architecture or project and how you handled unexpected scalability bottlenecks.",
      category: "Technical",
      whyAsked: "Tests architectural depth, trade-off reasoning, and system scalability knowledge.",
      winningAnswerStrategy: "Use STAR method. State baseline metrics, architectural bottlenecks, caching/database optimizations, and final latency/throughput improvement percentages."
    },
    {
      question: "Describe a situation where a key stakeholder or product manager pushed back on your technical timeline. How did you negotiate scope?",
      category: "Behavioral",
      whyAsked: "Evaluates cross-functional communication, scope trimming, and resilience under pressure.",
      winningAnswerStrategy: "Highlight data-driven trade-off analysis, phased milestone rollouts, and maintaining engineering quality."
    },
    {
      question: "Tell me about a production incident or bug you caused or investigated. What was the post-mortem root cause and lesson learned?",
      category: "Behavioral",
      whyAsked: "Assesses ownership, blameless culture, debugging speed, and preventive system engineering.",
      winningAnswerStrategy: "Be transparent. Explain root cause, immediate mitigation, and long-term automated test / monitoring additions."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  const currentCard = cardsList[currentIndex] || cardsList[0];

  const handleSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleMastered = (idx: number) => {
    if (masteredIds.includes(idx)) {
      setMasteredIds(masteredIds.filter((id) => id !== idx));
    } else {
      setMasteredIds([...masteredIds, idx]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Interview Flashcard Studio</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Behavioral & Technical Question Drills
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Practice questions tailored for <strong className="text-slate-800">{targetRole}</strong> with audio playback, STAR strategy hints, and mastery tracking.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
            Mastered {masteredIds.length} of {cardsList.length}
          </span>
        </div>
      </div>

      {/* Main Flashcard Interface */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
          <span>Question {currentIndex + 1} of {cardsList.length}</span>
          <span className="uppercase text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full font-mono">
            {currentCard.category}
          </span>
        </div>

        {/* Card Box */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`bg-white border rounded-3xl p-8 shadow-md min-h-[300px] flex flex-col justify-between cursor-pointer transition-all hover:border-blue-400 relative overflow-hidden ${
            masteredIds.includes(currentIndex)
              ? 'border-emerald-300 bg-emerald-50/20'
              : 'border-slate-200'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                {isFlipped ? 'Answer Strategy & STAR Guide' : 'Interview Question (Click to Flip)'}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSpeech(isFlipped ? currentCard.winningAnswerStrategy : currentCard.question);
                }}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isPlaying ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {!isFlipped ? (
              <div className="space-y-4 pt-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  "{currentCard.question}"
                </h3>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <span className="font-bold text-slate-800 block uppercase text-[10px]">Why Interviewers Ask This:</span>
                  <p>{currentCard.whyAsked}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">Winning Answer Strategy (STAR):</span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {currentCard.winningAnswerStrategy}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Click card to toggle question/answer</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentIndex);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center space-x-1 ${
                masteredIds.includes(currentIndex)
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{masteredIds.includes(currentIndex) ? 'Mastered' : 'Mark Mastered'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((prev) => prev - 1);
              setIsFlipped(false);
            }}
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-full disabled:opacity-30 cursor-pointer flex items-center space-x-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Question</span>
          </button>

          <button
            disabled={currentIndex === cardsList.length - 1}
            onClick={() => {
              setCurrentIndex((prev) => prev + 1);
              setIsFlipped(false);
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full disabled:opacity-30 cursor-pointer flex items-center space-x-1 shadow-xs"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
