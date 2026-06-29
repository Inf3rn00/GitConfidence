import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  '> SCANNING_SKILL_MATRIX...',
  '> DETECTING_STRENGTHS...',
  '> CONFIRMED: 7/10 domains above threshold',
  '> IDENTIFYING_GROWTH_AREAS...',
  '> RESULT: Imposter Syndrome = false positive.',
  '> DIAGNOSTIC_COMPLETE.',
];

export const DiagnosticTerminal: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalIndex, setTerminalIndex] = useState(0);

  useEffect(() => {
    if (terminalIndex < LINES.length) {
      const timer = setTimeout(() => {
        setTerminalLines((prev) => [...prev, LINES[terminalIndex]]);
        setTerminalIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [terminalIndex]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      className="w-full max-w-sm border border-zinc-700 bg-black font-mono text-xs"
    >
      <div className="flex items-center gap-2 px-4 h-8 border-b border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="ml-2 text-[10px] text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">diagnostic_shell.exe</span>
      </div>
      <div className="p-5 space-y-2 min-h-[240px]">
        {terminalLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`text-xs leading-relaxed ${
              line.startsWith('> RESULT') || line.startsWith('> DIAGNOSTIC')
                ? 'text-accent font-bold'
                : line.startsWith('> CONFIRMED')
                  ? 'text-green-500'
                  : 'text-zinc-400 dark:text-zinc-300'
            }`}
          >
            {line}
          </motion.p>
        ))}
        <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
      </div>
    </motion.div>
  );
};
