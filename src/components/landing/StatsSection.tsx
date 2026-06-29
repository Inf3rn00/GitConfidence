import React from 'react';
import { motion } from 'framer-motion';
import { STATS_DATA } from '../../data/site';

export const StatsSection: React.FC = () => {
  return (
    <section className="border-b border-zinc-800">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="p-12 lg:p-24 border-r border-zinc-800">
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-12">By the Numbers</h2>
          <p className="text-zinc-400 leading-relaxed font-sans max-w-md">
            Every data point is a developer who moved from doubt to evidence.
          </p>
        </div>
        <div className="p-12 lg:p-24 flex items-center">
          <div className="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 w-full">
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="p-8 lg:p-10 bg-black"
              >
                <div className="text-4xl lg:text-5xl font-mono font-bold mb-2 italic tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono uppercase font-bold text-zinc-400 tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
