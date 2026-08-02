import React, { useState } from 'react';
import { CheckSquare, Square, Zap, Award, Sparkles, PlusCircle } from 'lucide-react';
import { ActionItem } from '../types';

interface QuickActionChecklistProps {
  initialChecklist: ActionItem[];
  currentOverallScore: number;
}

export const QuickActionChecklist: React.FC<QuickActionChecklistProps> = ({
  initialChecklist,
  currentOverallScore,
}) => {
  const [checklist, setChecklist] = useState<ActionItem[]>(initialChecklist);

  const toggleTask = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const totalPotentialBoost = checklist.reduce((sum, item) => sum + (item.completed ? item.scoreImpact : 0), 0);
  const totalPossible = checklist.reduce((sum, item) => sum + item.scoreImpact, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>High-Impact Action Roadmap</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Top Resume Score Boost Actions ({completedCount}/{checklist.length} Completed)
          </h3>
        </div>

        <div className="flex items-center space-x-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-emerald-900 shrink-0">
          <Zap className="w-5 h-5 text-emerald-600 fill-emerald-600" />
          <div>
            <div className="text-xs font-bold">Estimated Score Boost</div>
            <div className="text-sm font-extrabold text-emerald-700">
              +{totalPotentialBoost} Pts <span className="text-[11px] font-normal text-emerald-600">(Total possible: +{totalPossible})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleTask(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between space-x-4 ${
              item.completed
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-500'
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-slate-100/60'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5 shrink-0">
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div>
                <span
                  className={`text-xs sm:text-sm font-semibold block ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {item.task}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 inline-block">
                  Category: {item.category}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                item.completed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              +{item.scoreImpact} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
