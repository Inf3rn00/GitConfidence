import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Button } from './ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Clock, X, ChevronRight } from 'lucide-react';

interface QuizProps {
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => void;
  onExit: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onSubmit, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onSubmit(answers);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [answers, onSubmit]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleNext = (optionId: string) => {
    const newAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(newAnswers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onSubmit(newAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col selection:bg-accent selection:text-white">
      {/* HUD HEADER */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <Terminal size={14} className="text-accent" />
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">Diagnostic_Session // v1.0.4</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-tight">
            <Clock size={12} className="text-zinc-400" />
            <span className="text-zinc-500">T-MINUS //</span>
            <span className="text-accent">{formatTime(timeLeft)}</span>
          </div>
          <button onClick={onExit} className="p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      </header>

      {/* SYSTEM PROGRESSBAR */}
      <div className="h-0.5 w-full bg-zinc-100 dark:bg-zinc-900">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-accent"
        />
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* CONTEXT SIDEBAR */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 p-8 space-y-12 bg-zinc-50/30 dark:bg-zinc-900/10">
           <div className="space-y-6">
              <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Session_Metadata</h4>
              <div className="space-y-3 font-mono text-[11px]">
                 <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-400">INDEX</span>
                    <span className="font-bold">{currentIndex + 1} / {questions.length}</span>
                 </div>
                 <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-400">DOMAIN</span>
                    <span className="font-bold uppercase italic text-accent">{currentQ.stack}</span>
                 </div>
                 <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                    <span className="text-zinc-400">CATEGORY</span>
                    <span className="font-bold uppercase italic">{currentQ.category}</span>
                 </div>
              </div>
           </div>

           <div className="p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black/40">
              <p className="text-[10px] font-mono leading-relaxed text-zinc-500 italic">
                Secure assessment active. Any attempt to switch tabs or focus will result in immediate diagnostic termination and log invalidation.
              </p>
           </div>
        </aside>

        {/* WORKSPACE */}
        <section className="flex-1 p-8 lg:p-24 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="max-w-3xl space-y-16"
            >
              <div className="space-y-8">
                 <div className="text-[11px] font-mono font-bold text-accent uppercase tracking-[0.4em]">Query_Identity</div>
                 <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter uppercase italic leading-[0.95] max-w-2xl">
                    {currentQ.text}
                 </h2>
              </div>

              {currentQ.codeSnippet && (
                <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-8 font-mono text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                  <pre><code>{currentQ.codeSnippet}</code></pre>
                </div>
              )}

              <div className="grid grid-cols-1 gap-px bg-zinc-200 dark:border-zinc-800 border border-zinc-200 dark:border-zinc-800">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={option.id}
                    onClick={() => handleNext(option.id)}
                    className="flex items-center gap-8 p-8 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-left group"
                  >
                    <div className="w-8 h-8 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center font-mono text-[12px] font-bold group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-sans text-[16px] font-medium tracking-tight flex-1 leading-snug">
                      {option.text}
                    </span>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 text-accent transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};