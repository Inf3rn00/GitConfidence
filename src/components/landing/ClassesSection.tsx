import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../utils/icons';
import { CHARACTER_CLASSES } from '../../data/classes';

const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
});

export const ClassesSection: React.FC = () => {
  return (
    <section id="classes" className="border-b border-zinc-800 bg-zinc-900/20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            04. CHOOSE_YOUR_CLASS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase mt-4">
            Your Archetype
          </h2>
          <p className="text-zinc-500 mt-4 max-w-xl font-sans">
            Each class has a unique stat profile and problem track. Pick the one
            that matches your style.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
          {CHARACTER_CLASSES.map((cls, i) => (
            <motion.div
              key={cls.id}
              {...staggerItem(i)}
              className="p-10 lg:p-12 bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
            >
              <Icon name={cls.icon} size={32} className="text-white mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold tracking-tighter uppercase italic mb-2">{cls.name}</h3>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mb-6">
                {cls.tagline}
              </p>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-800 font-mono text-[10px] font-bold tracking-tighter mb-4">
                {cls.stats}
              </div>
              <p className="text-[12px] text-zinc-500 font-mono uppercase tracking-wider">{cls.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
