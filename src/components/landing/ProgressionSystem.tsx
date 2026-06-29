import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../utils/icons';
import { PROGRESSION_STEPS } from '../../data/site';

export const ProgressionSystem: React.FC = () => {
  return (
    <section className="border-b border-zinc-800 bg-zinc-900/20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              02. THE_PROGRESSION_SYSTEM
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase">
              Solve.<br />
              Earn.<br />
              Evolve.
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg max-w-md">
              Every problem you solve generates data. Your avatar grows, your stats
              improve, and the imposter syndrome shrinks — because now you have proof.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="border border-zinc-800 bg-black p-8 lg:p-12">
              <div className="space-y-6">
                {PROGRESSION_STEPS.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                      <Icon name={item.icon} size={16} className={item.color} />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-800">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${70 + i * 5}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                          className="h-full bg-accent"
                        />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 w-32 text-right">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
