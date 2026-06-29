import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Cpu } from 'lucide-react';
import { DiagnosticTerminal } from './DiagnosticTerminal';

interface HeroProps {
  scrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollTo }) => {
  const navigate = useNavigate();

  return (
    <section
      id="features"
      className="min-h-screen flex items-center border-b border-zinc-800 pt-16"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-8 lg:p-20 lg:border-r border-zinc-800 flex flex-col justify-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 h-7 border border-accent/30 bg-accent/5 font-mono text-[10px] text-accent font-bold uppercase tracking-[0.15em]">
              <Cpu size={10} /> For Frontend Developers
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none uppercase">
              Imposter<br />
              Syndrome<br />
              <span className="text-zinc-700">is a data</span>
              <br />
              Problem.
            </h1>
            <p className="max-w-lg font-sans text-lg text-zinc-400 leading-relaxed">
              GitConfidence turns imposter syndrome into a game. Pick your class,
              solve real-world problem sets, and watch your avatar evolve.
              Confidence through evidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/onboarding')}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] bg-white text-black px-6 h-11 flex items-center hover:opacity-80 transition-opacity"
              >
                START_YOUR_JOURNEY <ArrowRight size={14} className="ml-2" />
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] px-6 h-11 flex items-center border border-zinc-700 text-zinc-500 hover:text-black dark:hover:text-white hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
              >
                SEE_HOW_IT_WORKS <ChevronDown size={14} className="ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-5 p-8 lg:p-20 flex items-center justify-center bg-zinc-900/20 min-h-[70vh]">
          <DiagnosticTerminal />
        </div>
      </div>
    </section>
  );
};
